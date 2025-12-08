
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, RefreshCcw, Monitor, ShieldCheck, Zap, FileText } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateSiteAudit } from '../services/geminiService';

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "👋 Hi! I'm your ValuePixels Technical Lead. I can provide instant quotes ($50-$2000) or run a comprehensive Site Audit. \n\nSelect an option below or describe your project!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, scanning, loading]);

  const runSimulation = async (url: string) => {
    setScanning(true);
    setLoading(true);
    
    const steps = [
      "Connecting to Lighthouse nodes...",
      `Analyzing Core Web Vitals for ${url}...`,
      "Checking Mobile Responsiveness...",
      "Validating SEO Meta Tags...",
      "Generating Pricing Estimate..."
    ];

    for (const step of steps) {
      setScanStep(step);
      await new Promise(r => setTimeout(r, 800)); // Simulate processing time
    }

    setScanning(false);
    return `Generate a detailed Site Audit Report for the website "${url}". Include Speed, SEO, and Structure analysis. Provide a quote for fixing the issues between $50 and $2000.`;
  };

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    const isUrl = textToSend.includes('.') && !textToSend.includes(' ');
    const isAuditRequest = textToSend.toLowerCase().includes('audit') || textToSend.toLowerCase().includes('check') || isUrl;

    let finalPrompt = textToSend;

    if (isAuditRequest) {
      if (isUrl) {
        finalPrompt = await runSimulation(textToSend);
      } else {
        setLoading(true);
      }
    } else {
      setLoading(true);
    }

    const responseText = await generateSiteAudit(finalPrompt);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([{
      id: Date.now().toString(),
      role: 'model',
      text: "System ready. How can I help you optimize your digital presence today?"
    }]);
  };

  const QuickAction = ({ icon: Icon, label, query }: { icon: any, label: string, query: string }) => (
    <button 
      onClick={() => handleSend(query)}
      disabled={loading || scanning}
      className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-primary/50 rounded-lg text-xs md:text-sm text-gray-300 transition-all whitespace-nowrap"
    >
      <Icon className="w-4 h-4 text-brand-primary" />
      {label}
    </button>
  );

  return (
    <div id="ai-consultant" className="py-24 bg-brand-surface relative overflow-hidden border-y border-white/5">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text Info */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Pricing & Audits</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Get Instant <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Quotes & Analysis</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Why wait for a callback? Our AI Technical Lead provides instant project estimates and real-time site audits. Get transparent pricing from <span className="text-white font-bold">$50 to $2000</span> in seconds.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-secondary/10 rounded-xl border border-brand-secondary/20">
                  <FileText className="w-6 h-6 text-brand-secondary" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Smart Quoting</h4>
                  <p className="text-gray-400 text-sm">Instant estimates for WP, React, SEO, and Design tasks.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-accent/10 rounded-xl border border-brand-accent/20">
                  <Zap className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Technical Audits</h4>
                  <p className="text-gray-400 text-sm">Simulated deep-dive into Speed, Structure, and SEO health.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Chat Interface */}
          <div className="glass-card rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[650px] border border-white/10 ring-1 ring-white/5">
            {/* Chat Header */}
            <div className="bg-brand-dark/50 p-5 border-b border-white/10 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center shadow-lg shadow-brand-primary/30">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-brand-dark animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">ValuePixels Assistant</h3>
                  <p className="text-xs text-brand-primary font-medium tracking-wide uppercase">Online & Ready</p>
                </div>
              </div>
              <button onClick={resetChat} className="p-2.5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors" title="Reset Chat">
                <RefreshCcw className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-brand-dark/40 scroll-smooth">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center shadow-lg ${msg.role === 'user' ? 'bg-gray-700' : 'bg-brand-primary'}`}>
                      {msg.role === 'user' ? <User className="w-5 h-5 text-gray-300" /> : <Bot className="w-5 h-5 text-brand-dark" />}
                    </div>
                    <div className={`p-5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-md ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-brand-primary to-emerald-600 text-white font-medium rounded-tr-none' 
                        : 'bg-gray-800/80 backdrop-blur-sm text-gray-100 border border-white/10 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Simulated Scanning UI */}
              {scanning && (
                <div className="flex justify-start">
                   <div className="flex gap-4 max-w-[85%]">
                     <div className="w-9 h-9 rounded-full bg-brand-primary flex-shrink-0 flex items-center justify-center animate-pulse">
                        <Monitor className="w-5 h-5 text-brand-dark" />
                     </div>
                     <div className="p-5 bg-gray-900/90 border border-brand-primary/30 rounded-2xl rounded-tl-none w-72 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <Loader2 className="w-5 h-5 animate-spin text-brand-primary" />
                          <span className="text-brand-primary font-bold text-xs uppercase tracking-wider">Running Diagnostics</span>
                        </div>
                        <div className="space-y-4">
                          <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary animate-[pulse_1s_ease-in-out_infinite]" style={{width: '60%'}}></div>
                          </div>
                          <p className="text-gray-300 text-xs font-mono bg-black/30 p-2 rounded border border-white/5">{scanStep}</p>
                        </div>
                     </div>
                   </div>
                </div>
              )}

              {/* Simple Loading State */}
              {loading && !scanning && (
                <div className="flex justify-start">
                  <div className="flex gap-4 max-w-[85%]">
                    <div className="w-9 h-9 rounded-full bg-brand-primary flex-shrink-0 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-brand-dark" />
                    </div>
                    <div className="p-4 bg-gray-800 border border-white/5 rounded-2xl rounded-tl-none flex items-center gap-3">
                       <Loader2 className="w-5 h-5 animate-spin text-brand-primary" />
                       <span className="text-gray-400 text-xs tracking-wide">Processing Request...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {!loading && !scanning && messages.length < 3 && (
              <div className="px-5 py-3 bg-brand-dark/60 border-t border-white/5 flex gap-3 overflow-x-auto no-scrollbar">
                <QuickAction icon={FileText} label="Get Quote" query="I need a price quote for a website project. What are your rates?" />
                <QuickAction icon={ShieldCheck} label="Audit Site" query="I want a site audit. My URL is example.com" />
                <QuickAction icon={Zap} label="Fix Speed" query="My site is slow. How much to fix Core Web Vitals?" />
              </div>
            )}

            {/* Input Area */}
            <div className="p-5 bg-brand-dark/80 backdrop-blur-md border-t border-white/10">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 transition duration-500 blur"></div>
                <div className="relative flex">
                    <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter URL or describe your project..."
                    className="w-full bg-gray-900 text-white placeholder-gray-500 rounded-xl pl-5 pr-14 py-4 focus:outline-none focus:ring-0 shadow-inner"
                    disabled={loading || scanning}
                    />
                    <button
                    onClick={() => handleSend()}
                    disabled={loading || scanning || !input.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2.5 bg-brand-primary text-brand-dark rounded-lg hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                    >
                    <Send className="w-5 h-5" />
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;