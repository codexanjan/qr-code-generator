import React, { useState, useRef } from 'react';
import { useQR } from '../../context/QRContext';
import {
  DotType,
  CornerSquareType,
  CornerDotType,
  ErrorCorrectionLevel,
  FrameStyle,
} from '../../types/qr';
import {
  DESIGN_PRESETS,
  PRESET_LOGOS,
  SMART_COLOR_PAIRS,
} from '../../constants/presets';
import {
  Palette,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Square,
  Circle,
  Eye,
  Sliders,
  Shield,
  Upload,
  Trash2,
  Check,
  ChevronDown,
  RotateCw,
  Tag,
} from 'lucide-react';

export const QRCustomizer: React.FC = () => {
  const { customization, updateCustomization, applyPreset, showToast } = useQR();
  const [activeTab, setActiveTab] = useState<'presets' | 'pattern' | 'colors' | 'corners' | 'logo' | 'frames' | 'specs'>('presets');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast({
        type: 'warning',
        title: 'Image too large',
        message: 'Please choose an image under 2MB for best performance.',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        updateCustomization({
          logo: event.target.result as string,
          errorCorrectionLevel: 'H', // Auto-bump to H for safety
        });
        showToast({
          type: 'success',
          title: 'Logo added',
          message: 'Error correction adjusted to High for reliable scanning.',
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    updateCustomization({ logo: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
    showToast({ type: 'info', title: 'Logo removed' });
  };

  return (
    <div className="space-y-4">
      {/* Sub-Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1.5 custom-scrollbar border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'presets', label: 'Presets', icon: Sparkles },
          { id: 'pattern', label: 'Pattern', icon: Square },
          { id: 'colors', label: 'Colors', icon: Palette },
          { id: 'corners', label: 'Corners', icon: Eye },
          { id: 'logo', label: 'Logo', icon: ImageIcon },
          { id: 'frames', label: 'Frames', icon: Tag },
          { id: 'specs', label: 'Specs', icon: Sliders },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-b-2 border-brand-500 rounded-b-none'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab: Presets */}
      {activeTab === 'presets' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            One-click curated professional design styles created by designers.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {DESIGN_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className="flex flex-col items-center p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-400 hover:shadow-md transition-all group text-center"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${preset.previewGradient} shadow-inner mb-2 group-hover:scale-105 transition-transform flex items-center justify-center`}
                >
                  <Sparkles className="w-4 h-4 text-white/80" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {preset.name}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {preset.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Pattern */}
      {activeTab === 'pattern' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Body Pattern Style
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'square', label: 'Square' },
                { id: 'rounded', label: 'Rounded' },
                { id: 'dots', label: 'Dots' },
                { id: 'classy', label: 'Classy' },
                { id: 'classy-rounded', label: 'Classy Smooth' },
                { id: 'extra-rounded', label: 'Extra Rounded' },
              ].map((pattern) => (
                <button
                  key={pattern.id}
                  onClick={() => updateCustomization({ dotType: pattern.id as DotType })}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                    customization.dotType === pattern.id
                      ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  {pattern.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Colors */}
      {activeTab === 'colors' && (
        <div className="space-y-4">
          {/* Color Mode */}
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
            <button
              onClick={() => updateCustomization({ colorMode: 'single' })}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                customization.colorMode === 'single'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Solid Color
            </button>
            <button
              onClick={() => updateCustomization({ colorMode: 'gradient' })}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                customization.colorMode === 'gradient'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Gradient Colors
            </button>
          </div>

          {/* Color Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {customization.colorMode === 'gradient' ? 'Foreground (Color 1)' : 'Foreground Color'}
              </label>
              <div className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <input
                  type="color"
                  value={customization.fgColor}
                  onChange={(e) => updateCustomization({ fgColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                />
                <input
                  type="text"
                  value={customization.fgColor}
                  onChange={(e) => updateCustomization({ fgColor: e.target.value })}
                  className="flex-1 text-xs font-mono bg-transparent text-slate-800 dark:text-slate-200 uppercase focus:outline-none"
                />
              </div>
            </div>

            {customization.colorMode === 'gradient' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Foreground (Color 2)
                </label>
                <div className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <input
                    type="color"
                    value={customization.fgColor2}
                    onChange={(e) => updateCustomization({ fgColor2: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={customization.fgColor2}
                    onChange={(e) => updateCustomization({ fgColor2: e.target.value })}
                    className="flex-1 text-xs font-mono bg-transparent text-slate-800 dark:text-slate-200 uppercase focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Background Color
              </label>
              <div className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <input
                  type="color"
                  disabled={customization.bgTransparent}
                  value={customization.bgColor}
                  onChange={(e) => updateCustomization({ bgColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent disabled:opacity-30"
                />
                <input
                  type="text"
                  disabled={customization.bgTransparent}
                  value={customization.bgTransparent ? 'TRANSPARENT' : customization.bgColor}
                  onChange={(e) => updateCustomization({ bgColor: e.target.value })}
                  className="flex-1 text-xs font-mono bg-transparent text-slate-800 dark:text-slate-200 uppercase focus:outline-none disabled:opacity-50"
                />
              </div>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customization.bgTransparent}
                  onChange={(e) => updateCustomization({ bgTransparent: e.target.checked })}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Transparent Background
                </span>
              </label>
            </div>
          </div>

          {/* Gradient Controls */}
          {customization.colorMode === 'gradient' && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Gradient Type
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateCustomization({ gradientType: 'linear' })}
                    className={`px-2.5 py-1 rounded text-xs font-semibold ${
                      customization.gradientType === 'linear'
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Linear
                  </button>
                  <button
                    onClick={() => updateCustomization({ gradientType: 'radial' })}
                    className={`px-2.5 py-1 rounded text-xs font-semibold ${
                      customization.gradientType === 'radial'
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Radial
                  </button>
                </div>
              </div>

              {customization.gradientType === 'linear' && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Rotation Angle</span>
                    <span className="font-mono font-bold text-brand-600 dark:text-brand-400">
                      {customization.gradientRotation}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="15"
                    value={customization.gradientRotation}
                    onChange={(e) => updateCustomization({ gradientRotation: Number(e.target.value) })}
                    className="w-full accent-brand-500"
                  />
                </div>
              )}
            </div>
          )}

          {/* Smart Color Suggestions */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              High-Scannability Color Pairs (WCAG AAA)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SMART_COLOR_PAIRS.map((pair, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    updateCustomization({
                      colorMode: 'single',
                      fgColor: pair.fg,
                      bgColor: pair.bg,
                      bgTransparent: false,
                    });
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-400 transition-all text-left"
                >
                  <div className="flex -space-x-1.5 flex-shrink-0">
                    <div
                      className="w-4 h-4 rounded-full border border-white dark:border-slate-900 shadow-sm"
                      style={{ backgroundColor: pair.fg }}
                    />
                    <div
                      className="w-4 h-4 rounded-full border border-white dark:border-slate-900 shadow-sm"
                      style={{ backgroundColor: pair.bg }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">
                      {pair.name}
                    </p>
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-mono">
                      {pair.contrast}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Corners */}
      {activeTab === 'corners' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Corner Square Shape (Outer Finder)
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'square', label: 'Square' },
                { id: 'extra-rounded', label: 'Extra Rounded' },
                { id: 'dot', label: 'Circle' },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => updateCustomization({ cornerSquareType: style.id as CornerSquareType })}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                    customization.cornerSquareType === style.id
                      ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Corner Dot Shape (Inner Eye)
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'square', label: 'Square Dot' },
                { id: 'dot', label: 'Circle Dot' },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => updateCustomization({ cornerDotType: style.id as CornerDotType })}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                    customization.cornerDotType === style.id
                      ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer mb-3">
              <input
                type="checkbox"
                checked={customization.customCornerColors}
                onChange={(e) => updateCustomization({ customCornerColors: e.target.checked })}
                className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-4 h-4"
              />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Custom Eye Corner Colors
              </span>
            </label>

            {customization.customCornerColors && (
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Outer Square Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customization.cornerSquareColor}
                      onChange={(e) => updateCustomization({ cornerSquareColor: e.target.value })}
                      className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-xs font-mono uppercase">{customization.cornerSquareColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Inner Dot Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customization.cornerDotColor}
                      onChange={(e) => updateCustomization({ cornerDotColor: e.target.value })}
                      className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-xs font-mono uppercase">{customization.cornerDotColor}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Logo */}
      {activeTab === 'logo' && (
        <div className="space-y-4">
          {/* Logo Uploader / Display */}
          <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-center">
            {customization.logo ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 p-2 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                    <img
                      src={customization.logo}
                      alt="Uploaded logo"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Active Center Logo</p>
                    <p className="text-[10px] text-slate-400">High Error Correction Active</p>
                  </div>
                </div>
                <button
                  onClick={removeLogo}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <Upload className="w-6 h-6 mx-auto text-slate-400 mb-2" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Upload Custom Logo / Brand Icon
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  PNG, SVG, or JPG (Square transparent PNG recommended)
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 px-4 py-2 text-xs font-semibold bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-colors shadow-sm"
                >
                  Browse Image
                </button>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLogoUpload}
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              className="hidden"
            />
          </div>

          {/* Preset Brand Logos */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Or Choose Preset Brand Icon
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {PRESET_LOGOS.map((logo) => (
                <button
                  key={logo.id}
                  onClick={() => {
                    updateCustomization({
                      logo: logo.svgDataUri,
                      errorCorrectionLevel: 'H',
                    });
                    showToast({
                      type: 'success',
                      title: `Added ${logo.name} icon`,
                    });
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-400 flex items-center justify-center transition-all group"
                  title={logo.name}
                >
                  <img
                    src={logo.svgDataUri}
                    alt={logo.name}
                    className="w-5 h-5 object-contain group-hover:scale-110 transition-transform"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Logo Sliders */}
          {customization.logo && (
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Logo Size</span>
                  <span className="font-mono font-bold text-brand-500">
                    {Math.round(customization.logoSize * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.15"
                  max="0.38"
                  step="0.01"
                  value={customization.logoSize}
                  onChange={(e) => updateCustomization({ logoSize: Number(e.target.value) })}
                  className="w-full accent-brand-500"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customization.logoBackground}
                  onChange={(e) => updateCustomization({ logoBackground: e.target.checked })}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Clear QR dots behind logo (prevents overlapping)
                </span>
              </label>
            </div>
          )}
        </div>
      )}

      {/* Tab: Frames */}
      {activeTab === 'frames' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Call-to-Action Frame Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'none', label: 'No Frame' },
                { id: 'bottom-banner', label: 'Bottom Banner' },
                { id: 'top-banner', label: 'Top Banner' },
                { id: 'pill', label: 'Pill Badge' },
              ].map((frame) => (
                <button
                  key={frame.id}
                  onClick={() =>
                    updateCustomization({
                      frame: {
                        ...customization.frame,
                        style: frame.id as FrameStyle,
                      },
                    })
                  }
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                    customization.frame.style === frame.id
                      ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {frame.label}
                </button>
              ))}
            </div>
          </div>

          {customization.frame.style !== 'none' && (
            <div className="space-y-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Call-to-Action Text
                </label>
                <input
                  type="text"
                  placeholder="SCAN ME"
                  value={customization.frame.text}
                  onChange={(e) =>
                    updateCustomization({
                      frame: { ...customization.frame, text: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs font-bold uppercase rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Banner Background
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customization.frame.bgColor}
                      onChange={(e) =>
                        updateCustomization({
                          frame: { ...customization.frame, bgColor: e.target.value },
                        })
                      }
                      className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-xs font-mono uppercase">{customization.frame.bgColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Text Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customization.frame.textColor}
                      onChange={(e) =>
                        updateCustomization({
                          frame: { ...customization.frame, textColor: e.target.value },
                        })
                      }
                      className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-xs font-mono uppercase">{customization.frame.textColor}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Specs */}
      {activeTab === 'specs' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Error Correction Level (Reed-Solomon redundancy)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'L', name: 'Low (7%)', desc: 'Cleanest grid' },
                { id: 'M', name: 'Medium (15%)', desc: 'Standard default' },
                { id: 'Q', name: 'Quartile (25%)', desc: 'Great for outdoors' },
                { id: 'H', name: 'High (30%)', desc: 'Best with logos' },
              ].map((ec) => (
                <button
                  key={ec.id}
                  onClick={() => updateCustomization({ errorCorrectionLevel: ec.id as ErrorCorrectionLevel })}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    customization.errorCorrectionLevel === ec.id
                      ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <p className="text-xs font-bold">{ec.name}</p>
                  <p className="text-[10px] text-slate-400">{ec.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500">Quiet Zone (Margin)</span>
              <span className="font-mono font-bold text-brand-500">
                {customization.margin}px
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="2"
              value={customization.margin}
              onChange={(e) => updateCustomization({ margin: Number(e.target.value) })}
              className="w-full accent-brand-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};
