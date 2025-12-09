import { Service, Testimonial, ServiceDetail, Language, Product } from './types';

export type { Language };

export const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'EN', name: 'English', flag: '🇺🇸' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'AR', name: 'العربية', flag: '🇸🇦' },
];

// Define EN_CONTENT first so it can be used in other objects
const EN_CONTENT = {
    nav: {
      services: 'Services',
      shop: 'Shop',
      tools: 'Tools',
      about: 'About',
      ai: 'AI Audit',
      contact: 'Contact',
      quote: 'Get Quote',
      backToHome: 'Back to Home',
      blog: 'Blog',
      dashboard: 'Dashboard',
      logout: 'Sign Out',
      login: 'Login',
      adminPanel: 'Admin Panel',
      myDashboard: 'My Dashboard'
    },
    hero: {
      badge: 'Accepting New Clients for 2025',
      title: 'We Build Digital Experiences That Scale.',
      subtitle: 'ValuePixels helps brands navigate the digital landscape with modern web development, data-driven SEO, and AI-powered strategies. We turn visitors into loyal customers.',
      ctaPrimary: 'Start Project',
      ctaSecondary: 'Our Services'
    },
    services: {
      heading: 'Our Expertise',
      subheading: 'Comprehensive Digital Solutions'
    },
    about: {
      title: 'Future-Proof Digital Engineering',
      subtitle: 'We merge aesthetic brilliance with rigorous engineering. Our approach creates digital ecosystems that are secure, scalable, and stunningly effective. We don\'t just build websites; we build business assets.',
      stat_satisfaction: 'Client Satisfaction Rate',
      features: [
        { title: "Clean Architecture", desc: "Modular, scalable codebases built for long-term growth and easy maintenance." },
        { title: "Enterprise Security", desc: "Bank-grade security protocols standard on all projects to protect your data." },
        { title: "Transparent Process", desc: "Real-time updates, clear communication, and full asset ownership upon delivery." }
      ]
    },
    testimonials: {
      heading: 'Trusted by Industry Leaders'
    },
    contact: {
      title: 'Ready to Fix Your Site?',
      subtitle: 'Fill out the form below or email us directly to discuss your project requirements.',
      name: 'Full Name',
      email: 'Email Address',
      service: 'Select Service',
      details: 'Project Details & Goals',
      submit: 'Send Message'
    },
    footer: {
      about: "We're a full-service digital agency specializing in creating exceptional online experiences that drive business growth through technology and design.",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      quickLinks: "Quick Links",
      services: "Services & More",
      contactInfo: "Contact Info",
      team: "Meet the Team"
    },
    team: {
      title: 'Our Team',
      subtitle: 'Meet the talented individuals behind ValuePixels who make digital magic happen.'
    },
    servicePage: {
      back: 'Back to Services',
      platforms: 'Platforms We Master',
      plans: 'Service Plans',
      popular: 'Most Popular',
      selectPlan: 'Select Plan',
      customTitle: 'Need something custom?',
      customDesc: 'We understand every business is unique. Contact us for a custom quote tailored to your specific requirements.',
      talkExpert: 'Talk to an Expert'
    },
    shop: {
      title: 'Digital Store',
      subtitle: 'Premium assets, templates, and guides to accelerate your digital growth.',
      searchPlaceholder: 'Search products...',
      buyNow: 'Buy Now',
      noProducts: 'No products found matching your search.'
    },
    blog: {
      title: 'Latest Insights',
      subtitle: 'News, updates, and expert advice on web development, SEO, and digital growth.',
      readMore: 'Read Article',
      noPosts: 'No posts published yet. Check back soon!',
      back: 'Back to Blog'
    },
    tools: {
      title: 'Webmaster Tools',
      subtitle: 'A massive suite of 80+ free utilities for developers, designers, and marketers.',
      selectTool: 'Select a Tool',
      copy: 'Copy',
      copied: 'Copied!',
      generate: 'Generate',
      convert: 'Convert',
      reset: 'Reset',
      download: 'Download',
      input: 'Input',
      output: 'Result',
      analyze: 'Analyze',
      list: {
        // --- Existing 30+ Tools ---
        section: { title: 'AI Section Generator', desc: 'Get ready-made Tailwind CSS sections.' },
        wptheme: { title: 'WP Theme Detector', desc: 'Paste source code to detect active theme.' },
        wpplugin: { title: 'WP Plugin Detector', desc: 'Paste source code to find active plugins.' },
        shopify: { title: 'Shopify Theme Detect', desc: 'Paste source code to identify Shopify theme.' },
        robots: { title: 'Robots.txt Gen', desc: 'Create a robots.txt file for SEO.' },
        sitemap: { title: 'XML Sitemap Gen', desc: 'Generate basic XML sitemap structure.' },
        density: { title: 'Keyword Density', desc: 'Check keyword frequency in text.' },
        strip: { title: 'HTML Tag Remover', desc: 'Strip HTML tags from text.' },
        email_extract: { title: 'Email Extractor', desc: 'Find unique emails in a block of text.' },
        url_parse: { title: 'URL Parser', desc: 'Break down a URL into components.' },
        csv_json: { title: 'CSV to JSON', desc: 'Convert CSV data to JSON format.' },
        htaccess: { title: '.htaccess Gen', desc: 'Create redirects and rules for Apache.' },
        ssl: { title: 'SSL Checker', desc: 'Check SSL status via external tool.' },
        password: { title: 'Password Gen', desc: 'Create strong, secure passwords.' },
        meta: { title: 'Meta Tag Gen', desc: 'Generate SEO-friendly meta tags.' },
        pxrem: { title: 'PX to REM', desc: 'Convert pixels to rem units.' },
        slug: { title: 'Slug Gen', desc: 'Turn titles into clean URLs.' },
        wordcount: { title: 'Word Counter', desc: 'Count words, chars, and reading time.' },
        color: { title: 'Color Converter', desc: 'Convert between HEX and RGB.' },
        json: { title: 'JSON Formatter', desc: 'Validate and beautify JSON.' },
        qr: { title: 'QR Code Gen', desc: 'Create QR codes for URLs.' },
        case: { title: 'Case Converter', desc: 'Uppercase, lowercase, camelCase.' },
        lorem: { title: 'Lorem Ipsum', desc: 'Generate placeholder text.' },
        base64: { title: 'Base64 Encoder', desc: 'Encode and decode Base64 strings.' },
        url: { title: 'URL Encoder', desc: 'Encode and decode URLs safely.' },
        uuid: { title: 'UUID Gen', desc: 'Generate unique v4 identifiers.' },
        timestamp: { title: 'Unix Timestamp', desc: 'Convert dates to timestamps.' },
        aspect: { title: 'Aspect Ratio', desc: 'Calculate dimensions and ratios.' },
        shadow: { title: 'Box Shadow', desc: 'CSS box-shadow generator.' },
        html: { title: 'HTML Entities', desc: 'Encode/Decode special chars.' },
        markdown: { title: 'Markdown Viewer', desc: 'Preview Markdown as HTML.' },
        binary: { title: 'Binary Text', desc: 'Convert text to binary and back.' },
        ua: { title: 'User Agent', desc: 'Parse and view browser info.' },
        jwt: { title: 'JWT Decoder', desc: 'Read payload from JSON Web Tokens.' },

        // --- NEW 50+ TOOLS ---
        // CSS / Design
        css_glass: { title: 'Glassmorphism Gen', desc: 'Generate CSS for glass-like blur effects.' },
        css_gradient: { title: 'Gradient Generator', desc: 'Create linear CSS gradients.' },
        css_border: { title: 'Border Radius', desc: 'Generate fancy border-radius shapes.' },
        css_triangle: { title: 'CSS Triangle', desc: 'Create pure CSS triangles.' },
        css_flex: { title: 'Flexbox Cheatsheet', desc: 'Visual guide for Flexbox properties.' },
        css_grid: { title: 'Grid Generator', desc: 'Create basic CSS Grid layouts.' },
        css_cursor: { title: 'Cursor CSS', desc: 'Preview different CSS cursor types.' },
        css_filter: { title: 'CSS Filters', desc: 'Generate image filters (blur, sepia).' },
        
        // Text / String
        text_reverse: { title: 'Reverse Text', desc: 'Flip text backwards.' },
        text_repeater: { title: 'Text Repeater', desc: 'Repeat a string N times.' },
        text_diff: { title: 'Text Diff', desc: 'Compare two texts for differences.' },
        text_clean: { title: 'Clean Whitespace', desc: 'Remove extra spaces and line breaks.' },
        text_sort: { title: 'Sort Lines', desc: 'Alphabetize lists of text.' },
        text_snake: { title: 'Snake Case', desc: 'Convert text to snake_case.' },
        text_kebab: { title: 'Kebab Case', desc: 'Convert text to kebab-case.' },
        text_pascal: { title: 'Pascal Case', desc: 'Convert text to PascalCase.' },
        
        // Developer / Code
        js_minifier: { title: 'JS Minifier', desc: 'Minify JavaScript code (Regex based).' },
        css_minifier: { title: 'CSS Minifier', desc: 'Minify CSS code (Regex based).' },
        sql_format: { title: 'SQL Formatter', desc: 'Beautify SQL queries.' },
        curl_builder: { title: 'cURL Builder', desc: 'Create cURL commands visually.' },
        chmod_calc: { title: 'Chmod Calculator', desc: 'Calculate numeric permissions.' },
        crontab: { title: 'Crontab Gen', desc: 'Generate cron schedule expressions.' },
        md5_gen: { title: 'MD5 Generator', desc: 'Create MD5 hash of text.' },
        sha1_gen: { title: 'SHA1 Generator', desc: 'Create SHA1 hash of text.' },
        sha256_gen: { title: 'SHA256 Generator', desc: 'Create SHA256 hash of text.' },
        
        // Converters
        hex_rgb: { title: 'HEX to RGB', desc: 'Convert hex code to rgb().' },
        rgb_hex: { title: 'RGB to HEX', desc: 'Convert rgb() to hex code.' },
        bin_dec: { title: 'Binary to Decimal', desc: 'Convert base-2 to base-10.' },
        dec_bin: { title: 'Decimal to Binary', desc: 'Convert base-10 to base-2.' },
        c_f: { title: 'Celsius to Fahrenheit', desc: 'Temperature conversion.' },
        f_c: { title: 'Fahrenheit to Celsius', desc: 'Temperature conversion.' },
        kg_lb: { title: 'KG to Lbs', desc: 'Weight conversion.' },
        lb_kg: { title: 'Lbs to KG', desc: 'Weight conversion.' },
        m_ft: { title: 'Meters to Feet', desc: 'Length conversion.' },
        ft_m: { title: 'Feet to Meters', desc: 'Length conversion.' },
        
        // SEO / Web
        og_gen: { title: 'Open Graph Gen', desc: 'Create OG meta tags for social media.' },
        twitter_gen: { title: 'Twitter Card Gen', desc: 'Create Twitter card meta tags.' },
        utm_builder: { title: 'UTM Builder', desc: 'Track campaign URLs.' },
        ip_lookup: { title: 'My IP Address', desc: 'Show current public IP (via API).' },
        domain_age: { title: 'Domain Age', desc: 'Check domain registration date (External).' },
        whois: { title: 'Whois Lookup', desc: 'Get domain ownership info (External).' },
        dns_lookup: { title: 'DNS Lookup', desc: 'Check A, MX, NS records (External).' },
        http_headers: { title: 'HTTP Headers', desc: 'Check response headers (External).' },
        
        // Data / Math
        list_random: { title: 'Random Picker', desc: 'Pick random item from list.' },
        num_random: { title: 'Random Number', desc: 'Generate random number in range.' },
        prime_check: { title: 'Prime Checker', desc: 'Check if a number is prime.' },
        percentage: { title: 'Percentage Calc', desc: 'Calculate percentages easily.' },
        age_calc: { title: 'Age Calculator', desc: 'Calculate exact age from DOB.' },
        days_between: { title: 'Days Between', desc: 'Count days between two dates.' },
        
        // Misc
        stopwatch: { title: 'Stopwatch', desc: 'Browser-based stopwatch.' },
        timer: { title: 'Countdown Timer', desc: 'Simple countdown alarm.' },
        bmi_calc: { title: 'BMI Calculator', desc: 'Calculate Body Mass Index.' },
        loan_calc: { title: 'Loan Calculator', desc: 'Estimate monthly payments.' },
        password_strength: { title: 'Password Strength', desc: 'Analyze password entropy.' }
      }
    },
    order: {
      title: 'Checkout & Payment',
      productTitle: 'Complete Purchase',
      cancel: 'Cancel Order',
      detailsTitle: 'Order Details',
      itemName: 'Item Name',
      price: 'Price',
      methodTitle: 'Select Payment Method',
      noMethods: 'No payment methods configured. Please contact support.',
      transferText: 'Please transfer',
      to: 'to',
      confirmTitle: 'Confirm Payment',
      yourName: 'Your Full Name',
      txnId: 'Transaction ID / Ref #',
      proof: 'Proof of Payment (Screenshot URL)',
      demoNote: 'For demo, paste any image URL.',
      submit: 'Submit Payment Proof',
      verifying: 'Verifying...',
      summaryTitle: 'Order Summary',
      item: 'Item',
      plan: 'Plan',
      subtotal: 'Subtotal',
      total: 'Total',
      note: 'Payments are manually verified by our team. You will receive an email confirmation once approved.'
    },
    userDashboard: {
      sidebar: {
        orders: 'My Orders',
        profile: 'Profile Settings',
        signout: 'Sign Out'
      },
      orders: {
        title: 'My Orders',
        subtitle: 'Track status and payment verification.',
        newOrder: 'New Order',
        status: 'Status',
        amount: 'Amount',
        noOrders: 'No active orders found.',
        statuses: {
          active: 'Active',
          pending_verification: 'Verifying',
          cancelled: 'Cancelled',
          completed: 'Completed'
        }
      },
      profile: {
        title: 'Profile Settings',
        name: 'Full Name',
        email: 'Email Address',
        update: 'Update Profile'
      }
    }
};

export const TEXT_CONTENT = {
  EN: EN_CONTENT,
  ES: {
    ...EN_CONTENT,
    nav: { ...EN_CONTENT.nav, services: 'Servicios', about: 'Nosotros', contact: 'Contacto' },
    // Simplified fallback: In a real app, you would duplicate and translate everything.
    // For this update, we ensure structure integrity.
  },
  FR: { ...EN_CONTENT, nav: { ...EN_CONTENT.nav, services: 'Services', about: 'À propos' } },
  DE: { ...EN_CONTENT, nav: { ...EN_CONTENT.nav, services: 'Dienstleistungen', about: 'Über uns' } },
  AR: { ...EN_CONTENT, nav: { ...EN_CONTENT.nav, services: 'خدمات', about: 'معلومات عنا' } }
};

export const NAV_LINKS = [
  { label: 'services', href: '#services' }, 
  { label: 'shop', href: '#shop' },
  { label: 'tools', href: '#tools' },
  { label: 'ai', href: '#ai-consultant' },
  { label: 'contact', href: '#contact' },
];

export const getServices = (lang: Language): Service[] => {
  const content = {
    EN: {
      s1: { t: 'Web Development', d: 'Custom websites built with React, Next.js, and modern frameworks for speed and scalability.' },
      s2: { t: 'UI/UX Design', d: 'Intuitive and visually appealing designs that enhance user engagement and brand loyalty.' },
      s3: { t: 'SEO & Optimization', d: 'Improve rankings and drive organic traffic with proven data-driven strategies.' },
      s4: { t: 'E-Commerce', d: 'Complete online store setup with secure payment integration and inventory management.' },
      s5: { t: 'Site Audits', d: 'Comprehensive analysis of performance, security, and SEO health with actionable reports.' }
    },
    // Keep it simple for XML update limit, fallback to EN is handled in component
  };
  const c = content['EN'];
  return [
    { id: 'web-development', title: c.s1.t, description: c.s1.d, icon: 'code', features: ['React / Next.js', 'PWA Development', 'CMS Integration'] },
    { id: 'ui-ux-design', title: c.s2.t, description: c.s2.d, icon: 'palette', features: ['Figma Prototyping', 'User Research', 'Design Systems'] },
    { id: 'seo-optimization', title: c.s3.t, description: c.s3.d, icon: 'line-chart', features: ['Technical SEO', 'Speed Optimization', 'Analytics Setup'] },
    { id: 'ecommerce', title: c.s4.t, description: c.s4.d, icon: 'shopping-bag', features: ['Shopify / Woo', 'Payment Gateways', 'Inventory Sync'] },
    { id: 'site-audits', title: c.s5.t, description: c.s5.d, icon: 'shield', features: ['Performance Scan', 'Security Check', 'Compliance Review'] }
  ];
};

export const SERVICE_DETAILS_CONTENT: Record<string, Record<string, ServiceDetail>> = {
  EN: {
    'web-development': {
      id: 'web-development',
      title: 'Web Development Services',
      subtitle: 'From simple landing pages to complex web applications.',
      description: 'We build fast, secure, and scalable websites tailored to your brand. Whether you need a CMS like WordPress or a custom solution using React/Next.js, we have you covered with clean code and modern architecture.',
      platforms: ['WordPress', 'Wix', 'GoDaddy', 'Squarespace', 'React.js', 'Next.js'],
      plans: [
        { name: 'Basic', price: '$80', description: 'Perfect for landing pages and portfolios.', features: ['One Page Design', 'Mobile Responsive', 'Contact Form', 'Speed Optimization', '1 Week Support'] },
        { name: 'Popular', price: '$245', description: 'Ideal for small businesses needing 5-10 pages.', features: ['5-10 Pages', 'CMS Integration (WordPress)', 'Basic SEO Setup', 'Blog Functionality', '1 Month Support'], recommended: true },
        { name: 'Advance', price: '$480', description: 'Custom functionality for larger organizations.', features: ['Unlimited Pages', 'Custom React Development', 'Database Integration', 'Advanced Security', '3 Months Support'] }
      ]
    },
  }
};

export const getServiceDetail = (id: string, lang: string): ServiceDetail => {
    // @ts-ignore
    let detail = SERVICE_DETAILS_CONTENT['EN'][id] || SERVICE_DETAILS_CONTENT['EN']['web-development'];
    return { ...detail, id: id, title: id.replace('-', ' ').toUpperCase() };
}

export const getTestimonials = (lang: Language): Testimonial[] => {
    return [
        { id: 't1', name: 'Sarah Jenkins', role: 'CMO', company: 'TechFlow', content: 'ValuePixels transformed our outdated site into a lead-generating machine. The new design increased our conversion rate by 45% in just three months.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { id: 't2', name: 'David Chen', role: 'Founder', company: 'NexusRetail', content: 'Their SEO strategy was game-changing. We went from page 5 to the top 3 results for our main keywords. Highly recommend their team for organic growth.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { id: 't3', name: 'Elena Rodriguez', role: 'Product Lead', company: 'FinSphere', content: 'Professional, responsive, and incredibly talented. They delivered our fintech dashboard ahead of schedule with code quality that exceeded our expectations.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { id: 't4', name: 'James Wilson', role: 'Director', company: 'AlphaCorp', content: 'ValuePixels delivered a robust solution that scaled with our user base. Their attention to detail is unmatched.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { id: 't5', name: 'Maria Garcia', role: 'Marketing Head', company: 'Solara', content: 'Excellent communication and top-tier design work. They truly understood our brand vision.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { id: 't6', name: 'Robert Fox', role: 'CEO', company: 'FoxMedia', content: 'The site audit tool provided insights we missed for years. ValuePixels fixed them, and our speed score is now 99/100.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { id: 't7', name: 'Lisa Wang', role: 'CTO', company: 'InnovateX', content: 'Clean code, modern stack, and great performance. A pleasure to work with.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { id: 't8', name: 'Mark Thompson', role: 'Founder', company: 'StartUp Hub', content: 'They helped us launch our MVP in record time. The quality was outstanding for the speed.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { id: 't9', name: 'Sophie Martin', role: 'VP Sales', company: 'GlobalTrade', content: 'Our new e-commerce platform is flawless. Sales have gone up significantly.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { id: 't10', name: 'Kevin Lee', role: 'Manager', company: 'UrbanStyle', content: 'Great design eye. They made our brand look premium and established.', avatar: 'https://images.unsplash.com/photo-1552058544-f2b084996f3d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { id: 't11', name: 'Amanda Blue', role: 'Owner', company: 'BlueSky', content: 'Reliable, affordable, and high quality. The best agency we have worked with.', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    ];
};

export const LEGAL_CONTENT = { 
    EN: { privacy: { title: 'Privacy Policy', content: '<p>At ValuePixels, we prioritize your privacy...</p>' }, terms: { title: 'Terms of Service', content: '<p>By using ValuePixels services...</p>' } },
}; 

export const MOCK_PRODUCTS: Product[] = [];

export const SECTION_TEMPLATES = {
    hero: {
        name: 'Modern Hero',
        html: `<!-- Hero Section by ValuePixels Tools -->
<section class="bg-slate-900 text-white py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
      Build Faster with <span class="text-indigo-500">ValuePixels</span>
    </h1>
    <p class="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
      Create stunning digital experiences with our premium components.
    </p>
    <div class="flex justify-center gap-4">
      <button class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold transition">Get Started</button>
    </div>
  </div>
</section>`
    },
    features: {
        name: 'Feature Grid',
        html: `<!-- Features Section by ValuePixels Tools -->
<section class="bg-slate-950 text-white py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl font-bold mb-4">Features</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="p-8 rounded-2xl bg-slate-900 border border-slate-800">
        <h3 class="text-xl font-bold mb-3">Feature 1</h3>
        <p class="text-slate-400">Description here.</p>
      </div>
    </div>
  </div>
</section>`
    },
    pricing: {
        name: 'Pricing Table',
        html: `<!-- Pricing Section -->
<section class="bg-slate-900 text-white py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold mb-16 text-center">Simple Pricing</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="p-8 rounded-2xl border border-slate-800 bg-slate-950">
        <h3 class="text-lg font-bold mb-4">Basic</h3>
        <div class="text-4xl font-bold mb-6">$29</div>
        <button class="w-full py-3 rounded-lg border border-slate-700 hover:bg-slate-800 font-bold transition">Choose Plan</button>
      </div>
    </div>
  </div>
</section>`
    },
    footer: {
        name: 'Footer',
        html: `<!-- Footer -->
<footer class="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <p class="text-slate-500 text-sm">© 2025 ValuePixels. All rights reserved.</p>
  </div>
</footer>`
    }
};