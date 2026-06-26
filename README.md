# Hlongwane's Construction Company PTY LTD

Corporate website for a South African construction company specialising in residential and commercial building, foundations, electrical work, carports, and ceilings.

Built with React 19, Vite 8, React Router 7, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Lint

```bash
npm run lint
```

## Structure

```
src/
  components/     Reusable UI components (Header, Footer, HeroSlider, etc.)
  pages/          Route pages (Home, About, Portfolio, Contact, Quote)
  pages/services/ Service detail pages (Buildings, Foundations, etc.)
  data/           Static content (projects, pricing engine)
  styles/         Global styles (App.css)
```

## Features

- **Quote Calculator** — Multi-step interactive estimator for all 5 services with real-time pricing based on Gauteng 2026 market rates
- **Portfolio** — Filterable project gallery with lightbox viewer
- **Contact Form** — Lead capture with file upload for drawings/plans
- **WhatsApp Integration** — One-tap chat button
- **Scroll Animations** — Framer Motion page transitions and scroll-triggered reveals
- **Desktop-First Viewport** — Renders at 900px viewport on all devices for consistent desktop layout

## Tech Stack

| Package | Version |
|---|---|
| react | ^19.2.7 |
| react-dom | ^19.2.7 |
| react-router-dom | ^7.18.0 |
| framer-motion | ^12.42.0 |
| lucide-react | ^1.21.0 |
| vite | ^8.1.0 |
| oxlint | ^1.69.0 |
