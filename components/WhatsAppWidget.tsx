
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronRight, User, ShoppingBag, DollarSign } from 'lucide-react';
import { SiteConfig } from '../types';

interface WhatsAppWidgetProps {
  siteConfig: SiteConfig;
}

const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ siteConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0); // 0: Start, 1: Name, 2: Service, 3: Budget, 4: Message
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    budget: '',
    message: ''
  });

  const adminNumber = siteConfig.contactPhone.replace(/[^0-9]/g, '');

  const handleOpen = () => {
    setIsOpen(true);
    if (step === 0) setStep(1);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Optional: Reset state on close or keep it
  };

  const handleNext = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setStep(prev => prev + 1);
  };

  const handleSubmit = () => {
    const text = `*New Inquiry from ${siteConfig.siteName} Website*
    
👤 *Name:* ${formData.name}
🛍️ *Service:* ${formData.service}
💰 *Budget:* ${formData.budget}
📝 *Message:* ${formData.message}
    `;
    
    const url = `https://wa.me/${adminNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setStep(1); // Reset to start
    setFormData({ name: '', service: '', budget: '', message: '' });
  };

  const services = ['Web Development', 'UI/UX Design', 'SEO', 'E-Commerce', 'Site Audit', 'Other'];
  const budgets = ['$50 - $200', '$200 - $500', '$500 - $1000', '$1000+', 'Not Sure'];

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      {/* Widget Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-[#25D366]/40 transition-all duration-300 transform hover:-translate-y-1"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="font-bold hidden md:inline-block pr-2">Chat with us</span>
          
          {/* Pulse Effect */}
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-2xl w-[350px] overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 origin-bottom-left">
          
          {/* Header */}
          <div className="bg-[#075E54] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                   <MessageCircle className="w-6 h-6" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-[#075E54]"></div>
              </div>
              <div>
                <h3 className="font-bold">Support Team</h3>
                <p className="text-xs text-white/80">Typically replies instantly</p>
              </div>
            </div>
            <button onClick={handleClose} className="text-white/80 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 h-[400px] overflow-y-auto bg-[#ECE5DD] dark:bg-slate-800 flex flex-col gap-4">
            
            {/* System Greeting */}
            <div className="self-start bg-white dark:bg-slate-700 p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-sm text-gray-800 dark:text-gray-200">
              👋 Hi there! Welcome to {siteConfig.siteName}. I can connect you directly with our team on WhatsApp. Let's get a few details first.
            </div>

            {/* Step 1: Name */}
            {step === 1 && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="self-start bg-white dark:bg-slate-700 p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-sm text-gray-800 dark:text-gray-200">
                  What is your name?
                </div>
                <div className="mt-auto">
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#25D366]"
                            placeholder="Type your name..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.currentTarget.value) handleNext('name', e.currentTarget.value);
                            }}
                        />
                        <button className="bg-[#075E54] text-white p-2 rounded-lg" onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            if (input.value) handleNext('name', input.value);
                        }}>
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
              </div>
            )}

            {/* Step 2: Service */}
            {step === 2 && (
               <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2">
                  <div className="self-end bg-[#DCF8C6] dark:bg-[#056162] p-3 rounded-lg rounded-tr-none shadow-sm max-w-[85%] text-sm text-gray-800 dark:text-white">
                    {formData.name}
                  </div>
                  <div className="self-start bg-white dark:bg-slate-700 p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-sm text-gray-800 dark:text-gray-200">
                    Nice to meet you, {formData.name}! What service are you interested in?
                  </div>
                  <div className="flex flex-wrap gap-2">
                      {services.map(s => (
                          <button 
                            key={s}
                            onClick={() => handleNext('service', s)}
                            className="bg-white border border-gray-200 px-3 py-2 rounded-full text-xs text-black font-medium hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors shadow-sm"
                          >
                              {s}
                          </button>
                      ))}
                  </div>
               </div>
            )}

            {/* Step 3: Budget */}
            {step === 3 && (
               <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2">
                  <div className="self-end bg-[#DCF8C6] dark:bg-[#056162] p-3 rounded-lg rounded-tr-none shadow-sm max-w-[85%] text-sm text-gray-800 dark:text-white">
                    {formData.service}
                  </div>
                  <div className="self-start bg-white dark:bg-slate-700 p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-sm text-gray-800 dark:text-gray-200">
                    Got it. What is your estimated budget?
                  </div>
                  <div className="flex flex-wrap gap-2">
                      {budgets.map(b => (
                          <button 
                            key={b}
                            onClick={() => handleNext('budget', b)}
                            className="bg-white border border-gray-200 px-3 py-2 rounded-full text-xs text-black font-medium hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors shadow-sm"
                          >
                              {b}
                          </button>
                      ))}
                  </div>
               </div>
            )}

            {/* Step 4: Message */}
            {step === 4 && (
               <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 h-full">
                  <div className="self-end bg-[#DCF8C6] dark:bg-[#056162] p-3 rounded-lg rounded-tr-none shadow-sm max-w-[85%] text-sm text-gray-800 dark:text-white">
                    {formData.budget}
                  </div>
                  <div className="self-start bg-white dark:bg-slate-700 p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-sm text-gray-800 dark:text-gray-200">
                    Almost done! Any specific details you want to add?
                  </div>
                  <div className="mt-auto">
                    <textarea 
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#25D366] resize-none"
                        rows={3}
                        placeholder="Describe your project..."
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                    />
                    <button 
                        onClick={handleSubmit}
                        className="w-full mt-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <MessageCircle className="w-4 h-4" /> Start WhatsApp Chat
                    </button>
                  </div>
               </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppWidget;
