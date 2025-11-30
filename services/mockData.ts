import { Product, BlogPost, Testimonial } from '../types';

// NOTE: Ensure this URL is accessible. Imgur links sometimes expire or block hotlinking.
// For best results, put your 'founder.jpg' in a 'public' folder and set this to "/founder.jpg"
const FOUNDER_IMAGE_URL = "https://i.imgur.com/3ph1gV2.jpeg"; 

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Neural Link Hub (Gen 1)',
    category: 'iot',
    description: 'The central nervous system for your smart ecosystem. Features AI-driven predictive automation and quantum-ready encryption.',
    price: 45000,
    features: ['Neural Processing Unit', 'WiFi 7 Ready', 'Matter Support', 'Self-Healing Mesh'],
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&q=80&w=600',
    status: 'published'
  },
  {
    id: '2',
    name: 'Holographic Control Interface',
    category: 'automation',
    description: 'Control your environment with gestures. Our 3D holographic projection interface replaces traditional switchboards.',
    price: 85000,
    features: ['Gesture Recognition', '8K Projection', 'Voice Command', 'Haptic Feedback'],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
    status: 'published'
  },
  {
    id: '3',
    name: 'Smart Grid Controller',
    category: 'automation',
    description: 'AI-powered energy management that synchronizes with national grid fluctuations to save up to 40% energy.',
    price: 28000,
    features: ['Solar Sync', 'Load Balancing', 'Surge AI Prediction', 'Industrial Grade'],
    imageUrl: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=600',
    status: 'published'
  },
  {
    id: '4',
    name: 'Bio-Secure Access Node',
    category: 'automation',
    description: 'Next-generation security using gait analysis and heartbeat recognition.',
    price: 32000,
    features: ['Non-intrusive Scan', '1ms Response', 'Offline Database', 'Anti-Spoofing'],
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&q=80&w=600',
    status: 'published'
  },
  {
    id: '5',
    name: 'Agri-Tech Sensor Pro 2025',
    category: 'iot',
    description: 'Hyper-local climate monitoring for next-gen farming. Predicts crop diseases before they happen.',
    price: 15000,
    features: ['Soil DNA Analysis', 'Satellite Sync', 'IP68 Waterproof', '10-Year Battery'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
    status: 'published'
  },
  {
    id: '6',
    name: 'Quantum PCB Design',
    category: 'custom',
    description: 'Prototyping service for high-frequency and quantum computing applications.',
    price: 15000,
    features: ['Multi-layer (32+)', 'Cryogenic Rating', 'AI Routing', 'Rapid Fab'],
    imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=600',
    status: 'published'
  }
];

export const SERVICES = [
  {
    title: 'IoT Device Manufacturing',
    desc: 'Custom IoT solutions ranging from sensor nodes to complex control systems. We handle hardware design, firmware, and cloud integration.',
    features: ['Remote Monitoring', 'Data Analytics', 'Cloud Dashboard']
  },
  {
    title: 'WiFi Controlled Systems',
    desc: 'Turn any electrical appliance into a smart device. Our WiFi control boards are reliable and easy to integrate.',
    features: ['App Control', 'Scheduling', 'Voice Support']
  },
  {
    title: 'Custom PCB Design',
    desc: 'Professional PCB layout and manufacturing services. From schematic to Gerber files and final assembly.',
    features: ['Multi-layer', 'Prototyping', 'Mass Production']
  },
  {
    title: 'Embedded Systems',
    desc: 'Firmware development for microcontrollers (AVR, PIC, STM32, ESP32). Efficient and bug-free code.',
    features: ['C/C++', 'RTOS', 'Driver Development']
  },
  {
    title: 'Home & Office Automation',
    desc: 'Complete automation solutions for security, lighting, and climate control.',
    features: ['Smart Locks', 'Lighting', 'HVAC Control']
  },
  {
    title: 'Web & Mobile Apps',
    desc: 'Companion apps for your hardware. We build intuitive interfaces to control your electronic devices.',
    features: ['React Native', 'Dashboarding', 'Real-time Sync']
  },
  {
    title: 'Electronics Consulting',
    desc: 'Expert advice on feasibility, component selection, and cost optimization for your product.',
    features: ['Feasibility Study', 'BOM Optimization', 'Testing']
  },
  {
    title: 'Installation & Maintenance',
    desc: 'We do not just sell products; we install and maintain them to ensure long-term reliability.',
    features: ['On-site Support', 'Warranty', 'Upgrades']
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Welcome to 2025: The Year of Sovereign Tech',
    excerpt: 'Sultan Technologies launches with a mission to make Pakistan a global hub for advanced electronics manufacturing.',
    content: 'Full content here...',
    category: 'Vision',
    date: 'Jan 01, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    status: 'published'
  },
  {
    id: '2',
    title: 'Beyond Smart Homes: The Sentient Environment',
    excerpt: 'Why we are moving away from "control" to "anticipation". Your home should know what you need before you ask.',
    content: 'Full content here...',
    category: 'Innovation',
    date: 'Feb 10, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&q=80&w=800',
    status: 'published'
  },
  {
    id: '3',
    title: 'Local Manufacturing, Global Standard',
    excerpt: 'Our new facility in Wah Cantt is equipped with state-of-the-art SMT lines capable of 0201 component placement.',
    content: 'Full content here...',
    category: 'Manufacturing',
    date: 'Mar 15, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
    status: 'published'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Arshad Malik',
    role: 'Director',
    company: 'Future Sciences Institute',
    content: 'Sultan Technologies is doing what no one else dared to do. Their 2025 product lineup is lightyears ahead of the market.',
    rating: 5
  },
  {
    id: '2',
    name: 'Sarah Ahmed',
    role: 'Interior Architect',
    company: 'Modern Spaces',
    content: 'Finally, home automation that looks as good as it works. The holographic interfaces are a game changer for my clients.',
    rating: 5
  },
  {
    id: '3',
    name: 'Engr. Taimoor',
    role: 'Head of Operations',
    company: 'PakAuto Industries',
    content: 'We integrated their neural sensors in our assembly line. Efficiency jumped 200% in the first week.',
    rating: 5
  }
];

export const FOUNDER_INFO = {
  name: "Muhammad Sultan Ul Arifeen",
  role: "Founder & Visionary",
  bio: "Founded in 2025, Sultan Technologies is the realization of a lifelong dream to bring Silicon Valley caliber innovation to Pakistan. With a focus on AI-integrated electronics, Sultan is leading the charge into the Fourth Industrial Revolution.",
  image: FOUNDER_IMAGE_URL,
  quote: "We don't just predict the future; we build the circuits that power it."
};