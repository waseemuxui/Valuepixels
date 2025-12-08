
import React from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { BlogPost } from '../types';
import { TEXT_CONTENT, Language } from '../constants';

interface BlogPageProps {
  posts: BlogPost[];
  onNavigate: (view: string) => void;
  viewPostId?: string;
  lang?: Language;
}

const BlogPage: React.FC<BlogPageProps> = ({ posts, onNavigate, viewPostId, lang = 'EN' }) => {
  const publishedPosts = posts.filter(p => p.status === 'published');
  
  // @ts-ignore
  const t = TEXT_CONTENT[lang].blog || TEXT_CONTENT['EN'].blog;

  // Single Post View
  if (viewPostId) {
    const post = publishedPosts.find(p => p.id === viewPostId);
    if (!post) return <div className="pt-32 text-center text-white">Post not found</div>;

    return (
      <div className="pt-24 pb-20 bg-brand-dark min-h-screen">
        {/* Post Hero */}
        <div className="relative h-96 w-full overflow-hidden">
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                 <button 
                    onClick={() => onNavigate('blog')}
                    className="mb-6 text-brand-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-widest gap-2 flex items-center"
                >
                    ← {t.back}
                </button>
                <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight mb-4">{post.title}</h1>
                <div className="flex items-center gap-6 text-gray-300 text-sm">
                    <span className="flex items-center gap-2"><User className="w-4 h-4" /> {post.author}</span>
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="prose prose-invert prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </div>
      </div>
    );
  }

  // Blog Feed View
  return (
    <div className="pt-24 pb-20 bg-brand-dark min-h-screen">
      <div className="bg-brand-surface border-b border-white/5 py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.title}</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {t.subtitle}
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedPosts.map(post => (
                <div key={post.id} className="group bg-brand-surface border border-white/10 rounded-3xl overflow-hidden hover:border-brand-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="h-48 overflow-hidden relative">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                    </div>
                    <div className="p-8">
                        <div className="flex items-center gap-4 text-xs text-brand-primary font-bold uppercase tracking-wider mb-4">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.author}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-brand-primary transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                            {post.excerpt}
                        </p>
                        <button 
                            onClick={() => onNavigate(`blog/${post.id}`)}
                            className="flex items-center gap-2 text-white font-bold hover:gap-3 transition-all"
                        >
                            {t.readMore} <ArrowRight className="w-4 h-4 text-brand-primary" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
        
        {publishedPosts.length === 0 && (
            <div className="text-center py-20 text-gray-500">
                <p>{t.noPosts}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
