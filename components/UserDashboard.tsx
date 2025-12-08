
import React, { useState } from 'react';
import { ShoppingBag, Clock, User as UserIcon, LogOut, PlusCircle, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { User, Order } from '../types';
import { TEXT_CONTENT, Language } from '../constants';

interface UserDashboardProps {
  user: User;
  orders: Order[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
  lang?: Language;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, orders, onNavigate, onLogout, lang = 'EN' }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');
  
  // @ts-ignore
  const t = TEXT_CONTENT[lang].userDashboard || TEXT_CONTENT['EN'].userDashboard;

  // Filter orders for this user
  const myOrders = orders.filter(o => o.userId === user.id);

  // Helper to map status to localized string
  const getStatusText = (status: string) => {
    return t.orders.statuses[status] || status.replace('_', ' ');
  };

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
       {/* Sidebar */}
       <div className="w-full md:w-64 flex-shrink-0 space-y-2">
        <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 mb-6 text-center">
            <div className="w-20 h-20 bg-brand-secondary rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-white font-bold">{user.name}</h3>
            <p className="text-gray-400 text-xs">{user.email}</p>
        </div>

        <nav className="bg-brand-surface border border-white/10 rounded-2xl p-4 space-y-1">
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <ShoppingBag className="w-5 h-5" /> {t.sidebar.orders}
          </button>
          <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'profile' ? 'bg-brand-primary text-brand-dark font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <UserIcon className="w-5 h-5" /> {t.sidebar.profile}
          </button>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors mt-4">
            <LogOut className="w-5 h-5" /> {t.sidebar.signout}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
          {activeTab === 'orders' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-white">{t.orders.title}</h2>
                        <p className="text-gray-400">{t.orders.subtitle}</p>
                    </div>
                    <button onClick={() => onNavigate('home')} className="flex items-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-brand-primary/20 transition-all">
                        <PlusCircle className="w-5 h-5" /> {t.orders.newOrder}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                      {myOrders.map(order => (
                          <div key={order.id} className="bg-brand-surface border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-brand-primary/30 transition-colors">
                              <div className="flex items-center gap-4 w-full md:w-auto">
                                  <div className="p-4 bg-brand-dark rounded-xl border border-white/5">
                                      <ShoppingBag className="w-6 h-6 text-brand-secondary" />
                                  </div>
                                  <div>
                                      <h4 className="text-white font-bold text-lg">{order.service}</h4>
                                      <p className="text-gray-400 text-sm">{order.plan} Plan • <span className="font-mono">{order.id}</span></p>
                                  </div>
                              </div>
                              
                              <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                  <div className="text-right">
                                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{t.orders.status}</p>
                                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold capitalize ${
                                          order.status === 'active' || order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                          order.status === 'pending_verification' ? 'bg-yellow-500/20 text-yellow-400' :
                                          order.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                                          'bg-gray-500/20 text-gray-400'
                                      }`}>
                                          {order.status === 'active' && <CheckCircle className="w-3 h-3"/>}
                                          {order.status === 'pending_verification' && <Clock className="w-3 h-3"/>}
                                          {order.status === 'cancelled' && <AlertCircle className="w-3 h-3"/>}
                                          {getStatusText(order.status)}
                                      </span>
                                  </div>
                                  
                                  <div className="text-right">
                                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{t.orders.amount}</p>
                                      <p className="text-white font-bold">{order.amount}</p>
                                  </div>
                              </div>
                          </div>
                      ))}
                      
                      {myOrders.length === 0 && (
                          <div className="bg-brand-surface/30 border border-white/5 rounded-2xl p-12 text-center text-gray-500">
                              <p>{t.orders.noOrders}</p>
                          </div>
                      )}
                  </div>
              </div>
          )}

          {activeTab === 'profile' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-3xl font-bold text-white">{t.profile.title}</h2>
                  <div className="bg-brand-surface border border-white/10 rounded-2xl p-8">
                      <form className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">{t.profile.name}</label>
                                <input type="text" defaultValue={user.name} className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">{t.profile.email}</label>
                                <input type="email" defaultValue={user.email} className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none" disabled />
                            </div>
                          </div>
                          <button className="bg-brand-primary text-brand-dark px-6 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-colors">
                              {t.profile.update}
                          </button>
                      </form>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};

export default UserDashboard;
