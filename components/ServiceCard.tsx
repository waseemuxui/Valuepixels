import React from 'react';
import { Code, Palette, LineChart, ShoppingBag, Layers, Check } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'code': return <Code className="w-7 h-7" />;
      case 'palette': return <Palette className="w-7 h-7" />;
      case 'line-chart': return <LineChart className="w-7 h-7" />;
      case 'shopping-bag': return <ShoppingBag className="w-7 h-7" />;
      default: return <Layers className="w-7 h-7" />;
    }
  };

  // Dynamic colors based on index for the "Multi-color" feel
  const colors = [
    { bg: 'from-brand-primary/20 to-brand-primary/5', border: 'group-hover:border-brand-primary/50', icon: 'text-brand-primary', accent: 'bg-brand-primary' },
    { bg: 'from-brand-secondary/20 to-brand-secondary/5', border: 'group-hover:border-brand-secondary/50', icon: 'text-brand-secondary', accent: 'bg-brand-secondary' },
    { bg: 'from-brand-accent/20 to-brand-accent/5', border: 'group-hover:border-brand-accent/50', icon: 'text-brand-accent', accent: 'bg-brand-accent' },
    { bg: 'from-emerald-400/20 to-emerald-400/5', border: 'group-hover:border-emerald-400/50', icon: 'text-emerald-400', accent: 'bg-emerald-400' },
  ];

  const color = colors[index % colors.length];

  return (
    <div className={`group relative p-8 glass-card rounded-3xl border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-${color.icon.split('-')[1]}/10 ${color.border}`}>
      {/* Hover Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
      
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 ${color.icon} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          {getIcon(service.icon)}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
          {service.title}
        </h3>
        
        <p className="text-gray-400 mb-8 leading-relaxed text-sm">
          {service.description}
        </p>
        
        <ul className="space-y-3">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
              <div className={`w-5 h-5 rounded-full ${color.accent}/10 flex items-center justify-center mr-3`}>
                <Check className={`w-3 h-3 ${color.icon}`} />
              </div>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Decorative Corner */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color.bg} opacity-20 blur-2xl rounded-full transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-700`}></div>
    </div>
  );
};

export default ServiceCard;