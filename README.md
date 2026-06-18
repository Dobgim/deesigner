# ModulerContainerHub Clone

A premium, production-ready, pixel-perfect clone of **ModulerContainerHub** built with React 18, Vite, TypeScript, Tailwind CSS, and GSAP. 

The site showcases modular container structures including Storage Units, Portable Toilets, Security Cabins, and Container Homes, featuring smooth scroll-triggered animations and form validation.

## 🛠️ Tech Stack & Features

- **React 18 + Vite + TypeScript**: Fast modular development environment.
- **Tailwind CSS**: Custom color palette matching the original brand colors (Primary Green `#0b9f1a`, Slate Gray `#1e293b`).
- **React Router DOM**: Client-side single-page routing for all subpages (`/`, `/about`, `/services`, `/products`, `/contact`, `/quote`).
- **GSAP (GreenSock) & ScrollTrigger**: Custom staggered fade-ins and viewport entry animations.
- **Lucide React**: Clean, lightweight, scalable svg icons.
- **Canvas Confetti**: Celebration effects on successful form submission.
- **LocalStorage Data Persistence**: Saves contact requests and quote specifications locally.

---

## 🚀 Setup & Installation

Follow these steps to run the project locally on your machine:

1. **Clone or navigate to the project directory:**
   ```bash
   cd deeigner
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build the production bundle:**
   ```bash
   npm run build
   ```

---

## 📦 Core Dependencies List

All dependencies are defined in `package.json`:
- `react-router-dom`: SPA routing.
- `gsap`: Core animation logic.
- `lucide-react`: High-performance SVG icons.
- `canvas-confetti`: Confetti animations.
- `tailwindcss`, `postcss`, `autoprefixer`: Tailwind utility integration.

---

## 📋 Forms & Submissions Integration

By default, the forms in **Contact Us** and **Quote** pages use a simulated API endpoint. 
- Form fields are validated (required fields, email format verification).
- On a successful submission, a success modal is triggered, confetti fires, and the request data is saved in `localStorage` under `contact_inquiries` or `quote_requests` for visual validation.

### EmailJS Integration
To link these forms to an active email box, you can install `@emailjs/browser`:
```bash
npm install @emailjs/browser
```
And replace the submission handler in `src/pages/Quote.tsx` or `src/pages/Contact.tsx` with:
```typescript
import emailjs from '@emailjs/browser';

emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formElement, 'YOUR_PUBLIC_KEY')
  .then((result) => {
      console.log('Email successfully sent!', result.text);
  }, (error) => {
      console.log('Email delivery failed...', error.text);
  });
```

---

## ⚡ GSAP & Animations Setup

GSAP and ScrollTrigger are initialized in `src/lib/gsap-config.ts`.
- **Page Load Fades**: Uses standard GSAP fromTo transitions.
- **Scroll-Triggered Staggers**: Uses `ScrollTrigger` to track when cards or section grids enter the viewport, applying an opacity and offset transition.
- **Parallax Backgrounds**: Hooked to window scroll ticks to translate backgrounds slightly.

---

## ☁️ Vercel Deployment Steps

1. Install the Vercel CLI (optional) or push your project to GitHub.
2. In the Vercel Dashboard, click **New Project** and import the repository.
3. Configure the following settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. The repository contains a pre-configured `vercel.json` file in the root to handle client-side routing rewrites:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
5. Click **Deploy**. Vercel will host your modular container site with clean router endpoints.
