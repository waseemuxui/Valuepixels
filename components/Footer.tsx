
import React from 'react';
import { Monitor, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import { TEXT_CONTENT, Language, getServices } from '../constants';
import { CustomPage, SiteConfig } from '../types';

interface FooterProps {
  lang: Language;
  onNavigate: (view: string) => void;
  customPages?: CustomPage[];
  siteConfig: SiteConfig;
}

const Footer: React.FC<FooterProps> = ({ lang, onNavigate, customPages = [], siteConfig }) => {
  const t = TEXT_CONTENT[lang];
  const tNav = t.nav;
  const servicesList = getServices(lang);
  
  // Filter custom pages for footer
  const footerPages = customPages.filter(p => p.showInFooter && p.status === 'published');

  const handleLinkClick = (e: React.MouseEvent, view: string) => {
    e.preventDefault();
    onNavigate(view);
  };

  return (
    <footer className="bg-brand-dark border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => onNavigate('home')}
            >
              <div className="bg-gradient-to-br from-brand-primary to-brand-secondary p-1.5 rounded-lg">
                <Monitor className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">{siteConfig.siteName}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.footer.about}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-primary transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-secondary transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-brand-primary rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><button onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-brand-primary hover:pl-2 transition-all">{tNav.about}</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-brand-primary hover:pl-2 transition-all">{tNav.services}</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'ai-consultant')} className="hover:text-brand-primary hover:pl-2 transition-all">{tNav.ai}</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-brand-primary hover:pl-2 transition-all">{tNav.contact}</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'blog')} className="hover:text-brand-primary hover:pl-2 transition-all">Blog</button></li>
            </ul>
          </div>

          {/* Services & Dynamic Pages */}
          <div>
             <h4 className="text-white font-bold mb-6 relative inline-block">
              Services & More
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-brand-secondary rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {servicesList.slice(0, 4).map(service => (
                  <li key={service.id}>
                      <button 
                        onClick={() => onNavigate(service.id)} 
                        className="hover:text-brand-secondary transition-colors cursor-pointer text-left"
                      >
                          {service.title}
                      </button>
                  </li>
              ))}
              {/* Dynamic Pages */}
              {footerPages.map(page => (
                <li key={page.id}>
                    <button
                        onClick={() => onNavigate(page.slug)}
                        className="hover:text-brand-secondary transition-colors cursor-pointer text-left text-brand-secondary"
                    >
                        {page.title}
                    </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
             <h4 className="text-white font-bold mb-6 relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-brand-accent rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-brand-primary/10 rounded-lg group-hover:bg-brand-primary/20 transition-colors">
                   <MapPin className="w-4 h-4 text-brand-primary" />
                </div>
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-brand-secondary/10 rounded-lg group-hover:bg-brand-secondary/20 transition-colors">
                   <Mail className="w-4 h-4 text-brand-secondary" />
                </div>
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-white transition-colors">{siteConfig.contactEmail}</a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-brand-accent/10 rounded-lg group-hover:bg-brand-accent/20 transition-colors">
                   <Phone className="w-4 h-4 text-brand-accent" />
                </div>
                <span className="font-mono">{siteConfig.contactPhone}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {siteConfig.siteName}. {t.footer.rights}
          </p>
          <div className="flex space-x-8 text-sm text-gray-500">
            <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">{t.footer.privacy}</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">{t.footer.terms}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;