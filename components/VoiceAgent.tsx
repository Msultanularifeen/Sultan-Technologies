import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, X, Activity, Volume2 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { firebaseConfig } from '../services/firebase';

// Audio Context configuration
const AUDIO_SAMPLE_RATE = 24000;
const INPUT_SAMPLE_RATE = 16000;

const VoiceAgent: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Refs for audio processing
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Helper to safely get API Key without process.env crash
  const getApiKey = () => {
    return firebaseConfig.apiKey;
  };

  const connectToGemini = async () => {
    const apiKey = getApiKey();
    if (!apiKey) {
      setError("API Key missing. Cannot start voice.");
      return;
    }

    setStatus('connecting');
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      // Initialize Audio Contexts
      inputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: INPUT_SAMPLE_RATE });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: AUDIO_SAMPLE_RATE });
      
      // Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const config = {
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: "You are Sultan AI, a futuristic voice assistant for Sultan Technologies. Be concise, professional, and helpful.",
        },
      };

      const sessionPromise = ai.live.connect({
        model: config.model,
        config: config.config,
        callbacks: {
          onopen: () => {
            setStatus('listening');
            
            // Setup Input Processing
            if (!inputContextRef.current) return;
            const source = inputContextRef.current.createMediaStreamSource(stream);
            const scriptProcessor = inputContextRef.current.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              if (!isActive) return; // Stop processing if closed
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmData = floatTo16BitPCM(inputData);
              
              // Calculate volume for visualizer
              let sum = 0;
              for (let i = 0; i < inputData.length; i++) {
                sum += inputData[i] * inputData[i];
              }
              setVolume(Math.sqrt(sum / inputData.length) * 100);

              const base64Data = arrayBufferToBase64(pcmData.buffer);
              
              sessionPromise.then((session) => {
                session.sendRealtimeInput({
                  media: {
                    mimeType: 'audio/pcm;rate=16000',
                    data: base64Data
                  }
                });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputContextRef.current.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData) {
              setStatus('speaking');
              await playAudioChunk(audioData);
            }
            
            if (msg.serverContent?.turnComplete) {
              setStatus('listening');
            }
          },
          onclose: () => {
            setStatus('idle');
          },
          onerror: (err) => {
            console.error("Gemini Live Error:", err);
            setError("Connection error");
            setStatus('idle');
          }
        }
      });

      sessionRef.current = sessionPromise;

    } catch (err) {
      console.error("Failed to connect:", err);
      setError("Failed to access microphone or connect.");
      setStatus('idle');
    }
  };

  const disconnect = () => {
    setIsActive(false);
    setStatus('idle');
    
    // Close session
    if (sessionRef.current) {
      sessionRef.current.then((s: any) => s.close());
    }

    // Stop all audio sources
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();

    // Close contexts
    if (inputContextRef.current) inputContextRef.current.close();
    if (audioContextRef.current) audioContextRef.current.close();
  };

  const toggleSession = () => {
    if (isActive) {
      disconnect();
    } else {
      setIsActive(true);
      connectToGemini();
    }
  };

  // --- Audio Helpers ---

  const playAudioChunk = async (base64Audio: string) => {
    if (!audioContextRef.current) return;
    
    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
    
    const float32Data = new Float32Array(bytes.length / 2);
    const dataView = new DataView(bytes.buffer);
    
    for (let i = 0; i < float32Data.length; i++) {
      float32Data[i] = dataView.getInt16(i * 2, true) / 32768.0;
    }

    const audioBuffer = audioContextRef.current.createBuffer(1, float32Data.length, AUDIO_SAMPLE_RATE);
    audioBuffer.getChannelData(0).set(float32Data);

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);

    const currentTime = audioContextRef.current.currentTime;
    const startTime = Math.max(currentTime, nextStartTimeRef.current);
    
    source.start(startTime);
    nextStartTimeRef.current = startTime + audioBuffer.duration;
    
    sourcesRef.current.add(source);
    source.onended = () => {
      sourcesRef.current.delete(source);
      if (sourcesRef.current.size === 0) {
        setStatus('listening');
      }
    };
  };

  const floatTo16BitPCM = (input: Float32Array) => {
    const output = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return output;
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // --- Render ---

  if (!isActive) {
    return (
      <button
        onClick={toggleSession}
        className="fixed bottom-24 right-8 z-40 bg-[#0a0a0a] border border-brand-primary/50 text-brand-primary p-4 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-110 hover:bg-brand-primary hover:text-white transition-all duration-300 flex items-center justify-center group"
        title="Start Voice Chat"
      >
        <Volume2 size={24} className="group-hover:animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#050505] border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center">
        <button 
          onClick={disconnect}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-8 relative">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${status === 'speaking' ? 'bg-brand-primary shadow-[0_0_50px_rgba(59,130,246,0.6)]' : 'bg-white/5 border border-white/10'}`}>
            <div 
              className="absolute inset-0 bg-brand-primary rounded-full blur-xl opacity-40 transition-transform duration-100"
              style={{ transform: `scale(${1 + Math.min(volume / 50, 0.5)})` }}
            ></div>
            <Activity size={48} className={`text-white relative z-10 ${status === 'speaking' ? 'animate-bounce' : ''}`} />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">Sultan Live</h3>
        <p className="text-brand-primary font-mono text-sm mb-8 uppercase tracking-widest">
          {status === 'connecting' && 'Establishing Uplink...'}
          {status === 'listening' && 'Listening...'}
          {status === 'speaking' && 'Speaking...'}
        </p>

        {error && (
          <div className="bg-red-900/20 text-red-400 px-4 py-2 rounded-lg text-sm mb-6 border border-red-500/20">
            {error}
          </div>
        )}

        <div className="flex gap-4">
           <button 
            onClick={disconnect}
            className="px-8 py-3 rounded-full bg-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
          >
            End Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAgent;