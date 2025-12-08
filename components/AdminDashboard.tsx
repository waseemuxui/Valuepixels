import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Settings, Search, Plus, BarChart3, Users, Globe, Save, Trash2, Edit, X, CheckSquare, ShoppingBag, DollarSign, ExternalLink, CheckCircle, XCircle, Sparkles, Loader2, Linkedin, Twitter, Github } from 'lucide-react';
import { BlogPost, User, CustomPage, Product, Order, PaymentAccount, SiteConfig, TeamMember } from '../types';
import { storage } from '../services/storage';
import { generateBlogPost } from '../services/geminiService';
import RichTextEditor from './RichTextEditor';

interface AdminDashboardProps {
  user: User;
  posts: BlogPost[];
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  pages: CustomPage[];
  setPages: React.Dispatch<React.SetStateAction<CustomPage[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  teamMembers?: TeamMember[];
  setTeamMembers?: React.Dispatch<React.SetStateAction<TeamMember[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, posts, setPosts, pages, setPages, products, setProducts, teamMembers = [], setTeamMembers = (_: any) => {} }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'pages' | 'shop' | 'payments' | 'team' | 'settings' | 'ai-gen'>('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const [paymentAccounts, setPaymentAccounts] = useState<PaymentAccount[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(storage.getSiteConfig());
  
  // State for Create/Edit Modal
  const [isEditing, setIsEditing] = useState(false);
  const [editType, setEditType] = useState<'post' | 'page' | 'product' | 'payment' | 'team'>('post');
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
  const [currentPage, setCurrentPage] = useState<Partial<CustomPage>>({});
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [currentAccount, setCurrentAccount] = useState<Partial<PaymentAccount>>({});
  const [currentMember, setCurrentMember] = useState<Partial<TeamMember>>({});

  // AI Gen State
  const [aiTopic, setAiTopic] = useState('');
  const [aiCount, setAiCount] = useState(1);
  const [aiTone, setAiTone] = useState('Professional');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);

  useEffect(() => {
      // Load orders, accounts, config from storage on mount/update
      setOrders(storage.getOrders());
      setPaymentAccounts(storage.getPaymentAccounts());
      setSiteConfig(storage.getSiteConfig());
  }, [activeTab]);

  const handleDeletePost = (id: string) => {
    if(window.confirm('Delete this post?')) {
        const newPosts = posts.filter(p => p.id !== id);
        setPosts(newPosts);
        storage.savePosts(newPosts);
    }
  };

  const handleDeletePage = (id: string) => {
    if(window.confirm('Delete this page?')) {
        const newPages = pages.filter(p => p.id !== id);
        setPages(newPages);
        storage.savePages(newPages);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if(window.confirm('Delete this product?')) {
        const newProducts = products.filter(p => p.id !== id);
        setProducts(newProducts);
        storage.saveProducts(newProducts);
    }
  };

  const handleDeleteAccount = (id: string) => {
      if(window.confirm('Remove this payment method?')) {
          const newAccounts = paymentAccounts.filter(p => p.id !== id);
          setPaymentAccounts(newAccounts);
          storage.savePaymentAccounts(newAccounts);
      }
  }

  const handleDeleteMember = (id: string) => {
      if(window.confirm('Remove this team member?')) {
          const newMembers = teamMembers.filter(m => m.id !== id);
          setTeamMembers(newMembers);
          storage.saveTeamMembers(newMembers);
      }
  }

  const handleVerifyOrder = (orderId: string, approved: boolean) => {
      const updatedOrder = orders.find(o => o.id === orderId);
      if (updatedOrder) {
          updatedOrder.status = approved ? 'active' : 'cancelled';
          storage.updateOrder(updatedOrder);
          setOrders([...orders]); // Trigger re-render
      }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
      e.preventDefault();
      storage.saveSiteConfig(siteConfig);
      alert('Site settings saved successfully. Some changes may require a refresh.');
      // Force reload slightly to apply changes in App.tsx
      window.location.reload();
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    let newPosts = [...posts];
    if (currentPost.id) {
        newPosts = posts.map(p => p.id === currentPost.id ? { ...p, ...currentPost } as BlogPost : p);
    } else {
        const newPost: BlogPost = {
            id: Date.now().toString(),
            title: currentPost.title || 'Untitled',
            excerpt: currentPost.excerpt || '',
            content: currentPost.content || '',
            image: currentPost.image || 'https://images.unsplash.com/photo-1499750310159-52f0f834631b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            status: currentPost.status || 'draft',
            views: 0,
            date: new Date().toISOString().split('T')[0],
            author: user.name
        };
        newPosts.push(newPost);
    }
    setPosts(newPosts);
    storage.savePosts(newPosts);
    setIsEditing(false);
  };

  const handleSavePage = (e: React.FormEvent) => {
    e.preventDefault();
    let newPages = [...pages];
    if (currentPage.id) {
        newPages = pages.map(p => p.id === currentPage.id ? { ...p, ...currentPage } as CustomPage : p);
    } else {
        const newPage: CustomPage = {
            id: Date.now().toString(),
            title: currentPage.title || 'Untitled',
            slug: (currentPage.title || '').toLowerCase().replace(/ /g, '-'),
            content: currentPage.content || '',
            status: currentPage.status || 'draft',
            showInHeader: currentPage.showInHeader || false,
            showInFooter: currentPage.showInFooter || false,
            date: new Date().toISOString().split('T')[0]
        };
        newPages.push(newPage);
    }
    setPages(newPages);
    storage.savePages(newPages);
    setIsEditing(false);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    let newProducts = [...products];
    if (currentProduct.id) {
        newProducts = products.map(p => p.id === currentProduct.id ? { ...p, ...currentProduct } as Product : p);
    } else {
        const newProduct: Product = {
            id: Date.now().toString(),
            name: currentProduct.name || 'New Product',
            price: currentProduct.price || '0',
            description: currentProduct.description || '',
            image: currentProduct.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            category: currentProduct.category || 'Assets'
        };
        newProducts.push(newProduct);
    }
    setProducts(newProducts);
    storage.saveProducts(newProducts);
    setIsEditing(false);
  };

  const handleSaveAccount = (e: React.FormEvent) => {
      e.preventDefault();
      let newAccounts = [...paymentAccounts];
      if (currentAccount.id) {
          newAccounts = paymentAccounts.map(a => a.id === currentAccount.id ? { ...a, ...currentAccount } as PaymentAccount : a);
      } else {
          const newAccount: PaymentAccount = {
              id: Date.now().toString(),
              type: currentAccount.type || 'payoneer',
              name: currentAccount.name || 'New Account',
              identifier: currentAccount.identifier || '',
              instructions: currentAccount.instructions || ''
          };
          newAccounts.push(newAccount);
      }
      setPaymentAccounts(newAccounts);
      storage.savePaymentAccounts(newAccounts);
      setIsEditing(false);
  }

  const handleSaveMember = (e: React.FormEvent) => {
      e.preventDefault();
      let newMembers = [...teamMembers];
      if (currentMember.id) {
          newMembers = teamMembers.map(m => m.id === currentMember.id ? { ...m, ...currentMember } as TeamMember : m);
      } else {
          const newMember: TeamMember = {
              id: Date.now().toString(),
              name: currentMember.name || 'New Member',
              role: currentMember.role || 'Role',
              bio: currentMember.bio || '',
              image: currentMember.image || 'https://ui-avatars.com/api/?background=random',
              socials: currentMember.socials || {}
          };
          newMembers.push(newMember);
      }
      setTeamMembers(newMembers);
      storage.saveTeamMembers(newMembers);
      setIsEditing(false);
  }

  const handleBulkGenerate = async () => {
      if(!aiTopic.trim()) {
          alert("Please enter a topic");
          return;
      }
      if(!siteConfig.aiApiKey) {
          alert("Please configure your AI API Key in Settings first.");
          setActiveTab('settings');
          return;
      }

      setAiGenerating(true);
      setAiProgress(0);

      const newPosts: BlogPost[] = [];
      const total = aiCount;

      try {
          for(let i=0; i<total; i++) {
              // Create slight variations in prompt to get unique posts if topic is same
              const variation = i === 0 ? aiTopic : `${aiTopic} part ${i+1}`;
              
              const result = await generateBlogPost(variation, aiTone);
              
              if(result) {
                  const newPost: BlogPost = {
                      id: `ai-${Date.now()}-${i}`,
                      title: result.title,
                      excerpt: result.excerpt,
                      content: result.content,
                      image: `https://source.unsplash.com/random/800x600/?${encodeURIComponent(aiTopic.split(' ')[0])}&sig=${Math.random()}`,
                      status: 'draft',
                      views: 0,
                      date: new Date().toISOString().split('T')[0],
                      author: 'AI Assistant'
                  };
                  newPosts.push(newPost);
              }
              setAiProgress(Math.round(((i + 1) / total) * 100));
          }

          if (newPosts.length > 0) {
              const updatedPosts = [...posts, ...newPosts];
              setPosts(updatedPosts);
              storage.savePosts(updatedPosts);
              alert(`Successfully generated ${newPosts.length} drafts!`);
              setActiveTab('posts');
          } else {
              alert("Failed to generate content. Please check API key and try again.");
          }

      } catch (e) {
          console.error(e);
          alert("Error generating content.");
      } finally {
          setAiGenerating(false);
          setAiProgress(0);
      }
  };

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
      <div className={`p-4 rounded-xl ${color}/10`}>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <h4 className="text-2xl font-bold text-white">{value}</h4>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0 space-y-2">
        <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 mb-6 text-center">
            <div className="w-20 h-20 bg-brand-primary rounded-full mx-auto mb-4 flex items-center justify-center text-brand-dark font-bold text-2xl">
                {user.name.charAt(0)}
            </div>
            <h3 className="text-white font-bold">{user.name}</h3>
            <span className="inline-block px-3 py-1 bg-brand-primary/20 text-brand-primary text-xs font-bold rounded-full mt-2 uppercase">Admin</span>
        </div>

        <nav className="bg-brand-surface border border-white/10 rounded-2xl p-4 space-y-1">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <LayoutDashboard className="w-5 h-5" /> Overview
          </button>
          <button onClick={() => setActiveTab('ai-gen')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'ai-gen' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Sparkles className="w-5 h-5" /> AI Generator
          </button>
          <button onClick={() => setActiveTab('posts')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'posts' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <FileText className="w-5 h-5" /> Blog Posts
          </button>
          <button onClick={() => setActiveTab('pages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'pages' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Globe className="w-5 h-5" /> Custom Pages
          </button>
          <button onClick={() => setActiveTab('shop')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'shop' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <ShoppingBag className="w-5 h-5" /> Shop Manager
          </button>
          <button onClick={() => setActiveTab('team')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'team' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Users className="w-5 h-5" /> Team Members
          </button>
          <button onClick={() => setActiveTab('payments')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'payments' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <DollarSign className="w-5 h-5" /> Payments & Orders
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Settings className="w-5 h-5" /> Site Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Total Orders" value={orders.length} icon={ShoppingBag} color="text-green-400" />
              <StatCard title="Revenue" value={`$${orders.reduce((acc, o) => acc + parseFloat(o.amount.replace('$','')), 0)}`} icon={BarChart3} color="text-brand-primary" />
              <StatCard title="Products" value={products.length} icon={ShoppingBag} color="text-blue-400" />
              <StatCard title="Team" value={teamMembers.length} icon={Users} color="text-purple-400" />
            </div>
            {/* ... Analytics graph ... */}
          </div>
        )}

        {/* TEAM TAB */}
        {activeTab === 'team' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-white">Team Management</h2>
                    <button onClick={() => { setEditType('team'); setCurrentMember({}); setIsEditing(true); }} className="flex items-center gap-2 bg-brand-primary text-brand-dark px-4 py-2 rounded-xl font-bold hover:bg-emerald-400 transition-colors">
                        <Plus className="w-4 h-4" /> Add Member
                    </button>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map(member => (
                        <div key={member.id} className="bg-brand-surface border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:border-brand-primary/30 transition-all">
                            <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full object-cover border-2 border-brand-primary/20 mb-4" />
                            <h3 className="text-xl font-bold text-white">{member.name}</h3>
                            <p className="text-brand-primary text-sm font-bold mb-2">{member.role}</p>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{member.bio}</p>
                            <div className="flex gap-2 mt-auto">
                                <button onClick={() => {setEditType('team'); setCurrentMember(member); setIsEditing(true);}} className="text-brand-primary p-2 hover:bg-white/10 rounded-lg"><Edit className="w-4 h-4"/></button>
                                <button onClick={() => handleDeleteMember(member.id)} className="text-red-500 p-2 hover:bg-white/10 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                            </div>
                        </div>
                    ))}
                 </div>
             </div>
        )}

        {/* ... (Other Tabs from previous implementation) ... */}

        {/* AI GENERATOR TAB */}
        {activeTab === 'ai-gen' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-8 h-8 text-brand-primary" /> Bulk AI Content Generator
                </h2>
                <div className="bg-brand-surface border border-white/10 rounded-2xl p-8 max-w-2xl">
                     {/* ... AI Gen UI ... */}
                     <div className="space-y-6">
                        <div>
                            <label className="text-sm font-bold text-gray-300 block mb-2">Topic / Niche</label>
                            <input type="text" className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3 focus:border-brand-primary outline-none" placeholder="e.g. Future of Web Development" value={aiTopic} onChange={e => setAiTopic(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-bold text-gray-300 block mb-2">Number of Posts</label>
                                <input type="number" min="1" max="10" className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3 focus:border-brand-primary outline-none" value={aiCount} onChange={e => setAiCount(parseInt(e.target.value))} />
                            </div>
                            <div>
                                <label className="text-sm font-bold text-gray-300 block mb-2">Tone</label>
                                <select className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3 focus:border-brand-primary outline-none" value={aiTone} onChange={e => setAiTone(e.target.value)}>
                                    <option>Professional</option><option>Casual</option><option>Technical</option><option>Persuasive</option><option>Humorous</option>
                                </select>
                            </div>
                        </div>
                        {aiGenerating && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-brand-primary font-bold uppercase"><span>Generating...</span><span>{aiProgress}%</span></div>
                                <div className="h-2 bg-brand-dark rounded-full overflow-hidden"><div className="h-full bg-brand-primary transition-all duration-300" style={{ width: `${aiProgress}%` }}></div></div>
                            </div>
                        )}
                        <button onClick={handleBulkGenerate} disabled={aiGenerating} className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-brand-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            {aiGenerating ? <Loader2 className="w-5 h-5 animate-spin"/> : <Sparkles className="w-5 h-5" />}
                            {aiGenerating ? 'Creating Content...' : 'Generate Bulk Content'}
                        </button>
                    </div>
                </div>
             </div>
        )}

        {/* SITE SETTINGS TAB */}
        {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-bold text-white">Site Settings</h2>
                <div className="bg-brand-surface border border-white/10 rounded-2xl p-8">
                    <form onSubmit={handleSaveConfig} className="space-y-8">
                        {/* AI Config */}
                        <div className="p-6 bg-brand-primary/5 rounded-2xl border border-brand-primary/20">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-brand-primary" /> AI Configuration</h3>
                             <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Gemini API Key</label><input type="password" value={siteConfig.aiApiKey || ''} onChange={e => setSiteConfig({...siteConfig, aiApiKey: e.target.value})} className="w-full bg-brand-dark border border-white/10 text-white rounded-xl pl-4 pr-4 py-3" placeholder="AIzaSy..." /></div>
                        </div>
                        {/* General */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-brand-primary" /> General Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Site Name</label><input type="text" value={siteConfig.siteName} onChange={e => setSiteConfig({...siteConfig, siteName: e.target.value})} className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3" /></div>
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Tagline / Description</label><input type="text" value={siteConfig.siteDescription} onChange={e => setSiteConfig({...siteConfig, siteDescription: e.target.value})} className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3" /></div>
                            </div>
                        </div>
                        {/* Contact Info */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-brand-secondary" /> Contact Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Contact Email</label><input type="email" value={siteConfig.contactEmail} onChange={e => setSiteConfig({...siteConfig, contactEmail: e.target.value})} className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3" /></div>
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Phone Number</label><input type="text" value={siteConfig.contactPhone} onChange={e => setSiteConfig({...siteConfig, contactPhone: e.target.value})} className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3" /></div>
                                <div className="space-y-2 md:col-span-2"><label className="text-sm font-bold text-gray-300">Address</label><input type="text" value={siteConfig.address} onChange={e => setSiteConfig({...siteConfig, address: e.target.value})} className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3" /></div>
                            </div>
                        </div>
                        {/* SEO */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Search className="w-5 h-5 text-brand-accent" /> SEO Configuration</h3>
                            <div className="space-y-4">
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Meta Title</label><input type="text" value={siteConfig.seoTitle} onChange={e => setSiteConfig({...siteConfig, seoTitle: e.target.value})} className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3" /></div>
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Meta Keywords</label><input type="text" value={siteConfig.seoKeywords} onChange={e => setSiteConfig({...siteConfig, seoKeywords: e.target.value})} className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3" /></div>
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Meta Description</label><textarea rows={3} value={siteConfig.seoDescription} onChange={e => setSiteConfig({...siteConfig, seoDescription: e.target.value})} className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3" /></div>
                            </div>
                        </div>
                        <button type="submit" className="bg-brand-primary text-brand-dark px-8 py-4 rounded-xl font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-brand-primary/20 flex items-center gap-2"><Save className="w-5 h-5" /> Save Configuration</button>
                    </form>
                </div>
            </div>
        )}

        {/* PAYMENTS & ORDERS TAB */}
        {activeTab === 'payments' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center"><h2 className="text-3xl font-bold text-white">Payments & Verification</h2></div>
                {/* 1. Payment Accounts */}
                <div className="bg-brand-surface border border-white/10 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold text-white">Payment Methods</h3><button onClick={() => { setEditType('payment'); setCurrentAccount({}); setIsEditing(true); }} className="text-sm bg-brand-primary text-brand-dark px-3 py-2 rounded-lg font-bold hover:bg-emerald-400">+ Add Method</button></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paymentAccounts.map(account => (
                            <div key={account.id} className="bg-brand-dark border border-white/5 p-4 rounded-xl flex justify-between items-start">
                                <div><h4 className="font-bold text-white flex items-center gap-2"><span className="uppercase text-xs bg-white/10 px-2 py-0.5 rounded text-gray-300">{account.type}</span>{account.name}</h4><p className="text-gray-400 text-sm mt-1">{account.identifier}</p></div>
                                <div className="flex gap-2"><button onClick={() => { setEditType('payment'); setCurrentAccount(account); setIsEditing(true); }} className="p-1 text-brand-primary hover:bg-white/10 rounded"><Edit className="w-4 h-4" /></button><button onClick={() => handleDeleteAccount(account.id)} className="p-1 text-red-500 hover:bg-white/10 rounded"><Trash2 className="w-4 h-4" /></button></div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* 2. Order Verification */}
                <div className="bg-brand-surface border border-white/10 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-white/10"><h3 className="text-xl font-bold text-white">Orders Pending Verification</h3></div>
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-sm uppercase"><tr><th className="p-4">Order ID</th><th className="p-4">Customer</th><th className="p-4">Amount</th><th className="p-4">Proof</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
                        <tbody className="divide-y divide-white/5">
                            {orders.filter(o => o.status === 'pending_verification').map(order => (
                                <tr key={order.id} className="hover:bg-white/5">
                                    <td className="p-4 text-white font-mono">{order.id}</td>
                                    <td className="p-4"><div className="text-white font-bold">{order.userName}</div><div className="text-xs text-gray-400">{order.userEmail}</div></td>
                                    <td className="p-4 text-brand-primary font-bold">{order.amount}</td>
                                    <td className="p-4">{order.proofOfPayment ? (<a href={order.proofOfPayment} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-brand-secondary hover:underline text-sm">View Proof <ExternalLink className="w-3 h-3" /></a>) : <span className="text-gray-500 text-xs">No proof uploaded</span>}</td>
                                    <td className="p-4"><span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-bold">Pending</span></td>
                                    <td className="p-4"><div className="flex gap-2"><button onClick={() => handleVerifyOrder(order.id, true)} className="flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1.5 rounded-lg hover:bg-green-500/30 font-bold text-xs"><CheckCircle className="w-3 h-3" /> Approve</button><button onClick={() => handleVerifyOrder(order.id, false)} className="flex items-center gap-1 bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/30 font-bold text-xs"><XCircle className="w-3 h-3" /> Reject</button></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* POSTS TAB */}
        {activeTab === 'posts' && (
           <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-between items-center"><h2 className="text-3xl font-bold text-white">Blog Management</h2><button onClick={() => { setEditType('post'); setCurrentPost({}); setIsEditing(true); }} className="flex items-center gap-2 bg-brand-primary text-brand-dark px-4 py-2 rounded-xl font-bold hover:bg-emerald-400 transition-colors"><Plus className="w-4 h-4" /> Create Post</button></div>
             <div className="bg-brand-surface border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 text-sm uppercase"><tr><th className="p-4">Title</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
                    <tbody className="divide-y divide-white/5">
                        {posts.map(post => (
                            <tr key={post.id}><td className="p-4 text-white">{post.title}</td><td className="p-4"><span className="text-xs font-bold text-brand-primary bg-brand-primary/10 px-2 py-1 rounded">{post.status}</span></td><td className="p-4 flex gap-2"><button onClick={() => {setEditType('post'); setCurrentPost(post); setIsEditing(true);}} className="text-brand-primary p-1 hover:bg-white/10 rounded"><Edit className="w-4 h-4"/></button><button onClick={() => handleDeletePost(post.id)} className="text-red-500 p-1 hover:bg-white/10 rounded"><Trash2 className="w-4 h-4"/></button></td></tr>
                        ))}
                    </tbody>
                </table>
             </div>
           </div>
        )}
        
        {/* PAGES TAB */}
        {activeTab === 'pages' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center"><h2 className="text-3xl font-bold text-white">Custom Pages</h2><button onClick={() => { setEditType('page'); setCurrentPage({}); setIsEditing(true); }} className="flex items-center gap-2 bg-brand-primary text-brand-dark px-4 py-2 rounded-xl font-bold hover:bg-emerald-400 transition-colors"><Plus className="w-4 h-4" /> Create Page</button></div>
                 <div className="bg-brand-surface border border-white/10 rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-sm uppercase"><tr><th className="p-4">Title</th><th className="p-4">Slug</th><th className="p-4">Actions</th></tr></thead>
                        <tbody className="divide-y divide-white/5">
                            {pages.map(page => (
                                <tr key={page.id}><td className="p-4 text-white">{page.title}</td><td className="p-4 text-gray-400">/{page.slug}</td><td className="p-4 flex gap-2"><button onClick={() => {setEditType('page'); setCurrentPage(page); setIsEditing(true);}} className="text-brand-primary p-1 hover:bg-white/10 rounded"><Edit className="w-4 h-4"/></button><button onClick={() => handleDeletePage(page.id)} className="text-red-500 p-1 hover:bg-white/10 rounded"><Trash2 className="w-4 h-4"/></button></td></tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>
        )}

        {/* SHOP TAB */}
        {activeTab === 'shop' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center"><h2 className="text-3xl font-bold text-white">Products</h2><button onClick={() => { setEditType('product'); setCurrentProduct({}); setIsEditing(true); }} className="flex items-center gap-2 bg-brand-primary text-brand-dark px-4 py-2 rounded-xl font-bold hover:bg-emerald-400 transition-colors"><Plus className="w-4 h-4" /> Add Product</button></div>
                 <div className="bg-brand-surface border border-white/10 rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-sm uppercase"><tr><th className="p-4">Name</th><th className="p-4">Price</th><th className="p-4">Actions</th></tr></thead>
                        <tbody className="divide-y divide-white/5">
                            {products.map(p => (
                                <tr key={p.id}><td className="p-4 text-white">{p.name}</td><td className="p-4 text-white font-bold">${p.price}</td><td className="p-4 flex gap-2"><button onClick={() => {setEditType('product'); setCurrentProduct(p); setIsEditing(true);}} className="text-brand-primary p-1 hover:bg-white/10 rounded"><Edit className="w-4 h-4"/></button><button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 p-1 hover:bg-white/10 rounded"><Trash2 className="w-4 h-4"/></button></td></tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
             </div>
        )}

      </div>

      {/* CREATE/EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsEditing(false)}></div>
            <div className="relative w-full max-w-4xl bg-brand-surface border border-white/10 rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white capitalize">{currentAccount.id || currentPost.id || currentPage.id || currentProduct.id || currentMember.id ? 'Edit ' : 'Add New '} {editType}</h2>
                    <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
                </div>

                <form onSubmit={editType === 'post' ? handleSavePost : editType === 'page' ? handleSavePage : editType === 'payment' ? handleSaveAccount : editType === 'team' ? handleSaveMember : handleSaveProduct} className="space-y-6">
                    
                    {/* TEAM FORM */}
                    {editType === 'team' && (
                        <>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Name</label><input type="text" required value={currentMember.name || ''} onChange={e => setCurrentMember({...currentMember, name: e.target.value})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3" /></div>
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Role</label><input type="text" required value={currentMember.role || ''} onChange={e => setCurrentMember({...currentMember, role: e.target.value})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3" /></div>
                             </div>
                             <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Bio</label><textarea rows={3} value={currentMember.bio || ''} onChange={e => setCurrentMember({...currentMember, bio: e.target.value})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3" /></div>
                             <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Image URL</label><input type="text" value={currentMember.image || ''} onChange={e => setCurrentMember({...currentMember, image: e.target.value})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3" placeholder="https://..." /></div>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Twitter URL</label><input type="text" value={currentMember.socials?.twitter || ''} onChange={e => setCurrentMember({...currentMember, socials: {...currentMember.socials, twitter: e.target.value}})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3" /></div>
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">LinkedIn URL</label><input type="text" value={currentMember.socials?.linkedin || ''} onChange={e => setCurrentMember({...currentMember, socials: {...currentMember.socials, linkedin: e.target.value}})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3" /></div>
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">GitHub URL</label><input type="text" value={currentMember.socials?.github || ''} onChange={e => setCurrentMember({...currentMember, socials: {...currentMember.socials, github: e.target.value}})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3" /></div>
                             </div>
                        </>
                    )}

                    {/* PAYMENT FORM */}
                    {editType === 'payment' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Account Type</label><select value={currentAccount.type || 'payoneer'} onChange={e => setCurrentAccount({...currentAccount, type: e.target.value as any})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3"><option value="payoneer">Payoneer</option><option value="paypal">PayPal</option><option value="bank">Bank Transfer</option></select></div>
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Display Name</label><input type="text" value={currentAccount.name || ''} onChange={e => setCurrentAccount({...currentAccount, name: e.target.value})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3" placeholder="e.g. Corporate Payoneer" /></div>
                            </div>
                            <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Identifier (Email/ID/IBAN)</label><input type="text" value={currentAccount.identifier || ''} onChange={e => setCurrentAccount({...currentAccount, identifier: e.target.value})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3" placeholder="e.g. admin@sitefix.com" /></div>
                            <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Instructions</label><textarea value={currentAccount.instructions || ''} onChange={e => setCurrentAccount({...currentAccount, instructions: e.target.value})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3" placeholder="e.g. Please include Order ID in description." /></div>
                        </div>
                    )}

                    {/* POST FORM */}
                    {editType === 'post' && (
                         <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Post Title</label><input type="text" required value={currentPost.title || ''} onChange={e => setCurrentPost({...currentPost, title: e.target.value})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none" /></div>
                                 <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Status</label><select value={currentPost.status || 'draft'} onChange={e => setCurrentPost({...currentPost, status: e.target.value as any})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none"><option value="draft">Draft</option><option value="published">Published</option></select></div>
                            </div>
                            <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Image URL</label><input type="text" value={currentPost.image || ''} onChange={e => setCurrentPost({...currentPost, image: e.target.value})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3" placeholder="https://..." /></div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Content</label>
                                <RichTextEditor value={currentPost.content || ''} onChange={(val) => setCurrentPost({...currentPost, content: val})} />
                            </div>
                        </>
                    )}

                    {/* PAGE FORM */}
                    {editType === 'page' && (
                        <>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Page Title</label><input type="text" required value={currentPage.title || ''} onChange={e => setCurrentPage({...currentPage, title: e.target.value})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none" /></div>
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Status</label><select value={currentPage.status || 'draft'} onChange={e => setCurrentPage({...currentPage, status: e.target.value as any})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none"><option value="draft">Draft</option><option value="published">Published</option></select></div>
                            </div>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white"><input type="checkbox" checked={currentPage.showInHeader || false} onChange={e => setCurrentPage({...currentPage, showInHeader: e.target.checked})} className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-brand-primary focus:ring-brand-primary" /> Show in Header Menu</label>
                                <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white"><input type="checkbox" checked={currentPage.showInFooter || false} onChange={e => setCurrentPage({...currentPage, showInFooter: e.target.checked})} className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-brand-primary focus:ring-brand-primary" /> Show in Footer Menu</label>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Page Content</label>
                                <RichTextEditor value={currentPage.content || ''} onChange={(val) => setCurrentPage({...currentPage, content: val})} rows={16} />
                            </div>
                        </>
                    )}

                    {/* PRODUCT FORM */}
                    {editType === 'product' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Product Name</label><input type="text" required value={currentProduct.name || ''} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none" /></div>
                                <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Category</label><input type="text" required value={currentProduct.category || ''} onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none" /></div>
                            </div>
                            <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Price ($)</label><input type="number" required value={currentProduct.price || ''} onChange={e => setCurrentProduct({...currentProduct, price: e.target.value})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none" /></div>
                            <div className="space-y-2"><label className="text-sm font-bold text-gray-300">Description</label><textarea rows={4} value={currentProduct.description || ''} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})} className="w-full bg-brand-dark/50 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none" /></div>
                        </>
                    )}

                    <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
                        <button type="submit" className="bg-brand-primary text-brand-dark px-8 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-brand-primary/20">Save</button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;