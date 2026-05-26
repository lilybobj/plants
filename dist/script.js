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
}, { once: true });
})();

const BASE = "https://raw.githubusercontent.com/lilybobj/plants/master/public/images/";
function img(name) { return BASE + encodeURIComponent(name); }

// ── Assign all image srcs ──
document.getElementById("green-grad").src        = img("green grad.png");
document.getElementById("logo-fixed").src        = img("logo.png");
document.getElementById("club-text").src         = img("club text.png");
document.getElementById("hero-bg").src           = img("hero border.png");
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

// ── Spinning stars (mouse velocity) ──
const stars = [
  document.getElementById("star-green"),
  document.getElementById("star-pink"),
  document.getElementById("star-yellow"),
];
const rotations  = [0, 0, 0];
const velocities = [0, 0, 0];
let lastMouse = null;

window.addEventListener("mousemove", e => {
  if (lastMouse) {
    const dx = e.clientX - lastMouse.x;
    const speed = Math.abs(dx);
    const dir   = dx > 0 ? 1 : -1;
    velocities.forEach((_, i) => { velocities[i] = dir * speed * 0.5; });
  }
  lastMouse = { x: e.clientX, y: e.clientY };
});

(function animateStars() {
  stars.forEach((star, i) => {
    velocities[i] *= 0.95;
    rotations[i]  += velocities[i];
    star.style.transform = `rotate(${rotations[i]}deg)`;
    if (star.classList.contains("star-green")) {
      star.style.transform = `translateY(-50%) rotate(${rotations[i]}deg)`;
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