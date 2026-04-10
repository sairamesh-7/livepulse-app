# 🎬 StreamFest — Live Events & Streaming Platform

<div align="center">

### ⚡ Discover Events. Stream Live. Chat in Real-Time.

![Frontend](https://img.shields.io/badge/Frontend-Next.js%20%7C%20React-black?style=for-the-badge&logo=next.js)
![Styling](https://img.shields.io/badge/Styling-CSS%20Modules-blue?style=for-the-badge)
![Fonts](https://img.shields.io/badge/Fonts-Syne%20%7C%20DM%20Sans-orange?style=for-the-badge)
![Routing](https://img.shields.io/badge/Routing-Dynamic%20Routes-purple?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

</div>

---

## ✨ Overview

A **fully responsive live event streaming platform** that lets users browse, search, filter, and stream events — all from the browser.

No backend. No Firebase. Just clean React + Next.js. ⚡

> Built with **Next.js 14 + CSS Modules + local state simulation**, making it fast, responsive, and submission-ready out of the box.

---

## 🌟 Key Highlights

| Feature | Description |
|---|---|
| 🎴 **Event Listing Page** | 15+ cards with image, tags, date, viewer count |
| ❤️ **Like Button** | Animated heart toggle per card |
| 🔗 **Share Button** | Clipboard copy with visual confirmation |
| 🔍 **Search & Filter** | Real-time search + 10 category filters |
| 🔥 **Sort Controls** | Trending, Most Viewers, Latest Added |
| 🎥 **Live Stream Page** | Responsive YouTube embed (16:9) |
| 💬 **Live Chat UI** | Simulated real-time messages + auto-scroll |
| 📊 **Event Stats** | Viewers, host, date, time in stat cards |
| 🔁 **Related Events** | Same-category recommendations |
| 📱 **Fully Responsive** | Mobile, tablet, and desktop layouts |

---

## 🧠 Architecture

```text
User
 └── Next.js Frontend (Pages Router)
      ├── index.js              → Event listing page (search, filter, grid)
      ├── event/[id].js         → Stream page (video + chat + stats)
      ├── components/
      │   ├── Navbar            → Sticky header with logo + nav
      │   ├── EventCard         → Card UI (like, share, watch)
      │   └── LiveChat          → Simulated real-time chat panel
      ├── data/events.js        → 15 event objects (no API needed)
      └── styles/               → CSS Modules + CSS Variables
```

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| 🎨 Framework | Next.js 14 (Pages Router) |
| ⚛️ UI Library | React 18 |
| 🎨 Styling | CSS Modules + CSS Custom Properties |
| 🔤 Typography | Syne (display) + DM Sans (body) via Google Fonts |
| 🖼️ Images | Unsplash CDN |
| 🎥 Video | YouTube iframe embed |
| 💬 Chat | Local state simulation (no backend) |
| 🚀 Deployment | Vercel |

---

## 📂 Project Structure

```
streamfest/
├── components/
│   ├── Navbar.js              # Sticky header with logo + nav links
│   ├── Navbar.module.css
│   ├── EventCard.js           # Card: image, tags, like / share / watch
│   ├── EventCard.module.css
│   ├── LiveChat.js            # Chat panel with auto-scroll + input
│   └── LiveChat.module.css
├── data/
│   └── events.js              # 15 events + categories + tag metadata
├── pages/
│   ├── _app.js                # Global CSS wrapper
│   ├── _document.js           # Font preload (Google Fonts)
│   ├── index.js               # Home — event listing page
│   └── event/
│       └── [id].js            # Dynamic stream page per event
├── styles/
│   ├── globals.css            # CSS variables, resets, keyframe animations
│   ├── Home.module.css        # Listing page layout & components
│   └── Event.module.css       # Stream page layout & components
├── public/
├── .gitignore
├── .eslintrc.json
├── next.config.js
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm or yarn

### 🚀 Clone & Install

```bash
# Clone the repository
git clone https://github.com/sairamesh-7/livepulse-app.git

# Navigate into the project
cd livepulse-app

# Install dependencies
npm install
```

### ▶️ Run Locally

```bash
npm run dev
```

🌐 Open your browser at: **http://localhost:3000**

### 🏗️ Build for Production

```bash
npm run build
npm start
```

---

## 🔄 User Flow

```
1. 🏠 Landing Page    →  Browse 15+ live event cards in a responsive grid
2. 🔍 Search / Filter →  Find events by name, category, or sort order
3. ❤️ Interact        →  Like or share any event card
4. 🎥 Watch Live      →  Click a card → navigate to the stream page
5. 💬 Live Chat       →  Read & send messages in the real-time chat panel
6. 🔁 Related Events  →  Discover more events in the same category
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `< 480px` | Single-column grid, stacked controls |
| `480px – 768px` | 2-column card grid |
| `768px – 960px` | 3-column grid, stacked stream + chat |
| `> 960px` | 4-column grid, side-by-side stream + chat |

---

## 📸 Screenshots

> _Add screenshots to a `/screenshots` folder and update the paths below._

| Event Listing | Stream Page | Live Chat |
|---|---|---|
| ![Listing](./screenshots/listing.png) | ![Stream](./screenshots/stream.png) | ![Chat](./screenshots/chat.png) |

---

## 🚧 Roadmap

- [ ] 🔐 User Authentication (Clerk / NextAuth)
- [ ] 🔖 Bookmark / Watchlist Feature
- [ ] 🌙 Light / Dark Mode Toggle
- [ ] 🔴 Real WebSocket Chat (Socket.io)
- [ ] 🗺️ Event Detail Map View
- [ ] 🔔 Live Notification Bell

---

## 🌐 Deployment (Vercel)

The easiest way to deploy is via [Vercel](https://vercel.com):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel
```

Or connect your GitHub repo directly at **vercel.com → Import Project → Deploy** (zero config needed for Next.js).

**Live Demo:** [https://streamfest.vercel.app](https://livepulse-app.vercel.app/) *(update after deploy)*

---

## 👨‍💻 Authors

<div align="center">

| Name | Role |
|------|------|
| **Your Name** | Frontend Developer |

🎓 *Your Institution Name*

</div>

---

## 📜 License

```
MIT License © 2026
```

See [LICENSE](./LICENSE) for full details.

---

<div align="center">

🌍 **Built for the Web. Designed for Everyone.**

⭐ Star this repo if you found it useful &nbsp;|&nbsp; 🚀 PRs are welcome!

</div>
