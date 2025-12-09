
import { User, Order, BlogPost, CustomPage, Product, PaymentAccount, SiteConfig, TeamMember } from '../types';
import { MOCK_PRODUCTS } from '../constants';

// Initial Seed Data
const INITIAL_ADMIN: User = {
  id: 'admin-1',
  name: 'Site Admin',
  email: 'admin@sitefix.com',
  role: 'admin',
  avatar: 'https://ui-avatars.com/api/?name=Site+Admin&background=10b981&color=fff',
  password: 'admin'
};

const INITIAL_USER: User = {
  id: 'user-1',
  name: 'John Client',
  email: 'user@example.com',
  role: 'user',
  avatar: 'https://ui-avatars.com/api/?name=John+Client&background=8b5cf6&color=fff',
  password: 'user'
};

const INITIAL_PAYMENT_ACCOUNTS: PaymentAccount[] = [
    { id: 'pay1', type: 'paypal', name: 'Primary PayPal', identifier: 'admin@valuepixels.com', instructions: 'Send as Friends & Family. Please note the Order ID in comments.' },
    { id: 'pay2', type: 'payoneer', name: 'Business Payoneer', identifier: 'payments@valuepixels.com', instructions: 'Transfer to USD balance. Include Order ID in memo.' }
];

const INITIAL_POSTS: BlogPost[] = [
    { 
        id: '1', 
        title: 'Top 10 SEO Strategies for 2026', 
        excerpt: 'Discover the latest trends in search engine optimization that will dominate the digital landscape next year.',
        content: '<p>Search Engine Optimization is evolving rapidly...</p><h3>1. Core Web Vitals</h3><p>Speed is king. Google now prioritizes...</p>',
        image: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        status: 'published', 
        views: 1240, 
        date: '2023-10-15',
        author: 'ValuePixels Team' 
    }
];

const INITIAL_PAGES: CustomPage[] = [
    {
        id: 'page-faq',
        title: 'FAQ',
        slug: 'faq',
        content: '<h2>Frequently Asked Questions</h2><p><strong>Q: What services do you offer?</strong><br>A: We offer web development, SEO, branding, and more.</p><p><strong>Q: How long does a project take?</strong><br>A: It depends on the scope, typically 2-4 weeks.</p>',
        status: 'published',
        showInHeader: false,
        showInFooter: true,
        date: new Date().toISOString()
    },
    {
        id: 'page-careers',
        title: 'Careers',
        slug: 'careers',
        content: '<h2>Join Our Team</h2><p>We are always looking for talented developers and designers. Send your resume to careers@valuepixels.com.</p>',
        status: 'published',
        showInHeader: false,
        showInFooter: true,
        date: new Date().toISOString()
    },
    {
        id: 'page-refund',
        title: 'Refund Policy',
        slug: 'refund-policy',
        content: '<h2>Refund Policy</h2><p>We offer a satisfaction guarantee. If you are not satisfied with our initial designs, we provide a full refund within 7 days of project start.</p>',
        status: 'published',
        showInHeader: false,
        showInFooter: true,
        date: new Date().toISOString()
    }
];

const INITIAL_TEAM: TeamMember[] = [
    {
        id: 'tm-1',
        name: 'Alex Rivera',
        role: 'Lead Developer',
        bio: 'Full-stack expert with 10+ years in React and Node.js ecosystems.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        socials: { twitter: '#', github: '#' }
    },
    {
        id: 'tm-2',
        name: 'Sarah Chen',
        role: 'Creative Director',
        bio: 'Award-winning UI/UX designer passionate about user-centric experiences.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        socials: { linkedin: '#' }
    },
    {
        id: 'tm-3',
        name: 'Michael Ross',
        role: 'SEO Strategist',
        bio: 'Data-driven marketer helping brands dominate search rankings.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        socials: { twitter: '#' }
    }
];

const DEFAULT_CONFIG: SiteConfig = {
  siteName: 'ValuePixels',
  siteDescription: 'A premium digital agency specializing in web development, design, SEO, and AI-driven digital strategy.',
  contactEmail: 'waseemuxui@gmail.com',
  contactPhone: '+92 334 1122126',
  address: '123 Innovation Drive, Tech Valley, CA',
  seoTitle: 'ValuePixels | Digital Excellence',
  seoKeywords: 'web development, seo, digital agency, react, nextjs, ai services',
  seoDescription: 'ValuePixels helps brands navigate the digital landscape with modern web development, data-driven SEO, and AI-powered strategies.',
  aiApiKey: ''
};

// Helper to get/set
const get = <T>(key: string, defaultVal: T): T => {
    if (typeof window === 'undefined') return defaultVal;
    try {
        const stored = localStorage.getItem(key);
        if (!stored) return defaultVal;
        
        const parsed = JSON.parse(stored);

        // Valid null check - return default if null or undefined explicitly stored
        if (parsed === null || parsed === undefined) {
            return defaultVal;
        }

        // STRICT ARRAY CHECK: If default is array, parsed MUST be array
        if (Array.isArray(defaultVal)) {
            if (!Array.isArray(parsed)) {
                console.warn(`Storage key "${key}" expected Array but got ${typeof parsed}. Resetting to default.`);
                return defaultVal;
            }
            return parsed as T;
        }
        
        // If expected default is an object (and not array), ensure we return an object
        if (
            typeof defaultVal === 'object' && 
            defaultVal !== null
        ) {
            // If parsed data is not a valid object, return default to prevent crashes
            if (typeof parsed !== 'object' || Array.isArray(parsed)) {
                return defaultVal;
            }
            // Merge to ensure no missing keys if new properties were added to types later
            return { ...defaultVal, ...parsed };
        }

        return parsed as T;
    } catch {
        return defaultVal;
    }
};

const set = (key: string, val: any) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
        console.error("Storage save failed", e);
    }
};

// --- API ---

export const storage = {
    // USERS
    getUsers: () => get<User[]>('sf_users', [INITIAL_ADMIN, INITIAL_USER]),
    saveUser: (user: User) => {
        const users = storage.getUsers();
        if (!users.find(u => u.email === user.email)) {
            users.push(user);
            set('sf_users', users);
        }
    },
    saveUsers: (users: User[]) => set('sf_users', users), 
    
    // ORDERS
    getOrders: () => get<Order[]>('sf_orders', []),
    saveOrder: (order: Order) => {
        const orders = storage.getOrders();
        orders.unshift(order); // Add to top
        set('sf_orders', orders);
    },
    updateOrder: (updatedOrder: Order) => {
        const orders = storage.getOrders().map(o => o.id === updatedOrder.id ? updatedOrder : o);
        set('sf_orders', orders);
    },

    // PRODUCTS
    getProducts: () => get<Product[]>('sf_products', MOCK_PRODUCTS),
    saveProducts: (products: Product[]) => set('sf_products', products),

    // BLOG POSTS
    getPosts: () => get<BlogPost[]>('sf_posts', INITIAL_POSTS),
    savePosts: (posts: BlogPost[]) => set('sf_posts', posts),

    // PAGES
    getPages: () => get<CustomPage[]>('sf_pages', INITIAL_PAGES),
    savePages: (pages: CustomPage[]) => set('sf_pages', pages),

    // PAYMENT ACCOUNTS
    getPaymentAccounts: () => get<PaymentAccount[]>('sf_payment_accounts', INITIAL_PAYMENT_ACCOUNTS),
    savePaymentAccounts: (accounts: PaymentAccount[]) => set('sf_payment_accounts', accounts),

    // SITE CONFIG
    getSiteConfig: () => get<SiteConfig>('sf_config', DEFAULT_CONFIG),
    saveSiteConfig: (config: SiteConfig) => set('sf_config', config),

    // TEAM MEMBERS
    getTeamMembers: () => get<TeamMember[]>('sf_team', INITIAL_TEAM),
    saveTeamMembers: (members: TeamMember[]) => set('sf_team', members)
};
