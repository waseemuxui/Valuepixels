
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Monitor, Globe, ChevronDown, ChevronRight, User as UserIcon, LogOut, LayoutDashboard, FileText } from 'lucide-react';
import { NAV_LINKS, TEXT_CONTENT, Language, LANGUAGES, getServices } from '../constants';
import { User, CustomPage, SiteConfig } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onNavigate: (view: string) => void;
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  customPages?: CustomPage[];
  siteConfig: SiteConfig;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, onNavigate, user, onOpenAuth, onLogout, customPages = [], siteConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const langMenuRef = useRef<HTMLDivElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const t = TEXT_CONTENT[lang]?.nav || TEXT_CONTENT['EN'].nav;
  const servicesList = getServices(lang);

  // Filter custom pages for header
  const headerPages = customPages.filter(p => p.showInHeader && p.status === 'published');
  
  // Safe site name - ensure it's a string and fallback if siteConfig is missing
  const safeSiteName = String(siteConfig?.siteName || 'ValuePixels');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
        setServicesMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (href: string) => {
    if (href === '#services') {
        return; 
    }
    const view = href.replace('#', '');
    onNavigate(view);
    setIsOpen(false);
  };

  const currentLangObj = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-dark/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg shadow-brand-primary/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-gradient-to-br from-brand-primary to-brand-secondary p-2.5 rounded-xl shadow-lg shadow-brand-primary/20 group-hover:shadow-brand-primary/40 transition-all duration-300">
              <Monitor className="h-6 w-6 text-white" />
            </div>
            <span className="text-white font-bold text-2xl tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-primary transition-all">
              {/* Attempt to split by capital letter if only one word, or space if multiple */}
              {safeSiteName.includes(' ') 
                ? <>{safeSiteName.split(' ')[0]}<span className="text-brand-primary">{safeSiteName.split(' ').slice(1).join(' ')}</span></>
                : safeSiteName
              }
            </span>
          </div>
          
          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-baseline space-x-6">
              {NAV_LINKS.map((link) => {
                if (link.label === 'services') {
                    return (
                        <div key={link.label} className="relative" ref={servicesMenuRef}>
                            <button
                                onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                                onMouseEnter={() => setServicesMenuOpen(true)}
                                className="flex items-center gap-1 text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                            >
                                {/* @ts-ignore */}
                                {t[link.label]}
                                <ChevronDown className="w-3 h-3" />
                            </button>
                            
                            {servicesMenuOpen && (
                                <div 
                                    onMouseLeave={() => setServicesMenuOpen(false)}
                                    className="absolute left-0 mt-2 w-64 bg-brand-surface border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in duration-200"
                                >
                                    {servicesList.map(service => (
                                        <button
                                            key={service.id}
                                            onClick={() => {
                                                onNavigate(service.id);
                                                setServicesMenuOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between group"
                                        >
                                            <span>{service.title}</span>
                                            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-brand-primary" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                }
                return (
                    <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    >
                    {/* @ts-ignore */}
                    {t[link.label]}
                    </button>
                );
              })}
              
              {/* Blog Link */}
              <button
                onClick={() => handleNavClick('#blog')}
                className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                {/* @ts-ignore */}
                {t.blog || 'Blog'}
              </button>

              {/* Custom Header Pages */}
              {headerPages.map(page => (
                <button
                    key={page.id}
                    onClick={() => onNavigate(page.slug)}
                    className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                    {page.title}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
               {/* Language Dropdown */}
               <div className="relative" ref={langMenuRef}>
                 <button 
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-2 text-gray-300 hover:text-white px-3 py-2 border border-white/10 rounded-full text-sm bg-white/5 hover:bg-white/10 transition-all"
                 >
                   <span>{currentLangObj.flag}</span>
                   <span>{currentLangObj.code}</span>
                   <ChevronDown className="w-3 h-3 opacity-70" />
                 </button>
                 
                 {langMenuOpen && (
                   <div className="absolute right-0 mt-2 w-40 bg-brand-surface border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in duration-200">
                     {LANGUAGES.map((l) => (
                       <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-white/5 transition-colors ${lang === l.code ? 'text-brand-primary bg-brand-primary/10' : 'text-gray-300'}`}
                       >
                         <span className="text-lg">{l.flag}</span>
                         <span>{l.name}</span>
                       </button>
                     ))}
                   </div>
                 )}
               </div>

               {/* Auth / Dashboard Buttons */}
               {user ? (
                   <div className="relative" ref={userMenuRef}>
                       <button 
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 hover:border-brand-primary/50 text-brand-primary px-4 py-2 rounded-full text-sm font-bold transition-all"
                       >
                           <UserIcon className="w-4 h-4" />
                           <span>{user.name.split(' ')[0]}</span>
                       </button>

                       {userMenuOpen && (
                           <div className="absolute right-0 mt-2 w-56 bg-brand-surface border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in duration-200">
                               <button
                                   onClick={() => {
                                       onNavigate(user.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
                                       setUserMenuOpen(false);
                                   }}
                                   className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                               >
                                   <LayoutDashboard className="w-4 h-4" />
                                   {user.role === 'admin' ? t.adminPanel || 'Admin Panel' : t.myDashboard || 'My Dashboard'}
                               </button>
                               <div className="border-t border-white/10 my-1"></div>
                               <button
                                   onClick={() => {
                                       onLogout();
                                       setUserMenuOpen(false);
                                   }}
                                   className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                               >
                                   <LogOut className="w-4 h-4" /> {t.logout || 'Sign Out'}
                               </button>
                           </div>
                       )}
                   </div>
               ) : (
                <button
                    onClick={onOpenAuth}
                    className="bg-gradient-to-r from-brand-primary to-emerald-600 hover:to-emerald-500 text-brand-dark px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 hover:-translate-y-0.5 flex items-center gap-2"
                >
                    <UserIcon className="w-4 h-4" />
                    <span>{t.login || 'Login'}</span>
                </button>
               )}
            </div>
          </div>
          
          {/* MOBILE MENU BTN */}
          <div className="flex md:hidden items-center gap-4">
             <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="text-gray-300 px-2 py-1 flex items-center gap-1 border border-white/10 rounded-lg bg-white/5"
               >
                 <span>{currentLangObj.flag}</span>
                 <span className="text-xs font-bold">{currentLangObj.code}</span>
             </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-dark/95 backdrop-blur-xl border-b border-white/10 shadow-2xl absolute w-full h-screen overflow-y-auto pb-20">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {NAV_LINKS.map((link) => {
               if (link.label === 'services') {
                   return (
                       <div key={link.label} className="space-y-1">
                           <button
                                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 text-brand-primary font-bold border-b border-white/5 bg-white/5 rounded-lg"
                           >
                               {/* @ts-ignore */}
                               {t[link.label]}
                               <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                           </button>
                           
                           {mobileServicesOpen && (
                               <div className="pl-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                                   {servicesList.map(s => (
                                       <button
                                           key={s.id}
                                           onClick={() => {
                                               onNavigate(s.id);
                                               setIsOpen(false);
                                           }}
                                           className="block w-full text-left px-4 py-3 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                                       >
                                           {s.title}
                                       </button>
                                   ))}
                               </div>
                           )}
                       </div>
                   )
               }
               return (
                <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-gray-300 hover:text-brand-primary hover:bg-white/5 block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors"
                >
                    {/* @ts-ignore */}
                    {t[link.label]}
                </button>
               )
            })}
             <button
                onClick={() => handleNavClick('#blog')}
                className="text-gray-300 hover:text-brand-primary hover:bg-white/5 block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors"
             >
                {/* @ts-ignore */}
                {t.blog || 'Blog'}
             </button>
             {headerPages.map(page => (
                <button
                    key={page.id}
                    onClick={() => {
                        onNavigate(page.slug);
                        setIsOpen(false);
                    }}
                    className="text-gray-300 hover:text-brand-primary hover:bg-white/5 block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors"
                >
                    {page.title}
                </button>
             ))}
             
             <div className="pt-4 mt-4 border-t border-white/10">
               <div className="grid grid-cols-5 gap-2 px-2 mb-4">
                 {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setIsOpen(false);
                      }}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border ${lang === l.code ? 'border-brand-primary bg-brand-primary/10 text-white' : 'border-white/5 text-gray-500 hover:bg-white/5'}`}
                    >
                      <span className="text-lg">{l.flag}</span>
                      <span className="text-[10px] font-bold mt-1">{l.code}</span>
                    </button>
                 ))}
               </div>
               
               {user ? (
                   <div className="space-y-2">
                       <button
                           onClick={() => {
                               onNavigate(user.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
                               setIsOpen(false);
                           }}
                           className="text-brand-dark bg-brand-primary block w-full text-center px-3 py-3 rounded-xl text-base font-bold shadow-lg shadow-brand-primary/20"
                       >
                           {user.role === 'admin' ? t.adminPanel || 'Admin Panel' : t.myDashboard || 'Dashboard'}
                       </button>
                       <button
                           onClick={() => {
                               onLogout();
                               setIsOpen(false);
                           }}
                           className="text-red-400 border border-red-500/20 block w-full text-center px-3 py-3 rounded-xl text-base font-bold"
                       >
                           {t.logout || 'Sign Out'}
                       </button>
                   </div>
               ) : (
                   <button
                        onClick={() => {
                            onOpenAuth();
                            setIsOpen(false);
                        }}
                        className="text-brand-dark bg-brand-primary block w-full text-center px-3 py-3 rounded-xl text-base font-bold shadow-lg shadow-brand-primary/20"
                    >
                        {t.login || 'Login'}
                    </button>
               )}
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
