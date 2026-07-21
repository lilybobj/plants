let lenis;

// ── Preload critical images immediately ──
const PRELOAD_BASE = "https://raw.githubusercontent.com/lilybobj/plants/master/public/images/";
const CRITICAL = [
  "green grad.png", "logo.png", "club text.png", "hero border.png",
  "botanical playground.png", "snail.png", "hero text w texture.png",
  "Star g.png", "Star p.png", "Star y.png", "cta.png",
  "acorn.png", "bfly.png", "flower.png", "heart.png", "key.png", "middle margin.png",
];
const preloadDone = Promise.all(
  CRITICAL.map(name => new Promise(resolve => {
    const i = new Image();
    i.onload = i.onerror = () => resolve();
    i.src = PRELOAD_BASE + encodeURIComponent(name);
  }))
);

// ════════════════════════════════
//   INTRO ANIMATION
// ════════════════════════════════
(async function runIntro() {
  // 👇 imgur for now — swap for public/ URL once teammate uploads
  const INTRO_BG_URL = "https://i.imgur.com/EZqoMXM.jpeg";

  const overlay     = document.getElementById("intro-overlay");
  const bg          = document.getElementById("intro-bg");
  const pageContent = document.getElementById("page-content");
  const dot1        = document.getElementById("dot-1");
  const dot2        = document.getElementById("dot-2");
  const dot3        = document.getElementById("dot-3");
  const textEl      = document.getElementById("intro-text");

  document.body.classList.add("intro-active");
await new Promise(resolve => {
  const bg = document.getElementById("intro-bg");
  if (bg.complete) resolve();
  else { bg.onload = resolve; bg.onerror = resolve; }
});

// Background is now set directly in HTML's <img id="intro-bg"> for instant load.
// To switch to a video, change <img> to <video src="..." autoplay muted loop playsinline>
// in HTML — no JS needed.


// ── Animation sequence ──
const steps = [
  { at: 400,  fn: () => textEl.classList.add("visible") },
  { at: 900,  fn: () => dot1.classList.add("visible") },   // snap
  { at: 1250, fn: () => dot2.classList.add("visible") },   // snap
  { at: 1600, fn: () => dot3.classList.add("stem-in") },   // "i" bounces in
{ at: 2150, fn: () => {
  const bloom = document.querySelector('.bloom');
  bloom.style.transformOrigin = '50% 50%';
let angle = 0;
let velocity = 35;
let bounced = false;
function spin() {
  velocity *= 0.92;
  if (!bounced && velocity < 1.5) {
    // velocity = -4;
    bounced = true;
  }
  angle += velocity;
  bloom.style.transform = `rotate(${angle}deg)`;
  if (Math.abs(velocity) > 0.05) requestAnimationFrame(spin);
}
  // scale in the bloom-wrap first
dot3.classList.add("bloomed");
requestAnimationFrame(spin);
}},  // flower bounces above the i
];
steps.forEach(s => setTimeout(s.fn, s.at));

// ── Wait for sequence to finish AND critical images to load ──
const minSequenceTime = new Promise(r => setTimeout(r, 2800));
const maxWait         = new Promise(r => setTimeout(r, 4000)); // hard cap
  await Promise.all([
    minSequenceTime,
    Promise.race([preloadDone, maxWait]),
  ]);

  // ── Slide intro UP and homepage UP into place (reel effect) ──
  overlay.classList.add("slide-out");
  pageContent.classList.add("slide-in");

  // ── Cleanup after slide finishes ──
pageContent.addEventListener("transitionend", () => {
  overlay.remove();
document.body.classList.remove("intro-active");
document.body.style.overflow = '';
window.scrollTo(0, 0);
lenis.scrollTo(0, { immediate: true, force: true });
ScrollTrigger.refresh();
setTimeout(readStarPositions, 100);
}, { once: true });
})();

const BASE = "https://raw.githubusercontent.com/lilybobj/plants/master/public/images/";
function img(name) { return BASE + encodeURIComponent(name); }

// ── Assign all image srcs ──
document.getElementById("green-grad").src        = img("green grad.png");
document.getElementById("logo-fixed").src        = img("logo.png");
document.getElementById("club-text").src         = img("club text.png");
document.getElementById("hero-bg").src = "https://i.ibb.co/chpNrRLm/hero-image.png";
document.getElementById("hero-playground").src   = img("botanical playground.png");
document.getElementById("hero-snail").src        = img("snail.png");
document.getElementById("hero-title").src        = img("hero text w texture.png");
document.getElementById("star-green").src        = img("Star g.png");
document.getElementById("star-pink").src         = img("Star p.png");
document.getElementById("star-yellow").src       = img("Star y.png");
document.getElementById("hero-cta").src          = img("cta.png");
document.getElementById("middle-bg").src         = img("middle margin.png");
document.getElementById("intro-heading").src     = img("new enthus.png");
document.getElementById("lilypads").src          = img("lilypads.png");
document.getElementById("carousel-title").src    = img("carousel title.png");
document.getElementById("circle-ring").src       = img("sirko.png");
document.getElementById("circle-plants").src     = img("plants plants.png");
document.getElementById("want-more-heading").src = img("want more.png");
document.getElementById("want-more-rect").src    = img("more rect.png");
document.getElementById("corn-left").src         = img("left corn.png");
document.getElementById("corn-right").src        = img("right corn.png");

// ── Desktop icons ──
const desktopIcons = [
  { src: "acorn.png",  label: "Greenhaus", href: "#" },
  { src: "bfly.png",   label: "Archive",    href: "#" },
  { src: "flower.png", label: "Events",     href: "#" },
  { src: "heart.png",  label: "Ministry",   href: "#" },
  { src: "key.png",    label: "Join Us",    href: "#" },
];
const iconsEl = document.getElementById("desktop-icons");
desktopIcons.forEach(icon => {
  const a = document.createElement("a");
  a.href = icon.href;
  a.className = "desktop-icon-link";
  a.innerHTML = `
    <img src="${img(icon.src)}" alt="${icon.label}" class="desktop-icon-img" />
    <span class="desktop-icon-label">${icon.label}</span>
  `;
  iconsEl.appendChild(a);
});

// ── Want More buttons ──
const wantMoreButtons = [
  { img: "instagram frog.png", label: "Instagram",     sub: "@botanicalclubucla",     href: "https://www.instagram.com/botanicalclubatucla" },
  { img: "beee.png",           label: "Discord",       sub: "Botanical Club at UCLA",  href: "https://discord.gg/Wd3Tk2ANNd" },
  { img: "purp.png",           label: "Google Photos", sub: "Plants, plants, plants!", href: "https://photos.app.goo.gl/L5y5mxRH1Rkcs4MC6" },
  { img: "dfly.png",           label: "Playground",    sub: "Coming soon!",            href: "#" },
];
const btnsEl = document.getElementById("want-more-buttons");
wantMoreButtons.forEach(btn => {
  const a = document.createElement("a");
  a.href = btn.href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.className = "want-more-btn";
  a.innerHTML = `
    <img src="${img(btn.img)}" alt="${btn.label}" />
    <span class="want-more-label">${btn.label}</span>
    <span class="want-more-sub">${btn.sub}</span>
  `;
  btnsEl.appendChild(a);
});

// ── Floating stars with launch physics ──
const starEls = [
  { el: document.getElementById("star-green"),  id: "green",  w: 80,  h: 80  },
  { el: document.getElementById("star-pink"),   id: "pink",   w: 100, h: 100 },
  { el: document.getElementById("star-yellow"), id: "yellow", w: 80,  h: 80  },
];

const GRAVITY     = 0.10;
const FRICTION    = 0.995;
const BOUNCE      = 0.80;
const REPEL_RADIUS = 150;
const REPEL_FORCE  = 6;

// shared position registry for repulsion
const starRegistry = {};

// per-star state
const starStates = {};
starEls.forEach(({ el, id, w, h }) => {
  starRegistry[id] = { x: 0, y: 0 };
  starStates[id] = {
    el, w, h,
    originX: 0, originY: 0,
    rotation: 0,
    rotVel: 0,
    launched: false,
    x: 0, y: 0,
    vx: 0, vy: 0,
  };
});

// read positions after images have loaded and layout is settled
function readStarPositions() {
  let allReady = true;
  starEls.forEach(({ el, id, w, h }) => {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) { allReady = false; return; }
    const originX = rect.left + w / 2;
    const originY = rect.top  + h / 2;
    starRegistry[id] = { x: originX, y: originY };
    Object.assign(starStates[id], { originX, originY, x: originX, y: originY });
  });
  if (!allReady) setTimeout(readStarPositions, 100); // retry until ready
}

window.addEventListener("load", () => readStarPositions());
// also try immediately in case load already fired
readStarPositions();

let lastMouse = null;
const recentSpeeds = [];

window.addEventListener("mousemove", e => {
  if (!lastMouse) { lastMouse = { x: e.clientX, y: e.clientY }; return; }

const dx = e.clientX - lastMouse.x;
  const dy = e.clientY - lastMouse.y;
  const speed = Math.sqrt(dx * dx + dy * dy);
  const dir   = dx > 0 ? 1 : -1;

  // rolling average so trigger works across different polling rates
  recentSpeeds.push(speed);
  if (recentSpeeds.length > 5) recentSpeeds.shift();
  const avgSpeed = recentSpeeds.reduce((a, b) => a + b, 0) / recentSpeeds.length;

Object.values(starStates).forEach(star => {
    if (star.dismissing) return;
    star.rotVel = dir * speed * 0.5;

    const starX = star.launched ? star.x : star.originX;
    const starY = star.launched ? star.y : star.originY;
    const dist  = Math.sqrt(Math.pow(e.clientX - starX, 2) + Math.pow(e.clientY - starY, 2));

if ((speed > 25 || avgSpeed > 18) && dist < 220) {
      const angle = Math.atan2(dy, dx);
      star.vx = Math.cos(angle) * speed * 0.3;
      star.vy = Math.sin(angle) * speed * 0.3;

if (!star.launched) {
        const rect = star.el.getBoundingClientRect();
        if (rect.width === 0) return;
        const trueX = rect.left + star.w / 2;
        const trueY = rect.top  + star.h / 2;
        const trueDist = Math.sqrt(
          Math.pow(e.clientX - trueX, 2) +
          Math.pow(e.clientY - trueY, 2)
        );
        if (trueDist > 220) return;

        star.launched = true;
        star.x = trueX;
        star.y = trueY;
        star.el.style.position  = "fixed";
        star.el.style.left      = "0";
        star.el.style.top       = "0";
        star.el.style.zIndex    = "999";
        star.el.style.translate = "none";
      }
    }
  });

  lastMouse = { x: e.clientX, y: e.clientY };
});

(function animateStars() {
  Object.entries(starStates).forEach(([id, star]) => {
    // spin
    star.rotVel  *= 0.95;
    star.rotation += star.rotVel;

if (star.launched && !star.dismissing) {
      const floor = window.innerHeight - star.h - 30;

      star.vy += GRAVITY;
      star.vx *= FRICTION;
      star.vy *= FRICTION;
      star.x  += star.vx;
      star.y  += star.vy;

      // repel from other stars
      Object.entries(starRegistry).forEach(([otherId, pos]) => {
        if (otherId === id) return;
        const ddx  = star.x - pos.x;
        const ddy  = star.y - pos.y;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS * REPEL_FORCE;
          star.vx += (ddx / dist) * force;
          star.vy += (ddy / dist) * force;
        }
      });

      // walls
      if (star.x <= 0)                          { star.x = 0;                          star.vx =  Math.abs(star.vx) * BOUNCE; }
      if (star.x >= window.innerWidth - star.w) { star.x = window.innerWidth - star.w; star.vx = -Math.abs(star.vx) * BOUNCE; }

      // floor / ceiling
      if (star.y >= floor) {
        star.y  = floor;
        star.vy = -Math.abs(star.vy) * BOUNCE;
        star.vx *= 0.90;
        star.rotVel *= 0.90;
        if (Math.abs(star.vy) < 0.5) star.vy = 0;
      }
      if (star.y <= 0) { star.y = 0; star.vy = Math.abs(star.vy) * BOUNCE; }

      starRegistry[id] = { x: star.x, y: star.y };
      star.el.style.transform = `translate(${star.x}px, ${star.y}px) rotate(${star.rotation}deg)`;

    } else {
      // still in place — just spin
      let t = `rotate(${star.rotation}deg)`;
      if (id === "green") t = `translateY(-50%) rotate(${star.rotation}deg)`;
      star.el.style.transform = t;
    }
  });

  requestAnimationFrame(animateStars);
})();

// ── Spinning circle ring (scroll into view) ──
const circleWrap = document.getElementById("circle-quote-wrap");
const circleRing = document.getElementById("circle-ring");
let ringSpinning = false;

const ringObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !ringSpinning) {
      ringSpinning = true;
      const start = performance.now();
      const introDuration = 1500;
      const introRotation = 150;
      let continuous = 0;
      function step(now) {
        const elapsed = Math.min(now - start, introDuration);
        const t = elapsed / introDuration;
        const eased = 1 - Math.pow(1 - t, 4);
        const opacity = Math.min(t * 3, 1);
        continuous += 360 / 20 / 60;
        circleRing.style.opacity = opacity;
        circleRing.style.transform = `rotate(${eased * introRotation + continuous}deg)`;
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  });
}, { threshold: 0.3 });

ringObserver.observe(circleWrap);

lenis = new Lenis({ 
  lerp: 0.15,
  duration: 1.0,
  smoothWheel: true,
  wheelMultiplier: 0.7,
  touchMultiplier: 1.5,
  prevent: (node) => false
});

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

lenis.on('scroll', () => ScrollTrigger.update());

// ── Bottom corners ──
const cornLeft = document.querySelector(".corn-left");
const cornRight = document.querySelector(".corn-right");

gsap.ticker.add(() => {
  const scrollY = lenis.scroll;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
const progress = Math.max(0, (scrollY - maxScroll * 0.85) / (maxScroll * 0.15));
const translateY = 100 - (progress * 80);
cornLeft.style.transform  = `translateY(${translateY}%)`;
cornRight.style.transform = `translateY(${translateY}%)`;
cornLeft.style.opacity  = 1;
cornRight.style.opacity = 1;
});

// ── Fixed logo roll-in ──
const logoFixed = document.getElementById("logo-fixed");

ScrollTrigger.create({
  trigger: "#hero",
  start: "bottom 80%",
  onEnter: () => {
    gsap.fromTo(logoFixed,
      { x: 120, opacity: 0, rotation: 360 },
      { x: 0, opacity: 1, rotation: 0, duration: 0.7, ease: "power3.out" }
    );
  },
  onLeaveBack: () => {
    gsap.to(logoFixed, {
      x: 120,
      opacity: 0,
      rotation: -360,
      duration: 0.45,
      ease: "power2.in",
    });
  },
});

// ── Star click: spin/fade out + return to origin ──
starEls.forEach(({ el, id }) => {
  el.addEventListener("click", () => {
    const star = starStates[id];
    if (!star.launched) return;

    // freeze physics
    star.vx = 0;
    star.vy = 0;
star.rotVel = 0;
    star.dismissing = true;

    let opacity = 1;
    let scale = 1;
    let phase = "expand"; // expand → spin+shrink
    let expandFrames = 0;
    const exitX = star.x;
    const exitY = star.y;

    function exitAnim() {
      if (!star.dismissing) return;

      if (phase === "expand") {
        expandFrames++;
        // quick bounce: overshoot to 1.5 then snap back to 1.2
const t = expandFrames / 6;
        scale = 1 + Math.sin(t * Math.PI) * 0.5;
        if (expandFrames >= 6) {
scale = 1.2;
          phase = "shrink";
          star.rotVel = 10;
        }
      } else {
        star.rotation += star.rotVel;
star.rotVel *= 1.08;
        scale -= 0.04;
        opacity -= 0.025;
      }

      el.style.transform = `translate(${exitX}px, ${exitY}px) rotate(${star.rotation}deg) scale(${scale})`;
      el.style.opacity = Math.max(opacity, 0);

      if (opacity > 0) {
        requestAnimationFrame(exitAnim);
      } else {
        star.dismissing = false;
        star.launched = false;
        star.vx = 0;
        star.vy = 0;
        star.rotation = 0;
        star.rotVel = 0;
        starRegistry[id] = { x: star.originX, y: star.originY };

        el.style.transition = "none";
        el.style.position   = "";
        el.style.left       = "";
        el.style.top        = "";
        el.style.zIndex     = "";
        el.style.translate  = "";
        el.style.transform  = "";
        el.style.opacity    = "0";

        requestAnimationFrame(() => {
          el.style.transition = "opacity 0.5s ease";
          el.style.opacity    = "1";
          setTimeout(() => { el.style.transition = "none"; }, 500);
        });
      }
    }
    requestAnimationFrame(exitAnim);
  });
});