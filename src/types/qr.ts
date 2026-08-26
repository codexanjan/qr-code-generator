export type QRType =
  | 'url'
  | 'text'
  | 'wifi'
  | 'email'
  | 'phone'
  | 'sms'
  | 'vcard'
  | 'whatsapp'
  | 'instagram'
  | 'youtube'
  | 'linkedin'
  | 'location'
  | 'event'
  | 'crypto'
  | 'appstore'
  | 'upi'
  | 'social';

export type QRCategory = 'general' | 'contact' | 'social' | 'payment' | 'utility';

export type DotType =
  | 'square'
  | 'dots'
  | 'rounded'
  | 'classy'
  | 'classy-rounded'
  | 'extra-rounded';

export type CornerSquareType = 'square' | 'dot' | 'extra-rounded';
export type CornerDotType = 'square' | 'dot';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type ColorMode = 'single' | 'gradient';
export type GradientType = 'linear' | 'radial';

export type FrameStyle = 'none' | 'bottom-banner' | 'top-banner' | 'pill' | 'badge' | 'card';

export interface QRFrameConfig {
  style: FrameStyle;
  text: string;
  textColor: string;
  bgColor: string;
}

export interface QRCustomization {
  // Dot / Pattern
  dotType: DotType;
  
  // Corners
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  customCornerColors: boolean;
  cornerSquareColor: string;
  cornerDotColor: string;
  
  // Colors
  colorMode: ColorMode;
  gradientType: GradientType;
  fgColor: string;
  fgColor2: string;
  gradientRotation: number;
  
  // Background
  bgColor: string;
  bgTransparent: boolean;
  
  // Logo
  logo: string | null;
  logoSize: number; // 0.15 to 0.45
  logoMargin: number; // 0 to 20
  logoBackground: boolean;
  
  // Specs
  errorCorrectionLevel: ErrorCorrectionLevel;
  size: number;
  margin: number;
  
  // Frame / Badge
  frame: QRFrameConfig;
}

// Data structures for each type
export interface QRDataURL {
  url: string;
}

export interface QRDataText {
  text: string;
}

export interface QRDataWiFi {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface QRDataEmail {
  email: string;
  subject: string;
  body: string;
}

export interface QRDataPhone {
  phone: string;
}

export interface QRDataSMS {
  phone: string;
  message: string;
}

export interface QRDatavCard {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  phone: string;
  mobile: string;
  email: string;
  website: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  note: string;
}

export interface QRDataWhatsApp {
  phone: string;
  message: string;
}

export interface QRDataInstagram {
  username: string;
}

export interface QRDataYouTube {
  urlOrChannel: string;
  mode: 'video' | 'channel';
}

export interface QRDataLinkedIn {
  profileUrl: string;
}

export interface QRDataLocation {
  latitude: string;
  longitude: string;
  query: string;
  mode: 'coordinates' | 'search';
}

export interface QRDataEvent {
  title: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
}

export interface QRDataCrypto {
  currency: 'bitcoin' | 'ethereum' | 'solana' | 'usdt';
  address: string;
  amount: string;
  label: string;
  message: string;
}

export interface QRDataAppStore {
  iosUrl: string;
  androidUrl: string;
  fallbackUrl: string;
}

export interface QRDataUPI {
  vpa: string; // e.g. merchant@okhdfcbank
  name: string;
  amount: string;
  note: string;
  currency: string;
}

export interface SocialLinkItem {
  platform: string;
  url: string;
}

export interface QRDataSocial {
  title: string;
  bio: string;
  links: SocialLinkItem[];
}

export type QRFormData =
  | { type: 'url'; data: QRDataURL }
  | { type: 'text'; data: QRDataText }
  | { type: 'wifi'; data: QRDataWiFi }
  | { type: 'email'; data: QRDataEmail }
  | { type: 'phone'; data: QRDataPhone }
  | { type: 'sms'; data: QRDataSMS }
  | { type: 'vcard'; data: QRDatavCard }
  | { type: 'whatsapp'; data: QRDataWhatsApp }
  | { type: 'instagram'; data: QRDataInstagram }
  | { type: 'youtube'; data: QRDataYouTube }
  | { type: 'linkedin'; data: QRDataLinkedIn }
  | { type: 'location'; data: QRDataLocation }
  | { type: 'event'; data: QRDataEvent }
  | { type: 'crypto'; data: QRDataCrypto }
  | { type: 'appstore'; data: QRDataAppStore }
  | { type: 'upi'; data: QRDataUPI }
  | { type: 'social'; data: QRDataSocial };

export interface ScannabilityReport {
  score: number; // 0 - 100
  grade: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  contrastRatio: number;
  warnings: string[];
  tips: string[];
  level: 'green' | 'yellow' | 'red';
}

export interface QRHistoryItem {
  id: string;
  type: QRType;
  title: string;
  subtitle: string;
  rawPayload: string;
  formData: QRFormData;
  customization: QRCustomization;
  createdAt: number;
  previewDataUrl?: string;
}

export interface QRTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  type: QRType;
  defaultFormData: QRFormData;
  customization: Partial<QRCustomization>;
  badge?: string;
}

export type ExportFormat = 'png' | 'jpg' | 'svg' | 'pdf';

export interface ExportOptions {
  format: ExportFormat;
  resolution: number; // 512, 1024, 2048, 4096
  transparentBackground: boolean;
  includeFrame: boolean;
  title?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}
