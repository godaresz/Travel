/* =========================================================
 * Bangsaen Trip 2026 — เอฟเฟกต์แอนิเมชันของหน้าเว็บ
 * (intro, ตัวอักษรหัวเรื่อง, parallax, แถบความคืบหน้า, การ์ดเอียง 3D, ปู)
 * ========================================================= */
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  // ---------- Intro: ม่านคลื่นเปิดหน้าเว็บ ----------
  function intro() {
    const el = document.getElementById("intro");
    if (!el) return;
    if (reduce) { el.remove(); document.body.classList.add("ready"); return; }
    const done = () => {
      if (el.classList.contains("out")) return;
      el.classList.add("out");
      document.body.classList.add("ready");
      setTimeout(() => el.remove(), 1100);
    };
    // เปิดม่านหลังโหลดเสร็จ (อย่างน้อย 1.2 วินาที ไม่เกิน 2.5 วินาที)
    const start = performance.now();
    const go = () => setTimeout(done, Math.max(0, 1200 - (performance.now() - start)));
    if (document.readyState === "complete") go(); else window.addEventListener("load", go, { once: true });
    setTimeout(done, 2500);
    el.addEventListener("click", done);
  }

  // ---------- หัวเรื่อง "บางแสน": แยกตัวอักษรให้ลอยขึ้นทีละตัว ----------
  function splitTitle() {
    const t1 = document.querySelector(".title .t1");
    if (!t1 || reduce) return;
    const text = t1.textContent.trim();
    const parts = window.Intl && Intl.Segmenter
      ? [...new Intl.Segmenter("th", { granularity: "grapheme" }).segment(text)].map((s) => s.segment)
      : [text];
    t1.textContent = "";
    t1.setAttribute("aria-label", text);
    parts.forEach((ch, i) => {
      const s = document.createElement("span");
      s.className = "ch";
      s.setAttribute("aria-hidden", "true");
      s.style.setProperty("--i", i);
      s.textContent = ch;
      t1.appendChild(s);
    });
  }

  // ---------- Parallax ของท้องฟ้า/ดวงอาทิตย์/เมฆ ----------
  function parallax() {
    if (reduce) return;
    const hero = document.querySelector(".hero");
    const layers = [
      [document.querySelector(".sun"), 0.35],
      [document.querySelector(".c1"), 0.15],
      [document.querySelector(".c3"), 0.25],
      [document.querySelector(".hero-content"), -0.12],
      [document.querySelector(".waves"), -0.06],
    ].filter(([el]) => el);
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      if (y > hero.offsetHeight) return;
      layers.forEach(([el, k]) => el.style.setProperty("--py", `${y * k}px`));
      hero.style.setProperty("--fade", Math.max(0, 1 - y / (hero.offsetHeight * 0.9)));
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  // ---------- แถบความคืบหน้าการเลื่อนหน้า ----------
  function scrollProgress() {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  // ---------- ประกายระยิบระยับบนผิวน้ำ ----------
  function sparkles() {
    if (reduce) return;
    const host = document.querySelector(".hero");
    for (let i = 0; i < 14; i++) {
      const s = document.createElement("span");
      s.className = "sparkle";
      s.style.left = `${Math.random() * 100}%`;
      s.style.bottom = `${40 + Math.random() * 120}px`;
      s.style.animationDelay = `${-Math.random() * 4}s`;
      s.style.animationDuration = `${2.5 + Math.random() * 2.5}s`;
      host.appendChild(s);
    }
  }

  // ---------- ลำดับการปรากฏของการ์ด + เอียง 3D ตามเมาส์ ----------
  function stagger() {
    document.querySelectorAll(".stats .stat, .checklist span").forEach((el, i, all) => {
      el.style.setProperty("--d", `${(i % all.length) * 70}ms`);
    });
  }
  function tilt() {
    if (reduce || !finePointer) return;
    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest?.(".place, .stat");
      document.querySelectorAll(".tilting").forEach((c) => { if (c !== card) { c.classList.remove("tilting"); c.style.removeProperty("--rx"); c.style.removeProperty("--ry"); } });
      if (!card) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.classList.add("tilting");
      card.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
      card.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
      card.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
      card.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
    }, { passive: true });
  }

  // ---------- เอฟเฟกต์ระลอกน้ำเมื่อกดปุ่ม ----------
  function ripples() {
    if (reduce) return;
    document.addEventListener("pointerdown", (e) => {
      const btn = e.target.closest(".btn, .steps button");
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const s = document.createElement("span");
      s.className = "ripple";
      const size = Math.max(r.width, r.height) * 2;
      s.style.width = s.style.height = `${size}px`;
      s.style.left = `${e.clientX - r.left - size / 2}px`;
      s.style.top = `${e.clientY - r.top - size / 2}px`;
      btn.appendChild(s);
      setTimeout(() => s.remove(), 650);
    });
  }

  intro();
  splitTitle();
  document.addEventListener("DOMContentLoaded", () => {
    parallax();
    scrollProgress();
    sparkles();
    stagger();
    tilt();
    ripples();
  });
})();
