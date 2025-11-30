import React from 'react';
import { BLOG_POSTS } from '../services/mockData';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog & Resources</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Insights, tutorials, and news from the world of electronics and IoT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in animation-delay-200">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="flex flex-col bg-bg-secondary rounded-xl overflow-hidden border border-border hover-card-effect h-full">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center text-xs text-text-muted mb-3 space-x-4">
                  <span className="flex items-center"><Tag size={12} className="mr-1" /> {post.category}</span>
                  <span className="flex items-center"><Calendar size={12} className="mr-1" /> {post.date}</span>
                </div>
                <h2 className="text-xl font-bold mb-3 line-clamp-2 hover:text-brand-primary transition-colors cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-text-secondary text-sm mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <a href="#" className="inline-flex items-center text-brand-primary font-medium hover:underline mt-auto">
                  Read More <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
