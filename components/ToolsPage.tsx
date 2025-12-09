
import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, Code, Type, Hash, Palette, FileText, QrCode, Monitor, 
  Copy, Check, RefreshCw, Download, FileCode, Image, Clock, 
  Database, Shield, Smartphone, Globe, Percent, Move, Binary, 
  FileJson, Link, Eye, Layout, Search, Mail, Scissors, 
  Shuffle, List, ChevronDown, ChevronUp, X, Sparkles, Terminal, 
  Ruler, Thermometer, Layers, Box, Cpu, Table, Cloud, ExternalLink,
  Play, Pause, RotateCcw
} from 'lucide-react';
import { TEXT_CONTENT, Language, SECTION_TEMPLATES } from '../constants';

interface ToolsPageProps {
  lang?: Language;
}

const ToolsPage: React.FC<ToolsPageProps> = ({ lang = 'EN' }) => {
  // @ts-ignore
  const t = TEXT_CONTENT[lang].tools || TEXT_CONTENT['EN'].tools;
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [genInput, setGenInput] = useState('');
  const [genResult, setGenResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Stopwatch/Timer State
  const [timerRunning, setTimerRunning] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
      // Reset input/output when tool changes
      setGenInput('');
      setGenResult('');
      setLoading(false);
      setTimerRunning(false);
      setTime(0);
      if(timerRef.current) clearInterval(timerRef.current);
  }, [activeTool]);

  useEffect(() => {
      if (timerRunning) {
          timerRef.current = setInterval(() => {
              setTime(prev => activeTool === 'timer' ? Math.max(0, prev - 100) : prev + 100);
          }, 100);
      } else {
          if (timerRef.current) clearInterval(timerRef.current);
      }
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerRunning, activeTool]);

  // --- HELPER LOGIC ---
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPlaceholder = () => {
      switch(activeTool) {
          case 'css_glass': return 'Enter: blur(px) transparency(0-1)\nExample: 10 0.5';
          case 'css_gradient': return 'Enter: color1 color2 direction(deg)\nExample: #ff0000 #0000ff 45';
          case 'css_border': return 'Enter: tl tr br bl (px)\nExample: 10 20 30 40';
          case 'css_triangle': return 'Enter: color direction size(px)\nExample: red up 50';
          case 'text_repeater': return 'Enter: text | count\nExample: Hello World | 5';
          case 'text_diff': return 'Enter: text1 ||| text2';
          case 'chmod_calc': return 'Enter: rwxr-xr-x OR 755';
          case 'hex_rgb': return 'Enter: #ff0000';
          case 'rgb_hex': return 'Enter: 255 0 0';
          case 'bmi_calc': return 'Enter: Weight(kg) Height(cm)\nExample: 70 175';
          case 'loan_calc': return 'Enter: Amount Rate(%) Months\nExample: 10000 5 12';
          case 'age_calc': return 'Enter DOB: YYYY-MM-DD\nExample: 1990-05-15';
          case 'percentage': return 'Enter: Value Total\nExample: 50 200';
          case 'days_between': return 'Enter: YYYY-MM-DD YYYY-MM-DD';
          case 'wptheme': return 'Paste page source code (Ctrl+U)';
          default: return 'Enter input here...';
      }
  };

  const formatTime = (ms: number) => {
      const s = Math.floor(ms / 1000);
      const m = Math.floor(s / 60);
      const h = Math.floor(m / 60);
      return `${h.toString().padStart(2, '0')}:${(m%60).toString().padStart(2, '0')}:${(s%60).toString().padStart(2, '0')}.${Math.floor((ms%1000)/100)}`;
  };

  const handleProcess = async () => {
    setLoading(true);
    let result = '';
    const input = genInput.trim();

    try {
        switch(activeTool) {
            // --- TEXT TOOLS ---
            case 'text_reverse': result = input.split('').reverse().join(''); break;
            case 'text_clean': result = input.replace(/\s+/g, ' ').trim(); break;
            case 'text_sort': result = input.split('\n').sort().join('\n'); break;
            case 'text_snake': result = input.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '_'); break;
            case 'text_kebab': result = input.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-'); break;
            case 'text_pascal': result = input.replace(/[^a-zA-Z0-9 ]/g, '').replace(/(?:^\w|[A-Z]|\b\w)/g, (w) => w.toUpperCase()).replace(/\s+/g, ''); break;
            case 'case': result = `UPPER: ${input.toUpperCase()}\nlower: ${input.toLowerCase()}\nCapitalized: ${input.replace(/\b\w/g, l => l.toUpperCase())}`; break;
            case 'strip': const doc = new DOMParser().parseFromString(input, 'text/html'); result = doc.body.textContent || ''; break;
            case 'wordcount': result = `Words: ${input.trim().split(/\s+/).length}\nCharacters: ${input.length}\nLines: ${input.split('\n').length}`; break;
            case 'email_extract': const emails = input.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi); result = emails ? [...new Set(emails)].join('\n') : 'No emails found'; break;
            case 'text_repeater': 
                const [txt, count] = input.split('|'); 
                result = txt.trim().repeat(parseInt(count || '1', 10)); 
                break;
            case 'text_diff': 
                const [t1, t2] = input.split('|||');
                result = t1 === t2 ? "Texts are identical" : "Texts are different";
                break;

            // --- DEV TOOLS ---
            case 'js_minifier': result = input.replace(/\s+/g, ' ').replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '').trim(); break; 
            case 'css_minifier': result = input.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/ ?(:|{|}) ?/g, '$1').trim(); break;
            case 'json': try { result = JSON.stringify(JSON.parse(input), null, 2); } catch(e) { result = 'Invalid JSON'; } break;
            case 'sql_format': 
                result = input.replace(/\s+/g, ' ')
                    .replace(/\b(SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|INSERT|UPDATE|DELETE|JOIN|LEFT|RIGHT|INNER|OUTER)\b/gi, '\n$1')
                    .replace(/\b(FROM)\b/gi, '\n$1')
                    .trim();
                break;
            case 'chmod_calc':
                if (input.match(/^[0-7]{3}$/)) {
                     const map = ['---','--x','-w-','-wx','r--','r-x','rw-','rwx'];
                     result = input.split('').map(n => map[parseInt(n)]).join('');
                } else {
                     result = "Enter numeric (e.g., 755) to convert to symbolic.";
                }
                break;
            case 'md5_gen': result = "MD5 requires external lib. Use SHA-256."; break; 
            case 'sha1_gen': 
            case 'sha256_gen': 
                const msgBuffer = new TextEncoder().encode(input);
                const hashBuffer = await crypto.subtle.digest(activeTool === 'sha1_gen' ? 'SHA-1' : 'SHA-256', msgBuffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                result = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                break;
            case 'uuid': result = crypto.randomUUID(); break;
            case 'base64': try { result = `Encoded: ${btoa(input)}\nDecoded: ${atob(input)}`; } catch(e) { result = 'Invalid Base64'; } break;
            case 'url': result = `Encoded: ${encodeURIComponent(input)}\nDecoded: ${decodeURIComponent(input)}`; break;
            case 'url_parse': try { const u = new URL(input); result = `Protocol: ${u.protocol}\nHost: ${u.hostname}\nPath: ${u.pathname}\nParams: ${u.search}`; } catch(e) { result = 'Invalid URL'; } break;
            case 'html': result = input.replace(/[\u00A0-\u9999<>&]/g, i => '&#'+i.charCodeAt(0)+';'); break;
            case 'slug': result = input.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''); break;
            case 'lorem': result = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."; break;
            case 'jwt': try { result = JSON.stringify(JSON.parse(atob(input.split('.')[1])), null, 2); } catch { result = "Invalid JWT Token"; } break;

            // --- CSS GENERATORS ---
            case 'css_glass':
                const [blur, opacity] = input.split(' ');
                result = `background: rgba(255, 255, 255, ${opacity || '0.2'});\nbackdrop-filter: blur(${blur || '10'}px);\n-webkit-backdrop-filter: blur(${blur || '10'}px);\nborder: 1px solid rgba(255, 255, 255, 0.3);`;
                break;
            case 'css_gradient':
                const parts = input.split(' ');
                result = `background: linear-gradient(${parts[2] || '90'}deg, ${parts[0] || '#000'}, ${parts[1] || '#fff'});`;
                break;
            case 'css_border':
                const [tl, tr, br, bl] = input.split(' ');
                result = `border-radius: ${tl || '10'}px ${tr || '10'}px ${br || '10'}px ${bl || '10'}px;`;
                break;
            case 'css_triangle':
                const [tCol, tDir, tSize] = input.split(' ');
                const s = tSize ? parseInt(tSize) : 50;
                const c = tCol || 'black';
                const trans = `${s}px solid transparent`;
                let border = '';
                if(tDir === 'up') border = `border-left: ${trans};\nborder-right: ${trans};\nborder-bottom: ${s}px solid ${c};`;
                else if(tDir === 'down') border = `border-left: ${trans};\nborder-right: ${trans};\nborder-top: ${s}px solid ${c};`;
                else if(tDir === 'left') border = `border-top: ${trans};\nborder-bottom: ${trans};\nborder-right: ${s}px solid ${c};`;
                else border = `border-top: ${trans};\nborder-bottom: ${trans};\nborder-left: ${s}px solid ${c};`;
                result = `width: 0; \nheight: 0; \n${border}`;
                break;
            case 'pxrem': result = `${input}px = ${parseFloat(input)/16}rem`; break;
            case 'aspect': const [w,h] = input.split(' '); result = `Ratio: ${parseFloat(w)/parseFloat(h)}`; break;
            case 'shadow': result = `box-shadow: ${input || '10px 10px 5px 0px rgba(0,0,0,0.75)'};`; break;

            // --- CONVERTERS ---
            case 'hex_rgb': 
                const hex = input.replace('#', '');
                const r = parseInt(hex.substring(0,2), 16);
                const g = parseInt(hex.substring(2,4), 16);
                const b = parseInt(hex.substring(4,6), 16);
                result = `rgb(${r}, ${g}, ${b})`;
                break;
            case 'rgb_hex':
                const [cr, cg, cb] = input.split(' ').map(Number);
                result = "#" + ((1 << 24) + (cr << 16) + (cg << 8) + cb).toString(16).slice(1).toUpperCase();
                break;
            case 'bin_dec': result = parseInt(input, 2).toString(); break;
            case 'dec_bin': result = parseInt(input).toString(2); break;
            case 'c_f': result = `${input}°C = ${(parseFloat(input) * 9/5) + 32}°F`; break;
            case 'f_c': result = `${input}°F = ${(parseFloat(input) - 32) * 5/9}°C`; break;
            case 'kg_lb': result = `${input}kg = ${parseFloat(input) * 2.20462}lbs`; break;
            case 'lb_kg': result = `${input}lbs = ${parseFloat(input) / 2.20462}kg`; break;
            case 'm_ft': result = `${input}m = ${parseFloat(input) * 3.28084}ft`; break;
            case 'ft_m': result = `${input}ft = ${parseFloat(input) / 3.28084}m`; break;

            // --- CALCULATORS ---
            case 'bmi_calc':
                const [weight, height] = input.split(' ').map(Number);
                const bmi = weight / ((height/100) ** 2);
                result = `BMI: ${bmi.toFixed(2)} (${bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : 'Overweight'})`;
                break;
            case 'percentage':
                const [val, total] = input.split(' ').map(Number);
                result = `${val} is ${(val/total*100).toFixed(2)}% of ${total}`;
                break;
            case 'age_calc':
                const dob = new Date(input);
                const diff = Date.now() - dob.getTime();
                const ageDate = new Date(diff);
                result = `Age: ${Math.abs(ageDate.getUTCFullYear() - 1970)} years`;
                break;
            case 'loan_calc':
                const [amt, rate, months] = input.split(' ').map(Number);
                const monthlyRate = (rate/100)/12;
                const payment = (amt * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
                result = `Monthly Payment: ${payment.toFixed(2)}\nTotal Interest: ${(payment * months - amt).toFixed(2)}`;
                break;
            case 'password_strength':
                 const len = input.length;
                 const hasUpper = /[A-Z]/.test(input);
                 const hasLower = /[a-z]/.test(input);
                 const hasNum = /[0-9]/.test(input);
                 const hasSym = /[^A-Za-z0-9]/.test(input);
                 let score = 0;
                 if(len > 8) score++;
                 if(len > 12) score++;
                 if(hasUpper && hasLower) score++;
                 if(hasNum) score++;
                 if(hasSym) score++;
                 result = `Strength: ${score}/5 ${score < 3 ? '(Weak)' : score < 5 ? '(Moderate)' : '(Strong)'}`;
                 break;

            // --- DETECTORS ---
            case 'wptheme': 
                const themeMatch = input.match(/wp-content\/themes\/([a-zA-Z0-9_-]+)/);
                result = themeMatch ? `Detected Theme: ${themeMatch[1]}` : "No WordPress theme folder pattern found.";
                break;
            case 'wpplugin':
                const pluginMatches = [...input.matchAll(/wp-content\/plugins\/([a-zA-Z0-9_-]+)/g)];
                const pl = [...new Set(pluginMatches.map(m => m[1]))];
                result = pl.length > 0 ? `Detected Plugins (${pl.length}):\n${pl.join('\n')}` : "No plugins found.";
                break;
            case 'shopify':
                result = input.includes('cdn.shopify.com') ? "Shopify assets detected in source." : "No Shopify footprint found.";
                break;

            // --- GENERATORS ---
            case 'robots': result = "User-agent: *\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php"; break;
            case 'sitemap': result = input.split('\n').map(u => `<url><loc>${u.trim()}</loc></url>`).join('\n'); break;
            case 'htaccess': result = `Redirect 301 ${input.split(' ')[0] || '/old'} ${input.split(' ')[1] || '/new'}`; break;
            case 'meta': result = `<title>${input}</title>\n<meta name="description" content="Description of ${input}">`; break;
            case 'og_gen': result = `<meta property="og:title" content="${input}" />\n<meta property="og:type" content="website" />`; break;
            case 'twitter_gen': result = `<meta name="twitter:card" content="summary">\n<meta name="twitter:title" content="${input}">`; break;
            case 'utm_builder': result = `${input}?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale`; break;

            // --- MISC / API ---
            case 'password': result = Array(12).fill(0).map(() => String.fromCharCode(Math.floor(Math.random() * 94) + 33)).join(''); break;
            case 'timestamp': result = Math.floor(Date.now() / 1000).toString(); break;
            case 'ip_lookup':
                const res = await fetch('https://api.ipify.org?format=json');
                const data = await res.json();
                result = `Your Public IP: ${data.ip}`;
                break;
            case 'binary': result = input.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' '); break;
            
            // MATH
            case 'list_random': const lines = input.split('\n'); result = lines[Math.floor(Math.random() * lines.length)]; break;
            case 'num_random': result = Math.floor(Math.random() * 1000).toString(); break;
            case 'prime_check': 
                const n = parseInt(input);
                let isPrime = n > 1;
                for(let i=2; i<=Math.sqrt(n); i++) if(n%i===0) isPrime = false;
                result = isPrime ? "Prime" : "Not Prime";
                break;
            case 'days_between':
                const [d1, d2] = input.split(' ');
                result = `${Math.abs((new Date(d2).getTime() - new Date(d1).getTime()) / (1000 * 60 * 60 * 24))} days`;
                break;

            default: result = "Ready to process."; break;
        }
    } catch (e) {
        result = "Error: Invalid Input Format. Check the example.";
    }
    setGenResult(result);
    setLoading(false);
  };

  // --- RENDER HELPERS ---
  const isLinkTool = ['whois', 'ssl', 'dns_lookup', 'domain_age', 'http_headers'].includes(activeTool || '');
  const isInteractive = ['stopwatch', 'timer'].includes(activeTool || '');
  
  const getExternalLink = () => {
    if (!genInput) return '#';
    const domain = genInput.replace(/(^\w+:|^)\/\//, '').split('/')[0];
    switch(activeTool) {
        case 'whois': return `https://who.is/whois/${domain}`;
        case 'ssl': return `https://www.ssllabs.com/ssltest/analyze.html?d=${domain}`;
        case 'dns_lookup': return `https://mxtoolbox.com/SuperTool.aspx?action=dns%3a${domain}`;
        case 'http_headers': return `https://securityheaders.com/?q=${domain}`;
        case 'domain_age': return `https://web.archive.org/web/*/${domain}`;
        default: return '#';
    }
  };

  const tools = [
    { id: 'section', icon: Layout, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { id: 'wptheme', icon: Search, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'wpplugin', icon: Shuffle, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'shopify', icon: Cloud, color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 'password', icon: Lock, color: 'text-green-400', bg: 'bg-green-400/10' },
    { id: 'meta', icon: Code, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'robots', icon: FileText, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { id: 'sitemap', icon: Globe, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { id: 'pxrem', icon: Monitor, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: 'slug', icon: Hash, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { id: 'wordcount', icon: Type, color: 'text-pink-400', bg: 'bg-pink-400/10' },
    { id: 'strip', icon: Scissors, color: 'text-red-500', bg: 'bg-red-500/10' },
    { id: 'color', icon: Palette, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { id: 'email_extract', icon: Mail, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { id: 'url_parse', icon: Link, color: 'text-teal-500', bg: 'bg-teal-500/10' },
    { id: 'csv_json', icon: FileJson, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'htaccess', icon: FileCode, color: 'text-gray-400', bg: 'bg-gray-400/10' },
    { id: 'ssl', icon: Shield, color: 'text-green-600', bg: 'bg-green-600/10' },
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
    // New CSS Generators
    { id: 'css_glass', icon: Layers, color: 'text-cyan-300', bg: 'bg-cyan-300/10' },
    { id: 'css_gradient', icon: Palette, color: 'text-fuchsia-400', bg: 'bg-fuchsia-400/10' },
    { id: 'css_border', icon: Box, color: 'text-indigo-300', bg: 'bg-indigo-300/10' },
    { id: 'css_triangle', icon: Sparkles, color: 'text-yellow-300', bg: 'bg-yellow-300/10' },
    // Text Utils
    { id: 'text_reverse', icon: Type, color: 'text-orange-300', bg: 'bg-orange-300/10' },
    { id: 'text_clean', icon: Scissors, color: 'text-red-300', bg: 'bg-red-300/10' },
    { id: 'text_sort', icon: List, color: 'text-green-300', bg: 'bg-green-300/10' },
    { id: 'text_snake', icon: Type, color: 'text-lime-300', bg: 'bg-lime-300/10' },
    { id: 'text_kebab', icon: Type, color: 'text-teal-300', bg: 'bg-teal-300/10' },
    { id: 'text_pascal', icon: Type, color: 'text-indigo-300', bg: 'bg-indigo-300/10' },
    { id: 'text_repeater', icon: RefreshCw, color: 'text-pink-300', bg: 'bg-pink-300/10' },
    { id: 'text_diff', icon: FileText, color: 'text-amber-300', bg: 'bg-amber-300/10' },
    // Dev Tools
    { id: 'js_minifier', icon: FileCode, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { id: 'css_minifier', icon: FileCode, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'md5_gen', icon: Lock, color: 'text-zinc-500', bg: 'bg-zinc-500/10' },
    { id: 'sha1_gen', icon: Lock, color: 'text-zinc-400', bg: 'bg-zinc-400/10' },
    { id: 'sha256_gen', icon: Lock, color: 'text-zinc-300', bg: 'bg-zinc-300/10' },
    { id: 'sql_format', icon: Database, color: 'text-orange-300', bg: 'bg-orange-300/10' },
    { id: 'chmod_calc', icon: Lock, color: 'text-red-300', bg: 'bg-red-300/10' },
    // Converters
    { id: 'hex_rgb', icon: Palette, color: 'text-pink-400', bg: 'bg-pink-400/10' },
    { id: 'rgb_hex', icon: Palette, color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { id: 'bin_dec', icon: Binary, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { id: 'dec_bin', icon: Binary, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { id: 'c_f', icon: Thermometer, color: 'text-red-400', bg: 'bg-red-400/10' },
    { id: 'f_c', icon: Thermometer, color: 'text-red-500', bg: 'bg-red-500/10' },
    { id: 'kg_lb', icon: Ruler, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: 'lb_kg', icon: Ruler, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'm_ft', icon: Ruler, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'ft_m', icon: Ruler, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    // Web/SEO
    { id: 'ip_lookup', icon: Globe, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { id: 'whois', icon: Search, color: 'text-blue-600', bg: 'bg-blue-600/10' },
    { id: 'dns_lookup', icon: Globe, color: 'text-orange-600', bg: 'bg-orange-600/10' },
    { id: 'domain_age', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-600/10' },
    { id: 'http_headers', icon: Code, color: 'text-gray-400', bg: 'bg-gray-400/10' },
    { id: 'og_gen', icon: ShareIcon, color: 'text-blue-300', bg: 'bg-blue-300/10' },
    { id: 'twitter_gen', icon: ShareIcon, color: 'text-sky-300', bg: 'bg-sky-300/10' },
    { id: 'utm_builder', icon: Link, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    // Calculators
    { id: 'bmi_calc', icon: FileText, color: 'text-rose-400', bg: 'bg-rose-400/10' },
    { id: 'percentage', icon: Percent, color: 'text-violet-400', bg: 'bg-violet-400/10' },
    { id: 'age_calc', icon: Clock, color: 'text-lime-400', bg: 'bg-lime-400/10' },
    { id: 'loan_calc', icon: DollarSignIcon, color: 'text-green-600', bg: 'bg-green-600/10' },
    { id: 'days_between', icon: Clock, color: 'text-teal-400', bg: 'bg-teal-400/10' },
    { id: 'password_strength', icon: Shield, color: 'text-red-600', bg: 'bg-red-600/10' },
    // Interactive
    { id: 'stopwatch', icon: Clock, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { id: 'timer', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { id: 'list_random', icon: Shuffle, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { id: 'num_random', icon: Hash, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { id: 'prime_check', icon: Hash, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  function ShareIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>; }
  function DollarSignIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>; }

  // Filter tools
  const filteredTools = tools.filter(tool => {
      // @ts-ignore
      const info = t.list[tool.id];
      if (!info) return false;
      const query = searchQuery.toLowerCase();
      return info.title.toLowerCase().includes(query) || info.desc.toLowerCase().includes(query);
  });

  const selectedToolInfo = activeTool ? 
    // @ts-ignore
    t.list[activeTool] : null;

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
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-brand-surface border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:border-brand-primary outline-none"
                    />
                </div>
                <div className="lg:hidden">
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="w-full flex items-center justify-between bg-brand-surface border border-white/10 rounded-xl px-4 py-3 text-white font-bold"
                    >
                        <span className="truncate">{selectedToolInfo ? selectedToolInfo.title : 'Select a Tool'}</span>
                        {mobileMenuOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                </div>
                <div className={`grid grid-cols-1 gap-2 custom-scrollbar ${mobileMenuOpen ? 'block' : 'hidden'} lg:block max-h-[80vh] overflow-y-auto pr-2`}>
                    {filteredTools.map((tool) => {
                        // @ts-ignore
                        const info = t.list[tool.id];
                        if (!info) return null;
                        const ToolIcon = tool.icon;
                        return (
                            <button
                                key={tool.id}
                                onClick={() => { setActiveTool(tool.id); setMobileMenuOpen(false); }}
                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${activeTool === tool.id ? `bg-brand-surface border-brand-primary ${tool.color}` : 'bg-brand-surface/50 border-white/5 hover:border-white/20 text-gray-400 hover:text-white'}`}
                            >
                                <div className={`p-2 rounded-lg flex-shrink-0 ${tool.bg}`}><ToolIcon className={`w-4 h-4 ${tool.color}`} /></div>
                                <div className="min-w-0">
                                    <div className="font-bold text-sm truncate">{info.title}</div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Workspace */}
            <div className="lg:col-span-3">
                <div className="bg-brand-surface border border-white/10 rounded-3xl p-6 md:p-10 min-h-[500px]">
                    {!activeTool ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-50 py-20">
                            <Code className="w-16 h-16 text-brand-primary mb-4" />
                            <h3 className="text-2xl font-bold text-white">Select a tool to begin</h3>
                        </div>
                    ) : (
                        <div className="animate-in fade-in zoom-in-95 duration-300 max-w-2xl mx-auto">
                            <div className="mb-8 pb-8 border-b border-white/10">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedToolInfo.title}</h2>
                                <p className="text-gray-400">{selectedToolInfo.desc}</p>
                            </div>

                            {/* --- TOOL UI RENDERER --- */}
                            
                            {/* SECTION GENERATOR */}
                            {activeTool === 'section' ? (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {Object.entries(SECTION_TEMPLATES).map(([key, tmpl]) => (
                                            <button key={key} onClick={() => setGenResult(tmpl.html)} className="bg-brand-dark p-3 rounded-lg border border-white/10 hover:border-brand-primary text-sm font-bold text-white capitalize">{tmpl.name}</button>
                                        ))}
                                    </div>
                                    <div className="bg-black/50 p-4 rounded-xl border border-white/10 relative">
                                        <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase">HTML Code</h4>
                                        <textarea readOnly className="w-full h-48 bg-transparent text-xs font-mono text-green-400 outline-none" value={genResult || SECTION_TEMPLATES.hero.html} />
                                        <button onClick={() => copyToClipboard(genResult || SECTION_TEMPLATES.hero.html)} className="absolute top-4 right-4 text-brand-primary hover:text-white"><Copy className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            ) : 
                            
                            /* EXTERNAL LINK TOOLS */
                            isLinkTool ? (
                                <div className="space-y-6 text-center py-10">
                                    <input 
                                        type="text" 
                                        placeholder="Enter Domain (e.g., google.com)" 
                                        className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white mb-4"
                                        value={genInput}
                                        onChange={e => setGenInput(e.target.value)}
                                    />
                                    <p className="text-gray-400 mb-6">This tool requires external analysis. We will redirect you to a trusted service.</p>
                                    <a 
                                        href={getExternalLink()} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className={`inline-flex items-center gap-2 bg-brand-primary text-brand-dark px-8 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-colors ${!genInput ? 'opacity-50 pointer-events-none' : ''}`}
                                    >
                                        Check on External Tool <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            ) :

                            /* INTERACTIVE TOOLS (Stopwatch/Timer) */
                            isInteractive ? (
                                <div className="space-y-6 text-center py-10">
                                     <div className="text-6xl font-mono text-white mb-8">
                                         {formatTime(activeTool === 'timer' ? (time || (parseInt(genInput || '300') * 1000)) : time)}
                                     </div>
                                     <div className="flex justify-center gap-4">
                                         <button onClick={() => { if(!timerRunning) { setTime(activeTool === 'timer' && time === 0 ? 300000 : time); setTimerRunning(true); }}} className="p-4 bg-green-500 rounded-full text-white hover:bg-green-600"><Play className="w-6 h-6" /></button>
                                         <button onClick={() => setTimerRunning(false)} className="p-4 bg-yellow-500 rounded-full text-white hover:bg-yellow-600"><Pause className="w-6 h-6" /></button>
                                         <button onClick={() => { setTimerRunning(false); setTime(0); }} className="p-4 bg-red-500 rounded-full text-white hover:bg-red-600"><RotateCcw className="w-6 h-6" /></button>
                                     </div>
                                     {activeTool === 'timer' && !timerRunning && (
                                         <div className="mt-6">
                                             <label className="text-sm text-gray-400">Set Timer (Seconds)</label>
                                             <input type="number" value={genInput} onChange={e => { setGenInput(e.target.value); setTime(parseInt(e.target.value) * 1000); }} className="block mx-auto mt-2 bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white text-center w-32" />
                                         </div>
                                     )}
                                </div>
                            ) :
                            
                            /* STANDARD INPUT/OUTPUT TOOLS */
                            (
                                <div className="space-y-6">
                                    {/* Input Area */}
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">
                                            {getPlaceholder().split('\n')[0]}
                                        </label>
                                        <textarea 
                                            rows={6} 
                                            className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-primary outline-none font-mono text-sm" 
                                            placeholder={getPlaceholder()}
                                            value={genInput} 
                                            onChange={e => setGenInput(e.target.value)} 
                                        />
                                    </div>

                                    <button 
                                        onClick={handleProcess} 
                                        disabled={loading || !genInput}
                                        className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Process'}
                                    </button>

                                    {/* Output Area */}
                                    {genResult && (
                                        <div className="bg-brand-dark p-4 rounded-xl border border-white/10 relative animate-in fade-in slide-in-from-top-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Result</label>
                                            <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap break-all">{genResult}</pre>
                                            <button 
                                                onClick={() => copyToClipboard(genResult)} 
                                                className="absolute top-4 right-4 p-2 bg-white/5 rounded-lg text-brand-primary hover:text-white"
                                            >
                                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>
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
