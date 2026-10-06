/* =========================================================
 * Bangsaen Trip 2026 — กำหนดการ + แผนที่แอนิเมชัน
 * แก้ไขข้อมูลทริปได้ที่ PLACES และ SCHEDULE ด้านล่าง
 * ========================================================= */

// ---------- สถานที่ (พิกัดโดยประมาณ แก้ไขได้ตามจริง) ----------
const PLACES = {
  ldc: {
    name: "LDC-SR",
    desc: "จุดนัดพบ เช็คชื่อ ขึ้นรถตู้ และจุดส่งกลับ",
    icon: "🏢",
    latlng: [13.6930, 100.6460], // TODO: ใส่พิกัดจริงของ LDC-SR
    query: "13.6930,100.6460",
    art: "linear-gradient(135deg,#ff9f6e,#ff4f7b)",
  },
  aquarium: {
    name: "อควอเลี่ยม บางแสน",
    desc: "สถานแสดงพันธุ์สัตว์น้ำบางแสน สถาบันวิทยาศาสตร์ทางทะเล ม.บูรพา",
    icon: "🐠",
    latlng: [13.2795, 100.9170],
    query: "Bangsaen Aquarium Institute of Marine Science Burapha University",
    art: "linear-gradient(135deg,#12c2b4,#1584c4)",
  },
  beach: {
    name: "หาดบางแสน (โซนหน้า รร.S2)",
    desc: "รับข้าวกล่อง พักผ่อน เล่นน้ำ ตามอัธยาศัย",
    icon: "🏖️",
    latlng: [13.2890, 100.9118],
    query: "S2 Hotel Bangsaen",
    art: "linear-gradient(135deg,#ffd27a,#ff9f6e)",
  },
  roseta: {
    name: "Roseta บางแสน",
    desc: "ร้านอาหารริมทะเล ทานมื้อเย็นร่วมกัน",
    icon: "🍽️",
    latlng: [13.2630, 100.9225],
    query: "Roseta Bangsaen",
    art: "linear-gradient(135deg,#7b5cff,#ff4f7b)",
  },
};

// เส้นทางโดยประมาณ (ใช้เมื่อโหลดเส้นทางถนนจริงจาก OSRM ไม่ได้)
const ROUTES = {
  toBangsaen: [
    PLACES.ldc.latlng, [13.7350, 100.6480], [13.7220, 100.7600], [13.6300, 100.8600],
    [13.5200, 100.9500], [13.4200, 100.9900], [13.3400, 100.9850], [13.3000, 100.9500],
    [13.2850, 100.9250], PLACES.aquarium.latlng,
  ],
  aquaToBeach: [
    PLACES.aquarium.latlng, [13.2810, 100.9135], [13.2860, 100.9121], PLACES.beach.latlng,
  ],
  beachToRoseta: [
    PLACES.beach.latlng, [13.2810, 100.9135], [13.2720, 100.9190], [13.2670, 100.9210], PLACES.roseta.latlng,
  ],
  home: null, // สร้างจาก toBangsaen แบบย้อนกลับ
};
ROUTES.home = [PLACES.roseta.latlng, [13.2720, 100.9190], [13.2810, 100.9135], ...ROUTES.toBangsaen.slice(0, -1).reverse()];

// ---------- กำหนดการ (ข้อความตามตารางต้นฉบับ) ----------
// t0/t1 = นาทีนับจากเที่ยงคืน ใช้สำหรับนาฬิกาในแอนิเมชัน
const SCHEDULE = [
  { time: "08:00น.", dur: "15นาที", title: "รวมตัวเช็คชื่อขึ้นรถตู้ (รับกล่องอาหารว่าง)", place: "LDC-SR", icon: "📋",
    type: "stay", at: "ldc", t0: 480, t1: 495 },
  { time: "08:15น.", dur: "2ชั่วโมง", title: "รถตู้ออกเดินทางไปบางแสน", place: "LDC-SR", icon: "🚐",
    type: "move", route: "toBangsaen", mover: "🚐", t0: 495, t1: 600 },
  { time: "10:00น.", dur: "", title: "ถึงบางแสน", place: "ถึงบางแสน @อควอเลี่ยม", icon: "📍",
    type: "stay", at: "aquarium", t0: 600, t1: 600 },
  { time: "10:00น.-12:30น.", dur: "2ชั่วโมงครึ่ง", title: "ซื้อบัตร และเข้าเยี่ยมชมอควอเลี่ยม", place: "อควอเลี่ยม", icon: "🐠",
    type: "stay", at: "aquarium", t0: 600, t1: 750 },
  { time: "12:30น.-12:45น.", dur: "15นาที", title: "เดินออกอควอเลี่ยม ไปชายหาดบางแสน", place: "อควอเลี่ยม → โซนหน้ารร.S2บางแสน", icon: "🚶",
    type: "move", route: "aquaToBeach", mover: "🚶", t0: 750, t1: 765 },
  { time: "13:00น.-16:00น.", dur: "2ชั่วโมง", title: "รับ(ข้าวกล่อง) พักผ่อนตามอัธยาศัย", place: "หาดบางแสน โซนหน้ารร.S2บางแสน", icon: "🏖️",
    type: "stay", at: "beach", t0: 765, t1: 960 },
  { time: "16:00น.-16:15น.", dur: "15นาที", title: "เดินทางไปร้านอาหารริมทะเล", place: "หาดบางแสน → Roseta บางแสน", icon: "🛣️",
    type: "move", route: "beachToRoseta", mover: "🚐", t0: 960, t1: 975 },
  { time: "16:00น.-19:00น.", dur: "3ชั่วโมงครึ่ง", title: "รับประทานอาหารเย็นร่วมกัน", place: "Roseta บางแสน", icon: "🍽️",
    type: "stay", at: "roseta", t0: 975, t1: 1140 },
  { time: "19:00น.-21:00น.", dur: "2ชั่วโมง", title: "เดินทางกลับLDC-SR", place: "หาดบางแสน → LDC-SR", icon: "🏠",
    type: "move", route: "home", mover: "🚐", t0: 1140, t1: 1260 },
];

// ระยะเวลาแอนิเมชันของแต่ละประเภท (ms)
const ANIM_MS = { stay: 2600, shortStay: 1400, drive: 8000, walk: 3800 };
const TRIP_START = new Date("2026-10-24T08:00:00+07:00");

// ---------- Utilities ----------
const $ = (s, r = document) => r.querySelector(s);
const pad = (n) => String(n).padStart(2, "0");
const fmtMin = (m) => `${pad(Math.floor(m / 60))}:${pad(Math.floor(m % 60))}`;
const ease = (t) => (t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =========================================================
 * HERO: countdown, bubbles, stats
 * ========================================================= */
function initCountdown() {
  const els = { d: $("#cd-d"), h: $("#cd-h"), m: $("#cd-m"), s: $("#cd-s") };
  const msg = $("#countdown-msg");
  const set = (el, v) => {
    if (el.textContent !== v) { el.textContent = v; el.classList.remove("tick"); void el.offsetWidth; el.classList.add("tick"); }
  };
  const tick = () => {
    let diff = TRIP_START - Date.now();
    if (diff <= 0) {
      ["d", "h", "m", "s"].forEach((k) => set(els[k], "00"));
      const end = new Date("2026-10-24T21:00:00+07:00");
      msg.textContent = Date.now() < end ? "🎉 ทริปกำลังดำเนินอยู่ ขอให้สนุกนะ!" : "💙 ขอบคุณทุกคนสำหรับวันที่แสนสนุก";
      return;
    }
    const s = Math.floor(diff / 1000);
    set(els.d, pad(Math.floor(s / 86400)));
    set(els.h, pad(Math.floor((s % 86400) / 3600)));
    set(els.m, pad(Math.floor((s % 3600) / 60)));
    set(els.s, pad(s % 60));
    msg.textContent = "นับถอยหลังสู่ทะเล 🌊";
  };
  tick();
  setInterval(tick, 1000);
}

function initBubbles() {
  if (reduceMotion) return;
  const host = $("#bubbles");
  for (let i = 0; i < 22; i++) {
    const b = document.createElement("span");
    const size = 6 + Math.random() * 22;
    b.className = "bubble";
    b.style.width = b.style.height = `${size}px`;
    b.style.left = `${Math.random() * 100}%`;
    b.style.animationDuration = `${8 + Math.random() * 10}s`;
    b.style.animationDelay = `${-Math.random() * 18}s`;
    b.style.setProperty("--sway", `${(Math.random() - .5) * 120}px`);
    host.appendChild(b);
  }
}

function countUp(el) {
  const target = +el.dataset.count;
  const start = performance.now();
  const dur = 1200;
  const step = (now) => {
    const t = Math.min(1, (now - start) / dur);
    el.textContent = Math.round(target * ease(t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target.querySelectorAll("[data-count]").forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: .15 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* =========================================================
 * TIMELINE + PLACES
 * ========================================================= */
function liveIndex() {
  const now = new Date();
  const bkk = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));
  if (bkk.getFullYear() !== 2026 || bkk.getMonth() !== 9 || bkk.getDate() !== 24) return -1;
  const m = bkk.getHours() * 60 + bkk.getMinutes();
  for (let i = SCHEDULE.length - 1; i >= 0; i--) if (m >= SCHEDULE[i].t0 && m <= Math.max(SCHEDULE[i].t1, SCHEDULE[i].t0 + 1)) return i;
  return -1;
}

function renderTimeline(onPick) {
  const list = $("#timeline-list");
  const live = liveIndex();
  list.innerHTML = SCHEDULE.map((s, i) => `
    <li class="tl-item reveal" data-i="${i}" style="transition-delay:${(i % 3) * 60}ms">
      <div class="tl-dot">${s.icon}</div>
      <div class="tl-card" tabindex="0" role="button" aria-label="ดู ${s.title} บนแผนที่">
        <div class="tl-time">
          <b>${s.time}</b>
          ${s.dur ? `<span class="chip">⏱ ${s.dur}</span>` : ""}
          ${i === live ? `<span class="chip live">● กำลังดำเนินการ</span>` : ""}
        </div>
        <h3>${s.title}</h3>
        <div class="tl-place">📍 ${s.place}</div>
        <div class="tl-hint">🗺️ คลิกเพื่อดูบนแผนที่</div>
      </div>
    </li>`).join("");
  list.querySelectorAll(".tl-card").forEach((card) => {
    const i = +card.parentElement.dataset.i;
    card.addEventListener("click", () => onPick(i));
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPick(i); } });
  });
}

function renderPlaces(onPick) {
  $("#places-list").innerHTML = Object.entries(PLACES).map(([key, p]) => `
    <article class="place reveal">
      <div class="place-art" style="background:${p.art}"><span class="emoji">${p.icon}</span></div>
      <div class="place-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <a href="#map" data-place="${key}">🗺️ ดูบนแผนที่</a> ·
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.query)}" target="_blank" rel="noopener">Google Maps ↗</a>
      </div>
    </article>`).join("");
  document.querySelectorAll("[data-place]").forEach((a) =>
    a.addEventListener("click", () => {
      const i = SCHEDULE.findIndex((s) => s.at === a.dataset.place);
      if (i >= 0) onPick(i, false);
    }));
}

/* =========================================================
 * MAP + TRIP PLAYER
 * ========================================================= */
class TripPlayer {
  constructor() {
    this.map = L.map("leaflet", { zoomControl: true, scrollWheelZoom: false, attributionControl: true })
      .setView(PLACES.ldc.latlng, 11);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      maxZoom: 19, subdomains: "abcd",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(this.map);
    this.map.on("focus", () => this.map.scrollWheelZoom.enable());
    this.map.on("blur", () => this.map.scrollWheelZoom.disable());

    this.markers = {};
    Object.entries(PLACES).forEach(([key, p]) => {
      const icon = L.divIcon({
        className: "", iconSize: [44, 44], iconAnchor: [22, 44],
        html: `<div class="pin ${key === "ldc" ? "home" : ""}"><span>${p.icon}</span></div>`,
      });
      this.markers[key] = L.marker(p.latlng, { icon, riseOnHover: true })
        .addTo(this.map)
        .bindTooltip(p.name, { permanent: true, direction: "top", offset: [0, -46], className: `place-label lbl-${key}` });
    });
    const syncZoom = () => this.map.getContainer().classList.toggle("far", this.map.getZoom() < 13);
    this.map.on("zoomend", syncZoom);
    syncZoom();

    this.moverIcon = (emoji) => L.divIcon({ className: "", iconSize: [48, 48], iconAnchor: [24, 24], html: `<div class="mover bob">${emoji}</div>` });
    this.mover = L.marker(PLACES.ldc.latlng, { icon: this.moverIcon("🚐"), zIndexOffset: 1000, interactive: false }).addTo(this.map);
    this.moverEmoji = "🚐";

    this.speeds = [1, 2, 4, 0.5];
    this.speedIdx = 0;
    this.playing = false;
    this.pos = 0;
    this.sceneIdx = -1;

    this.buildScenes();
    this.buildSteps();
    this.bindUI();
    this.render(0, true);
    this.loadRoadRoutes();
  }

  // สร้างฉาก (scene) จาก SCHEDULE พร้อมเส้นทาง
  buildScenes() {
    if (this.scenes) this.scenes.forEach((s) => { s.bg && s.bg.remove(); s.trail && s.trail.remove(); });
    let acc = 0;
    this.scenes = SCHEDULE.map((s, i) => {
      const sc = { ...s, i, start: acc };
      if (s.type === "move") {
        const path = ROUTES[s.route];
        sc.path = path;
        sc.cum = [0];
        for (let k = 1; k < path.length; k++) sc.cum.push(sc.cum[k - 1] + this.map.distance(path[k - 1], path[k]));
        sc.len = sc.cum[sc.cum.length - 1];
        sc.ms = sc.len > 5000 ? ANIM_MS.drive : ANIM_MS.walk;
        sc.bg = L.polyline(path, { color: "#1584c4", weight: 5, opacity: .25, dashArray: "2 10", lineCap: "round" }).addTo(this.map);
        sc.trail = L.polyline([], { color: "#ff4f7b", weight: 6, opacity: .9, lineCap: "round", className: "route-trail" }).addTo(this.map);
      } else {
        sc.ms = s.t1 === s.t0 ? ANIM_MS.shortStay : ANIM_MS.stay;
      }
      acc += sc.ms;
      sc.end = acc;
      return sc;
    });
    this.total = acc;
    this.mover && this.mover.setZIndexOffset(1000);
  }

  // พยายามดึงเส้นทางถนนจริงจาก OSRM สำหรับช่วงขับรถ
  async loadRoadRoutes() {
    const fetchRoute = async (pts) => {
      const coords = pts.map(([la, ln]) => `${ln},${la}`).join(";");
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), 7000);
      try {
        const r = await fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`, { signal: ctl.signal });
        const j = await r.json();
        return j.routes[0].geometry.coordinates.map(([ln, la]) => [la, ln]);
      } finally { clearTimeout(t); }
    };
    try {
      const [go, back, toRoseta] = await Promise.all([
        fetchRoute([PLACES.ldc.latlng, PLACES.aquarium.latlng]),
        fetchRoute([PLACES.roseta.latlng, PLACES.ldc.latlng]),
        fetchRoute([PLACES.beach.latlng, PLACES.roseta.latlng]),
      ]);
      ROUTES.toBangsaen = go;
      ROUTES.home = back;
      ROUTES.beachToRoseta = toRoseta;
      this.buildScenes();
      this.sceneIdx = -1;
      this.render(this.pos, true);
    } catch (e) {
      console.info("ใช้เส้นทางโดยประมาณ (โหลดเส้นทางถนนไม่สำเร็จ)", e);
    }
  }

  buildSteps() {
    const host = $("#steps");
    host.innerHTML = SCHEDULE.map((s, i) => `<button title="${s.title}" aria-label="${s.title}" data-i="${i}">${i + 1}</button>`).join("");
    host.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => this.jumpTo(+b.dataset.i)));
  }

  bindUI() {
    this.btnPlay = $("#btn-play");
    this.scrub = $("#scrub");
    this.btnPlay.addEventListener("click", () => (this.playing ? this.pause() : this.play()));
    $("#btn-prev").addEventListener("click", () => this.jumpTo(Math.max(0, this.sceneIdx - (this.localT() > .15 ? 0 : 1))));
    $("#btn-next").addEventListener("click", () => this.jumpTo(Math.min(this.scenes.length - 1, this.sceneIdx + 1)));
    $("#btn-speed").addEventListener("click", (e) => {
      this.speedIdx = (this.speedIdx + 1) % this.speeds.length;
      e.currentTarget.textContent = `${this.speeds[this.speedIdx]}x`;
    });
    this.scrub.addEventListener("input", () => {
      this.pause();
      this.render((this.scrub.value / 1000) * this.total, false, true);
    });
    $("#hero-play").addEventListener("click", () => setTimeout(() => { this.jumpTo(0); this.play(); }, 600));

    // เล่นอัตโนมัติเมื่อเลื่อนมาถึงแผนที่ครั้งแรก
    let autoplayed = false;
    new IntersectionObserver((es) => {
      if (es[0].isIntersecting && !autoplayed && !reduceMotion) { autoplayed = true; this.map.invalidateSize(); this.play(); }
    }, { threshold: .5 }).observe($("#leaflet"));
  }

  localT() {
    const sc = this.scenes[this.sceneIdx];
    return sc ? (this.pos - sc.start) / sc.ms : 0;
  }

  play() {
    if (this.pos >= this.total - 1) this.pos = 0;
    this.playing = true;
    this.btnPlay.textContent = "❚❚ หยุด";
    this.last = performance.now();
    const loop = (now) => {
      if (!this.playing) return;
      const dt = Math.min(64, now - this.last);
      this.last = now;
      this.render(Math.min(this.total, this.pos + dt * this.speeds[this.speedIdx]));
      if (this.pos >= this.total) { this.pause(); this.btnPlay.textContent = "↻ เล่นอีกครั้ง"; return; }
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  pause() {
    this.playing = false;
    cancelAnimationFrame(this.raf);
    this.btnPlay.textContent = "▶ เล่น";
  }

  jumpTo(i, autoplay = true) {
    this.sceneIdx = -1;
    this.render(this.scenes[i].start);
    if (autoplay && !this.playing) this.play();
  }

  pointAlong(sc, u) {
    const d = u * sc.len;
    let k = 1;
    while (k < sc.cum.length - 1 && sc.cum[k] < d) k++;
    const seg = sc.cum[k] - sc.cum[k - 1] || 1;
    const f = Math.max(0, Math.min(1, (d - sc.cum[k - 1]) / seg));
    const a = sc.path[k - 1], b = sc.path[k];
    return { pt: [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f], k };
  }

  camera(sc, instant) {
    const opts = { animate: !instant && !reduceMotion, duration: 1.2 };
    if (sc.type === "move") {
      const b = L.latLngBounds(sc.path).pad(.25);
      instant ? this.map.fitBounds(b, { animate: false }) : this.map.flyToBounds(b, opts);
    } else {
      const ll = PLACES[sc.at].latlng;
      const z = sc.at === "ldc" ? 14 : 16;
      instant ? this.map.setView(ll, z, { animate: false }) : this.map.flyTo(ll, z, opts);
    }
  }

  render(pos, instantCam = false, scrubbing = false) {
    this.pos = pos;
    let idx = this.scenes.findIndex((s) => pos < s.end);
    if (idx < 0) idx = this.scenes.length - 1;
    const sc = this.scenes[idx];
    const u = Math.max(0, Math.min(1, (pos - sc.start) / sc.ms));

    // เส้นทางที่ผ่านมาแล้ว
    this.scenes.forEach((s, j) => {
      if (s.type !== "move") return;
      if (j < idx) s.trail.setLatLngs(s.path);
      else if (j > idx) s.trail.setLatLngs([]);
    });

    let here;
    if (sc.type === "move") {
      const { pt, k } = this.pointAlong(sc, ease(u));
      here = pt;
      sc.trail.setLatLngs([...sc.path.slice(0, k), pt]);
      if (this.moverEmoji !== sc.mover) { this.moverEmoji = sc.mover; this.mover.setIcon(this.moverIcon(sc.mover)); }
    } else {
      here = PLACES[sc.at].latlng;
    }
    this.mover.setLatLng(here);
    this.mover.setOpacity(sc.type === "move" ? 1 : 0);

    // นาฬิกา
    $("#clock").textContent = fmtMin(sc.t0 + (sc.t1 - sc.t0) * u);
    this.scrub.value = Math.round((pos / this.total) * 1000);

    if (idx !== this.sceneIdx) {
      this.sceneIdx = idx;
      this.onScene(sc, instantCam || scrubbing);
    }
  }

  onScene(sc, instant) {
    this.camera(sc, instant);
    const card = $("#now-card");
    card.classList.remove("swap"); void card.offsetWidth; card.classList.add("swap");
    $("#now-icon").textContent = sc.icon;
    $("#now-time").textContent = `${sc.time}${sc.dur ? " · " + sc.dur : ""}`;
    $("#now-title").textContent = sc.title;
    $("#now-place").textContent = `📍 ${sc.place}`;

    Object.values(this.markers).forEach((m) => m.getElement()?.querySelector(".pin")?.classList.remove("active"));
    const activeKey = sc.type === "stay" ? sc.at : null;
    if (activeKey) this.markers[activeKey].getElement()?.querySelector(".pin")?.classList.add("active");

    document.querySelectorAll("#steps button").forEach((b, j) => {
      b.classList.toggle("active", j === sc.i);
      b.classList.toggle("done", j < sc.i);
    });
    document.querySelectorAll(".tl-item").forEach((li, j) => li.classList.toggle("active", j === sc.i));
  }
}

/* =========================================================
 * BOOT
 * ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initCountdown();
  initBubbles();

  let player = null;
  try { player = new TripPlayer(); } catch (e) {
    console.error(e);
    $("#leaflet").innerHTML = '<p style="padding:24px">ไม่สามารถโหลดแผนที่ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต</p>';
  }
  const pick = (i, autoplay = true) => {
    $("#map").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    if (player) player.jumpTo(i, autoplay);
  };
  renderTimeline(pick);
  renderPlaces(pick);
  initReveal();
});
