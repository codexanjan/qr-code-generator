# ⚡ QR Studio Pro — Production-Ready QR Code Generator & Scanner SaaS

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61dafb.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6.svg?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6.1-646cff.svg?logo=vite)
![Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-10b981.svg)

**A modern, lightning-fast, privacy-first QR Code Studio designed for creators, businesses, and developers.**  
Generate high-DPI vector QR codes, customize patterns, gradients, and brand logos, audit real-time scannability, scan codes via camera, and export in PNG, SVG, PDF, and JPG.

[**Live Demo**](https://github.com) • [**Report Bug**](https://github.com) • [**Request Feature**](https://github.com)

</div>

---

## ✨ Features at a Glance

### 🚀 17+ Supported QR Code Types
* 🌐 **Website URL** — Web links, landing pages, articles
* 📄 **Plain Text** — Messages, notes, serial keys
* 📶 **Wi-Fi Auto-Connect** — WPA/WPA2/WPA3, WEP, Open, Hidden networks
* 📇 **vCard 3.0 Digital Business Card** — Name, company, title, phones, email, site, address
* 💬 **WhatsApp Direct Chat** — Phone number + pre-composed greeting
* 📸 **Instagram Profile** — Direct handle or link
* 🎥 **YouTube** — Channel link or specific video
* 💼 **LinkedIn** — Personal or company profile
* 📍 **Google Maps Location** — Place name search or GPS latitude/longitude
* 📅 **iCal Calendar Event** — Title, dates, location, all-day toggle
* 💳 **UPI Instant Payment** — GPay, PhonePe, Paytm, BHIM with amount and notes
* 🪙 **Cryptocurrency Tip Jar** — Bitcoin (BTC), Ethereum (ETH), Solana (SOL), USDT
* 📱 **App Store Multi-Link** — iOS App Store & Google Play redirect
* ✉️ **Email** — Recipient, subject line, body
* 📞 **Phone Call** & 💬 **SMS Message**
* 🔗 **Social Multi-Link Bio** — Multiple links in a single payload

---

### 🎨 Deep Visual Customization
* **Patterns**: Square, Rounded, Dots, Classy, Classy Smooth, Extra-Rounded.
* **Colors & Gradients**: Solid, Linear, and Radial gradients with 360° angle rotation.
* **Corner & Eye Finder Shapes**: Customize outer square and inner dot shapes independently with separate eye color controls.
* **Brand Logos**: Upload custom logos (PNG/SVG) or pick from built-in brand presets with automatic background clearing.
* **Call-to-Action Frames**: "SCAN ME" banners, pill badges, and card frames.
* **Reed-Solomon Error Correction**: L (7%), M (15%), Q (25%), H (30%) with auto-level adjustment when adding logos.

---

### 🧠 Smart Innovation Suite
* 🤖 **Smart QR AI Assistant**: Describe what you want in natural language (e.g., *"Create an Instagram card for my tattoo shop"*) and let the assistant configure the type, payload, and theme automatically.
* 🛡️ **Scannability Quality Engine**: Real-time 0–100 quality score evaluating WCAG color contrast ratio, density, and logo occlusion to ensure flawless scanning in any lighting.
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
* npm or pnpm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/qr-code-generator.git

# Navigate to directory
cd "qr code generator"

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

## 🌐 Deploy to GitHub Pages

To host on GitHub Pages:
1. Push this repository to GitHub.
2. In your repo settings, navigate to **Pages** > **Build and deployment** > Source: **GitHub Actions**.
3. Use the included `.github/workflows/deploy.yml` workflow for automated static deployment on every push to `main`.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
