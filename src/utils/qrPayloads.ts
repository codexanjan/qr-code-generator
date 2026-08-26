import { QRFormData, QRType } from '../types/qr';

/**
 * Encodes various QR types into standardized QR code payload strings.
 */
export function generateQRPayload(formData: QRFormData): string {
  switch (formData.type) {
    case 'url': {
      const url = formData.data.url.trim();
      if (!url) return 'https://example.com';
      if (/^https?:\/\//i.test(url)) return url;
      return `https://${url}`;
    }

    case 'text': {
      return formData.data.text || 'Hello, World!';
    }

    case 'wifi': {
      const { ssid, password, encryption, hidden } = formData.data;
      if (!ssid) return 'WIFI:S:MyNetwork;;';
      const enc = encryption === 'nopass' ? 'nopass' : encryption;
      const pass = enc === 'nopass' ? '' : password;
      // Escaping special characters: \ ; , : "
      const escape = (str: string) => str.replace(/([\\;,:"\\])/g, '\\$1');
      return `WIFI:T:${enc};S:${escape(ssid)};P:${escape(pass)};H:${hidden ? 'true' : 'false'};;`;
    }

    case 'email': {
      const { email, subject, body } = formData.data;
      if (!email) return 'mailto:hello@example.com';
      const params = new URLSearchParams();
      if (subject) params.append('subject', subject);
      if (body) params.append('body', body);
      const queryString = params.toString();
      return `mailto:${email}${queryString ? `?${queryString}` : ''}`;
    }

    case 'phone': {
      const phone = formData.data.phone.trim();
      return phone ? `tel:${phone}` : 'tel:+1234567890';
    }

    case 'sms': {
      const { phone, message } = formData.data;
      const cleanPhone = phone.trim();
      if (!cleanPhone) return 'sms:+1234567890';
      return message ? `sms:${cleanPhone}?body=${encodeURIComponent(message)}` : `sms:${cleanPhone}`;
    }

    case 'vcard': {
      const d = formData.data;
      const formattedName = [d.firstName, d.lastName].filter(Boolean).join(' ') || 'John Doe';
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${d.lastName || ''};${d.firstName || ''};;;`,
        `FN:${formattedName}`,
      ];

      if (d.organization) lines.push(`ORG:${d.organization}`);
      if (d.title) lines.push(`TITLE:${d.title}`);
      if (d.phone) lines.push(`TEL;TYPE=WORK,VOICE:${d.phone}`);
      if (d.mobile) lines.push(`TEL;TYPE=CELL,VOICE:${d.mobile}`);
      if (d.email) lines.push(`EMAIL;TYPE=PREF,INTERNET:${d.email}`);
      if (d.website) {
        const site = /^https?:\/\//i.test(d.website) ? d.website : `https://${d.website}`;
        lines.push(`URL:${site}`);
      }
      if (d.street || d.city || d.state || d.zip || d.country) {
        lines.push(`ADR;TYPE=WORK:;;${d.street || ''};${d.city || ''};${d.state || ''};${d.zip || ''};${d.country || ''}`);
      }
      if (d.note) lines.push(`NOTE:${d.note}`);
      lines.push('END:VCARD');

      return lines.join('\n');
    }

    case 'whatsapp': {
      const { phone, message } = formData.data;
      const cleanPhone = phone.replace(/[^0-9+]/g, '').replace(/^\+/, '');
      if (!cleanPhone) return 'https://wa.me/';
      const textParam = message ? `?text=${encodeURIComponent(message)}` : '';
      return `https://wa.me/${cleanPhone}${textParam}`;
    }

    case 'instagram': {
      const username = formData.data.username.trim().replace(/^@/, '');
      return username ? `https://instagram.com/${username}` : 'https://instagram.com';
    }

    case 'youtube': {
      const input = formData.data.urlOrChannel.trim();
      if (!input) return 'https://youtube.com';
      if (/^https?:\/\//i.test(input)) return input;
      if (input.startsWith('@')) return `https://youtube.com/${input}`;
      return `https://youtube.com/watch?v=${input}`;
    }

    case 'linkedin': {
      const url = formData.data.profileUrl.trim();
      if (!url) return 'https://linkedin.com';
      if (/^https?:\/\//i.test(url)) return url;
      return `https://linkedin.com/in/${url.replace(/^in\//, '')}`;
    }

    case 'location': {
      const { mode, latitude, longitude, query } = formData.data;
      if (mode === 'search') {
        const q = query.trim() || 'Times Square, New York';
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
      }
      const lat = latitude.trim() || '40.758896';
      const lng = longitude.trim() || '-73.985130';
      return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    }

    case 'event': {
      const { title, location, description, startDate, endDate, allDay } = formData.data;
      const formatICSDate = (dateStr: string) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return '';
        if (allDay) {
          return d.toISOString().slice(0, 10).replace(/-/g, '');
        }
        return d.toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
      };

      const start = formatICSDate(startDate) || '20260901T100000Z';
      const end = formatICSDate(endDate) || '20260901T120000Z';

      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//QR Studio Pro//EN',
        'BEGIN:VEVENT',
        `SUMMARY:${title || 'Upcoming Event'}`,
      ];

      if (description) lines.push(`DESCRIPTION:${description}`);
      if (location) lines.push(`LOCATION:${location}`);
      if (allDay) {
        lines.push(`DTSTART;VALUE=DATE:${start}`);
        lines.push(`DTEND;VALUE=DATE:${end}`);
      } else {
        lines.push(`DTSTART:${start}`);
        lines.push(`DTEND:${end}`);
      }
      lines.push('END:VEVENT');
      lines.push('END:VCALENDAR');

      return lines.join('\n');
    }

    case 'crypto': {
      const { currency, address, amount, label, message } = formData.data;
      const cleanAddr = address.trim();
      if (!cleanAddr) return 'bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
      
      const params = new URLSearchParams();
      if (amount) params.append('amount', amount);
      if (label) params.append('label', label);
      if (message) params.append('message', message);
      const queryStr = params.toString();

      switch (currency) {
        case 'ethereum':
          return `ethereum:${cleanAddr}${queryStr ? `?${queryStr}` : ''}`;
        case 'solana':
          return `solana:${cleanAddr}${queryStr ? `?${queryStr}` : ''}`;
        case 'usdt':
          return `ethereum:${cleanAddr}?contractAddress=0xdac17f958d2ee523a2206206994597c13d831ec7${amount ? `&amount=${amount}` : ''}`;
        case 'bitcoin':
        default:
          return `bitcoin:${cleanAddr}${queryStr ? `?${queryStr}` : ''}`;
      }
    }

    case 'appstore': {
      const { iosUrl, androidUrl, fallbackUrl } = formData.data;
      // If single URL provided or specific priority
      if (iosUrl && androidUrl) {
        // Multi-app store redirect link fallback or primary
        return fallbackUrl || iosUrl || androidUrl;
      }
      return iosUrl || androidUrl || fallbackUrl || 'https://apps.apple.com';
    }

    case 'upi': {
      const { vpa, name, amount, note, currency } = formData.data;
      const cleanVpa = vpa.trim();
      if (!cleanVpa) return 'upi://pay?pa=merchant@upi&pn=Merchant';
      
      const params = new URLSearchParams();
      params.append('pa', cleanVpa);
      if (name) params.append('pn', name);
      if (amount) params.append('am', amount);
      if (note) params.append('tn', note);
      params.append('cu', currency || 'INR');
      return `upi://pay?${params.toString()}`;
    }

    case 'social': {
      const { title, bio, links } = formData.data;
      // Generate clean vCard or multi-link text payload
      if (links && links.length === 1 && links[0].url) {
        return links[0].url;
      }
      const linksText = links.filter(l => l.url).map(l => `${l.platform}: ${l.url}`).join('\n');
      return `${title || 'Social Profile'}\n${bio ? `${bio}\n` : ''}${linksText}`;
    }

    default:
      return 'https://qrstudiopro.app';
  }
}

/**
 * Returns a human-friendly title and subtitle description for a given QR type.
 */
export function getQRSummary(formData: QRFormData): { title: string; subtitle: string } {
  switch (formData.type) {
    case 'url':
      return { title: 'Website Link', subtitle: formData.data.url || 'No URL specified' };
    case 'text':
      return { title: 'Plain Text', subtitle: (formData.data.text || '').slice(0, 40) + '...' };
    case 'wifi':
      return { title: `Wi-Fi (${formData.data.ssid || 'Network'})`, subtitle: `Security: ${formData.data.encryption}` };
    case 'email':
      return { title: 'Email Address', subtitle: formData.data.email || 'No email' };
    case 'phone':
      return { title: 'Phone Call', subtitle: formData.data.phone || 'No phone' };
    case 'sms':
      return { title: 'SMS Message', subtitle: `To: ${formData.data.phone || 'N/A'}` };
    case 'vcard':
      return { 
        title: `${formData.data.firstName || ''} ${formData.data.lastName || ''}`.trim() || 'Contact Card', 
        subtitle: formData.data.organization || formData.data.email || 'vCard 3.0' 
      };
    case 'whatsapp':
      return { title: 'WhatsApp Chat', subtitle: formData.data.phone || 'No number' };
    case 'instagram':
      return { title: 'Instagram Profile', subtitle: `@${formData.data.username || 'username'}` };
    case 'youtube':
      return { title: 'YouTube Link', subtitle: formData.data.urlOrChannel || 'YouTube' };
    case 'linkedin':
      return { title: 'LinkedIn Profile', subtitle: formData.data.profileUrl || 'LinkedIn' };
    case 'location':
      return { title: 'Map Location', subtitle: formData.data.mode === 'search' ? (formData.data.query || 'Location') : `${formData.data.latitude}, ${formData.data.longitude}` };
    case 'event':
      return { title: formData.data.title || 'Calendar Event', subtitle: formData.data.location || 'Event details' };
    case 'crypto':
      return { title: `${formData.data.currency.toUpperCase()} Payment`, subtitle: (formData.data.address || '').slice(0, 16) + '...' };
    case 'appstore':
      return { title: 'App Download', subtitle: formData.data.iosUrl || formData.data.androidUrl || 'App Store' };
    case 'upi':
      return { title: `UPI: ${formData.data.name || formData.data.vpa}`, subtitle: formData.data.amount ? `₹${formData.data.amount}` : formData.data.vpa };
    case 'social':
      return { title: formData.data.title || 'Social Profile', subtitle: `${formData.data.links?.length || 0} links` };
    default:
      return { title: 'QR Code', subtitle: 'Standard code' };
  }
}
