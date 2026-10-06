/* =========================================================
 * Bangsaen Trip 2026 — กำหนดการ + แผนที่แอนิเมชัน
 * แก้ไขข้อมูลทริปได้ที่ PLACES และ SCHEDULE ด้านล่าง
 * ========================================================= */

// ---------- สถานที่ (พิกัดโดยประมาณ แก้ไขได้ตามจริง) ----------
const PLACES = {
  ldc: {
    image: "images/ldc.svg", // ภาพประกอบ — เปลี่ยนเป็นรูปถ่ายจริงได้ เช่น "images/ldc.jpg"
    name: "LINEX (LDC-SR)",
    desc: "จุดนัดพบ เช็คชื่อ ขึ้นรถตู้ และจุดส่งกลับ",
    url: "https://maps.app.goo.gl/37bQbR1dCGTD195VA",
    icon: "🏢",
    latlng: [13.646200, 100.576179],
    query: "13.646200,100.576179",
    art: "linear-gradient(135deg,#ff9f6e,#ff4f7b)",
  },
  aquarium: {
    image: "images/aquarium.jpg", // ภาพนิ่ง (ใช้เป็น poster ของวิดีโอด้วย)
    video: "images/aquarium.mp4", // วิดีโอจริงจากอควอเลี่ยม
    name: "อควอเลี่ยม บางแสน",
    desc: "สถานแสดงพันธุ์สัตว์น้ำบางแสน สถาบันวิทยาศาสตร์ทางทะเล ม.บูรพา",
    icon: "🐠",
    latlng: [13.2795, 100.9170],
    query: "Bangsaen Aquarium Institute of Marine Science Burapha University",
    art: "linear-gradient(135deg,#12c2b4,#1584c4)",
  },
  beach: {
    image: "images/beach.jpg",
    video: "images/beach.mp4", // คลิปพระอาทิตย์ตกบางแสน
    name: "หาดบางแสน (โซนหน้า รร.S2)",
    desc: "รับข้าวกล่อง พักผ่อน เล่นน้ำ ตามอัธยาศัย",
    icon: "🏖️",
    latlng: [13.2890, 100.9118],
    query: "S2 Hotel Bangsaen",
    art: "linear-gradient(135deg,#ffd27a,#ff9f6e)",
  },
  roseta: {
    image: "images/rosetta.jpg",
    video: "images/rosetta.mp4", // คลิปเต็มจาก TikTok @uncleprettyplease_
    credit: { label: "@uncleprettyplease_", url: "https://www.tiktok.com/@uncleprettyplease_" },
    name: "Rosetta Beach Club",
    desc: "ร้านอาหารริมทะเล ถ.บางแสนล่าง ทานมื้อเย็นร่วมกัน · ร้านอาหารเปิด 11:00–22:00 น. · โทร 098-951-6196",
    icon: "🍽️",
    latlng: [13.2630, 100.9225], // พิกัดโดยประมาณ (ถ.บางแสนล่าง ฝั่งหาดวอนนภา)
    query: "Rosetta Beach Club Bangsaen",
    art: "linear-gradient(135deg,#7b5cff,#ff4f7b)",
  },
};

// เส้นทางโดยประมาณ (ใช้เมื่อโหลดเส้นทางถนนจริงจาก OSRM ไม่ได้)
const ROUTES = {
  toBangsaen: [
    PLACES.ldc.latlng, [13.6660, 100.6040], [13.6560, 100.6800], [13.6150, 100.7550], [13.5600, 100.8500],
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
  { time: "16:00น.-16:15น.", dur: "15นาที", title: "เดินทางไปร้านอาหารริมทะเล", place: "หาดบางแสน → Rosetta Beach Club", icon: "🛣️",
    type: "move", route: "beachToRoseta", mover: "🚐", t0: 960, t1: 975 },
  { time: "16:00น.-19:00น.", dur: "3ชั่วโมงครึ่ง", title: "รับประทานอาหารเย็นร่วมกัน", place: "Rosetta Beach Club", icon: "🍽️",
    type: "stay", at: "roseta", t0: 975, t1: 1140 },
  { time: "19:00น.-21:00น.", dur: "2ชั่วโมง", title: "เดินทางกลับLDC-SR", place: "หาดบางแสน → LDC-SR", icon: "🏠",
    type: "move", route: "home", mover: "🚐", t0: 1140, t1: 1260 },
];

// สถานที่ที่ใช้แสดงภาพของแต่ละกิจกรรม
["ldc", "ldc", "aquarium", "aquarium", "beach", "beach", "roseta", "roseta", "ldc"].forEach((k, i) => (SCHEDULE[i].pl = k));
const imgOf = (key) => PLACES[key].image;
// แสดงวิดีโอถ้าสถานที่นั้นมี ไม่งั้นแสดงรูป
// วิดีโอโหลดและเล่นเฉพาะตอนอยู่บนจอ (ประหยัดเน็ตมือถือ) ปิดเสียงเป็นค่าเริ่มต้น กดปุ่ม 🔇 เพื่อเปิดเสียง
const mediaHTML = (p) => p.video
  ? `<video class="lazy-video" data-src="${p.video}" poster="${p.image}" muted loop playsinline preload="none" aria-label="${p.name}"></video>
     <button class="mute-btn" type="button" aria-label="เปิดเสียง">🔇</button>`
  : `<img src="${p.image}" alt="${p.name}" loading="lazy" />`;

// ระยะเวลาแอนิเมชันของแต่ละประเภท (ms)
const ANIM_MS = { stay: 2600, shortStay: 1400, drive: 8000, walk: 3800 };
// ภาพแผนที่: ถ้าใส่ CARTO basemap key (https://carto.com/basemaps/apikey) จะใช้สไตล์ CARTO Voyager
// ถ้าเว้นว่างจะใช้ OpenStreetMap ซึ่งไม่ต้องใช้ key
const CARTO_KEY = "";
const TRIP_START = new Date("2026-10-24T08:00:00+07:00");

// ---------- Utilities ----------
const onVideoVisibility = (entries) => {
  entries.forEach(({ target: v, isIntersecting }) => {
    v.dataset.visible = isIntersecting ? "1" : "";
    if (isIntersecting) {
      if (!v.getAttribute("src") && v.dataset.src) v.src = v.dataset.src;
      if (v.getAttribute("src") && !v.dataset.hold) (v.id === "now-video" ? playPlayerVideo(v) : v.play().catch(() => {}));
    } else {
      v.pause();
    }
  });
};
const videoIO = new IntersectionObserver(onVideoVisibility, { threshold: .5 });
// วิดีโอในแผงแผนที่: เล่นต่อตราบใดที่ยังเห็นบางส่วนบนจอ (กันแอนิเมชันค้างตอนเลื่อนหน้าเล็กน้อย)
const playerVideoIO = new IntersectionObserver(onVideoVisibility, { threshold: .15 });
// เช็กตรง ๆ ว่าวิดีโออยู่บนจออย่างน้อย 15% (ไม่ต้องรอ IntersectionObserver)
function onScreen(el) {
  const r = el.getBoundingClientRect();
  if (!r.height) return false;
  const visible = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
  return visible / r.height >= .15;
}
function observeVideos(root = document) {
  root.querySelectorAll("video.lazy-video").forEach((v) => (v.id === "now-video" ? playerVideoIO : videoIO).observe(v));
}
function setMuteIcon(btn, muted) {
  btn.textContent = muted ? "🔇" : "🔊";
  btn.setAttribute("aria-label", muted ? "เปิดเสียง" : "ปิดเสียง");
}
// เปิดเสียงได้ทีละคลิป
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".mute-btn");
  if (!btn) return;
  e.stopPropagation();
  e.preventDefault();
  const v = btn.parentElement.querySelector("video");
  const unmute = v.muted;
  document.querySelectorAll("video").forEach((o) => { o.muted = true; });
  document.querySelectorAll(".mute-btn").forEach((b) => setMuteIcon(b, true));
  if (unmute) {
    if (!v.getAttribute("src") && v.dataset.src) v.src = v.dataset.src;
    v.muted = false;
    v.play().catch(() => {});
  }
  setMuteIcon(btn, !unmute);
  btn.classList.remove("need-tap");
  // จำค่าเสียงของแผงแผนที่ (ค่าเริ่มต้น = เปิดเสียง) ให้คลิปสถานที่ถัดไปใช้ค่าเดียวกัน
  if (btn.closest(".now-photo")) $(".now-photo").dataset.sound = unmute ? "1" : "0";
}, true);

// แผงแผนที่เล่นพร้อมเสียงอัตโนมัติ ถ้าเบราว์เซอร์ยังไม่อนุญาต (ผู้ใช้ยังไม่เคยแตะหน้าเว็บ)
// จะเล่นแบบปิดเสียงไปก่อน แล้วเปิดเสียงทันทีที่ผู้ใช้แตะตรงไหนก็ได้
function playerSoundOn() { return document.querySelector(".now-photo").dataset.sound !== "0"; }
function playPlayerVideo(v) {
  const btn = document.querySelector(".now-photo .mute-btn");
  v.muted = !playerSoundOn();
  v.play().then(() => {
    if (!btn.classList.contains("need-tap")) setMuteIcon(btn, v.muted);
  }).catch((err) => {
    if (err.name !== "NotAllowedError" || v.muted) return;
    v.muted = true;
    v.play().catch(() => {});
    btn.classList.add("need-tap");
    btn.textContent = "🔇 แตะเพื่อเปิดเสียง";
  });
}
["click", "touchend", "keydown"].forEach((type) => document.addEventListener(type, (e) => {
  const btn = document.querySelector(".now-photo .mute-btn");
  if (!btn || !btn.classList.contains("need-tap") || e.target.closest?.(".mute-btn")) return;
  const v = document.querySelector("#now-video");
  btn.classList.remove("need-tap");
  if (!playerSoundOn()) { setMuteIcon(btn, true); return; }
  v.muted = false;
  setMuteIcon(btn, false);
}, true));

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
 * PLACES
 * ========================================================= */
function renderPlaces(onPick) {
  $("#places-list").innerHTML = Object.entries(PLACES).map(([key, p]) => `
    <article class="place reveal${p.video ? " has-video" : ""}">
      <div class="place-art" style="background:${p.art}">
        ${mediaHTML(p)}
        <span class="emoji">${p.icon}</span>
        ${p.video ? '<span class="badge">🎬 วิดีโอจริง</span>' : ""}
        ${p.credit ? `<a class="credit" href="${p.credit.url}" target="_blank" rel="noopener">🎵 ${p.credit.label}</a>` : ""}
      </div>
      <div class="place-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <a href="#map" data-place="${key}">🗺️ ดูบนแผนที่</a> ·
        <a href="${p.url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.query)}`}" target="_blank" rel="noopener">Google Maps ↗</a>
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
    // บนมือถือ ใช้สองนิ้วเลื่อน/ซูมแผนที่ เพื่อให้นิ้วเดียวเลื่อนหน้าเว็บได้ตามปกติ
    const touch = window.matchMedia("(pointer: coarse)").matches;
    this.map = L.map("leaflet", { zoomControl: true, scrollWheelZoom: false, attributionControl: true, dragging: !touch, tap: false })
      .setView(PLACES.ldc.latlng, 11);
    const osmAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tiles = CARTO_KEY
      ? { url: `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_KEY}`, attribution: `${osmAttr} &copy; <a href="https://carto.com/">CARTO</a>` }
      : { url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: osmAttr };
    L.tileLayer(tiles.url, { maxZoom: 19, attribution: tiles.attribution }).addTo(this.map);
    this.map.on("focus", () => this.map.scrollWheelZoom.enable());
    this.map.on("blur", () => this.map.scrollWheelZoom.disable());

    this.markers = {};
    Object.entries(PLACES).forEach(([key, p], n) => {
      const icon = L.divIcon({
        className: "", iconSize: [44, 44], iconAnchor: [22, 44],
        html: `<div class="pin-drop" style="--n:${n}"><div class="pin ${key === "ldc" ? "home" : ""}"><span>${p.icon}</span></div></div>`,
      });
      this.markers[key] = L.marker(p.latlng, { icon, riseOnHover: true })
        .addTo(this.map)
        .bindTooltip(p.name, { permanent: true, direction: "top", offset: [0, -46], className: `place-label lbl-${key}` })
        .bindPopup(`<div class="pop"><img src="${p.image}" alt="${p.name}" /><b>${p.name}</b><span>${p.desc}</span></div>`, { maxWidth: 260, minWidth: 240 });
    });
    const syncZoom = () => this.map.getContainer().classList.toggle("far", this.map.getZoom() < 13);
    this.map.on("zoomend", syncZoom);
    syncZoom();

    this.moverIcon = (emoji) => L.divIcon({ className: "", iconSize: [48, 48], iconAnchor: [24, 24], html: `<div class="mover-wrap"><div class="mover bob">${emoji}</div></div>` });
    this.lastDust = 0;
    this.mover = L.marker(PLACES.ldc.latlng, { icon: this.moverIcon("🚐"), zIndexOffset: 1000, interactive: false }).addTo(this.map);
    this.moverEmoji = "🚐";

    this.speeds = [1, 2, 4, 0.5];
    this.speedIdx = 0;
    this.playing = false;
    this.pos = 0;
    this.sceneIdx = -1;
    this.videoBroken = {};
    this.waitSince = null;
    this.pendingSeek = null;
    $("#now-video").addEventListener("loadedmetadata", (e) => {
      if (this.pendingSeek != null) { e.target.currentTime = this.pendingSeek * e.target.duration; this.pendingSeek = null; }
    });
    $("#now-video").addEventListener("error", () => {
      const sc = this.sceneAt(this.pos);
      if (this.isVideoScene(sc)) this.videoBroken[sc.pl] = true;
    });

    this.buildScenes();
    this.buildSteps();
    this.bindUI();
    this.render(0, true);
    this.loadRoadRoutes();
  }

  // สร้างฉาก (scene) จาก SCHEDULE พร้อมเส้นทาง
  buildScenes() {
    if (this.scenes) this.scenes.forEach((s) => { s.bg && s.bg.remove(); s.trail && s.trail.remove(); s.flow && s.flow.remove(); });
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
        // แสงวิ่งไหลไปตามเส้นทางที่ผ่านแล้ว
        sc.flow = L.polyline([], { color: "#fff", weight: 2.5, opacity: .95, lineCap: "round", dashArray: "1 16", className: "route-flow", interactive: false }).addTo(this.map);
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
      this.seekVideo(this.pos);
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
    delete $("#now-video").dataset.hold;
    this.last = performance.now();
    const loop = (now) => {
      if (!this.playing) return;
      const dt = Math.min(64, now - this.last);
      this.last = now;
      const sc = this.sceneAt(this.pos);
      if (this.isVideoScene(sc)) this.stepVideo(sc, now);
      else this.render(Math.min(this.total, this.pos + dt * this.speeds[this.speedIdx]));
      if (this.pos >= this.total) { this.pause(); this.btnPlay.textContent = "↻ เล่นอีกครั้ง"; return; }
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  pause() {
    this.playing = false;
    cancelAnimationFrame(this.raf);
    const v = $("#now-video");
    v.dataset.hold = "1";
    v.pause();
    this.btnPlay.textContent = "▶ เล่น";
  }

  sceneAt(pos) {
    const i = this.scenes.findIndex((s) => pos < s.end);
    return this.scenes[i < 0 ? this.scenes.length - 1 : i];
  }

  // ช่วงกิจกรรมที่มีวิดีโอ: เล่นวิดีโอให้จบก่อนไปช่วงถัดไป
  isVideoScene(sc) {
    return sc.type === "stay" && sc.t1 > sc.t0 && !!PLACES[sc.pl].video && !this.videoBroken[sc.pl];
  }

  videoReady(sc) {
    const v = $("#now-video");
    return v.dataset.src === PLACES[sc.pl].video && v.readyState >= 1 && isFinite(v.duration) && v.duration > 0;
  }

  // เลื่อนเวลาในแผนที่ตามตำแหน่งของวิดีโอ
  stepVideo(sc, now) {
    const v = $("#now-video");
    if (!this.videoReady(sc)) {
      // รอโหลด ถ้านานเกิน 10 วินาทีให้กลับไปใช้เวลาปกติ
      this.waitSince ??= now;
      if (now - this.waitSince > 10000) this.videoBroken[sc.pl] = true;
      return;
    }
    this.waitSince = null;
    if (this.pendingSeek != null) { v.currentTime = this.pendingSeek * v.duration; this.pendingSeek = null; }
    v.playbackRate = this.speeds[this.speedIdx];
    if (v.paused && !v.ended && (v.dataset.visible || onScreen(v))) playPlayerVideo(v);
    const u = v.ended ? 1 : Math.min(.999, v.currentTime / v.duration);
    this.render(v.ended ? sc.end : sc.start + sc.ms * u);
  }

  // ซิงก์ตำแหน่งวิดีโอเมื่อเลื่อนแถบเวลาหรือกดข้ามช่วง
  seekVideo(pos) {
    const sc = this.sceneAt(pos);
    if (!this.isVideoScene(sc)) return;
    const u = Math.max(0, Math.min(.999, (pos - sc.start) / sc.ms));
    if (this.videoReady(sc)) $("#now-video").currentTime = u * $("#now-video").duration;
    else this.pendingSeek = u;
  }

  jumpTo(i, autoplay = true) {
    this.sceneIdx = -1;
    this.render(this.scenes[i].start);
    this.seekVideo(this.scenes[i].start);
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
      let ll = L.latLng(PLACES[sc.at].latlng);
      const z = sc.at === "ldc" ? 14 : 16;
      // จอเล็ก: วิดีโอลอยทับด้านขวาของแผนที่ เลื่อนจุดศูนย์กลางให้หมุดอยู่ในพื้นที่ซ้ายที่ยังมองเห็น
      if (this.isVideoScene(sc) && window.matchMedia("(max-width: 900px)").matches) {
        const size = this.map.getSize();
        const videoW = (size.y - 24) * 9 / 16 + 12;
        const dx = Math.max(0, videoW / 2);
        ll = this.map.unproject(this.map.project(ll, z).add([dx, 0]), z);
      }
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
      if (j < idx) { s.trail.setLatLngs(s.path); s.flow.setLatLngs(s.path); }
      else if (j > idx) { s.trail.setLatLngs([]); s.flow.setLatLngs([]); }
    });

    let here;
    if (sc.type === "move") {
      const { pt, k } = this.pointAlong(sc, ease(u));
      here = pt;
      const done = [...sc.path.slice(0, k), pt];
      sc.trail.setLatLngs(done);
      sc.flow.setLatLngs(done);
      if (this.moverEmoji !== sc.mover) { this.moverEmoji = sc.mover; this.mover.setIcon(this.moverIcon(sc.mover)); }
      this.steer(sc, u, pt);
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

  // ภาพ/วิดีโอในแผงผู้เล่น (ค่อย ๆ จางเปลี่ยน)
  showMedia(p, asVideo) {
    const box = $(".now-photo");
    const photo = $("#now-photo");
    const video = $("#now-video");
    const want = asVideo ? p.video : p.image;
    if (box.dataset.src === want) return;
    box.dataset.src = want;
    box.classList.add("fade");
    clearTimeout(this.mediaT);
    this.mediaT = setTimeout(() => {
      const muteBtn = box.querySelector(".mute-btn");
      if (asVideo) {
        video.loop = false;
        video.poster = p.image;
        video.dataset.src = p.video;
        video.src = p.video;
        video.muted = true;
        if (!muteBtn.classList.contains("need-tap")) setMuteIcon(muteBtn, !playerSoundOn());
        video.hidden = false; photo.hidden = true; muteBtn.hidden = false;
        if ((video.dataset.visible || onScreen(video)) && !video.dataset.hold) playPlayerVideo(video);
      } else {
        video.pause(); delete video.dataset.src; video.removeAttribute("src"); video.load();
        video.hidden = true; photo.hidden = false; muteBtn.hidden = true;
        photo.src = p.image; photo.alt = p.name;
      }
      box.classList.toggle("is-video", !!asVideo); // วิดีโอแนวตั้ง แสดงกรอบใหญ่กว่าแผนที่
      box.classList.remove("fade");
    }, 250);
  }

  // หันหัวรถตามทิศทาง + ฝุ่น/ฟองเล็ก ๆ ตามหลัง
  steer(sc, u, pt) {
    const ahead = this.pointAlong(sc, Math.min(1, ease(Math.min(1, u + .02)))).pt;
    const a = this.map.latLngToLayerPoint(pt), b = this.map.latLngToLayerPoint(ahead);
    const dx = b.x - a.x, dy = b.y - a.y;
    const wrap = this.mover.getElement()?.querySelector(".mover-wrap");
    if (wrap && Math.hypot(dx, dy) > .5) {
      // อีโมจิรถตู้หันหน้าไปทางซ้าย: ถ้าวิ่งไปทางขวาให้กลับด้าน และเอียงตามความชัน
      const right = dx > 0;
      const tilt = Math.max(-25, Math.min(25, Math.atan2(dy, Math.abs(dx)) * 180 / Math.PI)) * (right ? 1 : -1);
      wrap.style.transform = `scaleX(${right ? -1 : 1}) rotate(${right ? -tilt : tilt}deg)`;
    }
    const now = performance.now();
    if (!reduceMotion && this.playing && now - this.lastDust > 110) {
      this.lastDust = now;
      const dot = L.circleMarker(pt, { radius: sc.mover === "🚶" ? 3 : 5, stroke: false, fillColor: sc.mover === "🚶" ? "#ffd27a" : "#ff8fab", fillOpacity: .8, className: "dust", interactive: false }).addTo(this.map);
      setTimeout(() => dot.remove(), 1200);
    }
  }

  // ฉลองเมื่อถึงที่หมาย: วงคลื่น + คอนเฟตติ
  celebrate(latlng) {
    if (reduceMotion) return;
    const colors = ["#ff7a59", "#ffc94d", "#12c2b4", "#7fe7e0", "#ff4f7b", "#fff"];
    const bits = Array.from({ length: 18 }, (_, i) => {
      const ang = (i / 18) * Math.PI * 2 + Math.random() * .3;
      const dist = 40 + Math.random() * 40;
      return `<i style="--x:${(Math.cos(ang) * dist).toFixed(0)}px;--y:${(Math.sin(ang) * dist - 20).toFixed(0)}px;--r:${Math.round(Math.random() * 540)}deg;background:${colors[i % colors.length]};animation-delay:${Math.random() * 80}ms"></i>`;
    }).join("");
    const m = L.marker(latlng, {
      interactive: false, zIndexOffset: 900,
      icon: L.divIcon({ className: "", iconSize: [0, 0], html: `<div class="burst"><span class="ring"></span><span class="ring r2"></span>${bits}</div>` }),
    }).addTo(this.map);
    setTimeout(() => m.remove(), 1800);
  }

  onScene(sc, instant) {
    this.camera(sc, instant);
    const card = $("#now-card");
    card.classList.remove("swap"); void card.offsetWidth; card.classList.add("swap");
    $("#now-icon").textContent = sc.icon;
    this.showMedia(PLACES[sc.pl], this.isVideoScene(sc));
    $("#now-time").textContent = `${sc.time}${sc.dur ? " · " + sc.dur : ""}`;
    $("#now-title").textContent = sc.title;
    $("#now-place").textContent = `📍 ${sc.place}`;

    Object.values(this.markers).forEach((m) => m.getElement()?.querySelector(".pin")?.classList.remove("active"));
    const activeKey = sc.type === "stay" ? sc.at : null;
    if (activeKey) this.markers[activeKey].getElement()?.querySelector(".pin")?.classList.add("active");
    const arrived = this.scenes[sc.i - 1]?.type === "move";
    if (activeKey && arrived && !instant && this.playing) setTimeout(() => this.celebrate(PLACES[activeKey].latlng), 500);

    document.querySelectorAll("#steps button").forEach((b, j) => {
      b.classList.toggle("active", j === sc.i);
      b.classList.toggle("done", j < sc.i);
    });
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
  renderPlaces(pick);
  observeVideos();
  initReveal();
});
