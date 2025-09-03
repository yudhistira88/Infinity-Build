
export interface ServiceCategory {
  name: string;
  icon: React.ReactNode;
  color: string;
}

export interface Service {
  id: string;
  name: string;
  priceRange: string;
  image: string;
  category: string;
  description?: string;
}

export type OrderStatus = 'Waiting for Payment' | 'Survey' | 'In Progress' | 'Warranty Period' | 'Completed' | 'Cancelled';

export interface OrderTimelineStep {
  title: string;
  date: string;
  status: 'completed' | 'in_progress' | 'pending';
}

export interface Order {
  id: string;
  serviceName: string;
  date: string;
  status: OrderStatus;
  provider: {
    name: string;
    avatar: string;
  };
  timeline?: OrderTimelineStep[];
  costDetails?: {
    service: number;
    materials?: number;
    total: number;
  };
}

export interface ChatMessage {
    id: string;
    text: string;
    timestamp: string;
    sender: 'user' | 'provider';
    status?: 'sent' | 'delivered' | 'read';
}

export interface Message {
  id: string;
  senderName: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
  unreadCount: number;
  messages?: ChatMessage[];
}

export interface BannerSlide {
  id: string;
  image: string;
  bgColor: string;
  title: string;
  subtitle: string;
  promoText: {
    line1: string;
    line2: string;
    line3: string;
  };
  validUntil: string;
  terms: string[];
}

export interface Notification {
  id:string;
  title: string;
  description: string;
  timestamp: string;
  iconType: 'order' | 'promo' | 'account';
  read: boolean;
  linkPath?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
}