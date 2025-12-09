
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Settings, Search, Plus, BarChart3, Users, Globe, Save, Trash2, Edit, X, CheckSquare, ShoppingBag, DollarSign, ExternalLink, CheckCircle, XCircle, Sparkles, Loader2, Linkedin, Twitter, Github, Shield, Eye } from 'lucide-react';
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

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, posts, setPosts, pages, setPages, products, setProducts, teamMembers = [], setTeamMembers = (_: any) => {} }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'pages' | 'shop' | 'payments' | 'team' | 'users' | 'settings' | 'ai-gen'>('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
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

  // Proof Viewer State
  const [viewingProof, setViewingProof] = useState<string | null>(null);

  // AI Gen State
  const [aiTopic, setAiTopic] = useState('');
  const [aiCount, setAiCount] = useState(1);
  const [aiTone, setAiTone] = useState('Professional');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);

  useEffect(() => {
      // Load orders, accounts, config, users from storage on mount/update
      setOrders(storage.getOrders());
      setPaymentAccounts(storage.getPaymentAccounts());
      setSiteConfig(storage.getSiteConfig());
      setUsers(storage.getUsers());
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

  const handleRoleChange = (userId: string, newRole: string) => {
      if (userId === user.id) {
          alert("You cannot change your own role.");
          return;
      }
      
      const updatedUsers = users.map(u => {
          if (u.id === userId) {
              return { ...u, role: newRole as 'admin' | 'user' };
          }
          return u;
      });
      
      setUsers(updatedUsers);
      storage.saveUsers(updatedUsers);
  };

  const handleVerifyOrder = (orderId: string, approved: boolean) => {
      const updatedOrder = orders.find(o => o.id === orderId);
      if (updatedOrder) {
          updatedOrder.status = approved ? 'active' : 'cancelled';
          storage.updateOrder(updatedOrder);
          // Force refresh orders from storage to ensure we have the latest state
          setOrders(storage.getOrders());
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

  const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => (
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
       <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-brand-surface border border-white/10 rounded-2xl p-4 sticky top-24">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <BarChart3 className="w-5 h-5" /> Overview
          </button>
          <button onClick={() => setActiveTab('posts')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'posts' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <FileText className="w-5 h-5" /> Blog Posts
          </button>
          <button onClick={() => setActiveTab('pages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'pages' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <LayoutDashboard className="w-5 h-5" /> Pages
          </button>
          <button onClick={() => setActiveTab('shop')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'shop' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <ShoppingBag className="w-5 h-5" /> Shop
          </button>
          <button onClick={() => setActiveTab('payments')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'payments' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <DollarSign className="w-5 h-5" /> Payments
          </button>
          <button onClick={() => setActiveTab('team')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'team' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Users className="w-5 h-5" /> Team
          </button>
          <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'users' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Users className="w-5 h-5" /> Users
          </button>
          <button onClick={() => setActiveTab('ai-gen')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'ai-gen' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Sparkles className="w-5 h-5" /> AI Generator
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Settings className="w-5 h-5" /> Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Orders" value={orders.length} icon={ShoppingBag} color="text-blue-500" />
              <StatCard title="Active Products" value={products.length} icon={CheckSquare} color="text-green-500" />
              <StatCard title="Blog Posts" value={posts.length} icon={FileText} color="text-purple-500" />
              <StatCard title="Total Users" value={users.length} icon={Users} color="text-orange-500" />
            </div>

            <div className="bg-brand-surface border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Recent Orders</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-white/5">
                            <tr>
                                <th className="px-4 py-3 rounded-l-lg">Order ID</th>
                                <th className="px-4 py-3">User</th>
                                <th className="px-4 py-3">Service</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3 rounded-r-lg">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {orders.slice(0, 5).map(order => (
                                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-4 font-mono text-sm">{order.id}</td>
                                    <td className="px-4 py-4 text-sm">{order.userName}</td>
                                    <td className="px-4 py-4 text-sm">{order.service}</td>
                                    <td className="px-4 py-4 text-sm">{order.amount}</td>
                                    <td className="px-4 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold capitalize ${
                                            order.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                            order.status === 'pending_verification' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-gray-500/20 text-gray-400'
                                        }`}>{order.status.replace('_', ' ')}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        )}

        {/* PAYMENTS */}
        {activeTab === 'payments' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-white">Payment & Orders</h2>
                    <button onClick={() => { setEditType('payment'); setIsEditing(true); setCurrentAccount({}); }} className="flex items-center gap-2 bg-brand-primary text-brand-dark px-4 py-2 rounded-lg font-bold">
                        <Plus className="w-4 h-4" /> Add Method
                    </button>
                </div>

                {/* Verification Queue */}
                <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 mb-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-brand-secondary" /> Verification Queue
                    </h3>
                    <div className="space-y-4">
                        {orders.filter(o => o.status === 'pending_verification').map(order => (
                            <div key={order.id} className="bg-brand-dark p-4 rounded-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div>
                                    <p className="text-white font-bold">{order.id} - {order.service}</p>
                                    <p className="text-sm text-gray-400">{order.userName} paid {order.amount}</p>
                                    <p className="text-xs font-mono text-brand-primary mt-1">TXN: {order.transactionId}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {order.proofOfPayment && (
                                        <button 
                                            onClick={() => setViewingProof(order.proofOfPayment!)}
                                            className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-sm text-gray-300 flex items-center gap-2"
                                        >
                                            <Eye className="w-4 h-4" /> View Proof
                                        </button>
                                    )}
                                    <button onClick={() => handleVerifyOrder(order.id, true)} className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30"><CheckCircle className="w-5 h-5" /></button>
                                    <button onClick={() => handleVerifyOrder(order.id, false)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"><XCircle className="w-5 h-5" /></button>
                                </div>
                            </div>
                        ))}
                        {orders.filter(o => o.status === 'pending_verification').length === 0 && <p className="text-gray-500">No orders pending verification.</p>}
                    </div>
                </div>

                {/* Payment Accounts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentAccounts.map(account => (
                        <div key={account.id} className="bg-brand-surface border border-white/10 rounded-xl p-6 relative group">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => { setEditType('payment'); setCurrentAccount(account); setIsEditing(true); }} className="p-1.5 bg-white/10 rounded hover:bg-white/20"><Edit className="w-4 h-4 text-white" /></button>
                                <button onClick={() => handleDeleteAccount(account.id)} className="p-1.5 bg-red-500/10 rounded hover:bg-red-500/20"><Trash2 className="w-4 h-4 text-red-400" /></button>
                            </div>
                            <h4 className="font-bold text-white text-lg capitalize">{account.name}</h4>
                            <span className="text-xs bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded uppercase">{account.type}</span>
                            <p className="text-gray-400 text-sm mt-2">{account.identifier}</p>
                            <p className="text-gray-500 text-xs mt-2">{account.instructions}</p>
                        </div>
                    ))}
                </div>
             </div>
        )}

        {/* TEAM */}
        {activeTab === 'team' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-white">Team Management</h2>
                    <button onClick={() => { setEditType('team'); setIsEditing(true); setCurrentMember({}); }} className="flex items-center gap-2 bg-brand-primary text-brand-dark px-4 py-2 rounded-lg font-bold">
                        <Plus className="w-4 h-4" /> Add Member
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {teamMembers.map(member => (
                        <div key={member.id} className="bg-brand-surface border border-white/10 rounded-2xl p-6 relative group">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button onClick={() => { setEditType('team'); setCurrentMember(member); setIsEditing(true); }} className="p-1.5 bg-black/50 rounded hover:bg-black/70"><Edit className="w-4 h-4 text-white" /></button>
                                <button onClick={() => handleDeleteMember(member.id)} className="p-1.5 bg-red-500/80 rounded hover:bg-red-600"><Trash2 className="w-4 h-4 text-white" /></button>
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
                                <div>
                                    <h3 className="font-bold text-white">{member.name}</h3>
                                    <p className="text-brand-primary text-sm">{member.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">{member.bio}</p>
                        </div>
                    ))}
                </div>
             </div>
        )}
        
        {/* USERS */}
        {activeTab === 'users' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-3xl font-bold text-white">User Management</h2>
                <div className="bg-brand-surface border border-white/10 rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full" />
                                            <span className="text-white font-medium">{u.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-sm">{u.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select 
                                            value={u.role} 
                                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                            className="bg-black/20 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none focus:border-brand-primary"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-3xl font-bold text-white">Site Settings</h2>
                
                <form onSubmit={handleSaveConfig} className="space-y-8">
                    {/* General */}
                    <div className="bg-brand-surface border border-white/10 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-2">General Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Site Name</label>
                                <input type="text" value={siteConfig.siteName} onChange={e => setSiteConfig({...siteConfig, siteName: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Contact Email</label>
                                <input type="email" value={siteConfig.contactEmail} onChange={e => setSiteConfig({...siteConfig, contactEmail: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" />
                            </div>
                             <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Contact Phone</label>
                                <input type="text" value={siteConfig.contactPhone} onChange={e => setSiteConfig({...siteConfig, contactPhone: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Address</label>
                                <input type="text" value={siteConfig.address} onChange={e => setSiteConfig({...siteConfig, address: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* SEO */}
                    <div className="bg-brand-surface border border-white/10 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-2">SEO Configuration</h3>
                         <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Meta Title</label>
                                <input type="text" value={siteConfig.seoTitle} onChange={e => setSiteConfig({...siteConfig, seoTitle: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Meta Description</label>
                                <textarea rows={3} value={siteConfig.seoDescription} onChange={e => setSiteConfig({...siteConfig, seoDescription: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" />
                            </div>
                         </div>
                    </div>

                    {/* AI Key */}
                    <div className="bg-brand-surface border border-white/10 rounded-2xl p-6">
                         <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-2">Integrations</h3>
                         <div className="space-y-2">
                             <label className="text-sm font-bold text-gray-300">Gemini AI API Key</label>
                             <div className="flex gap-2">
                                 <input type="password" value={siteConfig.aiApiKey || ''} onChange={e => setSiteConfig({...siteConfig, aiApiKey: e.target.value})} placeholder="sk-..." className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" />
                             </div>
                             <p className="text-xs text-gray-500">Required for AI Consultant and Content Generator features.</p>
                         </div>
                    </div>

                    <button type="submit" className="bg-brand-primary text-brand-dark px-8 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-colors">
                        Save Changes
                    </button>
                </form>
            </div>
        )}

        {/* AI GENERATOR */}
        {activeTab === 'ai-gen' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-8 h-8 text-brand-secondary" /> AI Content Generator
                </h2>
                
                <div className="bg-brand-surface border border-white/10 rounded-2xl p-8 max-w-2xl">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-300">Topic / Keyword</label>
                            <input type="text" value={aiTopic} onChange={e => setAiTopic(e.target.value)} placeholder="e.g. The Future of Web Design" className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Number of Posts</label>
                                <select value={aiCount} onChange={e => setAiCount(parseInt(e.target.value))} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white">
                                    {[1,3,5,10].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Tone</label>
                                <select value={aiTone} onChange={e => setAiTone(e.target.value)} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white">
                                    <option>Professional</option>
                                    <option>Casual</option>
                                    <option>Enthusiastic</option>
                                    <option>Technical</option>
                                </select>
                            </div>
                        </div>

                        {aiGenerating && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>Generating...</span>
                                    <span>{aiProgress}%</span>
                                </div>
                                <div className="w-full bg-brand-dark rounded-full h-2 overflow-hidden">
                                    <div className="bg-brand-secondary h-full transition-all duration-300" style={{width: `${aiProgress}%`}}></div>
                                </div>
                            </div>
                        )}

                        <button 
                            onClick={handleBulkGenerate} 
                            disabled={aiGenerating}
                            className="w-full bg-gradient-to-r from-brand-secondary to-purple-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {aiGenerating ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Generate Content'}
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* --- MODAL FOR CREATE/EDIT --- */}
        {isEditing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsEditing(false)}></div>
                <div className="relative bg-brand-surface border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl animate-in zoom-in-95">
                    <button onClick={() => setIsEditing(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
                    
                    <h2 className="text-2xl font-bold text-white mb-6 capitalize">
                        {currentPost.id || currentPage.id || currentProduct.id || currentAccount.id || currentMember.id ? 'Edit' : 'Create'} {editType}
                    </h2>

                    {editType === 'post' && (
                        <form onSubmit={handleSavePost} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Title</label>
                                <input type="text" value={currentPost.title || ''} onChange={e => setCurrentPost({...currentPost, title: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Image URL</label>
                                <input type="text" value={currentPost.image || ''} onChange={e => setCurrentPost({...currentPost, image: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Content</label>
                                <RichTextEditor value={currentPost.content || ''} onChange={val => setCurrentPost({...currentPost, content: val})} />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5">Cancel</button>
                                <button type="submit" className="px-6 py-2 rounded-xl bg-brand-primary text-brand-dark font-bold hover:bg-emerald-400">Save Post</button>
                            </div>
                        </form>
                    )}
                    
                    {editType === 'team' && (
                        <form onSubmit={handleSaveMember} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300">Name</label>
                                    <input type="text" value={currentMember.name || ''} onChange={e => setCurrentMember({...currentMember, name: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300">Role</label>
                                    <input type="text" value={currentMember.role || ''} onChange={e => setCurrentMember({...currentMember, role: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Profile Image URL</label>
                                <input type="text" value={currentMember.image || ''} onChange={e => setCurrentMember({...currentMember, image: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Bio</label>
                                <textarea rows={3} value={currentMember.bio || ''} onChange={e => setCurrentMember({...currentMember, bio: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Social Links</label>
                                <div className="grid grid-cols-3 gap-4">
                                    <input placeholder="LinkedIn URL" value={currentMember.socials?.linkedin || ''} onChange={e => setCurrentMember({...currentMember, socials: {...currentMember.socials, linkedin: e.target.value}})} className="bg-brand-dark border border-white/10 rounded-xl px-4 py-2 text-white text-sm" />
                                    <input placeholder="Twitter URL" value={currentMember.socials?.twitter || ''} onChange={e => setCurrentMember({...currentMember, socials: {...currentMember.socials, twitter: e.target.value}})} className="bg-brand-dark border border-white/10 rounded-xl px-4 py-2 text-white text-sm" />
                                    <input placeholder="Github URL" value={currentMember.socials?.github || ''} onChange={e => setCurrentMember({...currentMember, socials: {...currentMember.socials, github: e.target.value}})} className="bg-brand-dark border border-white/10 rounded-xl px-4 py-2 text-white text-sm" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5">Cancel</button>
                                <button type="submit" className="px-6 py-2 rounded-xl bg-brand-primary text-brand-dark font-bold hover:bg-emerald-400">Save Member</button>
                            </div>
                        </form>
                    )}

                    {editType === 'payment' && (
                        <form onSubmit={handleSaveAccount} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Account Type</label>
                                <select value={currentAccount.type} onChange={e => setCurrentAccount({...currentAccount, type: e.target.value as any})} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white">
                                    <option value="payoneer">Payoneer</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="bank">Bank Transfer</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Display Name</label>
                                <input type="text" value={currentAccount.name || ''} onChange={e => setCurrentAccount({...currentAccount, name: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" placeholder="e.g. Corporate PayPal" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Identifier (Email/ID)</label>
                                <input type="text" value={currentAccount.identifier || ''} onChange={e => setCurrentAccount({...currentAccount, identifier: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" placeholder="admin@example.com" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Instructions</label>
                                <textarea rows={3} value={currentAccount.instructions || ''} onChange={e => setCurrentAccount({...currentAccount, instructions: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" placeholder="Send as Friends & Family..." />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5">Cancel</button>
                                <button type="submit" className="px-6 py-2 rounded-xl bg-brand-primary text-brand-dark font-bold hover:bg-emerald-400">Save Account</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        )}

        {/* PROOF VIEWER MODAL */}
        {viewingProof && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setViewingProof(null)}>
                <div className="relative max-w-3xl max-h-[90vh]">
                    <img src={viewingProof} alt="Proof of Payment" className="rounded-lg max-w-full max-h-full" />
                    <button className="absolute -top-12 right-0 text-white hover:text-red-500"><X className="w-8 h-8" /></button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
