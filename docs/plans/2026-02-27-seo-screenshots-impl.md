# SEO + Screenshots Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add full SEO meta tags, JSON-LD schema, sitemap, new logo, screenshots gallery, and CTA to araniosoft.com.

**Architecture:** Static HTML/CSS site hosted on Cloudflare Pages via GitHub. No build step — edit HTML directly and push to trigger deploy. Screenshots are copied from the iOS app project and optimized.

**Tech Stack:** HTML5, CSS3, vanilla. Python3 (sips) for image resizing. Git for deploy via Cloudflare Pages CI.

---

### Task 1: Copy and optimize assets

**Files:**
- Create: `zeroBudget/screenshots/dashboard.png`
- Create: `zeroBudget/screenshots/budget.png`
- Create: `zeroBudget/screenshots/analytics.png`
- Replace: `logo.png`

**Step 1: Create screenshots directory**

```bash
mkdir -p ~/Developer/araniosoft-website/zeroBudget/screenshots
```

**Step 2: Resize screenshots to display size (603x1311 — 50% of 1206x2622)**

```bash
python3 - << 'EOF'
import subprocess, shutil

SRC = "/Users/rauldominguezu/Developer/App Habitos/ZeroBudgetApp 17 ene /Screenshots"
DST = "/Users/rauldominguezu/Developer/araniosoft-website/zeroBudget/screenshots"
files = {
    "01_dashboard.png": "dashboard.png",
    "02_budget.png":    "budget.png",
    "05_analytics.png": "analytics.png",
}
for src_name, dst_name in files.items():
    src = f"{SRC}/{src_name}"
    dst_path = f"{DST}/{dst_name}"
    shutil.copy(src, dst_path)
    subprocess.run(["sips", "-Z", "603", dst_path], capture_output=True)
    print(f"✓ {dst_name}")
EOF
```

Expected: 3 files created in `zeroBudget/screenshots/`.

**Step 3: Replace logo.png with new 3D logo (resized to 200x200)**

```bash
python3 - << 'EOF'
import shutil, subprocess
src = "/Users/rauldominguezu/Downloads/Gemini_Generated_Image_bv642obv642obv64.png"
dst = "/Users/rauldominguezu/Developer/araniosoft-website/logo.png"
shutil.copy(src, dst)
subprocess.run(["sips", "-Z", "200", dst], capture_output=True)
print("✓ logo.png replaced")
EOF
```

**Step 4: Verify file sizes**

```bash
ls -lh ~/Developer/araniosoft-website/logo.png
ls -lh ~/Developer/araniosoft-website/zeroBudget/screenshots/
```

Expected: logo.png ~20-40KB, each screenshot ~80-150KB.

**Step 5: Commit**

```bash
cd ~/Developer/araniosoft-website
git add logo.png zeroBudget/screenshots/
git commit -m "feat: add new logo and app screenshots"
```

---

### Task 2: SEO meta tags — index.html

**Files:**
- Modify: `index.html` (inside `<head>`)

**Step 1: Replace the entire `<head>` section of `index.html`**

Replace everything between `<head>` and `</head>` with:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aranio Soft — Apps iOS que respetan tu privacidad</title>
    <meta name="description" content="Aranio Soft crea apps iOS privadas y 100% offline. ZeroBudget: gestión de finanzas personales sin servidores ni cuentas de usuario.">
    <link rel="canonical" href="https://araniosoft.com/">

    <!-- Open Graph -->
    <meta property="og:type"        content="website">
    <meta property="og:url"         content="https://araniosoft.com/">
    <meta property="og:title"       content="Aranio Soft — Apps iOS que respetan tu privacidad">
    <meta property="og:description" content="Aranio Soft crea apps iOS privadas y 100% offline. ZeroBudget: finanzas personales sin servidores ni cuentas.">
    <meta property="og:image"       content="https://araniosoft.com/logo.png">
    <meta property="og:locale"      content="es_MX">

    <!-- Twitter Card -->
    <meta name="twitter:card"        content="summary">
    <meta name="twitter:title"       content="Aranio Soft — Apps iOS privadas">
    <meta name="twitter:description" content="ZeroBudget: finanzas personales 100% offline para iPhone.">
    <meta name="twitter:image"       content="https://araniosoft.com/logo.png">

    <!-- JSON-LD Organization -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Aranio Soft",
      "url": "https://araniosoft.com",
      "logo": "https://araniosoft.com/logo.png",
      "email": "soporte@araniosoft.com",
      "description": "Empresa de desarrollo de apps iOS privadas y offline."
    }
    </script>
    <style>
```

Note: keep `<style>` open — the CSS block continues unchanged.

**Step 2: Update alt text of logo image**

Find:
```html
<div class="app-icon"><img src="logo.png" alt="ZeroBudget"></div>
```
Replace with:
```html
<div class="app-icon"><img src="logo.png" alt="Ícono de ZeroBudget — app de finanzas personales para iPhone" width="100" height="100"></div>
```

**Step 3: Fix copyright year**

Find: `&copy; 2025 Aranio Soft`
Replace: `&copy; 2026 Aranio Soft`

**Step 4: Verify HTML is valid**

```bash
python3 -c "
from html.parser import HTMLParser
class V(HTMLParser): pass
V().feed(open('/Users/rauldominguezu/Developer/araniosoft-website/index.html').read())
print('HTML valid')
"
```

Expected: `HTML valid` (no exception).

**Step 5: Commit**

```bash
cd ~/Developer/araniosoft-website
git add index.html
git commit -m "feat: add SEO meta tags and OG to homepage"
```

---

### Task 3: SEO meta tags + JSON-LD — zeroBudget/index.html

**Files:**
- Modify: `zeroBudget/index.html` (inside `<head>`)

**Step 1: Replace the entire `<head>` section of `zeroBudget/index.html`**

Replace everything between `<head>` and `</head>` with:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZeroBudget — Finanzas Personales Privadas para iPhone</title>
    <meta name="description" content="ZeroBudget: gestiona tus finanzas personales en iPhone sin servidores ni cuentas. Presupuestos, metas de ahorro, multi-cuenta, analíticas. 100% offline y gratis.">
    <link rel="canonical" href="https://araniosoft.com/zeroBudget/">

    <!-- Open Graph -->
    <meta property="og:type"        content="website">
    <meta property="og:url"         content="https://araniosoft.com/zeroBudget/">
    <meta property="og:title"       content="ZeroBudget — Finanzas Personales Privadas para iPhone">
    <meta property="og:description" content="Gestiona tus finanzas sin servidores ni cuentas. 100% offline, presupuestos, metas de ahorro y analíticas en tu iPhone.">
    <meta property="og:image"       content="https://araniosoft.com/zeroBudget/screenshots/dashboard.png">
    <meta property="og:locale"      content="es_MX">

    <!-- Twitter Card -->
    <meta name="twitter:card"        content="summary_large_image">
    <meta name="twitter:title"       content="ZeroBudget — Finanzas Personales para iPhone">
    <meta name="twitter:description" content="100% offline. Sin servidores. Sin cuentas. Tus finanzas, solo en tu iPhone.">
    <meta name="twitter:image"       content="https://araniosoft.com/zeroBudget/screenshots/dashboard.png">

    <!-- JSON-LD SoftwareApplication -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "ZeroBudget",
      "operatingSystem": "iOS",
      "applicationCategory": "FinanceApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "MXN"
      },
      "description": "App de finanzas personales para iPhone. 100% offline, sin servidores ni cuentas de usuario. Presupuestos, metas de ahorro, multi-cuenta y analíticas.",
      "author": {
        "@type": "Organization",
        "name": "Aranio Soft",
        "url": "https://araniosoft.com"
      }
    }
    </script>
    <style>
```

Note: keep `<style>` open — CSS continues unchanged.

**Step 2: Update hero icon alt text and add width/height**

Find:
```html
<div class="hero-icon"><img src="../logo.png" alt="ZeroBudget"></div>
```
Replace:
```html
<div class="hero-icon"><img src="../logo.png" alt="Ícono de ZeroBudget" width="120" height="120"></div>
```

**Step 3: Replace badge row with "Próximamente" CTA**

Find:
```html
        <div class="badge-row">
            <span class="badge">🔒 100% Local</span>
            <span class="badge">📱 iOS</span>
            <span class="badge">🌙 Dark Mode</span>
            <span class="badge">🇲🇽 Hecho en México</span>
        </div>
    </section>
```
Replace:
```html
        <div class="badge-row">
            <span class="badge">🔒 100% Local</span>
            <span class="badge">📱 iOS</span>
            <span class="badge">🌙 Dark Mode</span>
            <span class="badge">🇲🇽 Hecho en México</span>
        </div>
        <p class="coming-soon">Próximamente en el App Store</p>
        <a href="mailto:soporte@araniosoft.com?subject=Notifícame%20ZeroBudget" class="notify-btn">
            🔔 Notifícame cuando esté disponible
        </a>
    </section>
```

**Step 4: Add CSS for coming-soon and notify-btn**

Inside the `<style>` block, before the closing `</style>`, add:

```css
        .coming-soon {
            font-size: 0.85rem;
            color: var(--muted);
            margin-bottom: 0.75rem;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-weight: 600;
        }
        .notify-btn {
            display: inline-block;
            background: var(--accent);
            color: white;
            padding: 0.75rem 1.75rem;
            border-radius: 50px;
            font-weight: 700;
            font-size: 0.95rem;
            text-decoration: none;
            margin-bottom: 2rem;
            transition: opacity 0.2s;
        }
        .notify-btn:hover { opacity: 0.85; }
```

**Step 5: Fix copyright year**

Find: `&copy; 2025 <a href="../">Aranio Soft</a>`
Replace: `&copy; 2026 <a href="../">Aranio Soft</a>`

**Step 6: Validate HTML**

```bash
python3 -c "
from html.parser import HTMLParser
class V(HTMLParser): pass
V().feed(open('/Users/rauldominguezu/Developer/araniosoft-website/zeroBudget/index.html').read())
print('HTML valid')
"
```

**Step 7: Commit**

```bash
cd ~/Developer/araniosoft-website
git add zeroBudget/index.html
git commit -m "feat: add SEO meta tags, JSON-LD and coming-soon CTA to ZeroBudget page"
```

---

### Task 4: Screenshots gallery — zeroBudget/index.html

**Files:**
- Modify: `zeroBudget/index.html`

**Step 1: Add gallery CSS inside `<style>` block, before `</style>`**

```css
        /* Screenshots gallery */
        .gallery-section {
            max-width: 800px;
            margin: 0 auto 3rem;
            padding: 0 1.5rem;
            text-align: center;
        }
        .gallery-section h2 {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
        }
        .gallery {
            display: flex;
            gap: 1rem;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 0.5rem;
            justify-content: center;
        }
        .gallery img {
            width: 200px;
            flex-shrink: 0;
            border-radius: 28px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.15);
            scroll-snap-align: center;
        }
        @media (max-width: 600px) {
            .gallery { justify-content: flex-start; }
            .gallery img { width: 160px; }
        }
```

**Step 2: Add gallery HTML between `.features` section and `.privacy-callout` section**

Find:
```html
    <section class="privacy-callout">
```
Insert before it:
```html
    <section class="gallery-section">
        <h2>Mira cómo funciona</h2>
        <div class="gallery">
            <img src="screenshots/dashboard.png" alt="Dashboard de ZeroBudget — vista principal con gastos del mes" width="200" loading="lazy">
            <img src="screenshots/budget.png"    alt="Presupuesto en ZeroBudget — distribución 50/20/20/10" width="200" loading="lazy">
            <img src="screenshots/analytics.png" alt="Analíticas en ZeroBudget — gráficas de gastos por categoría" width="200" loading="lazy">
        </div>
    </section>

```

**Step 3: Validate HTML**

```bash
python3 -c "
from html.parser import HTMLParser
class V(HTMLParser): pass
V().feed(open('/Users/rauldominguezu/Developer/araniosoft-website/zeroBudget/index.html').read())
print('HTML valid')
"
```

**Step 4: Commit**

```bash
cd ~/Developer/araniosoft-website
git add zeroBudget/index.html
git commit -m "feat: add screenshots gallery to ZeroBudget product page"
```

---

### Task 5: sitemap.xml + robots.txt

**Files:**
- Create: `sitemap.xml`
- Create: `robots.txt`

**Step 1: Create sitemap.xml**

```bash
cat > ~/Developer/araniosoft-website/sitemap.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://araniosoft.com/</loc>
    <lastmod>2026-02-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://araniosoft.com/zeroBudget/</loc>
    <lastmod>2026-02-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
EOF
```

**Step 2: Create robots.txt**

```bash
cat > ~/Developer/araniosoft-website/robots.txt << 'EOF'
User-agent: *
Allow: /

Sitemap: https://araniosoft.com/sitemap.xml
EOF
```

**Step 3: Verify files exist and are valid**

```bash
cat ~/Developer/araniosoft-website/sitemap.xml
cat ~/Developer/araniosoft-website/robots.txt
```

Expected: clean XML and 3-line robots.txt.

**Step 4: Commit and push**

```bash
cd ~/Developer/araniosoft-website
git add sitemap.xml robots.txt
git commit -m "feat: add sitemap.xml and robots.txt"
git push origin main
```

Expected: Cloudflare Pages triggers a new deploy automatically.

---

### Task 6: Verify live site

**Step 1: Wait ~60 seconds for Cloudflare to deploy, then check meta tags are live**

```bash
curl -s https://araniosoft.com/ | grep -E "og:|twitter:|description|canonical" | head -20
```

Expected: OG and Twitter tags visible in output.

**Step 2: Check sitemap is accessible**

```bash
curl -s https://araniosoft.com/sitemap.xml | head -10
```

Expected: XML with urlset.

**Step 3: Check robots.txt**

```bash
curl -s https://araniosoft.com/robots.txt
```

Expected: `User-agent: *` and Sitemap line.

**Step 4: Check structured data (manual)**

Open: https://search.google.com/test/rich-results?url=https://araniosoft.com/zeroBudget/

Expected: SoftwareApplication detected with no errors.
