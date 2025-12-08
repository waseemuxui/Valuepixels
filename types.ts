
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  platforms: string[];
  plans: PricingPlan[];
}

export enum Section {
  HERO = 'hero',
  SERVICES = 'services',
  ABOUT = 'about',
  AI_CONSULTANT = 'ai-consultant',
  CONTACT = 'contact'
}

export type Language = 'EN' | 'ES' | 'FR' | 'DE' | 'AR';

// --- Auth & Dashboard Types ---

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  password?: string; // For local auth simulation
}

export interface PaymentAccount {
  id: string;
  type: 'payoneer' | 'paypal' | 'bank';
  name: string; // e.g. "My Payoneer"
  identifier: string; // e.g. email or IBAN
  instructions: string;
}

export interface Order {
  id: string;
  userId: string; // Link to user
  userName: string;
  userEmail: string;
  service: string;
  plan: string;
  status: 'pending_payment' | 'pending_verification' | 'active' | 'completed' | 'cancelled';
  date: string;
  amount: string;
  isProduct?: boolean;
  paymentMethod?: string;
  transactionId?: string;
  proofOfPayment?: string; // URL to screenshot
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  status: 'published' | 'draft';
  views: number;
  date: string;
  author: string;
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
  showInHeader: boolean;
  showInFooter: boolean;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  seoTitle: string;
  seoKeywords: string;
  seoDescription: string;
  aiApiKey?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}