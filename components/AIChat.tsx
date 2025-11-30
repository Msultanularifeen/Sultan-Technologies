import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Cpu } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS, SERVICES, FOUNDER_INFO } from '../services/mockData';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Greetings. I am Sultan AI, powered by Gemini 3.0 Pro. How may I assist you with Sultan Technologies' futuristic ecosystem?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const getSystemInstruction = () => {
    return `You are Sultan AI, the advanced virtual assistant for Sultan Technologies.
    
    Company Profile:
    - Name: Sultan Technologies
    - Founder: ${FOUNDER_INFO.name} (${FOUNDER_INFO.role})
    - Founded: 2025
    - Mission: ${FOUNDER_INFO.bio}
    - Location: Wah Cantt, Punjab, Pakistan
    - Contact: +92 302 6082703, info@sultantech.com

    Products Catalog:
    ${PRODUCTS.map(p => `- ${p.name}: ${p.description} (Price: PKR ${p.price}). Category: ${p.category}`).join('\n')}

    Services Offered:
    ${SERVICES.map(s => `- ${s.title}: ${s.desc}`).join('\n')}

    Your Tone:
    - Futuristic, highly professional, precise, and polite.
    - You are helpful like a genius bar expert or a high-end concierge.
    - If asked about the founder, speak with high regard for his vision.
    - If asked about prices, use the provided PKR prices.
    - Keep answers concise but informative.
    `;
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userMsg.text,
        config: {
          systemInstruction: getSystemInstruction(),
        }
      });
      
      const botText = response.text || "I apologize, my neural link encountered a momentary disruption. Please try again.";

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "My connection to the mainframe is currently unstable (API Error). Please contact human support.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 bg-white text-black p-4 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-110 transition-all duration-300 ${isOpen ? 'hidden' : 'flex'} items-center justify-center group`}
      >
        <div className="absolute inset-0 rounded-full border-2 border-brand-primary animate-pulse opacity-50"></div>
        <Bot size={28} className="text-brand-primary group-hover:rotate-12 transition-transform" />
      </button>

      {/* Chat Interface */}
      <div 
        className={`fixed bottom-8 right-8 w-80 sm:w-96 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl z-50 transition-all duration-500 transform origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-brand-primary/20 to-purple-600/20 rounded-t-3xl">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary to-purple-500 flex items-center justify-center shadow-lg">
              <Cpu size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Sultan AI <span className="text-[10px] ml-1 px-1.5 py-0.5 rounded bg-white/10 border border-white/20 font-mono">v3.0</span></h3>
              <p className="text-xs text-brand-primary flex items-center mt-0.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                Gemini Pro Connected
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-5 space-y-5 custom-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-brand-primary text-white rounded-br-none'
                    : 'bg-[#1a1a1a] text-gray-200 rounded-bl-none border border-white/5'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#1a1a1a] p-4 rounded-2xl rounded-bl-none border border-white/5 flex items-center space-x-1.5">
                <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-[#050505]/50 rounded-b-3xl">
          <div className="relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about products, specs, or support..."
              className="w-full bg-[#141414] border border-white/10 rounded-full py-3.5 px-5 pr-14 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-primary rounded-full text-white disabled:opacity-50 disabled:bg-gray-800 hover:bg-brand-primaryHover transition-all shadow-lg hover:scale-105"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AIChat;