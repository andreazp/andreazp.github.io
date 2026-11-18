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

  /* ================= Basics ================= */
  const initials = D.name.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
  $("#brand-name").textContent = D.name;
  $("#brand-role").textContent = D.role;
  $(".brand").setAttribute("aria-label", `${D.name} — home`);
  $("#availability").textContent = D.availability ?? "";
  if (!D.availability) $(".status-chip").remove();
  $("#title-eyebrow").textContent = D.role;
  $("#year").textContent = new Date().getFullYear();

  // Name: each word rises in on load (no per-letter effects — it stays calm).
  const titleName = $("#title-name");
  titleName.setAttribute("aria-label", D.name);
  titleName.replaceChildren(...D.name.split(/s+/).flatMap((word, wi) => [
    wi ? document.createTextNode(" ") : null,
    h("span", { class: "word", "aria-hidden": "true", style: `--i:${wi}`, text: word })
  ]).filter(Boolean));

  // Catchphrase: words rise in after the name; *word* gets the accent + a drawn underline.
  const catchEl = $("#title-catch");
  const phrase = D.catchphrase ?? "";
  catchEl.setAttribute("aria-label", phrase.replace(/\*/g, ""));
  catchEl.replaceChildren(...phrase.split(/(\*[^*]+\*|\s+)/).filter(Boolean).map((part, i, all) => {
    if (/^\s+$/.test(part)) return document.createTextNode(" ");
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
    const count = h("span", { class: "viewer-count" });
    const prev = h("button", { class: "icon-btn", "data-nav": true, "aria-label": `Previous ${label.toLowerCase()}`, text: "←" });
    const next = h("button", { class: "icon-btn", "data-nav": true, "aria-label": `Next ${label.toLowerCase()}`, text: "→" });
    const thumbs = h("div", { class: "viewer-thumbs", role: "group", "aria-label": `${label} — choose one` });
    const multi = items.length > 1;
    const root = h("div", { class: "viewer" }, stage,
      h("div", { class: "viewer-bar" }, multi ? prev : null, multi ? count : null, multi ? next : null, caption),
      multi ? thumbs : null);
    slot.replaceChildren(root);
    let idx = 0;

    function stageMedia(item, i) {
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
        return v;
      }
      if (kind === "youtube" || kind === "vimeo") {
        const yt = ytId(item.src), vm = vimeoId(item.src);
        const b = h("button", { class: "embed-poster", "data-nav": true, "aria-label": `Play video: ${alt || "video"}` },
          item.poster ? h("img", { src: item.poster, alt: "" })
            : yt ? h("img", { src: `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`, alt: "" })
            : opts.placeholder(item, i, true),
          h("span", { class: "play-btn", "aria-hidden": "true" }));
        b.addEventListener("click", () => {
          const src = yt ? `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`
                         : `https://player.vimeo.com/video/${vm}?autoplay=1`;
          const f = h("iframe", { src, title: alt || "Video", allow: "autoplay; fullscreen; picture-in-picture", allowfullscreen: true });
          b.replaceWith(f);
          f.focus();
        });
        return b;
      }
      return h("div", { class: "embed-poster is-placeholder" }, opts.placeholder(item, i, true));
    }

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
  function renderProject(p) {
    currentProject = p;
    $("#project-kicker").textContent = [labelFor(p.category), p.year].filter(Boolean).join(" · ");
    $("#project-h").textContent = p.title;
    $("#project-summary").textContent = p.summary ?? "";
    const award = $("#project-award");
    award.textContent = p.award ? `✦ ${p.award}` : "";
    award.hidden = !p.award;

    const meta = [["Studio", p.studio], ["Role", p.role], ["Year", p.year], ["Tools", p.tools?.join(", ")]].filter(([, v]) => v);
    $("#project-meta").replaceChildren(...meta.map(([k, v]) => h("div", {}, h("dt", { text: k }), h("dd", { text: v }))));
    // Big call-to-action (e.g. Steam demo) under the badge, and again as a banner at the end
    const linkBtn = (l, cls) => h("a", { class: cls, "data-nav": true, href: l.url, target: "_blank", rel: "noopener" },
      h("span", { class: "play-icon", "aria-hidden": "true" }), h("span", { text: l.label }), h("span", { "aria-hidden": "true", text: "↗" }));
    const mainLink = p.links?.[0];
    $("#project-cta").replaceChildren(...(mainLink ? [linkBtn(mainLink, "btn cta-btn")] : []));

    // Feature points: a string, or { text, media } where media is an image or video file
    const points = (p.sections ?? []).flatMap(s => s.points ?? []).map(pt => typeof pt === "string" ? { text: pt } : pt);
    const zoomables = points.filter(pt => pt.media);
    const openPoint = pt => openLightbox(zoomables.map(z => ({
      render: () => kindOf(z.media) === "video"
        ? Object.assign(h("video", { src: z.media, controls: true, autoplay: true, loop: true, playsinline: true }), { muted: true })
        : h("img", { src: z.media, alt: z.alt ?? z.text }),
      kicker: p.title, title: "", note: z.text
    })), zoomables.indexOf(pt));
    const pointEl = raw => {
      const pt = typeof raw === "string" ? { text: raw } : raw;
      const same = points.find(x => x.text === pt.text && x.media === pt.media) ?? pt;
      if (!pt.media) return h("li", { class: "feature" }, h("p", { class: "feature-text", text: pt.text }));
      const isVid = kindOf(pt.media) === "video";
      const m = isVid
        ? Object.assign(h("video", { src: pt.media, loop: true, playsinline: true, preload: "metadata", "aria-hidden": "true" }), { muted: true })
        : h("img", { src: pt.media, alt: "", loading: "lazy" });
      if (isVid && pt.poster) m.poster = pt.poster;
      if (isVid) featureVideos.observe(m);
      const b = h("button", { class: `feature-media${isVid ? " is-video" : ""}`, "data-nav": true, "aria-label": `View full size: ${pt.text}` }, m);
      b.addEventListener("click", () => openPoint(same));
      return h("li", { class: "feature has-media" }, b, h("p", { class: "feature-text", text: pt.text }));
    };

    $("#project-desc").replaceChildren(
      ...(p.description ?? []).map(t => h("p", { text: t })),
      ...(p.sections ?? []).map(s => h("section", { class: "project-section" },
        h("h3", { text: s.title }),
        h("ul", { class: "features" }, ...(s.points ?? []).map(pointEl)))),
      ...(mainLink ? [h("aside", { class: "cta-banner" },
        h("div", {},
          h("p", { class: "cta-banner-title", text: p.ctaTitle ?? "Try it yourself" }),
          p.ctaText ? h("p", { class: "cta-banner-text", text: p.ctaText }) : null),
        h("div", { class: "cta-banner-actions" },
          linkBtn(mainLink, "btn cta-btn"),
          ...p.links.slice(1).map(l => linkBtn(l, "btn"))))] : []));

    const media = p.media?.length ? p.media : [{ src: p.cover, caption: p.title }];
    const images = media.map((m, i) => ({ m, i })).filter(x => kindOf(x.m.src) === "image");
    Viewer($("#project-viewer"), media, {
      label: "Media",
      placeholder: (item, i) => item.kind === "video"
        ? motionCanvas(`${p.id}-${i}`, (p.hue ?? 200) + i * 25)
        : coverCanvas(`${p.id}-${i}`, (p.hue ?? 200) + i * 25, "Image coming soon"),
      zoom: i => {
        const list = images.map(x => ({
          render: () => h("img", { src: x.m.src, alt: x.m.alt ?? x.m.caption ?? "" }),
          kicker: p.title, title: x.m.caption ?? "", note: ""
        }));
        openLightbox(list, Math.max(0, images.findIndex(x => x.i === i)));
      }
    });

    const k = D.projects.indexOf(p);
    const prevP = D.projects[(k - 1 + D.projects.length) % D.projects.length];
    const nextP = D.projects[(k + 1) % D.projects.length];
    $("#project-pager").replaceChildren(
      h("a", { class: "pager-link", href: `#projects/${prevP.id}`, "data-goto": `projects/${prevP.id}`, "data-nav": true },
        h("small", { text: "← Previous project" }), h("strong", { text: prevP.title })),
      h("a", { class: "pager-link next", href: `#projects/${nextP.id}`, "data-goto": `projects/${nextP.id}`, "data-nav": true },
        h("small", { text: "Next project →" }), h("strong", { text: nextP.title })));
  }

  /* ================= Motion ================= */
  const MOTION = D.motion ?? { reel: [] };
  if (MOTION.reel.length) {
    Viewer($("#motion-viewer"), MOTION.reel.map(r => ({ ...r, src: r.video, caption: r.title, kind: "video" })), {
      label: "Video",
      placeholder: (item, i, big) => motionCanvas(item.title, item.hue, big),
      thumbText: item => h("span", { class: "viewer-thumb-text" },
        h("strong", { text: item.title }),
        h("small", { text: [item.context, item.award].filter(Boolean).join(" · ") })),
      onChange: item => {
        $("#reel-kicker").textContent = [item.context, item.year].filter(Boolean).join(" · ");
        $("#reel-title").textContent = item.title;
        const award = $("#reel-award");
        award.textContent = item.award ? `✦ ${item.award}` : "";
        award.hidden = !item.award;
        $("#reel-desc").textContent = item.description ?? "";
        $("#reel-tools").replaceChildren(...(item.tools ?? []).map(t => h("li", { text: t })));
      }
    });
  }

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

  /* ================= About ================= */
  $("#avatar-initials").textContent = initials;
  $("#about-name").textContent = D.name;
  $("#about-class").textContent = D.about.class;
  $("#about-stats").append(...D.about.stats.map(s => h("div", {}, h("dt", { text: s.label }), h("dd", { text: s.value }))));
  $("#about-bio").append(...D.about.bio.map(t => h("p", { text: t })));
  $("#about-traits").append(...D.about.traits.map(t => h("li", { text: t })));
  $(".bio").append(h("div", { class: "contact-actions", style: "margin-top:28px" },
    h("a", { class: "btn primary", href: "#projects", "data-nav": true, "data-goto": "projects", text: "View projects" }),
    D.cv ? h("a", { class: "btn", href: "#cv", "data-nav": true, "data-goto": "cv", text: "Read my CV" }) : null,
    h("a", { class: "btn", href: "#contact", "data-nav": true, "data-goto": "contact", text: "Get in touch" })));

  /* ================= Skills ================= */
  const rank = lv => lv >= 90 ? "Master" : lv >= 75 ? "Expert" : lv >= 60 ? "Adept" : "Apprentice";
  function showSkill(g, s) {
    $("#skill-group-name").textContent = g.group;
    $("#skill-name").textContent = s.name;
    $("#skill-level-fill").style.width = `${s.level}%`;
    $("#skill-level-label").textContent = `Level ${Math.round(s.level / 10)} of 10 · ${rank(s.level)}`;
    $("#skill-note").textContent = s.note;
  }
  $("#skill-groups").append(...D.skills.map(g =>
    h("div", { class: "skill-group" },
      h("h3", { text: g.group }),
      h("div", { class: "skill-row" }, ...g.items.map(s => {
        const pips = h("span", { class: "pips", "aria-hidden": "true" });
        for (let i = 0; i < 10; i++) pips.append(h("i", { class: i < Math.round(s.level / 10) ? "on" : "" }));
        const btn = h("button", { class: "skill", "data-nav": true, "aria-label": `${s.name}: ${rank(s.level)}. Show details.` },
          h("span", { text: s.name }), pips);
        btn.addEventListener("navselect", () => showSkill(g, s));
        btn.addEventListener("click", () => showSkill(g, s));
        return btn;
      })))));
  if (D.skills[0]?.items[0]) showSkill(D.skills[0], D.skills[0].items[0]);

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
    overlay = null;
    frame.inert = false;
    modalOpen = false;
    Sound.back();
    if (overlayReturn?.isConnected) { overlayReturn.focus({ preventScroll: true }); select(overlayReturn, { silent: true, focus: false }); }
    updatePrompts();
  }

  /* ================= Routing ================= */
  const SCREENS = ["title", "menu", "projects", "project", "motion", "illustration", "about", "skills", "cv", "contact"];
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

    for (const s of $$(".screen")) {
      const on = s.dataset.screen === id;
      s.classList.toggle("active", on);
      s.inert = !on;
      if (on) s.scrollTop = 0;
    }
    document.body.dataset.screen = id;
    current = id;
    currentRoute = route;
    if (id === "about") countUpStats();
    if (id === "title") Playground.wake();

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
      c.fillStyle = "#f5f2ec";
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
          grad.addColorStop(0, `rgba(${r},${g},${bl},${b.a})`);
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

  // --- Home playground: stickers you can drag, throw and bump (simple 2D physics) ---
  const Playground = (() => {
    const box = $("#playground");
    if (!box) return { wake() {} };
    const MONSTER = '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M17 24 12 5l14 12zM47 24l5-19-14 12z" fill="#7c6cf0"/><circle cx="32" cy="37" r="23" fill="#7c6cf0"/><g class="eye"><circle cx="32" cy="33" r="9" fill="#fff"/><circle cx="34" cy="34" r="4.5" fill="#1c1917"/></g><path d="M24 47q8 7 16 0" stroke="#1c1917" stroke-width="3" fill="none" stroke-linecap="round"/></svg>';
    const STICKERS = [
      { cls: "st-hire", html: "Hire me ✦", tap: () => go("contact") },
      { cls: "st-monster", html: MONSTER, tap: () => go("illustration") },
      { cls: "st-play", html: '<span class="pl"></span>', tap: () => go("motion") },
      { cls: "st-toggle", html: '<span class="tg"><i></i></span>', tap: el => { const on = el.classList.toggle("on"); Sound.tone(on ? 880 : 520, 0.12, "sine", 0.05, on ? 1100 : 400); } },
      { cls: "st-code", html: "<b>{ }</b><small>C#</small>", tap: () => go("projects") },
      { cls: "st-logo", html: '<img src="assets/logo.png" alt="" draggable="false">', tap: (el, b) => { b.va += 28; Sound.select(); } },
      { cls: "st-star", html: "<b>✦</b><small>2× scholar</small>", tap: el => { const r = el.getBoundingClientRect(); FX.burst(r.left + r.width / 2, r.top + r.height / 2, 40, { power: 8 }); Sound.start(); } },
      { cls: "st-aa", html: "Aa", tap: el => { el.classList.toggle("bold"); Sound.tone(660, 0.08, "sine", 0.04); } }
    ];

    const bodies = STICKERS.map((s, i) => {
      const el = h("div", { class: `sticker ${s.cls}` });
      el.innerHTML = s.html;
      box.append(el);
      return { el, s, i, x: 0, y: 0, vx: 0, vy: 0, a: (Math.random() - 0.5) * 30, va: 0, w: 0, h: 0, r: 0, drag: null, lastHit: 0 };
    });

    let W = 0, H = 0, running = false, placed = false, last = 0;
    function measure() {
      W = box.clientWidth; H = box.clientHeight;
      for (const b of bodies) { b.w = b.el.offsetWidth; b.h = b.el.offsetHeight; b.r = (b.w + b.h) / 4; }
    }
    function place() {
      measure();
      if (!W) return;
      const cols = Math.max(2, Math.round(Math.sqrt(bodies.length * (W / Math.max(H, 1)))));
      const rows = Math.ceil(bodies.length / cols);
      bodies.forEach((b, i) => {
        if (reduceMotion) {
          // A still, tidy grid — nothing falls.
          const c = i % cols, r = Math.floor(i / cols);
          b.x = (c + 0.5) * (W / cols); b.y = (r + 0.5) * (H / rows); b.a = 0;
        } else {
          b.x = b.w / 2 + Math.random() * (W - b.w); b.y = -b.h - i * 70; b.vx = (Math.random() - 0.5) * 4;
        }
      });
      placed = true;
      render();
    }
    function render() {
      for (const b of bodies) b.el.style.transform = `translate(${(b.x - b.w / 2).toFixed(1)}px, ${(b.y - b.h / 2).toFixed(1)}px) rotate(${b.a.toFixed(1)}deg)`;
    }
    function bump(b, speed) {
      const now = performance.now();
      if (speed < 5 || now - b.lastHit < 120) return;
      b.lastHit = now;
      Sound.tone(220 + b.i * 55, 0.06, "sine", Math.min(0.035, speed * 0.003));
    }
    function step(dt) {
      const g = 0.55 * dt, e = 0.5;
      for (const b of bodies) {
        if (b.drag) continue;
        b.vy += g;
        b.vx *= Math.pow(0.992, dt); b.vy *= Math.pow(0.992, dt);
        b.x += b.vx * dt; b.y += b.vy * dt;
        b.a += b.va * dt; b.va *= Math.pow(0.9, dt);
        const hw = b.w / 2, hh = b.h / 2;
        if (b.x < hw) { b.x = hw; bump(b, Math.abs(b.vx)); b.vx = Math.abs(b.vx) * e; b.va += b.vy * 0.2; }
        if (b.x > W - hw) { b.x = W - hw; bump(b, Math.abs(b.vx)); b.vx = -Math.abs(b.vx) * e; b.va -= b.vy * 0.2; }
        if (b.y > H - hh) {
          b.y = H - hh; bump(b, Math.abs(b.vy));
          b.vy = -Math.abs(b.vy) * e; if (Math.abs(b.vy) < 1) b.vy = 0;
          b.vx *= Math.pow(0.88, dt);           // floor friction
          b.va += (b.vx * 0.5 - b.va) * 0.3;     // roll along the floor
        }
        // Anything moving slowly eases back upright (on the floor or resting on another sticker).
        if (Math.hypot(b.vx, b.vy) < 1.5) { b.a += (Math.round(b.a / 360) * 360 - b.a) * 0.06 * dt; b.va *= 0.8; }
        if (b.y < -H) b.y = -H;
      }
      // Box collisions between stickers (they settle upright, so boxes fit well).
      for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
        const A = bodies[i], B = bodies[j];
        const dx = B.x - A.x, dy = B.y - A.y;
        const ox = (A.w + B.w) / 2 * 0.96 - Math.abs(dx), oy = (A.h + B.h) / 2 * 0.96 - Math.abs(dy);
        if (ox <= 0 || oy <= 0) continue;
        const alongX = ox < oy;
        const nx = alongX ? Math.sign(dx) || 1 : 0, ny = alongX ? 0 : Math.sign(dy) || 1;
        const push = (alongX ? ox : oy) / 2;
        const aFixed = !!A.drag, bFixed = !!B.drag;
        if (!aFixed) { A.x -= nx * push * (bFixed ? 2 : 1); A.y -= ny * push * (bFixed ? 2 : 1); }
        if (!bFixed) { B.x += nx * push * (aFixed ? 2 : 1); B.y += ny * push * (aFixed ? 2 : 1); }
        const rel = (B.vx - A.vx) * nx + (B.vy - A.vy) * ny;
        if (rel < 0) {
          const imp = -(1 + e) * rel / 2;
          if (!aFixed) { A.vx -= imp * nx; A.vy -= imp * ny; A.va -= imp * 0.25; }
          if (!bFixed) { B.vx += imp * nx; B.vy += imp * ny; B.va += imp * 0.25; }
          bump(A, -rel);
        }
      }
    }
    function loop(t) {
      if (current !== "title" || document.hidden) { running = false; return; }
      const dt = Math.min(2.5, last ? (t - last) / 16.67 : 1);
      last = t;
      step(dt);
      render();
      requestAnimationFrame(loop);
    }
    function wake() {
      if (!placed) place();
      if (running || reduceMotion) return;
      running = true; last = 0;
      requestAnimationFrame(loop);
    }
    document.addEventListener("visibilitychange", () => { if (!document.hidden && current === "title") wake(); });

    // Dragging & throwing
    const local = e => { const r = box.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    bodies.forEach(b => {
      b.el.addEventListener("pointerdown", e => {
        e.preventDefault();
        b.el.setPointerCapture(e.pointerId);
        const [px, py] = local(e), now = performance.now();
        b.drag = { ox: px - b.x, oy: py - b.y, sx: px, sy: py, t0: now, lx: px, ly: py, lt: now, vx: 0, vy: 0, moved: false };
        b.vx = b.vy = 0;
        b.el.classList.add("grabbed");
        Sound.init();
        wake();
      });
      b.el.addEventListener("pointermove", e => {
        const d = b.drag; if (!d) return;
        const [px, py] = local(e), now = performance.now(), dt = Math.max(1, now - d.lt) / 16.67;
        d.vx = d.vx * 0.5 + ((px - d.lx) / dt) * 0.5; d.vy = d.vy * 0.5 + ((py - d.ly) / dt) * 0.5;
        d.lx = px; d.ly = py; d.lt = now;
        if (Math.hypot(px - d.sx, py - d.sy) > 6) d.moved = true;
        b.x = Math.max(b.w / 2, Math.min(W - b.w / 2, px - d.ox));
        b.y = Math.max(b.h / 2, Math.min(H - b.h / 2, py - d.oy));
        b.a += (d.vx * 1.2 - b.a) * 0.15; // lean in the direction of travel
        if (reduceMotion) render();
      });
      const end = () => {
        const d = b.drag; if (!d) return;
        b.drag = null;
        b.el.classList.remove("grabbed");
        if (!d.moved && performance.now() - d.t0 < 350) {
          b.el.classList.remove("tapped"); void b.el.offsetWidth; b.el.classList.add("tapped");
          b.s.tap(b.el, b);
        } else if (!reduceMotion) {
          const cap = 38;
          b.vx = Math.max(-cap, Math.min(cap, d.vx)); b.vy = Math.max(-cap, Math.min(cap, d.vy));
          b.va = b.vx * 0.8;
        }
      };
      b.el.addEventListener("pointerup", end);
      b.el.addEventListener("pointercancel", end);
    });

    // Moving the cursor quickly through a sticker gives it a nudge.
    let pl = null;
    box.addEventListener("pointermove", e => {
      if (e.pointerType !== "mouse" || reduceMotion || bodies.some(b => b.drag)) return;
      const [px, py] = local(e), now = performance.now();
      if (pl) {
        const dt = Math.max(1, now - pl.t) / 16.67, vx = (px - pl.x) / dt, vy = (py - pl.y) / dt;
        if (Math.hypot(vx, vy) > 2) for (const b of bodies) {
          if (Math.hypot(px - b.x, py - b.y) < b.r + 6) { b.vx += vx * 0.25; b.vy += vy * 0.25 - 1.5; b.va += vx * 0.4; wake(); }
        }
      }
      pl = { x: px, y: py, t: now };
    });
    box.addEventListener("pointerleave", () => { pl = null; });

    addEventListener("resize", () => {
      if (!placed) return;
      measure();
      for (const b of bodies) { b.x = Math.max(b.w / 2, Math.min(W - b.w / 2, b.x)); b.y = Math.min(H - b.h / 2, b.y); }
      render(); wake();
    });
    // Fonts change sticker sizes once they load.
    document.fonts?.ready.then(() => { if (placed) { measure(); render(); } });
    return { wake };
  })();

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

  // --- About: stats count up on every visit ---
  function countUpStats() {
    $$("#about-stats dd").forEach((dd, i) => {
      const final = dd.dataset.final ??= dd.textContent;
      const m = final.match(/^([\d,]+)(.*)$/);
      if (!m || reduceMotion) return;
      const target = parseInt(m[1].replace(/,/g, ""), 10);
      const fmt = n => (m[1].includes(",") ? n.toLocaleString("en-US") : String(n)) + m[2];
      const t0 = performance.now() + i * 90, dur = 1100;
      dd.textContent = fmt(0);
      const step = now => {
        const k = Math.min(1, Math.max(0, (now - t0) / dur));
        dd.textContent = fmt(Math.round(target * (1 - Math.pow(1 - k, 4))));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  // --- About: pokeable avatar ---
  const avatar = $("#avatar");
  const POKES = ["Hi there!", "Hey, that tickles", "Okay, okay…", "Still here?", "You're persistent", "Fine. One more.", "…", "Seriously?", "Alright, you win"];
  let pokes = 0;
  avatar.addEventListener("click", () => {
    avatar.classList.remove("poked");
    void avatar.offsetWidth;
    avatar.classList.add("poked");
    const r = avatar.getBoundingClientRect();
    FX.burst(r.left + r.width / 2, r.top + r.height / 2, 18 + pokes * 4, { power: 6 + pokes, spread: 1 });
    Sound.tone(SCALE[pokes % SCALE.length], 0.2, "sine", 0.05, SCALE[pokes % SCALE.length] * 1.5);
    showToast(POKES[Math.min(pokes, POKES.length - 1)]);
    pokes++;
    if (pokes === POKES.length) setParty(true, "You unlocked party mode 🎉");
  });

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

  // --- Sparkles when clicking empty space ---
  document.addEventListener("pointerdown", e => {
    if (modalOpen || e.target.closest("a, button, video, iframe, .panel, .level, .skill, .tab-row, .topbar, .viewer, .playground")) return;
    FX.burst(e.clientX, e.clientY, 16, { power: 5, size: 5, gravity: 0.12, decay: 0.025, shape: "dot" });
  });

  /* ================= Boot ================= */
  setFilter("all");
  go(location.hash.slice(1) || "title", { push: false });
  booted = true;
})();
