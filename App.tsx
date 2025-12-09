
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ServiceCard from './components/ServiceCard';
import AIConsultant from './components/AIConsultant';
import ServicePage from './components/ServicePage';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import BlogPage from './components/BlogPage';
import DynamicPage from './components/DynamicPage';
import OrderPage from './components/OrderPage';
import ShopPage from './components/ShopPage';
import LegalPage from './components/LegalPage';
import ToolsPage from './components/ToolsPage';
import TeamPage from './components/TeamPage';
import WhatsAppWidget from './components/WhatsAppWidget';
import { getServices, getTestimonials, TEXT_CONTENT, Language } from './constants';
import { ArrowRight, CheckCircle, Code, Rocket, Shield, MessageCircle, Star } from 'lucide-react';
import { User, BlogPost, CustomPage, Order, Product, SiteConfig, TeamMember } from './types';
import { storage } from './services/storage';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('EN');
  
  // ROUTING LOGIC
  const getInitialView = () => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.substring(1); // Remove leading slash
    return path || 'home';
  };

  const [currentView, setCurrentView] = useState<string>(getInitialView());
  const [user, setUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Checkout State
  const [checkoutData, setCheckoutData] = useState<{service: string, plan: string, price: string, isProduct?: boolean} | undefined>(undefined);

  // Shop State
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [allPages, setAllPages] = useState<CustomPage[]>([]);
  const [allTeam, setAllTeam] = useState<TeamMember[]>([]);

  // Site Config State
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(storage.getSiteConfig());

  // Handle Browser Back Button (PopState)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle Scrolling for Hash-like routes on Landing Page
  useEffect(() => {
    if (['home', 'about', 'services', 'contact', 'ai-consultant'].includes(currentView)) {
        // If it's a section on the landing page, try to scroll to it
        // We use a small timeout to allow React to render the landing page first
        setTimeout(() => {
            const sectionId = currentView === 'home' ? 'home' : currentView;
            const el = document.getElementById(sectionId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 100);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView]);

  // Load Data from Storage on Mount
  useEffect(() => {
    setAllPosts(storage.getPosts());
    setAllPages(storage.getPages());
    setAllProducts(storage.getProducts());
    setOrders(storage.getOrders());
    setSiteConfig(storage.getSiteConfig());
    setAllTeam(storage.getTeamMembers());
    
    // Check for logged in user session (safely)
    const storedUser = localStorage.getItem('sf_session_user');
    if (storedUser) {
        try {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser && parsedUser.id) {
                setUser(parsedUser);
            }
        } catch (e) {
            console.error("Failed to restore session:", e);
            localStorage.removeItem('sf_session_user');
        }
    }
  }, [currentView]); // Reload when view changes to keep admin updates in sync

  // Apply Site Config (SEO)
  useEffect(() => {
    if (siteConfig && typeof siteConfig === 'object') {
        if (siteConfig.seoTitle) {
            document.title = siteConfig.seoTitle;
        }
        
        if (siteConfig.seoDescription) {
            // Update meta description
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.setAttribute('name', 'description');
                document.head.appendChild(metaDescription);
            }
            metaDescription.setAttribute('content', siteConfig.seoDescription);
        }
    }
  }, [siteConfig]);

  const t = TEXT_CONTENT[lang];
  const services = getServices(lang);
  const testimonials = getTestimonials(lang);
  const isRTL = lang === 'AR';

  const navigate = (view: string) => {
    setCurrentView(view);
    // Push state to URL so refresh works (requires .htaccess/nginx config on server)
    const url = view === 'home' ? '/' : `/${view}`;
    window.history.pushState({}, '', url);
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('sf_session_user', JSON.stringify(loggedInUser));
    if (loggedInUser.role === 'admin') {
        navigate('admin-dashboard');
    } else {
        navigate('user-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sf_session_user');
    navigate('home');
  };

  const handleSelectPlan = (data: { service: string; plan: string; price: string }) => {
    setCheckoutData(data);
    navigate('order');
  };

  const handleBuyProduct = (product: Product) => {
    setCheckoutData({
        service: product.name,
        plan: 'One-time Purchase',
        price: product.price,
        isProduct: true
    });
    navigate('order');
  };

  const handleCreateOrder = (newOrder: Order) => {
    storage.saveOrder(newOrder);
    setOrders(storage.getOrders()); // Refresh local state
    setCheckoutData(undefined);
    
    // Simulate Notification
    const message = `Order Submitted: ${newOrder.id}!\n\nStatus: Pending Verification.\nPlease wait for admin approval.`;

    if (user) {
        alert(message);
        navigate('user-dashboard');
    } else {
        alert(message + "\nPlease login to track your order status.");
        navigate('home');
    }
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const service = (form.elements.namedItem('service') as HTMLSelectElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    const adminEmail = siteConfig?.contactEmail || 'waseemuxui@gmail.com';
    const siteName = siteConfig?.siteName || 'ValuePixels';
    const subject = `${siteName} Inquiry: ${service} - ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`;

    // Use window.location.href to trigger the mail client
    window.location.href = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Provide feedback
    alert(`Opening your default email client to send this message to ${adminEmail}. Please click 'Send' in your email app.`);
    form.reset();
  };

  // View Logic
  const isAdminDashboard = currentView === 'admin-dashboard';
  const isUserDashboard = currentView === 'user-dashboard';
  const isShop = currentView === 'shop';
  const isTools = currentView === 'tools';
  const isTeam = currentView === 'team';
  const isBlog = currentView === 'blog' || currentView.startsWith('blog/');
  const isService = services.some(s => s.id === currentView);
  const isOrder = currentView === 'order';
  const isLegal = currentView === 'privacy' || currentView === 'terms';
  const isCustomPage = allPages.some(p => p.slug === currentView);

  return (
    <div className={`min-h-screen bg-brand-dark text-gray-100 font-sans selection:bg-brand-primary/30 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        onNavigate={navigate} 
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        customPages={allPages}
        siteConfig={siteConfig || {}}
      />

      <WhatsAppWidget siteConfig={siteConfig} />

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onLogin={handleLogin}
      />

      <main>
        {isAdminDashboard && user?.role === 'admin' ? (
            <AdminDashboard 
                user={user} 
                posts={allPosts} 
                setPosts={setAllPosts}
                pages={allPages}
                setPages={setAllPages}
                products={allProducts}
                setProducts={setAllProducts}
                teamMembers={allTeam}
                setTeamMembers={setAllTeam}
            />
        ) : isUserDashboard && user ? (
            <UserDashboard 
                user={user} 
                orders={orders} 
                onNavigate={navigate}
                onLogout={handleLogout}
                lang={lang}
            />
        ) : isShop ? (
            <ShopPage 
                products={allProducts} 
                onNavigate={navigate} 
                onBuyProduct={handleBuyProduct}
                lang={lang}
            />
        ) : isTools ? (
            <ToolsPage lang={lang} />
        ) : isTeam ? (
            <TeamPage teamMembers={allTeam} lang={lang} />
        ) : isBlog ? (
            <BlogPage 
                posts={allPosts} 
                onNavigate={navigate} 
                viewPostId={currentView.split('/')[1]}
                lang={lang}
            />
        ) : isService ? (
            <ServicePage 
                serviceId={currentView}
                lang={lang}
                onNavigate={navigate}
                onSelectPlan={handleSelectPlan}
            />
        ) : isOrder ? (
            <OrderPage 
                user={user} 
                initialData={checkoutData}
                onCreateOrder={handleCreateOrder}
                onNavigate={navigate}
                lang={lang}
            />
        ) : isLegal ? (
            <LegalPage 
                type={currentView as 'privacy' | 'terms'} 
                lang={lang} 
            />
        ) : isCustomPage ? (
            <DynamicPage 
                page={allPages.find(p => p.slug === currentView)!} 
            />
        ) : (
            // Landing Page (Home, About, Services, Contact rendered in one scrollable view)
            <>
                {/* Hero */}
                <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-secondary/20 rounded-full blur-[120px] animate-float"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                            <span className="text-sm font-medium text-gray-300 tracking-wide">{t.hero.badge}</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
                            {t.hero.title}
                        </h1>
                        
                        <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                            {t.hero.subtitle}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                            <button 
                                onClick={() => navigate('contact')}
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-primary to-emerald-600 hover:to-emerald-500 text-brand-dark rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-primary/25 flex items-center justify-center gap-2"
                            >
                                <Rocket className="w-5 h-5" />
                                {t.hero.ctaPrimary}
                            </button>
                            <button 
                                onClick={() => navigate('services')}
                                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
                            >
                                {t.hero.ctaSecondary}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section id="services" className="py-24 bg-brand-surface relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-sm font-bold text-brand-secondary uppercase tracking-widest mb-2">{t.services.heading}</h2>
                            <h3 className="text-3xl md:text-5xl font-bold text-white">{t.services.subheading}</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <div key={service.id} onClick={() => navigate(service.id)} className="cursor-pointer">
                                    <ServiceCard service={service} index={index} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* AI Consultant */}
                <AIConsultant />

                {/* About Section */}
                <section id="about" className="py-24 bg-brand-dark relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-3xl rotate-6 opacity-20 group-hover:rotate-3 transition-all duration-500"></div>
                                <img 
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                                    alt="Team" 
                                    className="relative rounded-3xl shadow-2xl border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t.about.title}</h2>
                                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                    {t.about.subtitle}
                                </p>
                                
                                <div className="space-y-6">
                                    {t.about.features.map((feature, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-brand-surface border border-white/10 flex items-center justify-center flex-shrink-0">
                                                {i === 0 ? <Code className="w-6 h-6 text-brand-primary" /> : 
                                                 i === 1 ? <Shield className="w-6 h-6 text-brand-secondary" /> : 
                                                 <MessageCircle className="w-6 h-6 text-brand-accent" />}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-lg">{feature.title}</h4>
                                                <p className="text-gray-400 text-sm">{feature.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-24 bg-brand-surface border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">{t.testimonials.heading}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.slice(0, 3).map((testimonial) => (
                                <div key={testimonial.id} className="bg-brand-dark p-8 rounded-3xl border border-white/5 hover:border-brand-primary/30 transition-all">
                                    <div className="flex gap-1 mb-4">
                                        {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-brand-accent fill-brand-accent" />)}
                                    </div>
                                    <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                                    <div className="flex items-center gap-4">
                                        <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-brand-primary/20" />
                                        <div>
                                            <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                                            <p className="text-gray-500 text-xs">{testimonial.role}, {testimonial.company}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-24 bg-brand-dark relative">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-gradient-to-b from-brand-surface to-brand-dark border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.contact.title}</h2>
                                <p className="text-gray-400">{t.contact.subtitle}</p>
                            </div>
                            
                            <form onSubmit={handleContactSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-300 ml-1">{t.contact.name}</label>
                                        <input type="text" name="name" className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none transition-all" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-300 ml-1">{t.contact.email}</label>
                                        <input type="email" name="email" className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none transition-all" required />
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">{t.contact.service}</label>
                                    <select name="service" className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none transition-all">
                                        {services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                                        <option value="General Inquiry">General Inquiry</option>
                                    </select>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">{t.contact.details}</label>
                                    <textarea name="message" rows={4} className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none transition-all"></textarea>
                                </div>
                                
                                <button type="submit" className="w-full bg-brand-primary hover:bg-emerald-400 text-brand-dark font-bold py-4 rounded-xl shadow-lg shadow-brand-primary/20 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                                    {t.contact.submit} <ArrowRight className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </>
        )}
      </main>

      <Footer 
        lang={lang} 
        onNavigate={navigate} 
        customPages={allPages}
        siteConfig={siteConfig || {}}
      />
    </div>
  );
};

export default App;
