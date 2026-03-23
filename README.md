# 🌿 Aditya Dryfruits — Full React E-Commerce App

Premium dry fruits e-commerce website built with React + Vite + Firebase.

## 📁 Project Structure

```
aditya-dryfruits/
├── public/
│   └── logo.png
├── src/
│   ├── assets/
│   │   └── logo.png              ← Shop logo
│   ├── components/
│   │   ├── Header.jsx            ← Sticky header, search, cart, account
│   │   ├── HeroSlider.jsx        ← Auto-play hero with 3 slides
│   │   ├── ProductCard.jsx       ← Palm Tree-style product card
│   │   ├── CartDrawer.jsx        ← Slide-in cart with qty controls
│   │   ├── AuthModal.jsx         ← Login / Signup / Google Auth
│   │   ├── CheckoutModal.jsx     ← 3-step checkout + Google location
│   │   ├── Footer.jsx
│   │   ├── FloatWA.jsx           ← Floating WhatsApp button
│   │   └── Toast.jsx
│   ├── context/
│   │   └── AppContext.jsx        ← Cart + Auth + UI state
│   ├── data/
│   │   └── products.js           ← All 90+ products + images
│   ├── pages/
│   │   └── Home.jsx              ← Full homepage (all sections)
│   ├── firebase.js               ← Firebase init
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                 ← All styles
├── .env                          ← ⚠️ Add your Firebase credentials here
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Add Firebase credentials
Edit `.env` and replace the placeholder values:
```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Get these from:** Firebase Console → Project Settings → Your Apps → Web App

### 3. Run development server
```bash
npm run dev
```
Opens at **http://localhost:3000**

### 4. Build for production
```bash
npm run build
```

---

## 🔥 Firebase Setup (5 minutes)

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project → Add a **Web App**
3. Copy the config into `.env`
4. Enable **Authentication** → Sign-in methods → Email/Password + Google
5. Enable **Firestore Database** → Start in test mode
6. In Firestore, orders will be saved to the `orders` collection automatically

---

## 🌐 Deploy to Netlify (Free)

```bash
npm run build
```
Then drag the `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop)

---

## ✨ Features

| Feature | Status |
|---|---|
| Palm Tree-style layout | ✅ |
| Hero slider (3 slides, auto-play) | ✅ |
| Shop by Category grid | ✅ |
| Product cards with real images | ✅ |
| Category filter pills | ✅ |
| Live search | ✅ |
| Load More pagination | ✅ |
| Cart drawer (add/remove/qty) | ✅ |
| Free shipping threshold | ✅ |
| Firebase Email/Password Auth | ✅ |
| Google Sign-In | ✅ |
| Account dropdown | ✅ |
| 3-step Checkout flow | ✅ |
| Google/Nominatim location search | ✅ |
| Order saved to Firestore | ✅ |
| WhatsApp order fallback | ✅ |
| Testimonials carousel | ✅ |
| Instagram grid | ✅ |
| Floating WhatsApp button | ✅ |
| Toast notifications | ✅ |
| Mobile responsive | ✅ |
| Lazy image loading | ✅ |

---

## 📞 Contact Info in Code
- **WhatsApp:** +91 79872 39233
- **Instagram:** @aditya_dryfruits
- **Location:** Maheshwar, Madhya Pradesh
