import React, { useState, useEffect } from 'react';
import { api } from '../services/firebase';
import { BlogPost } from '../types';
import { Calendar, Tag, ArrowRight, Loader, ChevronDown, ChevronUp, Share2 } from 'lucide-react';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await api.blog.getAll();
        setPosts(data);
      } catch (error) {
        console.error("Failed to load blog", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDiscuss = (title: string) => {
    const message = `Hello Sultan Technologies, I read your blog post "${title}" and would like to discuss it further.`;
    window.open(`https://wa.me/923026082703?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-bg-primary">
         <Loader className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

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
          {posts.map((post) => {
            const isExpanded = expandedId === post.id;
            
            return (
              <article key={post.id} className={`flex flex-col bg-bg-secondary rounded-xl overflow-hidden border border-border transition-all duration-500 hover-card-effect ${isExpanded ? 'h-auto' : 'h-fit'}`}>
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
                  <h2 className="text-xl font-bold mb-3 line-clamp-2 hover:text-brand-primary transition-colors cursor-pointer" onClick={() => toggleExpand(post.id)}>
                    {post.title}
                  </h2>
                  <div className={`text-text-secondary text-sm mb-4 flex-grow transition-all duration-500 ${isExpanded ? '' : 'line-clamp-3'}`}>
                    {isExpanded ? post.content : post.excerpt}
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                    <button 
                      onClick={() => toggleExpand(post.id)}
                      className="inline-flex items-center text-brand-primary font-medium hover:underline text-sm"
                    >
                      {isExpanded ? (
                        <>Show Less <ChevronUp size={16} className="ml-1" /></>
                      ) : (
                        <>Read More <ChevronDown size={16} className="ml-1" /></>
                      )}
                    </button>
                    
                    <button 
                      onClick={() => handleDiscuss(post.title)}
                      className="inline-flex items-center text-green-500 hover:text-green-400 font-medium text-xs border border-green-500/30 px-3 py-1.5 rounded-full hover:bg-green-500/10 transition-colors"
                    >
                      <Share2 size={12} className="mr-1.5" /> Discuss on WhatsApp
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-20 text-text-muted">
            No blog posts published yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;