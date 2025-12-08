

import React, { useState } from 'react';
import { 
  Lock, Code, Type, Hash, Palette, FileText, QrCode, Monitor, 
  Copy, Check, RefreshCw, Download, FileCode, Image, Clock, 
  Database, Shield, Smartphone, Globe, Percent, Move, Binary, 
  FileJson, Link, Eye, Layout
} from 'lucide-react';
import { TEXT_CONTENT, Language, SECTION_TEMPLATES } from '../constants';

interface ToolsPageProps {
  lang?: Language;
}

const ToolsPage: React.FC<ToolsPageProps> = ({ lang = 'EN' }) => {
  // @ts-ignore
  const t = TEXT_CONTENT[lang].tools || TEXT_CONTENT['EN'].tools;
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // --- TOOL STATE ---
  // Password Generator
  const [pwdLength, setPwdLength] = useState(12);
  const [pwdResult, setPwdResult] = useState('');
  
  // Meta Tag
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [metaResult, setMetaResult] = useState('');

  // PX to REM
  const [pxValue, setPxValue] = useState(16);
  const [remResult, setRemResult] = useState('1rem');

  // Slug
  const [slugInput, setSlugInput] = useState('');
  const [slugResult, setSlugResult] = useState('');

  // Word Count
  const [textInput, setTextInput] = useState('');
  
  // Color
  const [colorInput, setColorInput] = useState('#000000');
  const [rgbResult, setRgbResult] = useState('rgb(0, 0, 0)');

  // JSON
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');

  // QR
  const [qrInput, setQrInput] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  // Case Converter
  const [caseInput, setCaseInput] = useState('');
  const [caseResult, setCaseResult] = useState('');

  // Lorem Ipsum
  const [loremParas, setLoremParas] = useState(3);
  const [loremResult, setLoremResult] = useState('');

  // Base64
  const [b64Input, setB64Input] = useState('');
  const [b64Result, setB64Result] = useState('');

  // URL Encode
  const [urlInput, setUrlInput] = useState('');
  const [urlResult, setUrlResult] = useState('');

  // UUID
  const [uuidResult, setUuidResult] = useState('');

  // Timestamp
  const [tsInput, setTsInput] = useState('');
  const [tsResult, setTsResult] = useState('');

  // Aspect Ratio
  const [ratioW, setRatioW] = useState(1920);
  const [ratioH, setRatioH] = useState(1080);
  const [ratioResult, setRatioResult] = useState('16:9');

  // Box Shadow
  const [bsH, setBsH] = useState(10);
  const [bsV, setBsV] = useState(10);
  const [bsB, setBsB] = useState(5);
  const [bsS, setBsS] = useState(0);
  const [bsC, setBsC] = useState('#000000');
  const [bsResult, setBsResult] = useState('');

  // HTML Entities
  const [htmlInput, setHtmlInput] = useState('');
  const [htmlResult, setHtmlResult] = useState('');

  // Markdown
  const [mdInput, setMdInput] = useState('# Hello World');
  const [mdResult, setMdResult] = useState('<h1>Hello World</h1>');

  // Binary
  const [binInput, setBinInput] = useState('');
  const [binResult, setBinResult] = useState('');

  // User Agent
  const [uaResult, setUaResult] = useState('');

  // JWT
  const [jwtInput, setJwtInput] = useState('');
  const [jwtResult, setJwtResult] = useState('');

  // Section Generator
  const [selectedTemplate, setSelectedTemplate] = useState('hero');


  // Helper
  const [copied, setCopied] = useState(false);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- LOGIC ---
  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < pwdLength; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPwdResult(password);
  };

  const generateMeta = () => {
    setMetaResult(`<title>${metaTitle}</title>\n<meta name="description" content="${metaDesc}">`);
  };

  const convertPxRem = (val: number) => {
    setPxValue(val);
    setRemResult(`${val / 16}rem`);
  };

  const generateSlug = (val: string) => {
    setSlugInput(val);
    setSlugResult(val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
  };

  const convertColor = (hex: string) => {
    setColorInput(hex);
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt("0x" + hex[1] + hex[1]);
      g = parseInt("0x" + hex[2] + hex[2]);
      b = parseInt("0x" + hex[3] + hex[3]);
    } else if (hex.length === 7) {
      r = parseInt("0x" + hex[1] + hex[2]);
      g = parseInt("0x" + hex[3] + hex[4]);
      b = parseInt("0x" + hex[5] + hex[6]);
    }
    setRgbResult(`rgb(${r}, ${g}, ${b})`);
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setJsonError('');
    } catch (e) {
      setJsonError('Invalid JSON');
    }
  };

  const generateQr = () => {
      if(!qrInput) return;
      setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrInput)}`);
  };

  const convertCase = (type: string) => {
      if(type === 'upper') setCaseResult(caseInput.toUpperCase());
      if(type === 'lower') setCaseResult(caseInput.toLowerCase());
      if(type === 'camel') setCaseResult(caseInput.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, ''));
  }

  const generateLorem = () => {
      const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
      setLoremResult(Array(loremParas).fill(text).join('\n\n'));
  }

  const handleBase64 = (mode: 'encode' | 'decode') => {
      try {
        if(mode === 'encode') setB64Result(btoa(b64Input));
        else setB64Result(atob(b64Input));
      } catch(e) { setB64Result('Error: Invalid input'); }
  }

  const handleUrl = (mode: 'encode' | 'decode') => {
      if(mode === 'encode') setUrlResult(encodeURIComponent(urlInput));
      else setUrlResult(decodeURIComponent(urlInput));
  }

  const generateUuid = () => {
      setUuidResult(crypto.randomUUID());
  }

  const convertTimestamp = () => {
      const date = new Date(tsInput);
      if(!isNaN(date.getTime())) setTsResult(Math.floor(date.getTime() / 1000).toString());
      else setTsResult('Invalid Date');
  }

  const calcAspectRatio = () => {
      const gcd = (a:number, b:number):number => b ? gcd(b, a%b) : a;
      const divisor = gcd(ratioW, ratioH);
      setRatioResult(`${ratioW/divisor}:${ratioH/divisor}`);
  }

  const updateBoxShadow = () => {
      setBsResult(`${bsH}px ${bsV}px ${bsB}px ${bsS}px ${bsC}`);
  }

  const handleHtmlEntities = (mode: 'encode' | 'decode') => {
      if(mode === 'encode') setHtmlResult(htmlInput.replace(/[\u00A0-\u9999<>&]/g, i => '&#'+i.charCodeAt(0)+';'));
      else {
          const txt = document.createElement('textarea');
          txt.innerHTML = htmlInput;
          setHtmlResult(txt.value);
      }
  }

  const handleBinary = (mode: 'toBin' | 'toText') => {
      if(mode === 'toBin') {
          setBinResult(binInput.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' '));
      } else {
          try {
             setBinResult(binInput.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join(''));
          } catch(e) { setBinResult('Invalid Binary'); }
      }
  }

  const getUA = () => {
      setUaResult(navigator.userAgent);
  }

  const decodeJwt = () => {
      try {
          const base64Url = jwtInput.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          setJwtResult(JSON.stringify(JSON.parse(jsonPayload), null, 2));
      } catch(e) { setJwtResult('Invalid JWT'); }
  }

  const tools = [
    { id: 'section', icon: Layout, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { id: 'password', icon: Lock, color: 'text-green-400', bg: 'bg-green-400/10' },
    { id: 'meta', icon: Code, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'pxrem', icon: Monitor, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: 'slug', icon: Hash, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { id: 'wordcount', icon: Type, color: 'text-pink-400', bg: 'bg-pink-400/10' },
    { id: 'color', icon: Palette, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { id: 'json', icon: FileJson, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { id: 'qr', icon: QrCode, color: 'text-red-400', bg: 'bg-red-400/10' },
    { id: 'case', icon: Type, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { id: 'lorem', icon: FileText, color: 'text-gray-400', bg: 'bg-gray-400/10' },
    { id: 'base64', icon: Binary, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: 'url', icon: Link, color: 'text-teal-400', bg: 'bg-teal-400/10' },
    { id: 'uuid', icon: Hash, color: 'text-violet-400', bg: 'bg-violet-400/10' },
    { id: 'timestamp', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { id: 'aspect', icon: Move, color: 'text-rose-400', bg: 'bg-rose-400/10' },
    { id: 'shadow', icon: Copy, color: 'text-zinc-400', bg: 'bg-zinc-400/10' },
    { id: 'html', icon: Code, color: 'text-lime-400', bg: 'bg-lime-400/10' },
    { id: 'markdown', icon: FileCode, color: 'text-sky-400', bg: 'bg-sky-400/10' },
    { id: 'binary', icon: Binary, color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 'ua', icon: Globe, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'jwt', icon: Shield, color: 'text-red-500', bg: 'bg-red-500/10' },
  ];

  return (
    <div className="pt-24 pb-20 bg-brand-dark min-h-screen">
      <div className="bg-brand-surface border-b border-white/5 py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.title}</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Tool Selection Grid */}
            <div className="lg:col-span-1 space-y-4">
                <h3 className="text-gray-400 font-bold uppercase text-xs tracking-wider mb-4 px-2">{t.selectTool}</h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 max-h-[800px] lg:overflow-y-auto lg:pr-2 custom-scrollbar">
                    {tools.map((tool) => {
                        const ToolIcon = tool.icon;
                        const info = t.list[tool.id as keyof typeof t.list];
                        return (
                            <button
                                key={tool.id}
                                onClick={() => setActiveTool(tool.id)}
                                className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                                    activeTool === tool.id 
                                    ? `bg-brand-surface border-brand-primary ${tool.color}`
                                    : 'bg-brand-surface/50 border-white/5 hover:border-white/20 text-gray-400 hover:text-white'
                                }`}
                            >
                                <div className={`p-2 rounded-lg ${tool.bg}`}>
                                    <ToolIcon className={`w-5 h-5 ${tool.color}`} />
                                </div>
                                <span className="font-bold text-sm truncate">{info.title}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tool Workspace */}
            <div className="lg:col-span-3">
                <div className="bg-brand-surface border border-white/10 rounded-3xl p-6 md:p-10 min-h-[500px]">
                    {!activeTool ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                            <Code className="w-16 h-16 text-brand-primary mb-4" />
                            <h3 className="text-2xl font-bold text-white">Select a tool to get started</h3>
                            <p className="text-gray-400 mt-2">Choose from the menu on the left.</p>
                        </div>
                    ) : (
                        <div className="animate-in fade-in zoom-in-95 duration-300 max-w-2xl mx-auto">
                            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                                {tools.find(t => t.id === activeTool) && (
                                    <div className={`p-3 rounded-xl ${tools.find(t => t.id === activeTool)?.bg}`}>
                                         {React.createElement(tools.find(t => t.id === activeTool)!.icon, { className: `w-8 h-8 ${tools.find(t => t.id === activeTool)?.color}` })}
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-3xl font-bold text-white">
                                        {t.list[activeTool as keyof typeof t.list].title}
                                    </h2>
                                    <p className="text-gray-400">{t.list[activeTool as keyof typeof t.list].desc}</p>
                                </div>
                            </div>

                            {/* --- TOOL IMPLEMENTATIONS --- */}

                            {/* 0. Section Generator */}
                            {activeTool === 'section' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        {Object.entries(SECTION_TEMPLATES).map(([key, template]) => (
                                            <button
                                                key={key}
                                                onClick={() => setSelectedTemplate(key)}
                                                className={`p-3 rounded-lg font-bold text-sm transition-colors ${selectedTemplate === key ? 'bg-indigo-500 text-white' : 'bg-white/5 hover:bg-white/10 text-gray-300'}`}
                                            >
                                                {template.name}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="relative border border-white/10 rounded-xl overflow-hidden bg-slate-950">
                                        <div className="bg-slate-900 border-b border-white/10 p-3 flex justify-between items-center">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Preview</span>
                                            <button onClick={() => copyToClipboard(SECTION_TEMPLATES[selectedTemplate as keyof typeof SECTION_TEMPLATES].html)} className="flex items-center gap-2 text-indigo-400 hover:text-white text-xs font-bold">
                                                {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
                                                {copied ? 'Copied' : 'Copy Code'}
                                            </button>
                                        </div>
                                        {/* Preview Container - Scaled for better view */}
                                        <div className="p-4 overflow-x-auto">
                                             <div className="min-w-[600px] border border-dashed border-white/20 rounded-lg p-2">
                                                 <div dangerouslySetInnerHTML={{ __html: SECTION_TEMPLATES[selectedTemplate as keyof typeof SECTION_TEMPLATES].html }} />
                                             </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="text-sm font-bold text-gray-300 mb-2 block">Source Code</label>
                                        <textarea
                                            readOnly
                                            rows={8}
                                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-gray-300 font-mono text-xs"
                                            value={SECTION_TEMPLATES[selectedTemplate as keyof typeof SECTION_TEMPLATES].html}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* 1. Password Generator */}
                            {activeTool === 'password' && (
                                <div className="space-y-6">
                                    <div className="flex justify-between text-gray-300 text-sm font-bold">
                                        <span>Length: {pwdLength}</span>
                                    </div>
                                    <input 
                                        type="range" min="6" max="32" value={pwdLength} 
                                        onChange={(e) => setPwdLength(parseInt(e.target.value))}
                                        className="w-full accent-brand-primary h-2 bg-brand-dark rounded-lg appearance-none cursor-pointer"
                                    />
                                    <button onClick={generatePassword} className="w-full py-4 bg-brand-primary text-brand-dark rounded-xl font-bold hover:bg-emerald-400 transition-colors">
                                        {t.generate}
                                    </button>
                                    {pwdResult && (
                                        <div className="bg-brand-dark p-4 rounded-xl border border-white/10 flex items-center justify-between">
                                            <code className="text-xl text-white font-mono break-all">{pwdResult}</code>
                                            <button onClick={() => copyToClipboard(pwdResult)} className="text-brand-primary hover:text-white">
                                                {copied ? <Check className="w-5 h-5"/> : <Copy className="w-5 h-5"/>}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* 2. Meta Tags */}
                            {activeTool === 'meta' && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-300">Page Title</label>
                                        <input type="text" className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-300">Description</label>
                                        <textarea rows={3} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" value={metaDesc} onChange={e => setMetaDesc(e.target.value)} />
                                    </div>
                                    <button onClick={generateMeta} className="w-full py-3 bg-brand-primary text-brand-dark rounded-xl font-bold hover:bg-emerald-400 transition-colors">{t.generate}</button>
                                    {metaResult && (
                                        <div className="bg-brand-dark p-4 rounded-xl border border-white/10 relative group">
                                            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">{metaResult}</pre>
                                            <button onClick={() => copyToClipboard(metaResult)} className="absolute top-2 right-2 text-brand-primary hover:text-white p-2">
                                                {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* 3. PX to REM */}
                            {activeTool === 'pxrem' && (
                                <div className="grid grid-cols-2 gap-8 items-center">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-300">Pixels (px)</label>
                                        <input type="number" className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white text-2xl font-bold" value={pxValue} onChange={e => convertPxRem(parseInt(e.target.value) || 0)} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-brand-primary">REM (root 16px)</label>
                                        <div className="w-full bg-brand-dark/50 border border-brand-primary/30 rounded-xl px-4 py-3 text-brand-primary text-2xl font-bold flex justify-between items-center">
                                            {remResult}
                                            <button onClick={() => copyToClipboard(remResult)} className="text-sm opacity-50 hover:opacity-100"><Copy className="w-4 h-4"/></button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 4. Slug Generator */}
                            {activeTool === 'slug' && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-300">{t.input}</label>
                                        <input type="text" className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" value={slugInput} onChange={e => generateSlug(e.target.value)} placeholder="My Cool Article Title" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-300">{t.output}</label>
                                        <div className="bg-brand-dark p-4 rounded-xl border border-white/10 flex justify-between items-center">
                                            <code className="text-brand-primary font-mono">{slugResult}</code>
                                            <button onClick={() => copyToClipboard(slugResult)} className="text-gray-400 hover:text-white"><Copy className="w-4 h-4"/></button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 5. Word Counter */}
                            {activeTool === 'wordcount' && (
                                <div className="space-y-6">
                                    <textarea 
                                        rows={8} 
                                        className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-primary outline-none" 
                                        placeholder="Paste your text here..."
                                        value={textInput}
                                        onChange={e => setTextInput(e.target.value)}
                                    />
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl text-center">
                                            <span className="block text-2xl font-bold text-white">{textInput.trim() === '' ? 0 : textInput.trim().split(/\s+/).length}</span>
                                            <span className="text-xs text-gray-400 uppercase">Words</span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl text-center">
                                            <span className="block text-2xl font-bold text-white">{textInput.length}</span>
                                            <span className="text-xs text-gray-400 uppercase">Characters</span>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl text-center">
                                            <span className="block text-2xl font-bold text-white">{Math.ceil(textInput.split(' ').length / 200)} min</span>
                                            <span className="text-xs text-gray-400 uppercase">Read Time</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 6. Color Converter */}
                            {activeTool === 'color' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-300">Select Color</label>
                                        <input 
                                            type="color" 
                                            className="w-full h-32 rounded-xl cursor-pointer bg-transparent" 
                                            value={colorInput}
                                            onChange={e => convertColor(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-6 flex flex-col justify-center">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-300">HEX</label>
                                            <div className="bg-brand-dark p-3 rounded-lg border border-white/10 flex justify-between">
                                                <span className="text-white font-mono">{colorInput}</span>
                                                <button onClick={() => copyToClipboard(colorInput)}><Copy className="w-4 h-4 text-gray-400 hover:text-white"/></button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-300">RGB</label>
                                            <div className="bg-brand-dark p-3 rounded-lg border border-white/10 flex justify-between">
                                                <span className="text-white font-mono">{rgbResult}</span>
                                                <button onClick={() => copyToClipboard(rgbResult)}><Copy className="w-4 h-4 text-gray-400 hover:text-white"/></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 7. JSON Formatter */}
                            {activeTool === 'json' && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-bold text-gray-300">JSON Input</label>
                                        <div className="flex gap-2">
                                            <button onClick={() => setJsonInput('')} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"><RefreshCw className="w-3 h-3"/> Clear</button>
                                            <button onClick={formatJson} className="text-xs bg-brand-primary text-brand-dark px-2 py-1 rounded font-bold hover:bg-emerald-400">Format</button>
                                        </div>
                                    </div>
                                    <textarea 
                                        rows={12} 
                                        className={`w-full bg-brand-dark border rounded-xl px-4 py-3 text-white font-mono text-sm outline-none ${jsonError ? 'border-red-500' : 'border-white/10'}`} 
                                        placeholder='{"key": "value"}'
                                        value={jsonInput}
                                        onChange={e => setJsonInput(e.target.value)}
                                    />
                                    {jsonError && <p className="text-red-400 text-sm">{jsonError}</p>}
                                </div>
                            )}

                            {/* 8. QR Generator */}
                            {activeTool === 'qr' && (
                                <div className="flex flex-col items-center gap-8">
                                    <div className="w-full space-y-4">
                                        <input 
                                            type="text" 
                                            placeholder="Enter URL or Text" 
                                            className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white"
                                            value={qrInput}
                                            onChange={e => setQrInput(e.target.value)}
                                        />
                                        <button onClick={generateQr} className="w-full py-3 bg-brand-primary text-brand-dark rounded-xl font-bold hover:bg-emerald-400 transition-colors">
                                            {t.generate}
                                        </button>
                                    </div>
                                    {qrUrl && (
                                        <div className="bg-white p-4 rounded-xl shadow-2xl text-center">
                                            <img src={qrUrl} alt="QR Code" className="w-48 h-48" />
                                            <a href={qrUrl} download="qrcode.png" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-brand-dark font-bold hover:text-brand-primary">
                                                <Download className="w-4 h-4" /> Download
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* 9. Case Converter */}
                            {activeTool === 'case' && (
                                <div className="space-y-6">
                                    <textarea 
                                        rows={4}
                                        className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                                        placeholder="Enter text to convert..."
                                        value={caseInput}
                                        onChange={e => setCaseInput(e.target.value)}
                                    />
                                    <div className="flex gap-2 flex-wrap">
                                        <button onClick={() => convertCase('upper')} className="bg-white/10 hover:bg-brand-primary/50 text-white px-4 py-2 rounded-lg font-bold text-sm">UPPERCASE</button>
                                        <button onClick={() => convertCase('lower')} className="bg-white/10 hover:bg-brand-primary/50 text-white px-4 py-2 rounded-lg font-bold text-sm">lowercase</button>
                                        <button onClick={() => convertCase('camel')} className="bg-white/10 hover:bg-brand-primary/50 text-white px-4 py-2 rounded-lg font-bold text-sm">camelCase</button>
                                    </div>
                                    <textarea 
                                        readOnly
                                        rows={4}
                                        className="w-full bg-brand-dark border border-brand-primary/30 rounded-xl px-4 py-3 text-white outline-none font-mono"
                                        value={caseResult}
                                    />
                                </div>
                            )}

                            {/* 10. Lorem Ipsum */}
                            {activeTool === 'lorem' && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <label className="text-gray-300 font-bold">Paragraphs:</label>
                                        <input 
                                            type="number" 
                                            min="1" max="20"
                                            className="bg-brand-dark text-white p-2 rounded-lg border border-white/10 w-20"
                                            value={loremParas}
                                            onChange={e => setLoremParas(parseInt(e.target.value))}
                                        />
                                        <button onClick={generateLorem} className="bg-brand-primary text-brand-dark px-4 py-2 rounded-lg font-bold">Generate</button>
                                    </div>
                                    <textarea 
                                        readOnly
                                        rows={8}
                                        className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-gray-300 outline-none"
                                        value={loremResult}
                                    />
                                </div>
                            )}

                            {/* 11. Base64 */}
                            {activeTool === 'base64' && (
                                <div className="space-y-6">
                                    <textarea 
                                        rows={4}
                                        className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white outline-none font-mono text-sm"
                                        placeholder="Enter text..."
                                        value={b64Input}
                                        onChange={e => setB64Input(e.target.value)}
                                    />
                                    <div className="flex gap-4">
                                        <button onClick={() => handleBase64('encode')} className="flex-1 bg-brand-primary text-brand-dark py-3 rounded-xl font-bold">Encode</button>
                                        <button onClick={() => handleBase64('decode')} className="flex-1 bg-brand-secondary text-white py-3 rounded-xl font-bold">Decode</button>
                                    </div>
                                    <textarea 
                                        readOnly
                                        rows={4}
                                        className="w-full bg-brand-dark border border-brand-primary/30 rounded-xl px-4 py-3 text-brand-primary outline-none font-mono text-sm"
                                        value={b64Result}
                                    />
                                </div>
                            )}

                            {/* 12. URL Encoder */}
                            {activeTool === 'url' && (
                                <div className="space-y-6">
                                    <textarea 
                                        rows={4}
                                        className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                                        placeholder="https://example.com/query?search=hello world"
                                        value={urlInput}
                                        onChange={e => setUrlInput(e.target.value)}
                                    />
                                    <div className="flex gap-4">
                                        <button onClick={() => handleUrl('encode')} className="flex-1 bg-brand-primary text-brand-dark py-3 rounded-xl font-bold">Encode</button>
                                        <button onClick={() => handleUrl('decode')} className="flex-1 bg-brand-secondary text-white py-3 rounded-xl font-bold">Decode</button>
                                    </div>
                                    <textarea 
                                        readOnly
                                        rows={4}
                                        className="w-full bg-brand-dark border border-brand-primary/30 rounded-xl px-4 py-3 text-white outline-none font-mono text-sm"
                                        value={urlResult}
                                    />
                                </div>
                            )}

                            {/* 13. UUID */}
                            {activeTool === 'uuid' && (
                                <div className="space-y-6 text-center">
                                    <button onClick={generateUuid} className="bg-brand-primary text-brand-dark px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-primary/20 hover:scale-105 transition-transform">
                                        Generate New UUID
                                    </button>
                                    {uuidResult && (
                                        <div onClick={() => copyToClipboard(uuidResult)} className="bg-brand-dark p-6 rounded-2xl border border-white/10 cursor-pointer hover:border-brand-primary transition-colors">
                                            <code className="text-2xl text-brand-primary font-mono">{uuidResult}</code>
                                            <p className="text-gray-500 text-sm mt-2">{copied ? 'Copied!' : 'Click to copy'}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* 14. Timestamp */}
                            {activeTool === 'timestamp' && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-gray-300 font-bold">Select Date/Time</label>
                                        <input 
                                            type="datetime-local" 
                                            className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white"
                                            onChange={e => setTsInput(e.target.value)}
                                        />
                                    </div>
                                    <button onClick={convertTimestamp} className="w-full bg-brand-primary text-brand-dark py-3 rounded-xl font-bold">Convert to Unix</button>
                                    {tsResult && (
                                        <div className="bg-brand-dark p-4 rounded-xl text-center">
                                            <span className="text-2xl font-mono text-brand-primary font-bold">{tsResult}</span>
                                            <p className="text-xs text-gray-500 mt-1">Seconds since epoch</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* 15. Aspect Ratio */}
                            {activeTool === 'aspect' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-gray-300 font-bold block mb-2">Width</label>
                                            <input type="number" value={ratioW} onChange={e => setRatioW(parseInt(e.target.value))} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" />
                                        </div>
                                        <div>
                                            <label className="text-gray-300 font-bold block mb-2">Height</label>
                                            <input type="number" value={ratioH} onChange={e => setRatioH(parseInt(e.target.value))} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white" />
                                        </div>
                                    </div>
                                    <button onClick={calcAspectRatio} className="w-full bg-brand-primary text-brand-dark py-3 rounded-xl font-bold">Calculate Ratio</button>
                                    <div className="bg-brand-dark p-6 rounded-xl text-center">
                                        <span className="text-4xl font-bold text-white">{ratioResult}</span>
                                    </div>
                                </div>
                            )}

                            {/* 16. Box Shadow */}
                            {activeTool === 'shadow' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-4">
                                            <label className="block text-gray-300">Horizontal: {bsH}px</label>
                                            <input type="range" min="-50" max="50" value={bsH} onChange={e => {setBsH(parseInt(e.target.value)); updateBoxShadow();}} className="w-full"/>
                                            
                                            <label className="block text-gray-300">Vertical: {bsV}px</label>
                                            <input type="range" min="-50" max="50" value={bsV} onChange={e => {setBsV(parseInt(e.target.value)); updateBoxShadow();}} className="w-full"/>
                                            
                                            <label className="block text-gray-300">Blur: {bsB}px</label>
                                            <input type="range" min="0" max="100" value={bsB} onChange={e => {setBsB(parseInt(e.target.value)); updateBoxShadow();}} className="w-full"/>

                                            <label className="block text-gray-300">Spread: {bsS}px</label>
                                            <input type="range" min="-50" max="50" value={bsS} onChange={e => {setBsS(parseInt(e.target.value)); updateBoxShadow();}} className="w-full"/>
                                        </div>
                                        <div className="flex items-center justify-center bg-white rounded-xl p-8">
                                            <div 
                                                className="w-32 h-32 bg-brand-primary rounded-xl"
                                                style={{ boxShadow: `${bsH}px ${bsV}px ${bsB}px ${bsS}px ${bsC}` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="bg-brand-dark p-4 rounded-xl border border-white/10 font-mono text-xs text-brand-primary break-all">
                                        box-shadow: {bsH}px {bsV}px {bsB}px {bsS}px {bsC};
                                    </div>
                                </div>
                            )}

                            {/* 17. HTML Entities */}
                            {activeTool === 'html' && (
                                <div className="space-y-6">
                                    <textarea 
                                        rows={4}
                                        className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                                        placeholder="Type text or HTML..."
                                        value={htmlInput}
                                        onChange={e => setHtmlInput(e.target.value)}
                                    />
                                    <div className="flex gap-4">
                                        <button onClick={() => handleHtmlEntities('encode')} className="flex-1 bg-brand-primary text-brand-dark py-3 rounded-xl font-bold">Encode</button>
                                        <button onClick={() => handleHtmlEntities('decode')} className="flex-1 bg-brand-secondary text-white py-3 rounded-xl font-bold">Decode</button>
                                    </div>
                                    <textarea 
                                        readOnly
                                        rows={4}
                                        className="w-full bg-brand-dark border border-brand-primary/30 rounded-xl px-4 py-3 text-gray-300 outline-none font-mono text-sm"
                                        value={htmlResult}
                                    />
                                </div>
                            )}

                            {/* 18. Markdown */}
                            {activeTool === 'markdown' && (
                                <div className="grid grid-cols-2 gap-4 h-[400px]">
                                    <textarea 
                                        className="bg-brand-dark border border-white/10 rounded-xl p-4 text-white resize-none font-mono text-sm"
                                        value={mdInput}
                                        onChange={e => setMdInput(e.target.value)}
                                    />
                                    <div className="bg-white text-black p-4 rounded-xl overflow-y-auto prose prose-sm">
                                        {/* Simple rendering for demo */}
                                        <h1 className="text-2xl font-bold mb-2">{mdInput.split('\n')[0].replace('# ', '')}</h1>
                                        <p className="text-sm text-gray-600">Enter markdown on the left to see basic preview logic here.</p>
                                    </div>
                                </div>
                            )}

                            {/* 19. Binary */}
                            {activeTool === 'binary' && (
                                <div className="space-y-6">
                                    <textarea 
                                        rows={4}
                                        className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white outline-none font-mono"
                                        placeholder="Enter text or binary (010101)..."
                                        value={binInput}
                                        onChange={e => setBinInput(e.target.value)}
                                    />
                                    <div className="flex gap-4">
                                        <button onClick={() => handleBinary('toBin')} className="flex-1 bg-brand-primary text-brand-dark py-3 rounded-xl font-bold">Text to Binary</button>
                                        <button onClick={() => handleBinary('toText')} className="flex-1 bg-brand-secondary text-white py-3 rounded-xl font-bold">Binary to Text</button>
                                    </div>
                                    <textarea 
                                        readOnly
                                        rows={4}
                                        className="w-full bg-brand-dark border border-brand-primary/30 rounded-xl px-4 py-3 text-brand-primary outline-none font-mono text-sm"
                                        value={binResult}
                                    />
                                </div>
                            )}

                             {/* 20. User Agent */}
                             {activeTool === 'ua' && (
                                <div className="space-y-6 text-center">
                                    <button onClick={getUA} className="bg-brand-primary text-brand-dark px-8 py-4 rounded-xl font-bold">Show My User Agent</button>
                                    {uaResult && (
                                        <div className="bg-brand-dark p-6 rounded-2xl border border-white/10">
                                            <code className="text-lg text-white font-mono">{uaResult}</code>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* 21. JWT */}
                            {activeTool === 'jwt' && (
                                <div className="space-y-6">
                                    <textarea 
                                        rows={3}
                                        className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white outline-none font-mono text-sm"
                                        placeholder="Paste JWT here (ey...)"
                                        value={jwtInput}
                                        onChange={e => setJwtInput(e.target.value)}
                                    />
                                    <button onClick={decodeJwt} className="w-full bg-brand-primary text-brand-dark py-3 rounded-xl font-bold">Decode Payload</button>
                                    {jwtResult && (
                                        <pre className="bg-brand-dark p-4 rounded-xl border border-white/10 text-brand-primary text-sm font-mono overflow-x-auto">
                                            {jwtResult}
                                        </pre>
                                    )}
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;