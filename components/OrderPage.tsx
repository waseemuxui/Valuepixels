
import React, { useState, useEffect } from 'react';
import { CreditCard, Wallet, CheckCircle, AlertCircle, Building, DollarSign, Bitcoin, ArrowRight, Upload, X } from 'lucide-react';
import { User, Order, PaymentAccount } from '../types';
import { storage } from '../services/storage';
import { TEXT_CONTENT, Language } from '../constants';

interface OrderPageProps {
  user: User | null;
  initialData?: { service: string; plan: string; price: string; isProduct?: boolean };
  onCreateOrder: (order: Order) => void;
  onNavigate: (view: string) => void;
  lang?: Language;
}

const OrderPage: React.FC<OrderPageProps> = ({ user, initialData, onCreateOrder, onNavigate, lang = 'EN' }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    service: initialData?.service || '',
    plan: initialData?.plan || '',
    price: initialData?.price || '',
    transactionId: '',
    proofOfPayment: ''
  });
  
  const [paymentAccounts, setPaymentAccounts] = useState<PaymentAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<PaymentAccount | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState('');
  
  // @ts-ignore
  const t = TEXT_CONTENT[lang].order || TEXT_CONTENT['EN'].order;

  const isProduct = initialData?.isProduct;

  useEffect(() => {
      setPaymentAccounts(storage.getPaymentAccounts());
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError('');
    
    if (file) {
        if (file.size > 500000) { // 500KB limit for localStorage safety
            setFileError('File size too large. Please upload an image under 500KB.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, proofOfPayment: reader.result as string }));
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        userId: user?.id || 'guest',
        userName: formData.name,
        userEmail: formData.email,
        service: formData.service || 'Custom Service',
        plan: isProduct ? 'Product' : (formData.plan || 'Standard'),
        status: 'pending_verification', 
        date: new Date().toISOString().split('T')[0],
        amount: formData.price.startsWith('$') ? formData.price : `$${formData.price}`,
        paymentMethod: selectedAccount?.type,
        transactionId: formData.transactionId,
        proofOfPayment: formData.proofOfPayment
      };

      onCreateOrder(newOrder);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-20 bg-brand-dark min-h-screen animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => onNavigate('home')} className="mb-8 text-gray-400 hover:text-white transition-colors text-sm">
            ← {t.cancel}
        </button>

        <h1 className="text-3xl font-bold text-white mb-8">
            {isProduct ? t.productTitle : t.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Item Details */}
            <div className="bg-brand-surface border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-primary" /> 
                {t.detailsTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-sm font-bold text-gray-300">{t.itemName}</label>
                   <input 
                      type="text" 
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                      className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none"
                      disabled={isProduct}
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-bold text-gray-300">{t.price}</label>
                   <input 
                      type="text" 
                      value={formData.price}
                      readOnly
                      className="w-full bg-brand-dark border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-primary outline-none font-bold text-brand-primary"
                   />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-brand-surface border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">{t.methodTitle}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                 {paymentAccounts.map(account => (
                     <button
                        key={account.id}
                        type="button"
                        onClick={() => setSelectedAccount(account)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                            selectedAccount?.id === account.id 
                            ? 'bg-brand-primary/10 border-brand-primary ring-1 ring-brand-primary' 
                            : 'bg-brand-dark border-white/10 hover:border-brand-primary/50'
                        }`}
                     >
                         <h4 className="font-bold text-white capitalize">{account.name}</h4>
                         <p className="text-xs text-gray-400 capitalize">{account.type}</p>
                     </button>
                 ))}
                 {paymentAccounts.length === 0 && (
                     <p className="text-red-400 text-sm">{t.noMethods}</p>
                 )}
              </div>

              {/* Payment Details & Confirmation */}
              {selectedAccount && (
                  <div className="bg-brand-dark p-6 rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-2">
                      <div className="mb-6 pb-6 border-b border-white/10">
                          <p className="text-sm text-gray-400 mb-1">{t.transferText} <strong className="text-white">{formData.price}</strong> {t.to}:</p>
                          <div className="flex items-center justify-between bg-brand-surface p-3 rounded-lg border border-white/5 mt-2">
                             <span className="text-brand-primary font-mono font-bold text-lg select-all">{selectedAccount.identifier}</span>
                             <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">{selectedAccount.type}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">{selectedAccount.instructions}</p>
                      </div>

                      <div className="space-y-4">
                          <h4 className="font-bold text-white text-sm">{t.confirmTitle}</h4>
                          <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300">{t.yourName}</label>
                                    <input 
                                        type="text" 
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-brand-surface border border-white/10 text-white rounded-xl px-4 py-3"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300">{t.txnId}</label>
                                    <input 
                                        type="text" 
                                        value={formData.transactionId}
                                        onChange={e => setFormData({...formData, transactionId: e.target.value})}
                                        className="w-full bg-brand-surface border border-white/10 text-white rounded-xl px-4 py-3"
                                        placeholder="e.g. 5291039529"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300">Upload Screenshot</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                            <Upload className="w-5 h-5 text-brand-primary" />
                                        </div>
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="w-full bg-brand-surface border border-white/10 text-gray-400 rounded-xl pl-12 pr-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 cursor-pointer"
                                        />
                                    </div>
                                    {fileError && <p className="text-xs text-red-400 mt-1">{fileError}</p>}
                                    {formData.proofOfPayment && !fileError && (
                                        <div className="mt-2 relative inline-block">
                                            <img src={formData.proofOfPayment} alt="Proof" className="h-20 w-auto rounded border border-white/10" />
                                            <button 
                                                type="button"
                                                onClick={() => setFormData(prev => ({...prev, proofOfPayment: ''}))}
                                                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-0.5 text-white"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                          </div>
                      </div>
                  </div>
              )}
            </div>

            <button 
              onClick={handleSubmit}
              disabled={loading || !selectedAccount || !formData.transactionId || (!formData.proofOfPayment && !fileError)}
              className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:to-brand-primary text-white font-bold py-4 rounded-xl shadow-xl shadow-brand-primary/20 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-2"
            >
              {loading ? t.verifying : t.submit} <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Summary Sidebar */}
          <div className="md:col-span-1">
             <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-6">{t.summaryTitle}</h3>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{t.item}</span>
                        <span className="text-white font-medium text-right max-w-[150px] truncate">{formData.service || '-'}</span>
                    </div>
                    {!isProduct && (
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">{t.plan}</span>
                            <span className="text-white font-medium">{formData.plan || '-'}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{t.subtotal}</span>
                        <span className="text-white font-medium">{formData.price.startsWith('$') ? formData.price : '$' + formData.price}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <span className="text-white font-bold">{t.total}</span>
                    <span className="text-2xl font-bold text-brand-primary">{formData.price.startsWith('$') ? formData.price : '$' + formData.price}</span>
                </div>

                <div className="flex items-start gap-3 text-xs text-gray-500 bg-brand-dark p-3 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-brand-secondary flex-shrink-0" />
                    <p>{t.note}</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
