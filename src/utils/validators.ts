import { QRFormData } from '../types/qr';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateQRFormData(formData: QRFormData): ValidationResult {
  const errors: Record<string, string> = {};

  switch (formData.type) {
    case 'url': {
      const url = formData.data.url.trim();
      if (!url) {
        errors.url = 'URL is required';
      } else if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i.test(url) && !url.startsWith('localhost')) {
        errors.url = 'Please enter a valid website address (e.g., mysite.com)';
      }
      break;
    }

    case 'text': {
      if (!formData.data.text.trim()) {
        errors.text = 'Text content cannot be empty';
      }
      break;
    }

    case 'wifi': {
      if (!formData.data.ssid.trim()) {
        errors.ssid = 'Network name (SSID) is required';
      }
      if (formData.data.encryption !== 'nopass' && !formData.data.password) {
        errors.password = 'Password is required for secured Wi-Fi networks';
      }
      break;
    }

    case 'email': {
      const email = formData.data.email.trim();
      if (!email) {
        errors.email = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Please enter a valid email address';
      }
      break;
    }

    case 'phone': {
      const phone = formData.data.phone.trim();
      if (!phone) {
        errors.phone = 'Phone number is required';
      } else if (phone.length < 5) {
        errors.phone = 'Please enter a valid phone number';
      }
      break;
    }

    case 'sms': {
      if (!formData.data.phone.trim()) {
        errors.phone = 'Recipient phone number is required';
      }
      break;
    }

    case 'vcard': {
      if (!formData.data.firstName.trim() && !formData.data.lastName.trim() && !formData.data.organization.trim()) {
        errors.name = 'Please provide at least a name or organization';
      }
      if (formData.data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.data.email)) {
        errors.email = 'Please enter a valid email address';
      }
      break;
    }

    case 'whatsapp': {
      const phone = formData.data.phone.trim();
      if (!phone) {
        errors.phone = 'Phone number with country code is required';
      }
      break;
    }

    case 'instagram': {
      if (!formData.data.username.trim()) {
        errors.username = 'Instagram username is required';
      }
      break;
    }

    case 'youtube': {
      if (!formData.data.urlOrChannel.trim()) {
        errors.urlOrChannel = 'YouTube video URL or channel handle is required';
      }
      break;
    }

    case 'linkedin': {
      if (!formData.data.profileUrl.trim()) {
        errors.profileUrl = 'LinkedIn profile or company URL is required';
      }
      break;
    }

    case 'location': {
      if (formData.data.mode === 'search') {
        if (!formData.data.query.trim()) {
          errors.query = 'Location name or address is required';
        }
      } else {
        if (!formData.data.latitude.trim() || isNaN(Number(formData.data.latitude))) {
          errors.latitude = 'Valid latitude coordinate is required';
        }
        if (!formData.data.longitude.trim() || isNaN(Number(formData.data.longitude))) {
          errors.longitude = 'Valid longitude coordinate is required';
        }
      }
      break;
    }

    case 'event': {
      if (!formData.data.title.trim()) {
        errors.title = 'Event title is required';
      }
      if (!formData.data.startDate) {
        errors.startDate = 'Start date/time is required';
      }
      break;
    }

    case 'crypto': {
      if (!formData.data.address.trim()) {
        errors.address = 'Wallet address is required';
      }
      break;
    }

    case 'upi': {
      const vpa = formData.data.vpa.trim();
      if (!vpa) {
        errors.vpa = 'UPI ID / VPA is required';
      } else if (!vpa.includes('@')) {
        errors.vpa = 'Invalid UPI ID format (e.g. name@bank)';
      }
      break;
    }

    case 'appstore': {
      if (!formData.data.iosUrl.trim() && !formData.data.androidUrl.trim() && !formData.data.fallbackUrl.trim()) {
        errors.urls = 'Please provide at least one app store link';
      }
      break;
    }

    default:
      break;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
