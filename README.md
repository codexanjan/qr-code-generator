# ⚡ QR Studio Pro — Modern QR Code Generator & Scanner SaaS

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Studio-3b82f6?style=for-the-badge&logo=google-chrome&logoColor=white)](https://codexanjan.github.io/qr-code-generator/)
[![GitHub Stars](https://img.shields.io/github/stars/codexanjan/qr-code-generator?style=for-the-badge&logo=github&color=f59e0b)](https://github.com/codexanjan/qr-code-generator/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](https://github.com/codexanjan/qr-code-generator/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-ec4899?style=for-the-badge&logo=shield&logoColor=white)](#-100-privacy-guarantee)

<br/>

**A lightning-fast, privacy-focused, production-ready QR Code Studio & Scanner designed for creators, businesses, and developers.**  
Generate high-DPI vector QR codes, customize patterns, gradients, and brand logos, audit real-time scannability, scan codes via camera, and export in PNG, SVG, PDF, and JPG — 100% client-side with zero tracking.

[**🌐 Open Live App**](https://codexanjan.github.io/qr-code-generator/) • [**✨ Report Bug / Feature Request**](https://github.com/codexanjan/qr-code-generator/issues)

</div>

---

## 🌟 Highlights & Features

### 🚀 17+ Supported QR Code Types
* 🌐 **Website URL** — Web links, landing pages, articles with auto-formatting
* 📄 **Plain Text** — Messages, notes, serial keys
* 📶 **Wi-Fi Auto-Connect** — WPA/WPA2/WPA3, WEP, Open, and Hidden SSID network parameters
* 📇 **vCard 3.0 Digital Business Card** — Name, company, title, phones, email, site, address, notes
* 💬 **WhatsApp Direct Chat** — Phone number + pre-composed greeting
* 📸 **Instagram Profile** — Direct handle or link
* 🎥 **YouTube** — Channel link or specific video
* 💼 **LinkedIn** — Personal or company profile
* 📍 **Google Maps Location** — Place name search or GPS latitude/longitude
* 📅 **iCal Calendar Event** — Title, dates, location, all-day toggle
* 💳 **UPI Instant Payment** — GPay, PhonePe, Paytm, BHIM with amount and transaction notes
* 🪙 **Cryptocurrency Tip Jar** — Bitcoin (BTC), Ethereum (ETH), Solana (SOL), USDT
* 📱 **App Store Multi-Link** — iOS App Store & Google Play redirect
* ✉️ **Email** — Recipient, subject line, body
* 📞 **Phone Call** & 💬 **SMS Message**
* 🔗 **Social Multi-Link Bio** — Multiple links in a single payload

---

### 🎨 Deep Visual Customization Suite
* **Body Patterns**: Square, Rounded, Dots, Classy, Classy Smooth, Extra-Rounded.
* **Colors & Gradients**: Solid, Linear, and Radial gradients with 360° rotation and transparent backgrounds.
* **Corner & Eye Shapes**: Separate customization for outer finder square and inner dot finder with custom eye colors.
* **Brand Logos**: Upload custom logos (PNG/SVG) or pick from built-in brand presets (Wi-Fi, WhatsApp, Instagram, YouTube, GitHub, LinkedIn, Bitcoin, Maps) with automatic background clearing.
* **Call-to-Action Frames**: "SCAN ME", Top Banner, Bottom Banner, Pill Badge, and Card styles.
* **Reed-Solomon Error Correction**: L (7%), M (15%), Q (25%), H (30%) with auto-level adjustment when adding logos.

---

### 🧠 Smart Innovation Suite
* 🤖 **Smart QR AI Assistant**: Describe what you want in natural language (e.g., *"Create an Instagram card for my tattoo shop"*) and let the assistant configure the type, payload, and theme automatically.
* 🛡️ **Scannability Quality Engine**: Real-time 0–100 quality score evaluating WCAG color contrast ratio, density, and logo occlusion to ensure high physical scan reliability.
* 🔀 **A/B Design Comparison**: Compare two styles side-by-side before downloading or printing.
* 📦 **Batch / Bulk QR Generator**: Paste multiple lines or CSV items and download a ZIP file of rendered QR codes.
* 📷 **WebRTC Camera & Image Scanner**: Instant client-side QR reader with audio chime, clipboard copy, and direct URL opening.
* 💾 **Local History & Templates**: 12+ pre-made templates and auto-saved browser history with JSON export.

---

### 📥 High-Resolution Multi-Format Exports
* **SVG (Vector)**: Infinite scalability for billboards, signage, and print shop vector files.
* **PNG**: Resolutions from 512px up to 4096px Ultra-HD.
* **PDF**: Print-ready formatted A4 document with title and instructions.
* **JPG**: Lightweight web images.

---

## 🔒 100% Privacy Guarantee

> **Your data never leaves your device.**  
> All QR generation, matrix math, color rendering, camera video parsing, and file exports happen 100% client-side inside your browser. No analytics tracking, no backend database, and no cookies.

---

## 🛠️ Tech Stack

* **Frontend**: React 18, TypeScript, Vite
* **Styling**: Tailwind CSS, PostCSS, Lucide Icons
* **QR Engine**: `qr-code-styling`, `jsQR`
* **Exporting**: `jspdf`, `jszip`, `canvas-confetti`

---

## 🚀 Quickstart

### Prerequisites
* Node.js 18+
* npm

### Installation
```bash
# Clone the repository
git clone https://github.com/codexanjan/qr-code-generator.git

# Navigate to directory
cd qr-code-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
```

---

## 🌐 Deployment to GitHub Pages

1. In your GitHub repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
3. Pushes to `main` will automatically build and publish the application to `https://codexanjan.github.io/qr-code-generator/`.

Alternatively, run:
```bash
npm run deploy
```

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/codexanjan">codexanjan</a></sub>
</div>
