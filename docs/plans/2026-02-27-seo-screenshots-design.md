# SEO + Screenshots Design — araniosoft.com
Date: 2026-02-27

## Goal
Improve SEO visibility and visual appeal of araniosoft.com using existing images and screenshots.

## Scope
- `index.html` (homepage)
- `zeroBudget/index.html` (product page)
- New: `sitemap.xml`, `robots.txt`
- Replace: `logo.png` with new 3D logo

## Changes

### 1. SEO Meta Tags — index.html
- Add `<title>`: "Aranio Soft — Apps iOS que respetan tu privacidad"
- Add `<meta name="description">`: "Aranio Soft crea apps iOS privadas y offline. ZeroBudget: gestión de finanzas personales sin servidores ni cuentas."
- Add Open Graph: og:title, og:description, og:image (logo), og:type=website, og:url
- Add Twitter Card meta tags
- Add canonical URL

### 2. SEO Meta Tags — zeroBudget/index.html
- Update `<title>`: "ZeroBudget — Finanzas Personales Privadas para iPhone"
- Update meta description with keywords
- Add Open Graph tags (og:image = dashboard screenshot)
- Add JSON-LD SoftwareApplication schema
- Add canonical URL

### 3. New Files
- `sitemap.xml`: lists index.html and zeroBudget/index.html
- `robots.txt`: allow all, point to sitemap

### 4. Logo Update
- Replace `logo.png` with new 3D logo (Gemini_Generated_Image_bv642obv642obv64.png)
- Keep same filename for zero-change impact on existing references

### 5. Screenshots Gallery — zeroBudget/index.html
- New section "Mira cómo funciona" between Features and Privacy Callout
- Copy screenshots to `zeroBudget/screenshots/`: dashboard.png, budget.png, analytics.png
- Horizontal scroll on mobile, 3-column on desktop
- iPhone-style frame: border-radius 40px, box-shadow

### 6. CTA Update — zeroBudget/index.html
- Replace badge row with "Próximamente en App Store" text
- Add mailto CTA button: "🔔 Notifícame cuando esté disponible"

### 7. Fix Menores
- Copyright 2025 → 2026 (both pages)
- Descriptive alt texts on all images

## Assets
- New logo source: `/Users/rauldominguezu/Downloads/Gemini_Generated_Image_bv642obv642obv64.png`
- Screenshots source: `/Users/rauldominguezu/Developer/App Habitos/ZeroBudgetApp 17 ene /Screenshots/`
  - `01_dashboard.png`
  - `02_budget.png`
  - `05_analytics.png`
