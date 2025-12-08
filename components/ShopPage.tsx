
import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { TEXT_CONTENT, Language } from '../constants';

interface ShopPageProps {
  products: Product[];
  onNavigate: (view: string) => void;
  onBuyProduct: (product: Product) => void;
  lang?: Language;
}

const ShopPage: React.FC<ShopPageProps> = ({ products, onNavigate, onBuyProduct, lang = 'EN' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // @ts-ignore
  const t = TEXT_CONTENT[lang].shop || TEXT_CONTENT['EN'].shop;

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 pb-20 bg-brand-dark min-h-screen">
      {/* Shop Header */}
      <div className="bg-brand-surface border-b border-white/5 py-16 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.title}</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {t.subtitle}
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                    type="text" 
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-brand-surface border border-white/10 text-white rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none"
                />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${categoryFilter === cat ? 'bg-brand-primary text-brand-dark' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
                <div key={product.id} className="group bg-brand-surface border border-white/10 rounded-3xl overflow-hidden hover:border-brand-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full">
                    <div className="h-48 overflow-hidden relative">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-4 right-4 bg-brand-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                            {product.category}
                        </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-6 flex-grow">
                            {product.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-2xl font-bold text-white">${product.price}</span>
                            <button 
                                onClick={() => onBuyProduct(product)}
                                className="flex items-center gap-2 bg-white/10 hover:bg-brand-primary hover:text-brand-dark text-white px-4 py-2 rounded-xl font-bold transition-all"
                            >
                                <ShoppingBag className="w-4 h-4" /> {t.buyNow}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-gray-500 bg-brand-surface/30 rounded-3xl border border-white/5">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{t.noProducts}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
