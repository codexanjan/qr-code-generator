import { QRFormData, QRType } from '../types/qr';

export interface SmartAssistantResult {
  recommendedType: QRType;
  confidence: number;
  reason: string;
  suggestedPresetId: string;
  prefilledFormData: QRFormData;
}

export function parseAssistantPrompt(prompt: string): SmartAssistantResult {
  const p = prompt.toLowerCase();

  // Wi-Fi
  if (p.includes('wifi') || p.includes('wi-fi') || p.includes('internet') || p.includes('hotspot') || p.includes('router') || p.includes('password for cafe')) {
    return {
      recommendedType: 'wifi',
      confidence: 0.95,
      reason: 'Detected a Wi-Fi connection request. We have set up a Wi-Fi QR that lets smartphones auto-join in 1 tap.',
      suggestedPresetId: 'emerald-luxury',
      prefilledFormData: {
        type: 'wifi',
        data: { ssid: 'Guest_WiFi_Network', password: '', encryption: 'WPA', hidden: false },
      },
    };
  }

  // Restaurant Menu
  if (p.includes('menu') || p.includes('restaurant') || p.includes('bistro') || p.includes('dining') || p.includes('food') || p.includes('cafe')) {
    return {
      recommendedType: 'url',
      confidence: 0.94,
      reason: 'Detected a restaurant or food menu. Created a website QR styled with an appetizing warm sunset palette.',
      suggestedPresetId: 'sunset-blaze',
      prefilledFormData: {
        type: 'url',
        data: { url: 'https://myrestaurant.com/menu' },
      },
    };
  }

  // Business Card / vCard / Contact / Portfolio
  if (p.includes('vcard') || p.includes('business card') || p.includes('contact') || p.includes('resume') || p.includes('networking') || p.includes('meet me')) {
    return {
      recommendedType: 'vcard',
      confidence: 0.92,
      reason: 'Detected digital business card intent. Formatted standard vCard 3.0 so scanning adds you directly to contacts.',
      suggestedPresetId: 'corporate-blue',
      prefilledFormData: {
        type: 'vcard',
        data: {
          firstName: 'Your Name',
          lastName: '',
          organization: 'Your Company',
          title: 'Founder / Designer',
          phone: '',
          mobile: '',
          email: 'hello@yourbrand.com',
          website: 'https://yourportfolio.com',
          street: '',
          city: '',
          state: '',
          zip: '',
          country: '',
          note: 'Scanned from networking event.',
        },
      },
    };
  }

  // UPI / Payment / Checkout
  if (p.includes('upi') || p.includes('pay') || p.includes('payment') || p.includes('gpay') || p.includes('phonepe') || p.includes('checkout') || p.includes('store payment')) {
    return {
      recommendedType: 'upi',
      confidence: 0.95,
      reason: 'Detected payment intent. Configured instant UPI payment standard compatible with all banking apps.',
      suggestedPresetId: 'emerald-luxury',
      prefilledFormData: {
        type: 'upi',
        data: { vpa: 'yourname@upi', name: 'Business Name', amount: '', note: 'Payment', currency: 'INR' },
      },
    };
  }

  // Cryptocurrency / Bitcoin / Ethereum
  if (p.includes('crypto') || p.includes('bitcoin') || p.includes('btc') || p.includes('eth') || p.includes('solana') || p.includes('wallet')) {
    const isEth = p.includes('eth') || p.includes('ethereum');
    const isSol = p.includes('sol') || p.includes('solana');
    return {
      recommendedType: 'crypto',
      confidence: 0.96,
      reason: 'Detected cryptocurrency transfer or tip jar request.',
      suggestedPresetId: 'sunset-blaze',
      prefilledFormData: {
        type: 'crypto',
        data: {
          currency: isEth ? 'ethereum' : isSol ? 'solana' : 'bitcoin',
          address: '',
          amount: '',
          label: 'Donation',
          message: 'Thank you for your support!',
        },
      },
    };
  }

  // WhatsApp
  if (p.includes('whatsapp') || p.includes('wa.me') || p.includes('chat with customer') || p.includes('support number')) {
    return {
      recommendedType: 'whatsapp',
      confidence: 0.96,
      reason: 'Detected WhatsApp instant direct message request.',
      suggestedPresetId: 'emerald-luxury',
      prefilledFormData: {
        type: 'whatsapp',
        data: { phone: '', message: 'Hi! I saw your QR code and would like to learn more.' },
      },
    };
  }

  // Instagram / TikTok / Social
  if (p.includes('instagram') || p.includes('insta') || p.includes('follower') || p.includes('influencer')) {
    return {
      recommendedType: 'instagram',
      confidence: 0.94,
      reason: 'Detected Instagram social profile promotion.',
      suggestedPresetId: 'cyber-neon',
      prefilledFormData: {
        type: 'instagram',
        data: { username: 'your.handle' },
      },
    };
  }

  // YouTube / Video
  if (p.includes('youtube') || p.includes('video') || p.includes('stream') || p.includes('channel') || p.includes('podcast')) {
    return {
      recommendedType: 'youtube',
      confidence: 0.93,
      reason: 'Detected YouTube video or channel promotion.',
      suggestedPresetId: 'crimson-bold',
      prefilledFormData: {
        type: 'youtube',
        data: { urlOrChannel: 'https://youtube.com/@channel', mode: 'channel' },
      },
    };
  }

  // Location / Maps
  if (p.includes('map') || p.includes('location') || p.includes('directions') || p.includes('address') || p.includes('venue') || p.includes('wedding venue')) {
    return {
      recommendedType: 'location',
      confidence: 0.91,
      reason: 'Detected place or directions navigation request with Google Maps.',
      suggestedPresetId: 'sunset-blaze',
      prefilledFormData: {
        type: 'location',
        data: { mode: 'search', latitude: '', longitude: '', query: 'Your Venue Name or Address' },
      },
    };
  }

  // Event / Calendar
  if (p.includes('event') || p.includes('calendar') || p.includes('wedding') || p.includes('conference') || p.includes('party') || p.includes('summit')) {
    return {
      recommendedType: 'event',
      confidence: 0.92,
      reason: 'Detected calendar event or conference pass requirement.',
      suggestedPresetId: 'royal-violet',
      prefilledFormData: {
        type: 'event',
        data: {
          title: 'Special Event',
          location: 'Event Venue',
          description: 'Scan to save date to calendar.',
          startDate: new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 16),
          endDate: new Date(Date.now() + 86400000 * 7 + 7200000).toISOString().slice(0, 16),
          allDay: false,
        },
      },
    };
  }

  // App download
  if (p.includes('app') || p.includes('download') || p.includes('play store') || p.includes('app store') || p.includes('ios and android')) {
    return {
      recommendedType: 'appstore',
      confidence: 0.92,
      reason: 'Detected mobile application install link for iOS and Android.',
      suggestedPresetId: 'corporate-blue',
      prefilledFormData: {
        type: 'appstore',
        data: {
          iosUrl: 'https://apps.apple.com',
          androidUrl: 'https://play.google.com',
          fallbackUrl: 'https://yourapp.com',
        },
      },
    };
  }

  // General URL fallback
  return {
    recommendedType: 'url',
    confidence: 0.85,
    reason: 'Generated a versatile website link QR code ready for any web destination.',
    suggestedPresetId: 'corporate-blue',
    prefilledFormData: {
      type: 'url',
      data: { url: prompt.startsWith('http') ? prompt : `https://${prompt.replace(/[^a-zA-Z0-9.-]/g, '').toLowerCase() || 'example.com'}` },
    },
  };
}
