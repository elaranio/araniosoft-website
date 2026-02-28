# ZeroBudget Landing Page — Apple-Style Redesign

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rediseñar `zeroBudget/index.html` en estilo Apple iPhone Pro page — fondo negro, tipografía enorme, screenshots en marcos de iPhone, parallax con GSAP ScrollTrigger.

**Architecture:** Un solo archivo HTML (`zeroBudget/index.html`) con CSS inline + GSAP cargado desde CDN. El parallax usa `ScrollTrigger.create()` con `scrub: true` para que las imágenes se muevan en sincronía exacta con el scroll. Los screenshots existentes se muestran dentro de marcos de iPhone dibujados en CSS puro.

**Tech Stack:** HTML5, CSS3, GSAP 3.x + ScrollTrigger (CDN), Vanilla JS. Sin frameworks. Deploy automático via Cloudflare Pages al hacer push a `main`.

**Repo:** `~/Developer/araniosoft-website/`
**Archivo objetivo:** `zeroBudget/index.html`
**Screenshots disponibles:** `zeroBudget/screenshots/` (dashboard, transactions, budget, accounts, analytics, drilldown)

---

## Paleta de colores

```
--apple-black:   #000000   /* fondo hero */
--apple-dark:    #111111   /* secciones alternas */
--apple-darker:  #0a0a0a   /* secciones impares */
--apple-text:    #F5F5F7   /* texto principal (exacto apple.com) */
--apple-muted:   #86868B   /* texto secundario (exacto apple.com) */
--brand-green:   #34D399   /* único color de marca ZeroBudget */
--brand-green2:  #10B981   /* hover/gradiente */
```

---

### Task 1: Reemplazar CSS base — reset Apple + tipografía

**Files:**
- Modify: `zeroBudget/index.html` — sección `<style>` completa

**Step 1: Reemplazar todo el `<style>` existente con el nuevo CSS base**

Pegar este bloque **completo** reemplazando el `<style>...</style>` actual:

```html
<style>
  /* ─── RESET & BASE ─────────────────────────────────────────── */
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --apple-black:  #000000;
    --apple-dark:   #111111;
    --apple-darker: #0a0a0a;
    --apple-text:   #F5F5F7;
    --apple-muted:  #86868B;
    --brand-green:  #34D399;
    --brand-green2: #10B981;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: -apple-system, "SF Pro Display", "Helvetica Neue", sans-serif;
    background: var(--apple-black);
    color: var(--apple-text);
    overflow-x: hidden;
    line-height: 1.6;
  }

  /* ─── SCROLLBAR ─────────────────────────────────────────────── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--apple-black); }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }

  /* ─── NAV ───────────────────────────────────────────────────── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    height: 48px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 24px;
    transition: background 0.3s;
  }
  .nav.scrolled {
    background: rgba(0,0,0,0.72);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .nav-logo {
    display: flex; align-items: center; gap: 8px;
    text-decoration: none; color: var(--apple-text);
    font-size: 17px; font-weight: 600; letter-spacing: -0.3px;
  }
  .nav-logo img { width: 28px; height: 28px; border-radius: 7px; }
  .nav-badge {
    font-size: 12px; color: var(--apple-muted);
    font-weight: 400; letter-spacing: 0;
  }

  /* ─── HERO ──────────────────────────────────────────────────── */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    padding: 80px 24px 60px;
    background: var(--apple-black);
    position: relative;
    overflow: hidden;
  }
  .hero-eyebrow {
    font-size: 14px; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--brand-green);
    margin-bottom: 16px;
  }
  .hero-title {
    font-size: clamp(3rem, 9vw, 7rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin-bottom: 20px;
    color: var(--apple-text);
  }
  .hero-subtitle {
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    color: var(--apple-muted);
    font-weight: 400;
    max-width: 560px;
    margin: 0 auto 40px;
    line-height: 1.5;
  }
  .hero-cta {
    display: inline-block;
    background: var(--brand-green);
    color: #000;
    font-size: 17px; font-weight: 600;
    padding: 14px 30px;
    border-radius: 980px;
    text-decoration: none;
    transition: opacity 0.2s;
    margin-bottom: 16px;
  }
  .hero-cta:hover { opacity: 0.85; }
  .hero-coming-soon {
    font-size: 13px; color: var(--apple-muted);
    letter-spacing: 0.04em; text-transform: uppercase;
  }

  /* ─── IPHONE FRAME (CSS puro) ───────────────────────────────── */
  .iphone-wrap {
    position: relative;
    display: inline-block;
    margin: 60px auto 0;
  }
  .iphone-frame {
    position: relative;
    width: 280px;
    background: #1a1a1a;
    border-radius: 50px;
    padding: 14px;
    box-shadow:
      0 0 0 1.5px #3a3a3a,
      0 40px 80px rgba(0,0,0,0.6),
      0 0 0 8px #0d0d0d,
      0 0 0 9.5px #2a2a2a;
  }
  .iphone-frame::before {
    content: '';
    position: absolute;
    top: 14px; left: 50%; transform: translateX(-50%);
    width: 90px; height: 28px;
    background: #0d0d0d;
    border-radius: 0 0 20px 20px;
    z-index: 2;
  }
  .iphone-frame::after {
    content: '';
    position: absolute;
    top: 20px; left: 50%; transform: translateX(-50%);
    width: 10px; height: 10px;
    background: #1e1e1e;
    border-radius: 50%;
    z-index: 3;
    box-shadow: 0 0 0 1.5px #2a2a2a;
  }
  .iphone-screen {
    width: 100%;
    border-radius: 36px;
    display: block;
    overflow: hidden;
    background: #000;
  }
  .iphone-screen img {
    width: 100%;
    display: block;
    border-radius: 36px;
  }

  /* Hero iPhone — más grande */
  .hero .iphone-frame { width: 300px; }

  /* ─── FEATURE SECTIONS ──────────────────────────────────────── */
  .feature-section {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 60px;
    padding: 120px 8vw;
    overflow: hidden;
  }
  .feature-section.bg-dark   { background: var(--apple-darker); }
  .feature-section.bg-black  { background: var(--apple-black); }
  .feature-section.reverse   { direction: rtl; }
  .feature-section.reverse > * { direction: ltr; }

  .feature-text { max-width: 480px; }
  .feature-eyebrow {
    font-size: 13px; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--brand-green);
    margin-bottom: 16px;
  }
  .feature-title {
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 20px;
    color: var(--apple-text);
  }
  .feature-desc {
    font-size: 17px;
    color: var(--apple-muted);
    line-height: 1.7;
  }
  .feature-img {
    display: flex;
    justify-content: center;
    will-change: transform;
  }

  /* ─── STATS SECTION ─────────────────────────────────────────── */
  .stats-section {
    padding: 120px 8vw;
    background: var(--apple-darker);
    text-align: center;
  }
  .stats-title {
    font-size: clamp(1.4rem, 3vw, 2rem);
    font-weight: 600;
    color: var(--apple-muted);
    margin-bottom: 80px;
    letter-spacing: -0.02em;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    max-width: 900px;
    margin: 0 auto;
  }
  .stat-item {}
  .stat-number {
    font-size: clamp(3rem, 7vw, 5.5rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    color: var(--apple-text);
    line-height: 1;
    display: block;
    margin-bottom: 12px;
  }
  .stat-label {
    font-size: 17px;
    color: var(--apple-muted);
  }
  .stat-accent { color: var(--brand-green); }

  /* ─── GALLERY SECTION ───────────────────────────────────────── */
  .gallery-section {
    padding: 120px 0;
    background: var(--apple-black);
    overflow: hidden;
  }
  .gallery-header {
    text-align: center;
    padding: 0 24px 80px;
  }
  .gallery-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-bottom: 16px;
  }
  .gallery-subtitle {
    font-size: 17px;
    color: var(--apple-muted);
  }
  .gallery-track {
    display: flex;
    gap: 24px;
    padding: 0 8vw 20px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .gallery-track::-webkit-scrollbar { display: none; }
  .gallery-track .iphone-frame {
    flex-shrink: 0;
    width: 220px;
    scroll-snap-align: start;
  }

  /* ─── CTA SECTION ───────────────────────────────────────────── */
  .cta-section {
    min-height: 60vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    padding: 120px 24px;
    background: var(--apple-darker);
  }
  .cta-title {
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 24px;
  }
  .cta-subtitle {
    font-size: 19px;
    color: var(--apple-muted);
    margin-bottom: 48px;
    max-width: 500px;
  }

  /* ─── FOOTER ────────────────────────────────────────────────── */
  footer {
    padding: 40px 24px;
    border-top: 1px solid rgba(255,255,255,0.08);
    background: var(--apple-darker);
  }
  .footer-inner {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .footer-links {
    display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;
  }
  .footer-links a {
    font-size: 13px;
    color: var(--apple-muted);
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--apple-text); }
  .footer-copy {
    font-size: 13px;
    color: var(--apple-muted);
  }
  .footer-copy a { color: var(--apple-muted); text-decoration: none; }

  /* ─── ANIMATIONS (estado inicial — GSAP los anima) ──────────── */
  .fade-up {
    opacity: 0;
    transform: translateY(40px);
  }

  /* ─── RESPONSIVE ────────────────────────────────────────────── */
  @media (max-width: 768px) {
    .feature-section {
      grid-template-columns: 1fr;
      text-align: center;
      padding: 80px 6vw;
      gap: 48px;
    }
    .feature-section.reverse { direction: ltr; }
    .feature-img { order: -1; }
    .feature-text { max-width: 100%; }
    .stats-grid { grid-template-columns: 1fr; gap: 48px; }
    .hero .iphone-frame { width: 240px; }
  }
</style>
```

**Step 2: Verificar en el navegador** — abrir `zeroBudget/index.html` localmente. Debe verse negro con texto blanco.

**Step 3: Commit**
```bash
cd ~/Developer/araniosoft-website
git add zeroBudget/index.html
git commit -m "feat: replace CSS with Apple-style dark design system"
```

---

### Task 2: Reemplazar el HTML del `<body>` completo

**Files:**
- Modify: `zeroBudget/index.html` — todo el `<body>`

**Step 1: Reemplazar todo el `<body>` con este HTML**

```html
<body>

  <!-- ─── NAV ─────────────────────────────────────────────────── -->
  <nav class="nav" id="mainNav">
    <a class="nav-logo" href="../">
      <img src="../logo.png" alt="ZeroBudget">
      ZeroBudget
    </a>
    <span class="nav-badge">Próximamente en App Store</span>
  </nav>

  <!-- ─── HERO ─────────────────────────────────────────────────── -->
  <section class="hero">
    <p class="hero-eyebrow fade-up">Finanzas Personales para iPhone</p>
    <h1 class="hero-title fade-up">Tus finanzas.<br>Solo en tu iPhone.</h1>
    <p class="hero-subtitle fade-up">Sin servidores. Sin cuentas. Sin que nadie más las vea.</p>
    <a href="mailto:soporte@araniosoft.com?subject=Notif%C3%ADcame%20ZeroBudget"
       class="hero-cta fade-up">🔔 Notifícame cuando esté disponible</a>
    <p class="hero-coming-soon fade-up">Próximamente en el App Store</p>

    <div class="iphone-wrap" id="heroPhone">
      <div class="iphone-frame">
        <div class="iphone-screen">
          <img src="screenshots/dashboard.png" alt="ZeroBudget Dashboard" loading="eager">
        </div>
      </div>
    </div>
  </section>

  <!-- ─── FEATURE 1: Privacidad ─────────────────────────────────── -->
  <section class="feature-section bg-dark">
    <div class="feature-text">
      <p class="feature-eyebrow fade-up">Privacidad Total</p>
      <h2 class="feature-title fade-up">Sin servidores.<br>Sin cuentas.<br>Solo tú.</h2>
      <p class="feature-desc fade-up">ZeroBudget no recopila datos, no tiene backend, no requiere registro. Toda tu información financiera vive exclusivamente en tu iPhone, protegida con Face ID.</p>
    </div>
    <div class="feature-img" id="phone1Wrap">
      <div class="iphone-frame">
        <div class="iphone-screen">
          <img src="screenshots/accounts.png" alt="Cuentas en ZeroBudget" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  <!-- ─── FEATURE 2: Presupuesto ────────────────────────────────── -->
  <section class="feature-section bg-black reverse">
    <div class="feature-text">
      <p class="feature-eyebrow fade-up">Presupuesto Base Cero</p>
      <h2 class="feature-title fade-up">Cada peso,<br>con un destino.</h2>
      <p class="feature-desc fade-up">Asigna cada peso de tu ingreso a una categoría con la regla 50/20/20/10. Necesidades, ahorro, deseos y deudas — en balance perfecto.</p>
    </div>
    <div class="feature-img" id="phone2Wrap">
      <div class="iphone-frame">
        <div class="iphone-screen">
          <img src="screenshots/budget.png" alt="Presupuesto en ZeroBudget" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  <!-- ─── FEATURE 3: Analíticas ─────────────────────────────────── -->
  <section class="feature-section bg-dark">
    <div class="feature-text">
      <p class="feature-eyebrow fade-up">Analíticas Inteligentes</p>
      <h2 class="feature-title fade-up">Conoce tus<br>patrones reales.</h2>
      <p class="feature-desc fade-up">Proyección mensual, alertas de presupuesto y Top Spending Drivers te muestran exactamente a dónde va tu dinero, antes de que se vaya.</p>
    </div>
    <div class="feature-img" id="phone3Wrap">
      <div class="iphone-frame">
        <div class="iphone-screen">
          <img src="screenshots/analytics.png" alt="Analíticas en ZeroBudget" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  <!-- ─── FEATURE 4: Siri ───────────────────────────────────────── -->
  <section class="feature-section bg-black reverse">
    <div class="feature-text">
      <p class="feature-eyebrow fade-up">Integración con Siri</p>
      <h2 class="feature-title fade-up">"Oye Siri,<br>agrega gasto<br>de 500."</h2>
      <p class="feature-desc fade-up">Registra transacciones con tu voz sin abrir la app. También importa estados de cuenta en CSV de BBVA, Banorte, HSBC, Santander y más bancos mexicanos.</p>
    </div>
    <div class="feature-img" id="phone4Wrap">
      <div class="iphone-frame">
        <div class="iphone-screen">
          <img src="screenshots/transactions.png" alt="Transacciones en ZeroBudget" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  <!-- ─── STATS ─────────────────────────────────────────────────── -->
  <section class="stats-section">
    <p class="stats-title fade-up">Diseñado para quienes toman en serio sus finanzas.</p>
    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-number fade-up" data-target="100">0</span>
        <span class="stat-label">% Offline</span>
      </div>
      <div class="stat-item">
        <span class="stat-number fade-up" data-target="6">0</span>
        <span class="stat-label">Bancos Mexicanos integrados</span>
      </div>
      <div class="stat-item">
        <span class="stat-number stat-accent fade-up" data-target="0">0</span>
        <span class="stat-label">Servidores. Cero datos tuyos en la nube.</span>
      </div>
    </div>
  </section>

  <!-- ─── GALLERY ───────────────────────────────────────────────── -->
  <section class="gallery-section">
    <div class="gallery-header">
      <h2 class="gallery-title fade-up">Mira cómo funciona.</h2>
      <p class="gallery-subtitle fade-up">Desliza para explorar cada pantalla.</p>
    </div>
    <div class="gallery-track">
      <div class="iphone-frame">
        <div class="iphone-screen"><img src="screenshots/dashboard.png"    alt="Dashboard" loading="lazy"></div>
      </div>
      <div class="iphone-frame">
        <div class="iphone-screen"><img src="screenshots/budget.png"       alt="Presupuesto" loading="lazy"></div>
      </div>
      <div class="iphone-frame">
        <div class="iphone-screen"><img src="screenshots/transactions.png" alt="Movimientos" loading="lazy"></div>
      </div>
      <div class="iphone-frame">
        <div class="iphone-screen"><img src="screenshots/accounts.png"     alt="Cuentas" loading="lazy"></div>
      </div>
      <div class="iphone-frame">
        <div class="iphone-screen"><img src="screenshots/analytics.png"    alt="Analíticas" loading="lazy"></div>
      </div>
      <div class="iphone-frame">
        <div class="iphone-screen"><img src="screenshots/drilldown.png"    alt="Detalle categoría" loading="lazy"></div>
      </div>
    </div>
  </section>

  <!-- ─── CTA ───────────────────────────────────────────────────── -->
  <section class="cta-section">
    <h2 class="cta-title fade-up">Próximamente<br>en el App Store.</h2>
    <p class="cta-subtitle fade-up">Sé el primero en saber cuándo ZeroBudget esté disponible para descargar.</p>
    <a href="mailto:soporte@araniosoft.com?subject=Notif%C3%ADcame%20ZeroBudget"
       class="hero-cta fade-up">🔔 Notifícame</a>
  </section>

  <!-- ─── FOOTER ────────────────────────────────────────────────── -->
  <footer>
    <div class="footer-inner">
      <div class="footer-links">
        <a href="privacy.html">Política de Privacidad</a>
        <a href="terms.html">Términos de Servicio</a>
        <a href="mailto:soporte@araniosoft.com">Contacto</a>
        <a href="../">Araniosoft</a>
      </div>
      <p class="footer-copy">&copy; 2026 <a href="../">Araniosoft</a>. Todos los derechos reservados.</p>
    </div>
  </footer>

</body>
```

**Step 2: Abrir en el navegador** — verificar que se ven todas las secciones, los marcos de iPhone, y el layout de dos columnas.

**Step 3: Commit**
```bash
cd ~/Developer/araniosoft-website
git add zeroBudget/index.html
git commit -m "feat: add Apple-style HTML structure with iPhone frames"
```

---

### Task 3: Añadir GSAP + ScrollTrigger al final del `<body>`

**Files:**
- Modify: `zeroBudget/index.html` — añadir antes del `</body>`

**Step 1: Añadir este `<script>` bloque justo antes de `</body>`**

```html
<!-- GSAP + ScrollTrigger desde CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<script>
  gsap.registerPlugin(ScrollTrigger);

  // ─── NAV: glassmorphism al scrollear ───────────────────────────
  ScrollTrigger.create({
    start: "80px top",
    onEnter:  () => document.getElementById('mainNav').classList.add('scrolled'),
    onLeaveBack: () => document.getElementById('mainNav').classList.remove('scrolled'),
  });

  // ─── HERO: iPhone escala + sube al hacer scroll ────────────────
  gsap.to("#heroPhone", {
    y: -120,
    scale: 1.08,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
    }
  });

  // ─── FADE-UP para textos (una vez, al entrar al viewport) ──────
  gsap.utils.toArray(".fade-up").forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        }
      }
    );
  });

  // ─── PARALLAX en iPhones de features ──────────────────────────
  [
    { id: "#phone1Wrap", yFrom: 80,  yTo: -80  },
    { id: "#phone2Wrap", yFrom: 100, yTo: -100 },
    { id: "#phone3Wrap", yFrom: 80,  yTo: -80  },
    { id: "#phone4Wrap", yFrom: 100, yTo: -100 },
  ].forEach(({ id, yFrom, yTo }) => {
    gsap.fromTo(id,
      { y: yFrom },
      {
        y: yTo,
        ease: "none",
        scrollTrigger: {
          trigger: id,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );
  });

  // ─── COUNTER ANIMADO para stats ───────────────────────────────
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: function() {
            el.textContent = Math.round(this.targets()[0].val) + suffix;
          }
        });
      }
    });
  });
</script>
```

**Step 2: Abrir en el navegador y scrollear lentamente**
- El iPhone del hero debe moverse hacia arriba al scrollear
- Los iPhones de features deben tener parallax visible
- Los textos deben aparecer con fade+slide al entrar al viewport
- Los números del stats deben contar desde 0

**Step 3: Commit**
```bash
cd ~/Developer/araniosoft-website
git add zeroBudget/index.html
git commit -m "feat: add GSAP ScrollTrigger parallax and scroll animations"
```

---

### Task 4: Ajustes finos de pulido visual

**Files:**
- Modify: `zeroBudget/index.html` — ajustes CSS menores

**Step 1: Añadir estos estilos adicionales al final del `<style>` existente (antes del `</style>`)**

```css
  /* ─── HERO inicial: texto aparece desde arriba al cargar ─────── */
  @keyframes heroIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .hero-eyebrow { animation: heroIn 0.8s 0.1s both ease-out; opacity: 1 !important; transform: none !important; }
  .hero-title   { animation: heroIn 0.8s 0.25s both ease-out; opacity: 1 !important; transform: none !important; }
  .hero-subtitle{ animation: heroIn 0.8s 0.4s both ease-out; opacity: 1 !important; transform: none !important; }
  .hero-cta     { animation: heroIn 0.8s 0.55s both ease-out; opacity: 1 !important; transform: none !important; }
  .hero-coming-soon { animation: heroIn 0.8s 0.65s both ease-out; opacity: 1 !important; transform: none !important; }

  /* ─── iPhone hover effect ────────────────────────────────────── */
  .iphone-frame {
    transition: transform 0.4s ease, box-shadow 0.4s ease;
  }
  .iphone-frame:hover {
    transform: translateY(-8px) rotate(-1deg);
    box-shadow:
      0 0 0 1.5px #3a3a3a,
      0 60px 100px rgba(0,0,0,0.7),
      0 0 0 8px #0d0d0d,
      0 0 0 9.5px #2a2a2a;
  }
  /* No hover en la galería track */
  .gallery-track .iphone-frame:hover {
    transform: none;
    box-shadow:
      0 0 0 1.5px #3a3a3a,
      0 40px 80px rgba(0,0,0,0.6),
      0 0 0 8px #0d0d0d,
      0 0 0 9.5px #2a2a2a;
  }

  /* ─── Separador sutil entre secciones ───────────────────────── */
  .feature-section + .feature-section {
    border-top: 1px solid rgba(255,255,255,0.04);
  }

  /* ─── Glow verde en hero CTA ─────────────────────────────────── */
  .hero-cta {
    box-shadow: 0 0 30px rgba(52, 211, 153, 0.3);
  }
  .hero-cta:hover {
    box-shadow: 0 0 50px rgba(52, 211, 153, 0.5);
    opacity: 1;
    transform: scale(1.02);
    transition: all 0.2s;
  }
```

**Step 2: Verificar en mobile (320px-390px)**
Redimensionar el navegador. Debe verse en una columna, iPhone centrado arriba del texto.

**Step 3: Commit final**
```bash
cd ~/Developer/araniosoft-website
git add zeroBudget/index.html
git commit -m "feat: add hero entry animations, iPhone hover effects, visual polish"
```

---

### Task 5: Push y verificar en producción

**Files:** ninguno adicional

**Step 1: Push a main (trigger Cloudflare deploy)**
```bash
cd ~/Developer/araniosoft-website
git push origin main
```

**Step 2: Esperar ~60 segundos, abrir `https://araniosoft.com/zeroBudget/`**

**Step 3: Verificar checklist final**
- [ ] Hero negro con texto enorme y iPhone centrado
- [ ] Scroll: iPhone del hero sube y escala
- [ ] Feature sections: layout 2 columnas, iPhones con parallax
- [ ] Textos aparecen con fade+slide al entrar al viewport
- [ ] Stats cuentan desde 0 al llegar a esa sección
- [ ] Galería horizontal funciona en mobile
- [ ] Nav se vuelve transparente con blur al scrollear
- [ ] Botón CTA verde con glow
- [ ] Footer minimal

**Step 4: Commit vacío si todo OK**
```bash
git tag v2.0-apple-redesign
```
