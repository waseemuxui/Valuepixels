
import React from 'react';
import { getServiceDetail, TEXT_CONTENT } from '../constants';
import { Check, ArrowRight, Monitor, Smartphone, Globe, Shield, Code, ShoppingCart, Zap } from 'lucide-react';

interface ServicePageProps {
  serviceId: string;
  lang: string;
  onNavigate: (page: string) => void;
  onSelectPlan: (data: { service: string; plan: string; price: string }) => void;
}

const ServicePage: React.FC<ServicePageProps> = ({ serviceId, lang, onNavigate, onSelectPlan }) => {
  const content = getServiceDetail(serviceId, lang);
  // @ts-ignore
  const t = TEXT_CONTENT[lang].servicePage || TEXT_CONTENT['EN'].servicePage;

  // Helper to map platform names to icons/visuals (simplified)
  const getPlatformIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('react') || n.includes('code')) return <Code className="w-6 h-6" />;
    if (n.includes('shopify') || n.includes('commerce')) return <ShoppingCart className="w-6 h-6" />;
    if (n.includes('seo') || n.includes('google')) return <Globe className="w-6 h-6" />;
    if (n.includes('speed') || n.includes('audit')) return <Zap className="w-6 h-6" />;
    if (n.includes('secure')) return <Shield className="w-6 h-6" />;
    return <Monitor className="w-6 h-6" />;
  };

  return (
    <div className="pt-24 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero */}
      <div className="bg-brand-surface border-b border-white/5 pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <button 
                onClick={() => onNavigate('home')}
                className="mb-8 inline-flex items-center text-sm text-gray-400 hover:text-brand-primary transition-colors gap-2"
            >
                ← {t.back}
            </button>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                {content.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {content.subtitle}
            </p>
            <div className="mt-8 max-w-4xl mx-auto p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-gray-400">{content.description}</p>
            </div>
        </div>
      </div>

      {/* Platforms */}
      <div className="py-16 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-bold text-brand-secondary uppercase tracking-widest mb-8">{t.platforms}</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {content.platforms.map((platform, i) => (
                    <div key={i} className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/5 rounded-full hover:bg-white/10 hover:border-brand-primary/30 transition-all cursor-default">
                        <span className="text-brand-primary">{getPlatformIcon(platform)}</span>
                        <span className="text-white font-medium">{platform}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-20 bg-brand-surface relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl font-bold text-white text-center mb-12">{t.plans}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {content.plans.map((plan, index) => (
                    <div 
                        key={index} 
                        className={`relative p-8 rounded-3xl border flex flex-col transition-all duration-300 hover:-translate-y-2 ${
                            plan.recommended 
                            ? 'bg-gradient-to-b from-brand-surface to-brand-dark border-brand-primary shadow-2xl shadow-brand-primary/10' 
                            : 'bg-brand-dark border-white/10 hover:border-white/20'
                        }`}
                    >
                        {plan.recommended && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-brand-dark text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                {t.popular}
                            </div>
                        )}

                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                                {plan.price}
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-8 h-10">{plan.description}</p>

                        <div className="flex-grow space-y-4 mb-8">
                            {plan.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.recommended ? 'bg-brand-primary/20' : 'bg-white/10'}`}>
                                        <Check className={`w-3 h-3 ${plan.recommended ? 'text-brand-primary' : 'text-gray-400'}`} />
                                    </div>
                                    <span className="text-gray-300 text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                onSelectPlan({
                                    service: content.title.replace('Services', '').trim(),
                                    plan: plan.name,
                                    price: plan.price
                                });
                            }}
                            className={`w-full py-3 rounded-xl font-bold text-center transition-all ${
                                plan.recommended 
                                ? 'bg-brand-primary text-brand-dark hover:bg-emerald-400' 
                                : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                        >
                            {t.selectPlan}
                        </button>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">{t.customTitle}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">{t.customDesc}</p>
        <button 
            onClick={() => {
                onNavigate('contact');
                setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'}), 100);
            }} 
            className="px-8 py-4 bg-brand-secondary hover:bg-violet-500 text-white rounded-xl font-bold transition-colors inline-flex items-center gap-2"
        >
            {t.talkExpert} <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ServicePage;
