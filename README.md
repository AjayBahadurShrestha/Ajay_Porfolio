# Ajay Bahadur Shrestha — Portfolio

A futuristic, 3D immersive personal portfolio built with **React + Vite**.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run in development mode
```bash
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```
Output goes to the `dist/` folder — ready to deploy on Netlify, Vercel, or GitHub Pages.

### 4. Preview production build locally
```bash
npm run preview
```

---

## 📁 Project Structure

```
ajay-portfolio/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx          ← React entry point
│   ├── App.jsx           ← Root component
│   ├── index.css         ← Global styles & animations
│   ├── hooks/
│   │   └── useReveal.js  ← Scroll-reveal hook
│   └── components/
│       ├── Cursor.jsx        ← Custom glowing cursor
│       ├── ParticleCanvas.jsx← Background particle network
│       ├── Navbar.jsx        ← Responsive navigation
│       ├── Hero.jsx          ← 3D sphere + typed text
│       ├── About.jsx         ← DNA canvas + timeline
│       ├── Skills.jsx        ← Orbiting spheres + cards
│       ├── Projects.jsx      ← 3D shape previews
│       ├── Journey.jsx       ← Scroll-reveal timeline
│       ├── Contact.jsx       ← Form + social links
│       └── Footer.jsx        ← Footer + Easter egg
```

---

## ✨ Features

- **3D Hero** — interactive wireframe sphere that follows your cursor
- **DNA helix** animation in the About section
- **Orbiting skill spheres** — hover to highlight
- **3D project cards** — cube, torus, pyramid animations
- **Scroll-reveal timeline** — journey section
- **Custom cursor** with magnetic glow effect
- **Particle network** background
- **Futuristic contact form** with send animation
- **Easter egg** — try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
- **Fully responsive** — mobile, tablet, laptop, desktop

---

## 🛠 Updating Projects

Open `src/components/Projects.jsx` and edit the `PROJECTS` array:

```js
const PROJECTS = [
  {
    num: '001',
    title: 'Your Project Name',
    desc: 'Your project description here.',
    tech: ['React', 'Node.js', 'MongoDB'],
    shape: 'cube',   // cube | torus | pyramid
    color: '#00f5ff',
  },
  // add more...
]
```

---

## 🎨 Customisation

| What | Where |
|------|-------|
| Name / intro text | `src/components/Hero.jsx` |
| About text & timeline | `src/components/About.jsx` |
| Skills & proficiency | `src/components/Skills.jsx` |
| Projects | `src/components/Projects.jsx` |
| Journey events | `src/components/Journey.jsx` |
| Contact links | `src/components/Contact.jsx` |
| Colors / fonts | `src/index.css` (CSS variables) |

---

## 🌐 Deploy to Vercel (free)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → Import project
3. Framework: **Vite** (auto-detected)
4. Click Deploy — done! ✅

---

## 🕹 Easter Egg

Type the **Konami Code** anywhere on the site:  
`↑ ↑ ↓ ↓ ← → ← → B A`

---

Made with ❤️ by Ajay Bahadur Shrestha
# Ajay_Porfolio
