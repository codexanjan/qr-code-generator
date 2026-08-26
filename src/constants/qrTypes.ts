import { QRCategory, QRFormData, QRType } from '../types/qr';

export interface QRTypeMeta {
  type: QRType;
  label: string;
  shortDesc: string;
  category: QRCategory;
  iconName: string;
  popular?: boolean;
}

export const QR_TYPES_META: QRTypeMeta[] = [
  // General
  { type: 'url', label: 'Website URL', shortDesc: 'Links, landing pages, articles', category: 'general', iconName: 'Globe', popular: true },
  { type: 'text', label: 'Plain Text', shortDesc: 'Notes, messages, raw codes', category: 'general', iconName: 'FileText' },
  
  // Contact
  { type: 'vcard', label: 'Contact (vCard)', shortDesc: 'Full digital business card', category: 'contact', iconName: 'Contact', popular: true },
  { type: 'email', label: 'Email Address', shortDesc: 'Pre-filled recipient and subject', category: 'contact', iconName: 'Mail' },
  { type: 'phone', label: 'Phone Call', shortDesc: 'Direct phone dialer trigger', category: 'contact', iconName: 'Phone' },
  { type: 'sms', label: 'SMS Message', shortDesc: 'Pre-composed text message', category: 'contact', iconName: 'MessageSquare' },
  { type: 'whatsapp', label: 'WhatsApp', shortDesc: 'Direct chat & pre-filled text', category: 'contact', iconName: 'MessageCircle', popular: true },

  // Social
  { type: 'instagram', label: 'Instagram', shortDesc: 'Profile or direct link', category: 'social', iconName: 'Instagram', popular: true },
  { type: 'youtube', label: 'YouTube', shortDesc: 'Channel or specific video', category: 'social', iconName: 'Youtube' },
  { type: 'linkedin', label: 'LinkedIn', shortDesc: 'Professional bio or company', category: 'social', iconName: 'Linkedin' },
  { type: 'social', label: 'Social Multi-Link', shortDesc: 'Multi-platform bio link list', category: 'social', iconName: 'Share2' },

  // Payment
  { type: 'upi', label: 'UPI / Payment', shortDesc: 'GPay, PhonePe, Paytm, BHIM', category: 'payment', iconName: 'CreditCard', popular: true },
  { type: 'crypto', label: 'Cryptocurrency', shortDesc: 'BTC, ETH, SOL, USDT transfer', category: 'payment', iconName: 'Coins' },

  // Utility
  { type: 'wifi', label: 'Wi-Fi Network', shortDesc: 'One-tap router auto-connect', category: 'utility', iconName: 'Wifi', popular: true },
  { type: 'location', label: 'Google Maps', shortDesc: 'Coordinates or map place', category: 'utility', iconName: 'MapPin' },
  { type: 'event', label: 'Calendar Event', shortDesc: 'iCal event with start & end', category: 'utility', iconName: 'Calendar' },
  { type: 'appstore', label: 'App Download', shortDesc: 'iOS App Store & Google Play', category: 'utility', iconName: 'Smartphone' },
];

export const QR_CATEGORIES: { id: QRCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Types (17)' },
  { id: 'general', label: 'General' },
  { id: 'contact', label: 'Contact & Chat' },
  { id: 'social', label: 'Social Media' },
  { id: 'payment', label: 'Payment & Crypto' },
  { id: 'utility', label: 'Utilities & Location' },
];

export const DEFAULT_FORM_DATA: Record<QRType, QRFormData> = {
  url: { type: 'url', data: { url: 'https://github.com' } },
  text: { type: 'text', data: { text: 'Welcome to QR Studio Pro!' } },
  wifi: { type: 'wifi', data: { ssid: 'Studio_Guest_WiFi', password: 'securepassword123', encryption: 'WPA', hidden: false } },
  email: { type: 'email', data: { email: 'contact@example.com', subject: 'Inquiry from QR Code', body: 'Hello, I would like to learn more about your services.' } },
  phone: { type: 'phone', data: { phone: '+12345678900' } },
  sms: { type: 'sms', data: { phone: '+12345678900', message: 'Hello! I scanned your QR code.' } },
  vcard: {
    type: 'vcard',
    data: {
      firstName: 'Alex',
      lastName: 'Morgan',
      organization: 'Acme Technologies Inc.',
      title: 'Chief Technology Officer',
      phone: '+1 (555) 234-5678',
      mobile: '+1 (555) 876-5432',
      email: 'alex.morgan@acmetech.io',
      website: 'https://acmetech.io',
      street: '500 Innovation Way, Suite 400',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'United States',
      note: 'Connect with me for partnerships and tech advisory.',
    },
  },
  whatsapp: { type: 'whatsapp', data: { phone: '+1234567890', message: 'Hi there! I would like to ask a quick question.' } },
  instagram: { type: 'instagram', data: { username: 'design.innovations' } },
  youtube: { type: 'youtube', data: { urlOrChannel: 'https://www.youtube.com/@TED', mode: 'channel' } },
  linkedin: { type: 'linkedin', data: { profileUrl: 'https://www.linkedin.com/company/google' } },
  location: { type: 'location', data: { mode: 'search', latitude: '40.758896', longitude: '-73.985130', query: 'Times Square, New York, NY, USA' } },
  event: {
    type: 'event',
    data: {
      title: 'Global Tech Summit 2026',
      location: 'Grand Ballroom & Virtual Stream',
      description: 'Annual flagship keynote and developer networking reception.',
      startDate: new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 16),
      endDate: new Date(Date.now() + 86400000 * 7 + 7200000).toISOString().slice(0, 16),
      allDay: false,
    },
  },
  crypto: {
    type: 'crypto',
    data: {
      currency: 'bitcoin',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      amount: '0.005',
      label: 'QR Studio Donation',
      message: 'Thank you for supporting open source development!',
    },
  },
  appstore: {
    type: 'appstore',
    data: {
      iosUrl: 'https://apps.apple.com/app/id123456789',
      androidUrl: 'https://play.google.com/store/apps/details?id=com.example.app',
      fallbackUrl: 'https://example.com/download',
    },
  },
  upi: {
    type: 'upi',
    data: {
      vpa: 'merchant@okhdfcbank',
      name: 'Artisan Coffee Roasters',
      amount: '250',
      note: 'Table 14 Order',
      currency: 'INR',
    },
  },
  social: {
    type: 'social',
    data: {
      title: 'Alex Rivera | Creator & Dev',
      bio: 'Building digital products & generative art.',
      links: [
        { platform: 'Twitter / X', url: 'https://x.com/design' },
        { platform: 'GitHub', url: 'https://github.com/developer' },
        { platform: 'Portfolio', url: 'https://alexrivera.design' },
      ],
    },
  },
};
