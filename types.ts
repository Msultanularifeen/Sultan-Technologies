export interface Product {
  id: string;
  name: string;
  category: 'iot' | 'automation' | 'custom' | 'components';
  description: string;
  price: number;
  features: string[];
  imageUrl: string;
  status: 'published' | 'draft';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  imageUrl: string;
  status: 'published' | 'draft';
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'new' | 'read';
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface FounderInfo {
  name: string;
  role: string;
  bio: string;
  quote: string;
  image: string;
}