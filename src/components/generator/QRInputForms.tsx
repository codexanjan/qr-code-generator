import React, { useState } from 'react';
import { useQR } from '../../context/QRContext';
import { validateQRFormData } from '../../utils/validators';
import {
  Eye,
  EyeOff,
  Plus,
  Trash2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Link,
  MapPin,
  Calendar,
  Lock,
} from 'lucide-react';

export const QRInputForms: React.FC = () => {
  const { formData, setFormData } = useQR();
  const [showWifiPassword, setShowWifiPassword] = useState(false);
  const validation = validateQRFormData(formData);

  const updateData = (fields: any) => {
    setFormData((prev: any) => ({
      ...prev,
      data: {
        ...prev.data,
        ...fields,
      },
    }));
  };

  return (
    <div className="space-y-4">
      {/* Type: URL */}
      {formData.type === 'url' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Website URL / Link <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Link className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="https://example.com"
                value={formData.data.url}
                onChange={(e) => updateData({ url: e.target.value })}
                className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-all focus:outline-none focus:ring-2 ${
                  validation.errors.url
                    ? 'border-rose-500 ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-800 focus:border-brand-500 focus:ring-brand-500/20'
                }`}
              />
            </div>
            {validation.errors.url && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {validation.errors.url}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Type: Text */}
      {formData.type === 'text' && (
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Plain Text Content <span className="text-rose-500">*</span>
              </label>
              <span className="text-[10px] text-slate-400">
                {formData.data.text.length} characters
              </span>
            </div>
            <textarea
              rows={4}
              placeholder="Enter any text, instructions, or raw code..."
              value={formData.data.text}
              onChange={(e) => updateData({ text: e.target.value })}
              className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
            {validation.errors.text && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {validation.errors.text}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Type: Wi-Fi */}
      {formData.type === 'wifi' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Network Name (SSID) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. CoffeeShop_Guest_WiFi"
              value={formData.data.ssid}
              onChange={(e) => updateData({ ssid: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
            {validation.errors.ssid && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {validation.errors.ssid}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Encryption Type
              </label>
              <select
                value={formData.data.encryption}
                onChange={(e) => updateData({ encryption: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option value="WPA">WPA / WPA2 / WPA3 (Recommended)</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None (Open Network)</option>
              </select>
            </div>

            {formData.data.encryption !== 'nopass' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showWifiPassword ? 'text' : 'password'}
                    placeholder="Wi-Fi Password"
                    value={formData.data.password}
                    onChange={(e) => updateData({ password: e.target.value })}
                    className="w-full px-3.5 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowWifiPassword(!showWifiPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showWifiPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {validation.errors.password && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {validation.errors.password}
                  </p>
                )}
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={formData.data.hidden}
              onChange={(e) => updateData({ hidden: e.target.checked })}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-4 h-4"
            />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Hidden Network (SSID is not broadcasted)
            </span>
          </label>
        </div>
      )}

      {/* Type: Email */}
      {formData.type === 'email' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Recipient Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              placeholder="hello@example.com"
              value={formData.data.email}
              onChange={(e) => updateData({ email: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
            {validation.errors.email && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {validation.errors.email}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Subject Line (Optional)
            </label>
            <input
              type="text"
              placeholder="Inquiry / Feedback"
              value={formData.data.subject}
              onChange={(e) => updateData({ subject: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Message Body (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Pre-composed message..."
              value={formData.data.body}
              onChange={(e) => updateData({ body: e.target.value })}
              className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>
      )}

      {/* Type: Phone */}
      {formData.type === 'phone' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            {validation.errors.phone && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {validation.errors.phone}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Type: SMS */}
      {formData.type === 'sms' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Recipient Phone Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              SMS Message Text
            </label>
            <textarea
              rows={3}
              placeholder="Pre-composed SMS text..."
              value={formData.data.message}
              onChange={(e) => updateData({ message: e.target.value })}
              className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>
      )}

      {/* Type: vCard */}
      {formData.type === 'vcard' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                value={formData.data.firstName}
                onChange={(e) => updateData({ firstName: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                value={formData.data.lastName}
                onChange={(e) => updateData({ lastName: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Organization / Company
              </label>
              <input
                type="text"
                placeholder="Company Name"
                value={formData.data.organization}
                onChange={(e) => updateData({ organization: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Job Title
              </label>
              <input
                type="text"
                placeholder="e.g. Chief Executive Officer"
                value={formData.data.title}
                onChange={(e) => updateData({ title: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="john@company.com"
                value={formData.data.email}
                onChange={(e) => updateData({ email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 555-0199"
                value={formData.data.phone}
                onChange={(e) => updateData({ phone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Website
              </label>
              <input
                type="text"
                placeholder="https://mywebsite.com"
                value={formData.data.website}
                onChange={(e) => updateData({ website: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                City / State
              </label>
              <input
                type="text"
                placeholder="San Francisco, CA"
                value={formData.data.city}
                onChange={(e) => updateData({ city: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>
        </div>
      )}

      {/* Type: WhatsApp */}
      {formData.type === 'whatsapp' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              WhatsApp Number (with Country Code) <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="+14155552671"
              value={formData.data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            {validation.errors.phone && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {validation.errors.phone}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Default Chat Message (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Hi! I scanned your QR code and would like to chat."
              value={formData.data.message}
              onChange={(e) => updateData({ message: e.target.value })}
              className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>
      )}

      {/* Type: Instagram */}
      {formData.type === 'instagram' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Instagram Username / Handle <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                @
              </span>
              <input
                type="text"
                placeholder="username"
                value={formData.data.username}
                onChange={(e) => updateData({ username: e.target.value })}
                className="w-full pl-8 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            {validation.errors.username && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {validation.errors.username}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Type: YouTube */}
      {formData.type === 'youtube' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              YouTube Video URL or Channel Handle <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="https://youtube.com/@channel or https://youtu.be/..."
              value={formData.data.urlOrChannel}
              onChange={(e) => updateData({ urlOrChannel: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>
      )}

      {/* Type: LinkedIn */}
      {formData.type === 'linkedin' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              LinkedIn Profile or Company URL <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="https://linkedin.com/in/username"
              value={formData.data.profileUrl}
              onChange={(e) => updateData({ profileUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>
      )}

      {/* Type: Location / Maps */}
      {formData.type === 'location' && (
        <div className="space-y-3">
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
            <button
              type="button"
              onClick={() => updateData({ mode: 'search' })}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                formData.data.mode === 'search'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Address / Place Search
            </button>
            <button
              type="button"
              onClick={() => updateData({ mode: 'coordinates' })}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                formData.data.mode === 'coordinates'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              GPS Coordinates
            </button>
          </div>

          {formData.data.mode === 'search' ? (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Search Place / Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Eiffel Tower, Paris or 123 Main St"
                  value={formData.data.query}
                  onChange={(e) => updateData({ query: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Latitude
                </label>
                <input
                  type="text"
                  placeholder="40.758896"
                  value={formData.data.latitude}
                  onChange={(e) => updateData({ latitude: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Longitude
                </label>
                <input
                  type="text"
                  placeholder="-73.985130"
                  value={formData.data.longitude}
                  onChange={(e) => updateData({ longitude: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Type: Calendar Event */}
      {formData.type === 'event' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Event Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Design Summit 2026"
              value={formData.data.title}
              onChange={(e) => updateData({ title: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                value={formData.data.startDate}
                onChange={(e) => updateData({ startDate: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                End Date & Time
              </label>
              <input
                type="datetime-local"
                value={formData.data.endDate}
                onChange={(e) => updateData({ endDate: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Location
            </label>
            <input
              type="text"
              placeholder="Venue address or meeting link"
              value={formData.data.location}
              onChange={(e) => updateData({ location: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      )}

      {/* Type: Crypto */}
      {formData.type === 'crypto' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Cryptocurrency
              </label>
              <select
                value={formData.data.currency}
                onChange={(e) => updateData({ currency: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="ethereum">Ethereum (ETH)</option>
                <option value="solana">Solana (SOL)</option>
                <option value="usdt">Tether (USDT ERC-20)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Amount (Optional)
              </label>
              <input
                type="text"
                placeholder="0.05"
                value={formData.data.amount}
                onChange={(e) => updateData({ amount: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Wallet Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Paste public wallet address..."
              value={formData.data.address}
              onChange={(e) => updateData({ address: e.target.value })}
              className="w-full px-3.5 py-2.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>
      )}

      {/* Type: UPI */}
      {formData.type === 'upi' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                UPI ID (VPA) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="name@okhdfcbank"
                value={formData.data.vpa}
                onChange={(e) => updateData({ vpa: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              {validation.errors.vpa && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {validation.errors.vpa}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Payee Name
              </label>
              <input
                type="text"
                placeholder="Business or Person Name"
                value={formData.data.name}
                onChange={(e) => updateData({ name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Amount (₹ INR Optional)
              </label>
              <input
                type="number"
                placeholder="e.g. 500"
                value={formData.data.amount}
                onChange={(e) => updateData({ amount: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Transaction Note
              </label>
              <input
                type="text"
                placeholder="Bill payment, Table #4"
                value={formData.data.note}
                onChange={(e) => updateData({ note: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Type: App Store */}
      {formData.type === 'appstore' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Apple App Store Link
            </label>
            <input
              type="text"
              placeholder="https://apps.apple.com/..."
              value={formData.data.iosUrl}
              onChange={(e) => updateData({ iosUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Google Play Store Link
            </label>
            <input
              type="text"
              placeholder="https://play.google.com/store/apps/..."
              value={formData.data.androidUrl}
              onChange={(e) => updateData({ androidUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Fallback / Web Landing Page
            </label>
            <input
              type="text"
              placeholder="https://myproduct.com/download"
              value={formData.data.fallbackUrl}
              onChange={(e) => updateData({ fallbackUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      )}

      {/* Type: Social Multi-Link */}
      {formData.type === 'social' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Profile Title / Name
              </label>
              <input
                type="text"
                placeholder="Alex Rivera"
                value={formData.data.title}
                onChange={(e) => updateData({ title: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Bio / Tagline
              </label>
              <input
                type="text"
                placeholder="Product Designer & Creator"
                value={formData.data.bio}
                onChange={(e) => updateData({ bio: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Social Links
            </label>
            {formData.data.links.map((link, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Platform (e.g. Twitter)"
                  value={link.platform}
                  onChange={(e) => {
                    const newLinks = [...formData.data.links];
                    newLinks[idx].platform = e.target.value;
                    updateData({ links: newLinks });
                  }}
                  className="w-1/3 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="https://..."
                  value={link.url}
                  onChange={(e) => {
                    const newLinks = [...formData.data.links];
                    newLinks[idx].url = e.target.value;
                    updateData({ links: newLinks });
                  }}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newLinks = formData.data.links.filter((_, i) => i !== idx);
                    updateData({ links: newLinks });
                  }}
                  className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                updateData({
                  links: [...formData.data.links, { platform: 'Link', url: '' }],
                });
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline pt-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Another Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
