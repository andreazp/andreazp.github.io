(() => {
  "use strict";

  const D = window.PORTFOLIO;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  // Tiny element helper: h("button", { class: "x", text: "Hi" }, child...)
  function h(tag, attrs = {}, ...children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const c of children) if (c != null && c !== false) el.append(c);
    return el;
  }

  const storage = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } }
  };

  /* ================= Sound (synthesized, off until the visitor interacts) ================= */
  const Sound = {
    ctx: null,
    on: storage.get("sound") !== "off",
    init() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
      if (this.ctx?.state === "suspended") this.ctx.resume();
    },
    tone(freq, dur = 0.06, type = "sine", vol = 0.04, slideTo) {
      if (!this.on || !this.ctx) return;
      const t = this.ctx.currentTime;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, t);
      if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(this.ctx.destination);
      o.start(t);
      o.stop(t + dur + 0.02);
    },
    move() { this.tone(1200, 0.03, "sine", 0.03); },
    select() { this.tone(660, 0.12, "sine", 0.06, 990); },
    back() { this.tone(660, 0.12, "sine", 0.05, 440); },
    bump() { this.tone(180, 0.08, "sine", 0.04); },
    start() { [523.25, 659.25, 783.99].forEach((f, i) => setTimeout(() => this.tone(f, 0.35, "sine", 0.04), i * 60)); }
  };

  const soundBtn = $("#sound-toggle");
  function setSound(on) {
    Sound.on = on;
    soundBtn.setAttribute("aria-pressed", String(on));
    soundBtn.title = on ? "Sound effects on" : "Sound effects off";
    storage.set("sound", on ? "on" : "off");
  }
  soundBtn.addEventListener("click", () => { Sound.init(); setSound(!Sound.on); Sound.select(); });
  setSound(Sound.on);

  // Light / dark theme (light by default; the choice is remembered in this browser)
  const themeBtn = $("#theme-toggle");
  const themeMeta = $('meta[name="theme-color"]');
  function setTheme(dark) {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    themeBtn.setAttribute("aria-pressed", String(dark));
    themeBtn.title = dark ? "Switch to light mode" : "Switch to dark mode";
    themeMeta?.setAttribute("content", dark ? "#141217" : "#f5f2ec");
    document.dispatchEvent(new Event("themechange"));
  }
  themeBtn.addEventListener("click", () => {
    const dark = document.documentElement.dataset.theme !== "dark";
    setTheme(dark); storage.set("theme", dark ? "dark" : "light");
    Sound.init(); Sound.tone(dark ? 520 : 780, 0.12, "sine", 0.05, dark ? 390 : 1040);
  });
  setTheme(document.documentElement.dataset.theme === "dark");

  /* ================= Basics ================= */
  $("#brand-name").textContent = D.name;
  $("#brand-role").textContent = D.role;
  $(".brand").setAttribute("aria-label", `${D.name} — home`);
  $("#availability").textContent = D.availability ?? "";
  if (!D.availability) $(".status-chip").remove();
  $("#title-eyebrow").textContent = D.role;
  $("#year").textContent = new Date().getFullYear();
  // Ticker: the list twice in a row so the loop is seamless
  const tick = D.ticker ?? [];
  $("#ticker").hidden = !tick.length;
  const tickRow = () => h("span", { class: "ticker-row" }, ...tick.flatMap(t => [h("span", { text: t }), h("i", { text: "✦" })]));
  $("#ticker").replaceChildren(h("div", { class: "ticker-track" }, tickRow(), tickRow()));

  // Name: each word rises in on load (no per-letter effects — it stays calm).
  const titleName = $("#title-name");
  titleName.setAttribute("aria-label", D.name);
  titleName.replaceChildren(...D.name.split(/\s+/).flatMap((word, wi) => [
    wi ? document.createTextNode(" ") : null,
    h("span", { class: "word", "aria-hidden": "true", style: `--i:${wi}`, text: word })
  ]).filter(Boolean));

  // Catchphrase: words rise in after the name; *word* gets the accent + a drawn underline; \n forces a line break.
  const catchEl = $("#title-catch");
  const phrase = D.catchphrase ?? "";
  catchEl.setAttribute("aria-label", phrase.replace(/\*/g, "").replace(/\s*\n\s*/g, " "));
  catchEl.replaceChildren(...phrase.split(/(\*[^*]+\*|\s+)/).filter(Boolean).map((part, i, all) => {
    if (/^\s+$/.test(part)) return part.includes("\n") ? h("br") : document.createTextNode(" ");
    const wi = all.slice(0, i).filter(p => !/^\s+$/.test(p)).length;
    const style = `--i:${wi}; --n:${D.name.length}`;
    if (part.startsWith("*")) {
      const em = h("em", { class: "w hl", "aria-hidden": "true", style, text: part.slice(1, -1) });
      em.insertAdjacentHTML("beforeend",
        '<svg viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true"><path d="M2 8 C 20 2, 40 11, 60 6 S 100 3, 118 7" pathLength="1"/></svg>');
      return em;
    }
    return h("span", { class: "w", "aria-hidden": "true", style, text: part });
  }));

  // Headline letters get thinner near the cursor (Bricolage is a variable font, weight 200–800).
  // Text only gets narrower than its resting width, so lines never re-wrap.
  if (matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion) {
    $$(".w", catchEl).forEach(w => {
      const t = w.firstChild;
      if (t?.nodeType !== 3) return;
      t.replaceWith(...[...t.textContent].map(ch => h("span", { class: "ch", text: ch })));
    });
    const chars = $$(".ch", catchEl);
    let mx = -1e4, my = -1e4, raf = 0, centres = [];
    const measure = () => { centres = chars.map(c => { const r = c.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }); };
    const paint = () => {
      raf = 0;
      chars.forEach((c, i) => {
        const d = Math.hypot(centres[i][0] - mx, centres[i][1] - my);
        const k = Math.max(0, 1 - d / 220);
        c.style.fontWeight = Math.round(800 - 560 * k * k);
      });
    };
    $("#screen-title").addEventListener("pointermove", e => {
      if (!centres.length) measure();
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    });
    $("#screen-title").addEventListener("pointerleave", () => { mx = my = -1e4; if (!raf) raf = requestAnimationFrame(paint); });
    addEventListener("resize", () => { centres = []; });
    $("#screen-title").addEventListener("scroll", () => { centres = []; });
  }

  // Hide sections that have no content.
  if (!D.motion?.reel?.length) D.menu = D.menu.filter(m => m.id !== "motion");
  if (!D.illustration?.pieces?.length) D.menu = D.menu.filter(m => m.id !== "illustration");
  if (!D.cv) D.menu = D.menu.filter(m => m.id !== "cv");

  /* ================= Site navigation ================= */
  const topbar = $("#topbar");
  const siteNav = $("#site-nav");
  const menuBtn = $("#menu-btn");
  $("#site-nav-list").append(...D.menu.map(m =>
    h("li", {}, h("a", { href: `#${m.id}`, "data-goto": m.id, "data-nav": true, class: "nav-link", text: m.label }))));

  let navOpen = false;
  function setNavOpen(open, { focus = true } = {}) {
    navOpen = open;
    document.body.classList.toggle("nav-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    if (open && focus) $(".nav-link", siteNav)?.focus();
    if (!open && focus) menuBtn.focus();
  }
  menuBtn.addEventListener("click", () => setNavOpen(!navOpen));
  document.addEventListener("pointerdown", e => {
    if (navOpen && !e.target.closest("#site-nav, #menu-btn")) setNavOpen(false, { focus: false });
  });

  /* ================= Shared helpers for generated art ================= */
  function seeded(str) {
    let seed = [...String(str)].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) | 0, 7);
    return () => {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const clamp01 = x => Math.max(0, Math.min(1, x));
  const easeOutBack = x => { const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
  const easeOutExpo = x => x >= 1 ? 1 : 1 - Math.pow(2, -10 * x);
  const easeInOutCubic = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

  // One rAF loop drives every animated placeholder, and only while it's visible.
  const Loops = (() => {
    const items = new Set();
    let running = false;
    function tick(t) {
      for (const it of items) {
        if (!it.cv.isConnected) { items.delete(it); continue; }
        if (!document.hidden && it.cv.closest(".screen.active, .modal:not([hidden])")) it.draw(t);
      }
      if (items.size) requestAnimationFrame(tick); else running = false;
    }
    return {
      add(cv, draw) {
        draw(1400);
        if (reduceMotion) return;
        items.add({ cv, draw });
        if (!running) { running = true; requestAnimationFrame(tick); }
      }
    };
  })();

  // Placeholder "UI mockup" still, seeded so it's stable.
  function coverCanvas(seedStr, hue = 200, label) {
    const W = 640, H = 400;
    const cv = h("canvas", { width: W, height: H, "aria-hidden": "true" });
    const c = cv.getContext("2d");
    const rnd = seeded(seedStr);
    const rr = (x, y, w, hh, r) => { c.beginPath(); c.roundRect(x, y, w, hh, r); };

    c.fillStyle = `hsl(${hue}, 55%, 62%)`;
    c.fillRect(0, 0, W, H);
    for (const [bx, by, color] of [
      [rnd() * W, rnd() * H * 0.5, `hsla(${hue + 40}, 90%, 75%, 0.9)`],
      [rnd() * W, H * 0.5 + rnd() * H * 0.5, `hsla(${hue - 30}, 70%, 45%, 0.9)`],
      [rnd() * W, rnd() * H, `hsla(${hue + 10}, 95%, 85%, 0.6)`]
    ]) {
      const g = c.createRadialGradient(bx, by, 0, bx, by, 340);
      g.addColorStop(0, color);
      g.addColorStop(1, color.replace(/[\d.]+\)$/, "0)"));
      c.fillStyle = g;
      c.fillRect(0, 0, W, H);
    }
    const card = (x, y, w, hh, r = 16) => {
      c.save();
      c.shadowColor = `hsla(${hue}, 60%, 20%, 0.25)`;
      c.shadowBlur = 30; c.shadowOffsetY = 12;
      c.fillStyle = "rgba(255,255,255,0.92)";
      rr(x, y, w, hh, r); c.fill();
      c.restore();
    };
    const line = (x, y, w, a = 0.12) => { c.fillStyle = `rgba(20,20,24,${a})`; rr(x, y, w, 8, 4); c.fill(); };
    const accent = (a = 1) => `hsla(${hue}, 70%, 50%, ${a})`;
    const layout = Math.floor(rnd() * 3);
    const mw = 300, mh = 230, mx = 40 + rnd() * 40, my = 90;
    card(mx, my, mw, mh, 18);
    c.fillStyle = accent(0.9); rr(mx + 20, my + 20, 32, 32, 10); c.fill();
    line(mx + 64, my + 24, 110, 0.7);
    line(mx + 64, my + 40, 70);
    if (layout === 0) {
      const n = 7, bw = 26, gap = 11, base = my + mh - 24;
      for (let i = 0; i < n; i++) {
        const bh = 30 + rnd() * 100;
        c.fillStyle = i === n - 3 ? accent() : `hsla(${hue}, 30%, 85%, 1)`;
        rr(mx + 22 + i * (bw + gap), base - bh, bw, bh, 6); c.fill();
      }
    } else if (layout === 1) {
      for (let i = 0; i < 4; i++) {
        const ry = my + 76 + i * 36;
        c.fillStyle = `hsla(${hue}, 30%, ${i === 1 ? 92 : 97}%, 1)`;
        rr(mx + 16, ry, mw - 32, 30, 8); c.fill();
        c.fillStyle = i === 1 ? accent() : `hsla(${hue}, 25%, 80%, 1)`;
        c.beginPath(); c.arc(mx + 32, ry + 15, 7, 0, Math.PI * 2); c.fill();
        line(mx + 48, ry + 11, 80 + rnd() * 100, 0.18);
      }
    } else {
      const cx = mx + 90, cy = my + 145, r = 52;
      c.lineWidth = 14; c.lineCap = "round";
      c.strokeStyle = `hsla(${hue}, 30%, 90%, 1)`;
      c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.stroke();
      c.strokeStyle = accent();
      c.beginPath(); c.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (0.4 + rnd() * 0.5)); c.stroke();
      for (let i = 0; i < 3; i++) line(mx + 170, my + 110 + i * 26, 70 + rnd() * 40, i ? 0.12 : 0.5);
    }
    const sx = mx + mw + 30, sy = 60 + rnd() * 60;
    card(sx, sy, 200, 96, 16);
    c.fillStyle = `hsla(${hue + 40}, 80%, 70%, 1)`;
    c.beginPath(); c.arc(sx + 38, sy + 48, 20, 0, Math.PI * 2); c.fill();
    line(sx + 70, sy + 36, 100, 0.6);
    line(sx + 70, sy + 54, 70);
    const py = sy + 120;
    card(sx, py, 200, 48, 24);
    c.fillStyle = accent(); rr(sx + 6, py + 6, 92, 36, 18); c.fill();
    line(sx + 120, py + 20, 56, 0.25);
    card(sx + 20, py + 72, 160, 48, 24);
    c.fillStyle = `hsla(${hue}, 30%, 90%, 1)`; rr(sx + 30, py + 90, 140, 12, 6); c.fill();
    c.fillStyle = accent(); rr(sx + 30, py + 90, 40 + rnd() * 90, 12, 6); c.fill();
    if (label) {
      c.font = "600 18px Inter, system-ui, sans-serif";
      const tw = c.measureText(label).width;
      c.fillStyle = "rgba(20,20,24,0.55)"; rr(20, H - 52, tw + 28, 34, 17); c.fill();
      c.fillStyle = "#fff"; c.fillText(label, 34, H - 29);
    }
    return cv;
  }

  // Placeholder "motion graphic": shapes that pop, slide and spin on a 3.2s loop.
  function motionCanvas(seedStr, hue = 210, animate = true) {
    const W = 960, H = 540;
    const cv = h("canvas", { width: W, height: H, "aria-hidden": "true" });
    const c = cv.getContext("2d");
    const rnd = seeded(seedStr);
    const ox = 0.25 + rnd() * 0.2, oy = 0.35 + rnd() * 0.2;
    const draw = t => {
      const p = (t / 3200) % 1;
      const outro = easeInOutCubic(clamp01((p - 0.82) / 0.18));
      const g = c.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, `hsl(${hue}, 75%, 58%)`);
      g.addColorStop(1, `hsl(${hue + 45}, 70%, 42%)`);
      c.fillStyle = g; c.fillRect(0, 0, W, H);
      const s = easeOutBack(clamp01(p / 0.3)) * (1 - outro);
      c.fillStyle = `hsla(${hue + 30}, 95%, 82%, 0.9)`;
      c.beginPath(); c.arc(W * ox, H * oy, 150 * Math.max(0, s), 0, Math.PI * 2); c.fill();
      const px = -400 + (W * 0.62 + 400) * easeOutExpo(clamp01((p - 0.12) / 0.4)) + outro * 700;
      c.fillStyle = "rgba(255,255,255,0.92)";
      c.beginPath(); c.roundRect(px - 160, H * 0.62, 320, 72, 36); c.fill();
      c.fillStyle = `hsl(${hue}, 70%, 50%)`;
      c.beginPath(); c.arc(px + 120, H * 0.62 + 36, 24, 0, Math.PI * 2); c.fill();
      for (let i = 0; i < 3; i++) {
        const k = easeOutBack(clamp01((p - 0.25 - i * 0.07) / 0.3)) * (1 - outro);
        c.save();
        c.translate(W * (0.66 + i * 0.09), H * 0.3);
        c.rotate((1 - k) * Math.PI);
        c.scale(Math.max(0, k), Math.max(0, k));
        c.fillStyle = i === 1 ? "rgba(255,255,255,0.95)" : `hsla(${hue + 180}, 80%, 70%, 0.95)`;
        c.beginPath(); c.roundRect(-34, -34, 68, 68, 16); c.fill();
        c.restore();
      }
      c.fillStyle = "rgba(255,255,255,0.25)"; c.fillRect(48, H - 54, W - 96, 4);
      c.fillStyle = "rgba(255,255,255,0.9)"; c.fillRect(48, H - 54, (W - 96) * p, 4);
      c.font = "600 22px Inter, system-ui, sans-serif";
      c.fillText("Video coming soon", 48, H - 76);
    };
    if (animate) Loops.add(cv, draw); else draw(1400);
    return cv;
  }

  // Placeholder illustration: a little monster in a landscape.
  function artCanvas(item, W = 600) {
    const ratio = item.ratio || 1;
    const H = Math.round(W / ratio);
    const cv = h("canvas", { width: W, height: H, "aria-hidden": "true" });
    const c = cv.getContext("2d");
    const rnd = seeded(item.title);
    const hue = item.hue ?? 20;
    c.fillStyle = `hsl(${hue}, 55%, 88%)`; c.fillRect(0, 0, W, H);
    c.fillStyle = `hsl(${hue + 35}, 90%, 66%)`;
    c.beginPath(); c.arc(W * (0.2 + rnd() * 0.6), H * (0.18 + rnd() * 0.12), W * 0.12, 0, Math.PI * 2); c.fill();
    for (let l = 0; l < 3; l++) {
      const base = H * (0.55 + l * 0.14), amp = H * 0.05, ph = rnd() * 6, fr = 1.5 + rnd() * 2;
      c.fillStyle = `hsl(${hue + 150 + l * 15}, ${45 + l * 8}%, ${70 - l * 14}%)`;
      c.beginPath(); c.moveTo(0, H);
      for (let x = 0; x <= W; x += 10) c.lineTo(x, base + Math.sin(x / W * Math.PI * fr + ph) * amp);
      c.lineTo(W, H); c.closePath(); c.fill();
    }
    const mx = W * (0.35 + rnd() * 0.3), my = H * 0.72, r = Math.min(W, H) * (0.16 + rnd() * 0.06);
    c.fillStyle = `hsl(${hue + 200}, 60%, 55%)`;
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(mx + s * r * 0.5, my - r * 0.75); c.lineTo(mx + s * r * 0.85, my - r * 1.35); c.lineTo(mx + s * r * 0.15, my - r * 0.95); c.fill(); }
    c.beginPath(); c.ellipse(mx, my, r, r * 1.05, 0, 0, Math.PI * 2); c.fill();
    const eyes = 1 + Math.floor(rnd() * 3);
    for (let i = 0; i < eyes; i++) {
      const ex = mx + (i - (eyes - 1) / 2) * r * 0.55, ey = my - r * 0.25, er = r * (eyes === 1 ? 0.32 : 0.2);
      c.fillStyle = "#fff"; c.beginPath(); c.arc(ex, ey, er, 0, Math.PI * 2); c.fill();
      c.fillStyle = "#1c1917"; c.beginPath(); c.arc(ex + er * 0.25, ey + er * 0.15, er * 0.45, 0, Math.PI * 2); c.fill();
    }
    c.strokeStyle = "#1c1917"; c.lineWidth = r * 0.07; c.lineCap = "round";
    c.beginPath(); c.arc(mx, my + r * 0.2, r * 0.35, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke();
    for (let i = 0; i < 18; i++) {
      c.fillStyle = `hsla(${hue + rnd() * 120}, 80%, 60%, 0.7)`;
      c.beginPath(); c.arc(rnd() * W, rnd() * H * 0.5, 2 + rnd() * 5, 0, Math.PI * 2); c.fill();
    }
    return cv;
  }

  /* ================= Media (images, video files, YouTube, Vimeo) ================= */
  const isVideoFile = u => /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(u ?? "");
  const ytId = u => u?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/)?.[1];
  const vimeoId = u => u?.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];
  const kindOf = src => !src ? "none" : isVideoFile(src) ? "video" : ytId(src) ? "youtube" : vimeoId(src) ? "vimeo" : "image";

  // One piece of media: zoomable image, video file, or click-to-play YouTube/Vimeo poster.
  function mediaEl(item, i, opts = {}) {
    const kind = kindOf(item.src);
    const alt = item.alt ?? item.caption ?? "";
    if (kind === "image") {
      const b = h("button", { class: "stage-zoom", "data-nav": true, "aria-label": `View full size: ${alt || "image"}` },
        h("img", { src: item.src, alt }));
      b.addEventListener("click", () => opts.zoom?.(i));
      return b;
    }
    if (kind === "video") {
      const v = h("video", { src: item.src, controls: true, playsinline: true, preload: "metadata", "aria-label": alt || "Video" });
      if (item.poster) v.poster = item.poster;
      if (opts.autoplay) v.autoplay = true;
      return v;
    }
    if (kind === "youtube" || kind === "vimeo") {
      const yt = ytId(item.src), vm = vimeoId(item.src);
      const b = h("button", { class: "embed-poster", "data-nav": true, "aria-label": `Play video: ${alt || "video"}` },
        item.poster ? h("img", { src: item.poster, alt: "" })
          : yt ? h("img", { src: `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`, alt: "" })
          : (opts.placeholder?.(item, i, true) ?? motionCanvas(item.caption ?? "video", item.hue)),
        h("span", { class: "play-btn", "aria-hidden": "true" }));
      const play = () => {
        // YouTube refuses embeds that don't say which site they're on (error 153),
        // so pass the origin and keep the referrer.
        const origin = /^https?:$/.test(location.protocol) ? `&origin=${encodeURIComponent(location.origin)}` : "";
        const src = yt ? `https://www.youtube.com/embed/${yt}?autoplay=1&rel=0&playsinline=1&iv_load_policy=3${origin}`
                       : `https://player.vimeo.com/video/${vm}?autoplay=1`;
        const f = h("iframe", { src, title: alt || "Video", allow: "autoplay; encrypted-media; fullscreen; picture-in-picture; web-share",
          referrerpolicy: "strict-origin-when-cross-origin", allowfullscreen: true });
        f._restore = b; // leaving the screen swaps the player back to its poster
        return f;
      };
      if (opts.autoplay) return play();
      b.addEventListener("click", () => {
        const f = play();
        b.replaceWith(f);
        // Focusing the player makes YouTube keep its controls on screen, so only do it for keyboard/gamepad users
        if (inputMode !== "pointer") f.focus();
      });
      return b;
    }
    return h("div", { class: "embed-poster is-placeholder" }, opts.placeholder?.(item, i, true) ?? motionCanvas(item.caption ?? "media", item.hue));
  }

  /*
   * A media viewer: big stage + prev/next + caption + thumbnails.
   * items: [{ src, poster, caption, kind }]
   * opts.placeholder(item, i, big) → element for items without src
   * opts.onChange(item, i), opts.zoom(i) for opening images full-size
   */
  const viewers = [];
  function Viewer(slot, items, opts = {}) {
    const label = opts.label ?? "Media";
    const stage = h("div", { class: "viewer-stage" });
    const caption = h("p", { class: "viewer-caption", "aria-live": "polite" });
    const extLink = h("a", { class: "btn viewer-ext", "data-nav": true, target: "_blank", rel: "noopener", hidden: true });
    const count = h("span", { class: "viewer-count" });
    const prev = h("button", { class: "icon-btn", "data-nav": true, "aria-label": `Previous ${label.toLowerCase()}`, text: "←" });
    const next = h("button", { class: "icon-btn", "data-nav": true, "aria-label": `Next ${label.toLowerCase()}`, text: "→" });
    const thumbs = h("div", { class: "viewer-thumbs", role: "group", "aria-label": `${label} — choose one` });
    const multi = items.length > 1;
    const root = h("div", { class: "viewer" }, stage,
      h("div", { class: "viewer-bar" }, multi ? prev : null, multi ? count : null, multi ? next : null, caption, extLink),
      multi ? thumbs : null);
    slot.replaceChildren(root);
    let idx = 0;

    const stageMedia = (item, i) => mediaEl(item, i, opts);

    function thumb(item, i) {
      const kind = kindOf(item.src);
      let art;
      if (item.poster) art = h("img", { src: item.poster, alt: "" });
      else if (kind === "image") art = h("img", { src: item.src, alt: "", loading: "lazy" });
      else if (kind === "youtube") art = h("img", { src: `https://i.ytimg.com/vi/${ytId(item.src)}/mqdefault.jpg`, alt: "", loading: "lazy" });
      else if (kind === "video") art = h("video", { src: `${item.src}#t=0.1`, muted: true, preload: "metadata", tabindex: "-1" });
      else art = opts.placeholder(item, i, false);
      const isVideo = kind === "video" || kind === "youtube" || kind === "vimeo" || item.kind === "video";
      const b = h("button", { class: "viewer-thumb", "data-nav": true, "aria-label": `Show ${i + 1}: ${item.caption || label}` },
        h("span", { class: "viewer-thumb-art" }, art, isVideo ? h("span", { class: "thumb-play", "aria-hidden": "true" }) : null),
        opts.thumbText ? opts.thumbText(item) : null);
      b.addEventListener("click", () => set(i));
      return b;
    }

    function set(i) {
      idx = (i + items.length) % items.length;
      const item = items[idx];
      stage.replaceChildren(stageMedia(item, idx));
      caption.textContent = item.caption ?? "";
      const yt = ytId(item.src), vm = vimeoId(item.src);
      extLink.hidden = !(yt || vm);
      if (yt || vm) {
        extLink.href = yt ? `https://www.youtube.com/watch?v=${yt}` : `https://vimeo.com/${vm}`;
        extLink.textContent = yt ? "Watch on YouTube ↗" : "Watch on Vimeo ↗";
      }
      count.textContent = `${idx + 1} / ${items.length}`;
      $$(".viewer-thumb", thumbs).forEach((t, k) => t.setAttribute("aria-current", String(k === idx)));
      opts.onChange?.(item, idx);
    }

    thumbs.append(...items.map(thumb));
    prev.addEventListener("click", () => set(idx - 1));
    next.addEventListener("click", () => set(idx + 1));
    set(0);

    const api = {
      root, set,
      stop() {
        $$("video", stage).forEach(v => v.pause());
        if ($("iframe", stage)) set(idx); // unload embedded players
      }
    };
    viewers.push(api);
    return api;
  }

  /* ================= Lightbox ================= */
  const lightbox = $("#lightbox");
  let lbList = [], lbIdx = 0;
  function fillLightbox(i) {
    lbIdx = (i + lbList.length) % lbList.length;
    const it = lbList[lbIdx];
    $("#lb-media").replaceChildren(it.render());
    $("#lb-kicker").textContent = it.kicker ?? "";
    $("#lb-title").textContent = it.title ?? "";
    const award = $("#lb-award");
    award.textContent = it.award ? `✦ ${it.award}` : "";
    award.hidden = !it.award;
    $("#lb-note").textContent = it.note ?? "";
    $("#lb-count").textContent = `${lbIdx + 1} / ${lbList.length}`;
    $$("[data-lb]", lightbox).forEach(b => { b.hidden = lbList.length < 2; });
    $("#lb-count").hidden = lbList.length < 2;
  }
  function openLightbox(list, i) { lbList = list; fillLightbox(i); showOverlay(lightbox); }
  lightbox.addEventListener("arrow", e => { fillLightbox(lbIdx + e.detail); Sound.move(); });
  $$("[data-lb]", lightbox).forEach(b => b.addEventListener("click", () => fillLightbox(lbIdx + Number(b.dataset.lb))));

  /* ================= CV ================= */
  const hasPDF = !!D.cv?.file;
  const downloadIcon = '<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M8 2v8m0 0 3.5-3.5M8 10 4.5 6.5M2.5 13.5h11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function cvBtn(extraClass = "", label = "Download PDF") {
    const a = h("a", { class: `btn cv-btn ${extraClass}`.trim(), "data-nav": true, href: D.cv.file, download: true });
    a.insertAdjacentHTML("afterbegin", downloadIcon);
    a.append(label);
    if (D.cv.updated) a.append(h("small", { text: D.cv.updated }));
    return a;
  }

  if (D.cv) {
    const cv = D.cv;
    if (hasPDF) $("#cv-head-actions").append(cvBtn("primary"));

    const summary = $("#cv-summary");
    if (cv.summary) summary.textContent = cv.summary; else summary.remove();

    const focus = $("#cv-focus");
    if (cv.focus?.length) focus.append(...cv.focus.map(t => h("li", { text: t }))); else focus.remove();

    const hl = $("#cv-highlights");
    const awardCount = (cv.awards ?? []).reduce((n, a) => n + (a.items?.length || 1), 0);
    if (cv.highlights?.length) {
      hl.append(...cv.highlights.map(x => h("div", { class: "cv-hl" },
        h("dt", { text: x.label }),
        h("dd", { text: x.value === "auto" ? String(awardCount) : x.value }))));
    } else hl.remove();

    const years = (a, b) => [a, b].filter(Boolean).join(" — ");
    $("#cv-experience").append(...(cv.experience ?? []).map((job, i) =>
      h("li", { class: "tl-item", style: `--i:${i}` },
        h("article", { class: "cv-job", "data-nav": true, tabindex: "0", "aria-label": `${job.role} at ${job.company}, ${years(job.start, job.end)}` },
          h("div", { class: "cv-job-top" },
            h("h4", { text: job.role }),
            h("span", { class: "cv-dates", text: years(job.start, job.end) })),
          h("p", { class: "cv-org" }, job.company, job.location ? h("span", { text: ` · ${job.location}` }) : null),
          job.points?.length ? h("ul", { class: "cv-points" }, ...job.points.map(p => h("li", { text: p }))) : null))));

    if (cv.awards?.length) {
      $("#cv-awards").append(...cv.awards.map((a, i) => {
        const inner = [
          h("span", { class: "cv-award-top" },
            h("span", { class: "cv-award-icon", "aria-hidden": "true", text: "✦" }),
            a.year ? h("span", { class: "cv-dates", text: a.year }) : null),
          h("strong", { class: "cv-award-title", text: a.title }),
          a.by ? h("span", { class: "cv-org", text: a.by }) : null,
          a.detail ? h("span", { class: "cv-award-detail", text: a.detail }) : null,
          a.items?.length ? h("ul", { class: "cv-points" }, ...a.items.map(t => h("li", { text: t }))) : null
        ];
        const body = a.goto
          ? h("a", { class: "cv-award has-link", href: `#${a.goto}`, "data-goto": a.goto, "data-nav": true }, ...inner,
              h("span", { class: "cv-award-cta", text: `${a.cta || "Open"} →` }))
          : h("div", { class: "cv-award", "data-nav": true, tabindex: "0" }, ...inner);
        return h("li", { style: `--i:${i}` }, body);
      }));
    } else $("#cv-awards-wrap").remove();

    const side = $("#cv-side");
    if (cv.education?.length) {
      side.append(h("div", { class: "panel cv-block" },
        h("h3", { class: "eyebrow", text: "Education" }),
        ...cv.education.map(ed => h("div", { class: "cv-edu" },
          h("h4", { text: ed.title }),
          h("p", { class: "cv-org" }, ed.place, h("span", { text: ` · ${years(ed.start, ed.end)}` })),
          ed.note ? h("p", { class: "muted cv-note", text: ed.note }) : null))));
    }
    for (const x of cv.extras ?? []) {
      if (!x.items?.length) continue;
      side.append(h("div", { class: "panel cv-block" },
        h("h3", { class: "eyebrow", text: x.heading }),
        h("ul", { class: "chips" }, ...x.items.map(t => h("li", { text: t })))));
    }
    if (hasPDF) {
      side.append(h("div", { class: "panel cv-block cv-download" },
        h("h3", { class: "eyebrow", text: "Take it with you" }),
        h("p", { class: "muted", text: "The same CV as a printable PDF." }),
        cvBtn()));
    }
  }

  /* ================= Main menu ================= */
  const menuList = $("#menu-list");
  menuList.style.setProperty("--count", D.menu.length);
  function preview(m, i) {
    $("#preview-kicker").textContent = m.kicker;
    $("#preview-title").textContent = m.label;
    $("#preview-body").textContent = m.body;
    $("#preview-meter-fill").style.width = `${((i + 1) / D.menu.length) * 100}%`;
  }
  D.menu.forEach((m, i) => {
    const a = h("a", { class: "menu-item", href: `#${m.id}`, "data-nav": true, "data-goto": m.id },
      h("span", { class: "idx", "aria-hidden": "true", text: String(i + 1).padStart(2, "0") }),
      h("span", { class: "label", text: m.label }));
    a.addEventListener("navselect", () => preview(m, i));
    menuList.append(h("li", {}, a));
  });
  if (D.menu[0]) preview(D.menu[0], 0);

  /* ================= Projects ================= */
  let filter = "all";
  const tabRow = $("#project-tabs");
  const grid = $("#project-grid");
  const labelFor = id => D.categories.find(c => c.id === id)?.label ?? id;

  D.categories.forEach(c => {
    const tab = h("button", { class: "tab", "data-nav": true, "data-cat": c.id, "aria-pressed": "false", text: c.label });
    tab.addEventListener("click", () => setFilter(c.id));
    tabRow.append(tab);
  });

  function setFilter(id) {
    filter = id;
    $$(".tab", tabRow).forEach(t => t.setAttribute("aria-pressed", String(t.dataset.cat === id)));
    renderGrid();
  }

  function projectCover(p) {
    const src = p.cover || p.media?.find(m => kindOf(m.src) === "image")?.src;
    if (src) return h("img", { src, alt: "", loading: "lazy" });
    return coverCanvas(p.id, p.hue);
  }

  function renderGrid() {
    const list = D.projects.filter(p => filter === "all" || p.category === filter);
    grid.replaceChildren(...list.map((p, i) => {
      const card = h("a", { class: "level", href: `#projects/${p.id}`, "data-goto": `projects/${p.id}`, "data-nav": true },
        h("span", { class: "level-art" }, projectCover(p),
          p.media?.length ? h("span", { class: "level-num", text: `${p.media.length} ${p.media.length === 1 ? "item" : "items"}` }) : null,
          p.ribbon ? h("span", { class: "level-ribbon", text: p.ribbon }) : null),
        h("span", { class: "level-info" },
          h("h3", { text: p.title }),
          h("span", { class: "level-summary", text: p.summary }),
          h("span", { class: "level-meta" },
            h("span", { text: [labelFor(p.category), p.year].filter(Boolean).join(" · ") }),
            h("span", { class: "level-cta", "aria-hidden": "true", text: "Open →" }))));
      card.style.animationDelay = `${i * 60}ms`;
      return card;
    }));
  }

  // --- Project page ---
  // Feature clips play silently like GIFs while on screen (not with reduced motion)
  const featureVideos = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting && !reduceMotion) e.target.play().catch(() => {});
    else e.target.pause();
  }), { threshold: 0.35 });
  let currentProject = null;
  const linkBtn = (l, cls) => h("a", { class: cls, "data-nav": true, href: l.url, target: "_blank", rel: "noopener" },
    l.play ? h("span", { class: "play-icon", "aria-hidden": "true" }) : null, h("span", { text: l.label }), h("span", { "aria-hidden": "true", text: "↗" }));
  const ambientVideo = (src, poster) => {
    const v = Object.assign(h("video", { src, loop: true, playsinline: true, preload: "metadata", "aria-hidden": "true" }), { muted: true });
    if (poster) v.poster = poster;
    featureVideos.observe(v);
    return v;
  };

  // --- Visual project info: icon tiles for role / studio / year, app-style tiles for tools ---
  const INFO_ICONS = {
    role: '<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" />',
    studio: '<path d="M4 20V8l8-4 8 4v12M9 20v-5h6v5M4 20h16" />',
    year: '<rect x="4" y="5.5" width="16" height="14.5" rx="3" /><path d="M8 3.5v4M16 3.5v4M4 10.5h16" />'
  };
  const TOOL_TILES = {
    "unity": ["U", "#1d1d1f"], "unreal engine": ["UE", "#0e1128"], "c#": ["C#", "#68217a"], "ui toolkit": ["UI", "#3b6fd8"],
    "blueprints": ["BP", "#2a62c9"], "firebase": ["Fb", "#f08c00"], "substance designer": ["Sd", "#d94f1f"],
    "illustrator": ["Ai", "#c45a00"], "after effects": ["Ae", "#4b2fbf"], "premiere pro": ["Pr", "#5b23a8"],
    "figma": ["Fi", "#a259ff"], "autodesk maya": ["M", "#127c80"], "maya": ["M", "#127c80"], "cavalry": ["Cv", "#2f2f37"],
    "procreate": ["Pc", "#3a3a40"]
  };
  const icon = name => {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("aria-hidden", "true");
    s.innerHTML = INFO_ICONS[name];
    return s;
  };
  function toolTile(name) {
    const key = name.toLowerCase();
    const [mono, color] = TOOL_TILES[key] ?? [name.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase(),
      `hsl(${[...key].reduce((a, c) => a + c.charCodeAt(0), 0) % 360} 45% 38%)`];
    return h("li", { class: "tool", title: name },
      h("span", { class: "tool-tile", style: `--c:${color}`, "aria-hidden": "true", text: mono }),
      h("span", { class: "tool-name", text: name }));
  }
  function projectInfo(p) {
    const facts = [["role", "Role", p.role], ["studio", "Studio", p.studio], ["year", "Year", p.year]]
      .filter(([, , v]) => v)
      .map(([k, label, v]) => h("li", { class: "info-fact" },
        h("span", { class: "info-icon" }, icon(k)),
        h("span", {}, h("small", { text: label }), h("strong", { text: v }))));
    const tools = p.tools?.length
      ? [h("li", { class: "info-tools" }, h("small", { text: "Tools" }), h("ul", {}, ...p.tools.map(toolTile)))] : [];
    return [...facts, ...tools];
  }

  function renderProject(p) {
    currentProject = p;
    $("#project-kicker").textContent = labelFor(p.category) ?? "";
    $("#project-h").textContent = p.title;
    $("#project-text").replaceChildren(
      ...(p.summary ? [h("p", { class: "ap-summary", text: p.summary })] : []),
      ...(p.description ?? []).map(t => h("p", { text: t })));
    const award = $("#project-award");
    award.textContent = p.award ? `✦ ${p.award}` : "";
    award.hidden = !p.award;
    $("#project-meta").replaceChildren(...projectInfo(p));

    const mainLink = p.links?.[0];
    $("#project-cta").replaceChildren(...(mainLink ? [linkBtn(mainLink, "btn cta-btn")] : []));

    // Highlights: each point becomes a card with a short title and optional image/video.
    // A point is a string, or { title, text, media }. Cards with details open in the lightbox.
    // A project can be split into `parts` (e.g. the Grayscale page: ClinicVET, ArgentXR…), each with its own sections.
    const parts = p.parts?.length ? p.parts : null;
    const rawSections = parts ? parts.flatMap(pt => (pt.sections ?? []).map(s => ({ ...s, part: pt.id }))) : (p.sections ?? []);
    const sections = rawSections.map((s, si) => ({
      ...s, hue: (p.hue ?? 200) + si * 28,
      points: (s.points ?? []).map(pt => ({ ...(typeof pt === "string" ? { text: pt } : pt), hue: (p.hue ?? 200) + si * 28, section: s.title }))
    }));
    const detailed = sections.flatMap(s => s.points).filter(c => c.media || (c.title && c.text));
    const openCard = c => openLightbox(detailed.map(d => ({
      render: () => !d.media ? coverCanvas(d.title ?? d.text, d.hue)
        : kindOf(d.media) === "video"
          ? Object.assign(h("video", { src: d.media, controls: true, autoplay: true, loop: true, playsinline: true }), { muted: true })
          : h("img", { src: d.media, alt: d.alt ?? d.title ?? d.text }),
      kicker: `${p.title} · ${d.section}`, title: d.title ?? "", note: d.text ?? ""
    })), detailed.indexOf(c));
    let n = 0;
    const card = c => {
      n++;
      const title = c.title ?? c.text;
      const art = c.media
        ? (kindOf(c.media) === "video" ? ambientVideo(c.media, c.poster) : h("img", { src: c.media, alt: "", loading: "lazy" }))
        : h("span", { class: "hl-num", "aria-hidden": "true", text: String(n).padStart(2, "0") });
      const inner = [h("span", { class: `hl-art${c.media ? " has-media" : ""}` }, art), h("span", { class: "hl-title", text: title })];
      if (!detailed.includes(c)) return h("li", {}, h("div", { class: "hl-card", style: `--h:${c.hue}` }, ...inner));
      const b = h("button", { class: "hl-card is-open", style: `--h:${c.hue}`, "data-nav": true, "aria-label": `${title}: show details` },
        ...inner, h("span", { class: "hl-more", "aria-hidden": "true", text: "+" }));
      b.addEventListener("click", () => openCard(c));
      return h("li", {}, b);
    };

    const renderSection = s => h("section", { class: s.featured ? "project-section featured" : "project-section" },
      h("h3", {}, h("span", { text: s.title }), h("small", { text: String(s.points.length) })),
      s.intro ? h("p", { class: "section-intro", text: s.intro }) : null,
      s.icons?.files?.length ? iconBoard(s.icons) : null,
      h("ul", { class: "highlights" }, ...s.points.map(card)));

    // Media inside a part: images zoom in the lightbox, videos play in place
    const partMedia = (m, list) => {
      if (kindOf(m.src) === "image") {
        const b = h("button", { class: "stack-img", "data-nav": true, "aria-label": `View full size: ${m.caption || p.title}` },
          h("img", { src: m.src, alt: m.alt ?? m.caption ?? "", loading: "lazy" }));
        const imgs = list.filter(x => kindOf(x.src) === "image");
        b.addEventListener("click", () => openLightbox(imgs.map(x => ({
          render: () => h("img", { src: x.src, alt: x.alt ?? x.caption ?? "" }), kicker: p.title, title: x.caption ?? "", note: x.note ?? ""
        })), imgs.indexOf(m)));
        return h("figure", { class: "stack-item" }, b, m.caption ? h("figcaption", { text: m.caption }) : null);
      }
      return h("figure", { class: "stack-item" }, h("div", { class: "stack-media" }, mediaEl(m, 0)),
        m.caption ? h("figcaption", { text: m.caption }) : null);
    };
    const renderPart = (pt, i) => {
      const own = sections.filter(s => s.part === pt.id);
      const empty = !own.length && !pt.media?.length && !pt.icons?.files?.length;
      return h("section", { class: "part", id: `part-${pt.id}`, style: `--i:${i}` },
        h("header", { class: "part-head" },
          h("span", { class: "part-num", "aria-hidden": "true", text: String(i + 1).padStart(2, "0") }),
          h("div", {},
            pt.tag ? h("p", { class: "eyebrow", text: pt.tag }) : null,
            h("h2", { class: "part-title", text: pt.title }))),
        pt.intro ? h("p", { class: "part-intro", text: pt.intro }) : null,
        pt.media?.length ? h("div", { class: "part-media" }, ...pt.media.map(m => partMedia(m, pt.media))) : null,
        pt.icons?.files?.length ? iconBoard(pt.icons) : null,
        ...own.map(renderSection),
        empty ? h("p", { class: "part-empty", text: "More coming soon." }) : null);
    };
    const partNav = parts && h("nav", { class: "part-nav", "aria-label": "Projects on this page" },
      ...parts.map((pt, i) => {
        const b = h("button", { class: "part-chip", "data-nav": true },
          h("small", { text: String(i + 1).padStart(2, "0") }), h("span", { text: pt.title }));
        b.addEventListener("click", () => $(`#part-${pt.id}`)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }));
        return b;
      }));

    $("#project-desc").replaceChildren(
      ...(parts ? [partNav, ...parts.map(renderPart)] : sections.map(renderSection)),
      ...(mainLink ? [h("aside", { class: "cta-banner" },
        h("div", {},
          h("p", { class: "cta-banner-title", text: p.ctaTitle ?? "Try it yourself" }),
          p.ctaText ? h("p", { class: "cta-banner-text", text: p.ctaText }) : null),
        h("div", { class: "cta-banner-actions" },
          linkBtn(mainLink, "btn cta-btn"),
          ...p.links.slice(1).map(l => linkBtn(l, "btn"))))] : []));

    // The work first: every photo and video stacked full width under the title, details after.
    const media = (p.media?.length ? p.media : [{ src: p.cover, caption: p.title }])
      .map((m, i) => ({ ...m, hue: (p.hue ?? 200) + i * 25, seed: `${p.id}-${i}` }));
    const isVid = m => ["video", "youtube", "vimeo"].includes(kindOf(m.src)) || (!m.src && m.kind === "video");
    const placeholder = (item, i, big = true) => isVid(item)
      ? motionCanvas(item.seed, item.hue, big)
      : coverCanvas(item.seed, item.hue, "Image coming soon");
    const images = media.filter(m => kindOf(m.src) === "image");
    $("#project-stack").replaceChildren(...media.map(m => {
      let el;
      if (kindOf(m.src) === "image") {
        el = h("button", { class: "stack-img", "data-nav": true, "aria-label": `View full size: ${m.caption || p.title}` },
          h("img", { src: m.src, alt: m.alt ?? m.caption ?? "", loading: "lazy" }));
        el.addEventListener("click", () => openLightbox(images.map(x => ({
          render: () => h("img", { src: x.src, alt: x.alt ?? x.caption ?? "" }),
          kicker: p.title, title: x.caption ?? "", note: x.note ?? ""
        })), images.indexOf(m)));
      } else {
        el = h("div", { class: "stack-media" }, mediaEl(m, 0, { placeholder }));
      }
      return h("figure", { class: "stack-item" }, el, m.caption ? h("figcaption", { text: m.caption }) : null);
    }));

    const k = D.projects.indexOf(p);
    const nextP = D.projects[(k + 1) % D.projects.length];
    const toProject = (el, q) => Object.assign(el, { href: `#projects/${q.id}` }).setAttribute("data-goto", `projects/${q.id}`);
    const next = $("#project-next");
    toProject(next, nextP);
    next.replaceChildren(
      h("span", { class: "ap-next-text" }, h("small", { text: "Next →" }), h("strong", { text: nextP.title })),
      h("span", { class: "ap-next-art" }, projectCover(nextP)));
    const arrow = $("#project-arrow");
    toProject(arrow, nextP);
    arrow.setAttribute("aria-label", `Next project: ${nextP.title}`);
    $("#project-more").replaceChildren(...D.projects.filter(q => q !== p && q !== nextP).map(q => {
      const a = h("a", { class: "ap-more-item", "data-nav": true, title: q.title, "aria-label": q.title }, projectCover(q));
      toProject(a, q);
      return h("li", {}, a);
    }));
    $(".ap-more").hidden = !$("#project-more").children.length;
    $("#screen-project").scrollTop = 0;
  }

  /* ================= Icon board: a set of single-colour SVG icons you can inspect ================= */
  // Icons are plain <img> tags (work even when the site is opened straight from the folder);
  // white icons are turned dark with a CSS filter on the light background.
  const ICON_WORDS = { fov: "FOV", ui: "UI", xray: "X-ray" };
  const iconLabel = name => name
    .replace(/([a-z])([A-Z0-9])/g, "$1 $2").split(" ")
    .map((w, i) => ICON_WORDS[w.toLowerCase()] ?? (i ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ");
  function iconBoard(set) {
    const BGS = [["dark", "Dark"], ["light", "Light"], ["brand", "Colour"]];
    const SIZES = [24, 48, 96];
    const board = h("div", { class: "iconboard", "data-bg": "dark", style: "--size:48px" });
    const glyph = (name, cls = "ib-glyph") =>
      h("img", { class: cls, src: `${set.path}${set.prefix ?? ""}${name}.svg`, alt: "", draggable: "false", loading: "lazy" });
    const focusArt = h("span", { class: "ib-focus-art" });
    const focusName = h("strong", { class: "ib-focus-name" });
    const focus = h("div", { class: "ib-focus", "aria-live": "polite" }, focusArt,
      h("span", {}, focusName, h("small", { text: "64 × 64 · SVG" })));
    const show = name => { focusArt.replaceChildren(glyph(name, "ib-glyph big")); focusName.textContent = iconLabel(name); };

    const seg = (label, opts, attr, apply) => {
      const btns = opts.map(([val, text]) => {
        const b = h("button", { class: "ib-opt", "data-nav": true, "aria-pressed": "false", text });
        b.addEventListener("click", () => {
          btns.forEach(x => x.setAttribute("aria-pressed", String(x === b)));
          apply(val); Sound.tone(880, 0.06, "sine", 0.03);
        });
        return b;
      });
      btns[attr].setAttribute("aria-pressed", "true");
      return h("div", { class: "ib-seg", role: "group", "aria-label": label }, ...btns);
    };

    const tiles = set.files.map((name, i) => {
      const b = h("button", { class: "ib-icon", "data-nav": true, "aria-label": iconLabel(name), title: iconLabel(name), style: `--i:${i}` },
        glyph(name));
      b.addEventListener("click", () => { show(name); b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); Sound.tone(660 + (i % 8) * 60, 0.08, "triangle", 0.03); });
      b.addEventListener("pointerenter", () => show(name));
      b.addEventListener("focus", () => show(name));
      return h("li", {}, b);
    });
    show(set.files[0]);

    board.append(
      h("div", { class: "ib-bar" },
        h("p", { class: "ib-title" }, h("span", { text: set.title ?? "Icon set" }), h("small", { text: `${set.files.length} icons` })),
        seg("Background", BGS, 0, v => { board.dataset.bg = v; }),
        seg("Icon size", SIZES.map(s => [s, `${s}px`]), 1, v => { board.style.setProperty("--size", `${v}px`); })),
      h("div", { class: "ib-body" }, focus, h("ul", { class: "ib-grid" }, ...tiles)));
    return board;
  }

  /* ================= Footer (project pages and other long screens) ================= */
  function renderFooter(el) {
    const c = D.contact ?? {};
    el.replaceChildren(
      h("div", { class: "footer-main" },
        h("p", { class: "footer-name", text: D.name }),
        h("p", { class: "footer-role", text: D.role })),
      h("div", { class: "footer-links" },
        c.email ? h("a", { href: `mailto:${c.email}`, "data-nav": true, text: c.email }) : null,
        ...(c.links ?? []).map(l => h("a", { href: l.url, target: "_blank", rel: "noopener", "data-nav": true, text: `${l.label} ↗` }))),
      h("p", { class: "footer-copy", text: `© ${new Date().getFullYear()} ${D.name}` }));
  }
  $$("[data-footer]").forEach(renderFooter);

  /* ================= Motion ================= */
  const MOTION = D.motion ?? { reel: [] };
  // A grid of video tiles; each opens in the lightbox and starts playing.
  const reelCtx = r => [r.context, r.year].filter(Boolean).join(" · ");
  const openReel = i => openLightbox(MOTION.reel.map(r => ({
    render: () => h("div", { class: "lb-video" }, mediaEl({ src: r.video, poster: r.poster, alt: r.title, kind: "video" }, 0,
      { autoplay: true, placeholder: (it, k, big) => motionCanvas(r.title, r.hue, big) })),
    kicker: reelCtx(r), title: r.title, award: r.award, note: r.description ?? ""
  })), i);
  $("#motion-list").replaceChildren(...MOTION.reel.map((r, i) => {
    const yt = ytId(r.video);
    const art = r.poster ? h("img", { src: r.poster, alt: "", loading: "lazy" })
      : yt ? h("img", { src: `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`, alt: "", loading: "lazy" })
      : isVideoFile(r.video) ? h("video", { src: `${r.video}#t=0.1`, muted: true, preload: "metadata", tabindex: "-1" })
      : motionCanvas(r.title, r.hue, false);
    const b = h("button", { class: "motion-tile", "data-nav": true, "aria-label": `Play ${r.title}` },
      h("span", { class: "motion-tile-art" }, art, h("span", { class: "play-btn small", "aria-hidden": "true" })),
      h("span", { class: "motion-tile-text" },
        h("small", { text: reelCtx(r) }),
        h("strong", { text: r.title }),
        r.award ? h("span", { class: "badge", text: `✦ ${r.award}` }) : null));
    b.addEventListener("click", () => openReel(i));
    b.style.animationDelay = `${i * 70}ms`;
    return h("li", {}, b);
  }));

  /* ================= Illustration ================= */
  const ILLU = D.illustration ?? { pieces: [] };
  $("#illu-intro").textContent = ILLU.intro ?? "";
  $("#illu-links").append(...(ILLU.links ?? []).map(l =>
    h("a", { class: "btn", "data-nav": true, href: l.url, target: "_blank", rel: "noopener", text: `${l.label} ↗` })));
  const artFor = (item, big) => item.image
    ? h("img", { src: item.image, alt: item.alt ?? item.title, loading: big ? "eager" : "lazy" })
    : artCanvas(item, big ? 1100 : 600);
  const illuList = ILLU.pieces.map(item => ({
    render: () => artFor(item, true),
    kicker: [item.medium, item.year].filter(Boolean).join(" · "),
    title: item.title, award: item.award, note: item.note
  }));
  $("#gallery").append(...ILLU.pieces.map((item, i) => {
    const b = h("button", { class: "art", "data-nav": true, style: `--i:${i}; --r:${item.ratio || 1}`, "aria-label": `${item.title}${item.award ? `, ${item.award}` : ""}. View larger.` },
      artFor(item),
      item.award ? h("span", { class: "art-award", "aria-hidden": "true", text: `✦ ${item.award}` }) : null,
      h("span", { class: "art-caption", "aria-hidden": "true" },
        h("strong", { text: item.title }),
        h("small", { text: [item.medium, item.year].filter(Boolean).join(" · ") })));
    b.addEventListener("click", () => openLightbox(illuList, i));
    return b;
  }));

  /* ================= Skills ================= */
  // One card per skill area: each skill shows the proof behind it (no levels).
  const SKILL_ICONS = {
    ui: '<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="M3.5 9h17M7 6.8h.01M9.5 6.8h.01"/>',
    motion: '<circle cx="12" cy="12" r="8.5"/><path d="m10 8.8 5 3.2-5 3.2z"/>',
    art: '<path d="M4 20c1.5-4 4-6 6.5-6.5L17 7a2.1 2.1 0 0 1 3 3l-6.5 6.5C13 19 10 20.5 4 20Z"/><path d="m14.5 9.5 0 0"/>',
    code: '<path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13"/>'
  };
  const skillIcon = group => {
    const g = group.toLowerCase();
    const key = /program|code|dev/.test(g) ? "code" : /motion|anim/.test(g) ? "motion" : /illus|3d|art/.test(g) ? "art" : "ui";
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("aria-hidden", "true");
    s.innerHTML = SKILL_ICONS[key];
    return s;
  };
  $("#skill-groups").append(...D.skills.map((g, gi) =>
    h("section", { class: "skill-card", style: `--i:${gi}` },
      h("header", { class: "skill-card-head" },
        h("span", { class: "skill-ico" }, skillIcon(g.group)),
        h("h3", { text: g.group })),
      h("ul", { class: "skill-list" }, ...g.items.map(s =>
        h("li", {}, h("strong", { text: s.name }), s.note ? h("p", { text: s.note }) : null))))));

  // Toolbox: every tool named in projects, motion pieces and `D.toolbox` (optional extras), as app-style tiles
  const tools = [...new Set([
    ...(D.toolbox ?? []),
    ...D.projects.flatMap(p => p.tools ?? []),
    ...(D.motion?.reel ?? []).flatMap(r => r.tools ?? [])
  ])];
  $("#toolbox").append(...tools.map(toolTile));
  $(".toolbox").hidden = !tools.length;

  /* ================= Contact ================= */
  const toast = $("#contact-toast");
  $("#contact-lead").textContent = D.contact.lead;
  const copyBtn = h("button", { class: "btn primary", "data-nav": true, text: "Copy email" });
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(D.contact.email);
      toast.textContent = `Copied ${D.contact.email} to clipboard.`;
      const r = copyBtn.getBoundingClientRect();
      FX.burst(r.left + r.width / 2, r.top + r.height / 2, 70, { spread: 1.2, power: 11 });
      Sound.start();
    } catch {
      toast.textContent = `Email: ${D.contact.email}`;
    }
  });
  $("#contact-actions").append(
    copyBtn,
    h("a", { class: "btn", "data-nav": true, href: `mailto:${D.contact.email}`, text: "Send email" }),
    hasPDF ? cvBtn("", "Download CV") : null,
    ...D.contact.links.map(l => h("a", { class: "btn", "data-nav": true, href: l.url, target: "_blank", rel: "noopener", text: `${l.label} ↗` })));

  /* ================= Overlay (lightbox) ================= */
  const frame = $(".frame");
  let modalOpen = false;
  let overlay = null;
  let overlayReturn = null;

  function showOverlay(el) {
    if (!modalOpen) overlayReturn = document.activeElement;
    overlay = el;
    el.hidden = false;
    frame.inert = true;
    modalOpen = true;
    select($(".modal-close", el) ?? navItems()[0], { silent: true });
    updatePrompts();
  }

  function closeOverlay() {
    if (!modalOpen) return;
    overlay.hidden = true;
    if (overlay === lightbox) $("#lb-media").replaceChildren(); // stop any video playing in it
    overlay = null;
    frame.inert = false;
    modalOpen = false;
    Sound.back();
    if (overlayReturn?.isConnected) { overlayReturn.focus({ preventScroll: true }); select(overlayReturn, { silent: true, focus: false }); }
    updatePrompts();
  }

  /* ================= Routing ================= */
  const SCREENS = ["title", "menu", "projects", "project", "motion", "illustration", "skills", "cv", "contact"];
  let current = null;      // screen id
  let currentRoute = null; // full route, e.g. "projects/ayna"
  let selected = null;
  let booted = false;

  function screenLabel(id) {
    if (id === "title") return null;
    if (id === "menu") return "Main menu";
    if (id === "project") return currentProject?.title;
    return D.menu.find(m => m.id === id)?.label ?? id;
  }

  function go(route, { push = true } = {}) {
    route = String(route || "title").replace(/^#/, "");
    let [id, sub] = route.split("/");
    if (id === "projects" && sub) {
      const p = D.projects.find(x => x.id === sub);
      if (p) { id = "project"; if (currentProject !== p || currentRoute !== route) renderProject(p); }
      else route = id = "projects";
    }
    if (!SCREENS.includes(id) || (id === "project" && !currentProject)) route = id = "menu";
    if (modalOpen) closeOverlay();
    if (navOpen) setNavOpen(false, { focus: false });
    if (route === currentRoute) return;

    const leaving = $(".screen.active");
    viewers.forEach(v => { if (leaving?.contains(v.root)) v.stop(); });
    if (leaving) {
      $$("video", leaving).forEach(v => v.pause());
      $$("iframe", leaving).forEach(f => { if (f._restore) f.replaceWith(f._restore); else f.replaceWith(); });
    }

    for (const s of $$(".screen")) {
      const on = s.dataset.screen === id;
      s.classList.toggle("active", on);
      s.inert = !on;
      if (on) s.scrollTop = 0;
    }
    document.body.dataset.screen = id;
    current = id;
    currentRoute = route;

    // Navigation state
    const navId = id === "project" ? "projects" : id;
    $$(".nav-link").forEach(a => {
      if (a.dataset.goto === navId) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    const label = screenLabel(id);
    document.title = label ? `${label} · ${D.name}` : `${D.name} · ${D.role}`;

    if (push) {
      const url = id === "title" ? location.pathname + location.search : `#${route}`;
      history.pushState(null, "", url);
    }

    selected?.classList.remove("selected");
    selected = null;
    if (booted) {
      if (inputMode === "pointer") {
        // Move focus to the new heading so screen readers announce the page.
        const heading = $(".screen.active h1, .screen.active h2");
        heading?.setAttribute("tabindex", "-1");
        heading?.focus({ preventScroll: true });
      } else {
        const first = contentItems()[0];
        if (first) select(first, { silent: true });
      }
      $("#route-announcer").textContent = label ?? "";
    }
    updatePrompts();
  }

  function back() {
    if (modalOpen) return closeOverlay();
    if (navOpen) return setNavOpen(false);
    if (current === "title") return;
    Sound.back();
    go(current === "project" ? "projects" : current === "menu" ? "title" : "menu");
  }

  function start() {
    Sound.init();
    Sound.start();
    go("menu");
  }

  /* ================= Selection & spatial navigation ================= */
  const visible = el => el.getClientRects().length > 0 && !el.closest("[hidden], [inert]");
  // Items inside the current screen, preferring real content over filter tabs / back links.
  const contentItems = () => {
    const s = $(".screen.active");
    if (!s) return [];
    const all = $$("[data-nav]", s).filter(visible);
    const main = all.filter(el => !el.matches(".tab, .back-link"));
    return main.length ? main : all;
  };
  function navItems() {
    if (modalOpen) return $$("[data-nav]", overlay).filter(visible);
    if (navOpen) return $$("[data-nav]", siteNav).filter(visible);
    const roots = [topbar, $(".screen.active")].filter(Boolean);
    return roots.flatMap(r => $$("[data-nav]", r)).filter(visible);
  }
  const inScope = el => (modalOpen ? overlay : navOpen ? siteNav : null)?.contains(el) ?? (topbar.contains(el) || $(".screen.active")?.contains(el));

  function select(el, { silent = false, focus = true, scroll = false } = {}) {
    if (!el) return;
    const changed = selected !== el;
    selected?.classList.remove("selected");
    selected = el;
    el.classList.add("selected");
    if (focus && document.activeElement !== el) el.focus({ preventScroll: true });
    if (scroll) el.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
    if (changed) {
      if (!silent) Sound.move();
      el.dispatchEvent(new CustomEvent("navselect"));
    }
  }

  function move(dx, dy) {
    // The lightbox pages through images with left/right.
    if (modalOpen && dx && overlay?.hasAttribute("data-arrows")) {
      overlay.dispatchEvent(new CustomEvent("arrow", { detail: dx }));
      return;
    }
    const items = navItems();
    if (!items.length) return;
    const cur = items.includes(document.activeElement) ? document.activeElement : (items.includes(selected) ? selected : null);
    if (!cur) return select(contentItems()[0] ?? items[0], { scroll: true });
    const a = cur.getBoundingClientRect();
    const ax = a.left + a.width / 2, ay = a.top + a.height / 2;
    let best = null, bestScore = Infinity;
    for (const el of items) {
      if (el === cur) continue;
      const b = el.getBoundingClientRect();
      const vx = b.left + b.width / 2 - ax, vy = b.top + b.height / 2 - ay;
      const primary = dx ? vx * dx : vy * dy;
      if (primary <= 1) continue;
      const score = primary + Math.abs(dx ? vy : vx) * 2.5;
      if (score < bestScore) { bestScore = score; best = el; }
    }
    if (best) select(best, { scroll: true });
    else Sound.bump();
  }

  /* ================= Input modes & on-screen hints ================= */
  // Hints for keyboard/controller only appear once someone actually uses them.
  let inputMode = "pointer";
  const GLYPHS = {
    kb:  { nav: "↑↓←→", select: "Enter", back: "Esc", tab: "Tab" },
    pad: { nav: "✥", select: "A", back: "B", tab: "" }
  };
  function setInputMode(mode) {
    if (mode === inputMode) return;
    inputMode = mode;
    document.body.dataset.input = mode;
    updatePrompts();
  }
  function updatePrompts() {
    const g = GLYPHS[inputMode] ?? GLYPHS.kb;
    let list;
    if (modalOpen) list = [["nav", "Browse"], ["back", "Close"]];
    else if (current === "title") list = [["select", "Start"]];
    else list = [["nav", "Move"], ["select", "Open"], ["back", "Back"]];
    if (inputMode === "kb" && !modalOpen) list.push(["tab", "Next item"]);
    $("#prompts").replaceChildren(...list.map(([key, label]) =>
      h("span", { class: "prompt" }, h("kbd", { text: g[key] }), label)));
  }

  /* ================= Input ================= */
  const DIRS = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
  const isTyping = el => el?.matches?.("input, textarea, select, [contenteditable='true']");
  const isNative = el => el?.matches?.("video, iframe, audio");

  document.addEventListener("keydown", e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    konami(e.key);
    if (["Tab", "Enter", " ", "Escape", ...Object.keys(DIRS)].includes(e.key)) { Sound.init(); setInputMode("kb"); }
    if (isTyping(e.target)) return;

    if (e.key === "Escape") { e.preventDefault(); back(); return; }

    if (current === "title" && !modalOpen) {
      // Enter/Space anywhere that isn't a control starts; arrows move onto the buttons.
      const onControl = e.target.closest?.("a, button");
      if ((e.key === "Enter" || e.key === " ") && !onControl) { e.preventDefault(); start(); return; }
      if (DIRS[e.key] && !onControl) { e.preventDefault(); select($(".press-start")); return; }
    }

    if (DIRS[e.key] && !isNative(e.target)) { e.preventDefault(); move(...DIRS[e.key]); }
    // Enter/Space fall through to the focused element's native behaviour.
  });

  document.addEventListener("pointerdown", e => { Sound.init(); if (e.pointerType) setInputMode("pointer"); });
  document.addEventListener("pointermove", e => { if (e.pointerType === "mouse" && (Math.abs(e.movementX) + Math.abs(e.movementY) > 2)) setInputMode("pointer"); });

  document.addEventListener("pointerover", e => {
    if (e.pointerType !== "mouse") return;
    const el = e.target.closest("[data-nav]");
    if (el && el !== selected && inScope(el)) select(el, { focus: false });
  });

  document.addEventListener("focusin", e => {
    const el = e.target.closest?.("[data-nav]");
    if (el && el !== selected) select(el, { focus: false, silent: true });
  });

  document.addEventListener("click", e => {
    if (e.target.closest("[data-close]")) { closeOverlay(); return; }
    const t = e.target.closest("[data-goto], [data-nav]");
    if (!t) return;
    if (t.matches("a[href='#']")) e.preventDefault();
    Sound.select();
    if (t.matches("[data-goto]")) {
      if (e.button !== 0 || e.shiftKey || e.ctrlKey || e.metaKey) return; // let new-tab clicks through
      e.preventDefault();
      go(t.dataset.goto);
    }
  });

  window.addEventListener("popstate", () => go(location.hash.slice(1) || "title", { push: false }));

  /* ================= Gamepad ================= */
  const pad = { prev: [], held: null, repeatAt: 0, running: false };
  function pollPad(t) {
    const gp = [...(navigator.getGamepads?.() ?? [])].find(Boolean);
    if (!gp) { pad.running = false; return; }
    const down = i => !!gp.buttons[i]?.pressed;
    const edge = i => down(i) && !pad.prev[i];
    const [ax = 0, ay = 0] = gp.axes;
    let dir = null;
    if (down(12) || ay < -0.5) dir = [0, -1];
    else if (down(13) || ay > 0.5) dir = [0, 1];
    else if (down(14) || ax < -0.5) dir = [-1, 0];
    else if (down(15) || ax > 0.5) dir = [1, 0];
    const anyEdge = gp.buttons.some((b, i) => b.pressed && !pad.prev[i]);
    if (anyEdge || dir) setInputMode("pad");

    if (current === "title" && !modalOpen) {
      if (anyEdge) start();
    } else {
      const key = dir?.join();
      if (key) {
        if (key !== pad.held) { pad.held = key; pad.repeatAt = t + 380; move(...dir); }
        else if (t >= pad.repeatAt) { pad.repeatAt = t + 110; move(...dir); }
      } else pad.held = null;
      if (edge(0)) (document.activeElement ?? selected)?.click();
      if (edge(1)) back();
      if (edge(9) && !modalOpen) go("menu");
    }
    pad.prev = gp.buttons.map(b => b.pressed);
    requestAnimationFrame(pollPad);
  }
  window.addEventListener("gamepadconnected", () => {
    setInputMode("pad");
    if (!pad.running) { pad.running = true; requestAnimationFrame(pollPad); }
  });

  /* ================= Background ================= */
  (function background() {
    const cv = $("#bg");
    const c = cv.getContext("2d");
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const blobs = [
      { x: 0.2, y: 0.25, r: 0.55, c: [255, 122, 80], a: 0.37, sx: 0.00011, sy: 0.00008, p: 0, d: 0.6 },
      { x: 0.8, y: 0.3, r: 0.5, c: [139, 92, 246], a: 0.27, sx: 0.00009, sy: 0.00012, p: 2, d: 1 },
      { x: 0.55, y: 0.9, r: 0.6, c: [20, 184, 166], a: 0.17, sx: 0.00007, sy: 0.0001, p: 4, d: 0.4 }
    ];
    let W = 0, H = 0;
    let dark = document.documentElement.dataset.theme === "dark";
    document.addEventListener("themechange", () => { dark = document.documentElement.dataset.theme === "dark"; if (reduceMotion) draw(0); });
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceMotion) draw(0);
    }
    function draw(t) {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      c.fillStyle = dark ? "#141217" : "#f5f2ec";
      c.fillRect(0, 0, W, H);
      const m = Math.max(W, H);
      const party = document.body.classList.contains("party");
      for (const [bi, b] of blobs.entries()) {
        const x = (b.x + Math.sin(t * b.sx + b.p) * 0.08) * W - mouse.x * 40 * b.d;
        const y = (b.y + Math.cos(t * b.sy + b.p) * 0.08) * H - mouse.y * 30 * b.d;
        const grad = c.createRadialGradient(x, y, 0, x, y, b.r * m);
        if (party) {
          const hue = (t * 0.12 + bi * 120) % 360;
          grad.addColorStop(0, `hsla(${hue}, 90%, 60%, ${b.a * 1.6})`);
          grad.addColorStop(1, `hsla(${hue}, 90%, 60%, 0)`);
        } else {
          const [r, g, bl] = b.c;
          grad.addColorStop(0, `rgba(${r},${g},${bl},${dark ? b.a * 0.5 : b.a})`);
          grad.addColorStop(1, `rgba(${r},${g},${bl},0)`);
        }
        c.fillStyle = grad;
        c.fillRect(0, 0, W, H);
      }
    }
    function loop(t) {
      if (!document.hidden) draw(t);
      requestAnimationFrame(loop);
    }
    addEventListener("resize", resize);
    addEventListener("pointermove", e => {
      mouse.tx = (e.clientX / innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / innerHeight) * 2 - 1;
    });
    resize();
    if (!reduceMotion) requestAnimationFrame(loop);
  })();

  /* ================= Fun stuff ================= */
  // --- Toast ---
  const globalToast = $("#global-toast");
  let toastTimer;
  function showToast(msg, ms = 2200) {
    globalToast.textContent = msg;
    globalToast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => globalToast.classList.remove("show"), ms);
  }

  // --- Particle effects (confetti + sparkles) ---
  const FX = (() => {
    const cv = $("#fx");
    const c = cv.getContext("2d");
    const parts = [];
    let running = false;
    const EXTRA = ["#8b5cf6", "#14b8a6", "#facc15", "#f472b6", "#38bdf8"];
    const accent = () => getComputedStyle(document.body).getPropertyValue("--accent").trim() || "#e5532a";
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    addEventListener("resize", resize);
    resize();
    function spawn(x, y, vx, vy, o) {
      const colors = [accent(), accent(), ...EXTRA];
      parts.push({
        x, y, vx, vy,
        rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4,
        size: (o.size ?? 7) * (0.6 + Math.random() * 0.8),
        color: colors[(Math.random() * colors.length) | 0],
        shape: o.shape ?? (Math.random() < 0.6 ? "rect" : "dot"),
        life: 1, decay: o.decay ?? (0.008 + Math.random() * 0.008),
        gravity: o.gravity ?? 0.32, drag: o.drag ?? 0.985
      });
      if (!running) { running = true; requestAnimationFrame(tick); }
    }
    function burst(x, y, n = 40, o = {}) {
      if (reduceMotion) return;
      const power = o.power ?? 9, spread = o.spread ?? 1;
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 2 * spread;
        const s = power * (0.35 + Math.random() * 0.75);
        spawn(x, y, Math.cos(a) * s, Math.sin(a) * s, o);
      }
    }
    function rain(n = 160) {
      if (reduceMotion) return;
      for (let i = 0; i < n; i++) {
        setTimeout(() => spawn(Math.random() * innerWidth, -20, (Math.random() - 0.5) * 3, 2 + Math.random() * 3,
          { gravity: 0.08, drag: 0.995, decay: 0.004 }), Math.random() * 1400);
      }
    }
    function tick() {
      c.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.vx *= p.drag; p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        p.life -= p.decay;
        if (p.life <= 0 || p.y > innerHeight + 40) { parts.splice(i, 1); continue; }
        c.globalAlpha = Math.min(1, p.life * 2);
        c.fillStyle = p.color;
        c.save();
        c.translate(p.x, p.y); c.rotate(p.rot);
        if (p.shape === "rect") c.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        else { c.beginPath(); c.arc(0, 0, p.size / 2.6, 0, Math.PI * 2); c.fill(); }
        c.restore();
      }
      c.globalAlpha = 1;
      if (parts.length) requestAnimationFrame(tick);
      else running = false;
    }
    return { burst, rain };
  })();

  const SCALE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51];

  // --- Project cards: 3D tilt with a glare that follows the cursor ---
  let tiltCard = null;
  function untilt(card) {
    if (!card) return;
    card.classList.remove("tilting");
    ["--rx", "--ry"].forEach(p => card.style.removeProperty(p));
  }
  if (finePointer && !reduceMotion) {
    grid.addEventListener("pointermove", e => {
      const card = e.target.closest(".level");
      if (card !== tiltCard) { untilt(tiltCard); tiltCard = card; }
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.classList.add("tilting");
      card.style.setProperty("--ry", `${((px - 0.5) * 12).toFixed(2)}deg`);
      card.style.setProperty("--rx", `${(-(py - 0.5) * 12).toFixed(2)}deg`);
      card.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
      card.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
    });
    grid.addEventListener("pointerleave", () => { untilt(tiltCard); tiltCard = null; });
  }

  // --- Magnetic buttons ---
  let magnet = null;
  function release(el) { el?.style.removeProperty("--mx"); el?.style.removeProperty("--my"); }
  if (finePointer && !reduceMotion) {
    document.addEventListener("pointermove", e => {
      const el = e.target.closest?.(".press-start, .btn.primary");
      if (el !== magnet) { release(magnet); magnet = el; }
      if (!el) return;
      el.classList.add("magnetic");
      const r = el.getBoundingClientRect();
      const ox = parseFloat(el.style.getPropertyValue("--mx")) || 0;
      const oy = parseFloat(el.style.getPropertyValue("--my")) || 0;
      const dx = e.clientX - (r.left - ox + r.width / 2), dy = e.clientY - (r.top - oy + r.height / 2);
      el.style.setProperty("--mx", `${(dx * 0.25).toFixed(1)}px`);
      el.style.setProperty("--my", `${(dy * 0.35).toFixed(1)}px`);
    });
  }

  // --- Konami code → party mode ---
  const CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let codePos = 0;
  function konami(key) {
    const k = key.length === 1 ? key.toLowerCase() : key;
    codePos = k === CODE[codePos] ? codePos + 1 : (k === CODE[0] ? 1 : 0);
    if (codePos === CODE.length) { codePos = 0; setParty(!document.body.classList.contains("party")); }
  }
  function setParty(on, msg) {
    document.body.classList.toggle("party", on);
    if (on) {
      FX.rain();
      [523.25, 659.25, 783.99, 1046.5, 1318.51].forEach((f, i) => setTimeout(() => Sound.tone(f, 0.3, "triangle", 0.04), i * 90));
    } else Sound.back();
    showToast(msg ?? (on ? "Party mode on 🎉 Enter the code again to stop." : "Party's over."), 3000);
  }

  // --- Sparkles when clicking empty space (mouse only, not on touch screens) ---
  document.addEventListener("pointerdown", e => {
    if (e.pointerType !== "mouse" || modalOpen || e.target.closest("a, button, video, iframe, .panel, .level, .skill, .tab-row, .topbar, .viewer")) return;
    FX.burst(e.clientX, e.clientY, 16, { power: 5, size: 5, gravity: 0.12, decay: 0.025, shape: "dot" });
  });

  /* ================= Splash ================= */
  // Plays Andrea's intro animation once per visit, with a Skip button. Off when splash.video is empty.
  (function splash() {
    const cfg = D.splash ?? {};
    const phone = matchMedia("(max-width: 720px) and (orientation: portrait)").matches;
    const src = (phone && cfg.videoMobile) || cfg.video;
    let seen = false;
    try { seen = sessionStorage.getItem("splash-seen") === "1"; } catch {}
    if (!src || seen || reduceMotion) return;
    try { sessionStorage.setItem("splash-seen", "1"); } catch {}
    const v = Object.assign(h("video", { src, autoplay: true, playsinline: true, preload: "auto", "aria-hidden": "true" }), { muted: true });
    const skip = h("button", { class: "splash-skip", "data-nav": true, text: "Skip →" });
    const el = h("div", { class: "splash", role: "dialog", "aria-label": "Intro animation", style: `background:${cfg.background ?? "#f5f2ec"}` }, v, skip);
    let done = false;
    const end = () => {
      if (done) return; done = true;
      el.classList.add("is-leaving");
      removeEventListener("keydown", onKey, true);
      setTimeout(() => el.remove(), 700);
    };
    const onKey = e => { if (["Escape", "Enter", " "].includes(e.key)) { e.preventDefault(); e.stopPropagation(); end(); } };
    v.addEventListener("ended", end);
    v.addEventListener("error", end);
    skip.addEventListener("click", end);
    el.addEventListener("click", e => { if (e.target !== skip) end(); });
    addEventListener("keydown", onKey, true);
    setTimeout(end, 15000); // safety net
    document.body.append(el);
    v.play().catch(end);
    skip.focus({ preventScroll: true });
  })();

  /* ================= Boot ================= */
  setFilter("all");
  go(location.hash.slice(1) || "title", { push: false });
  booted = true;
})();
