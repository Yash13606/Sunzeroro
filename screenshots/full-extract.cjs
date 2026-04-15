const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://sunzerotwo.framer.website', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 5000));

  const dir = __dirname;

  // Take screenshots at every 900px scroll position
  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log('Total page height:', totalHeight);

  for (let y = 0; y < totalHeight; y += 900) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await new Promise(r => setTimeout(r, 800));
    const idx = Math.floor(y / 900);
    await page.screenshot({ path: path.join(dir, `framer-s${idx}.png`) });
    console.log(`Screenshot at y=${y} saved as framer-s${idx}.png`);
  }

  // Extract complete page structure
  const structure = await page.evaluate(() => {
    const result = {};

    // Get all major sections (divs with significant height)
    const allDivs = [...document.querySelectorAll('div, section')];
    const sections = allDivs.filter(el => {
      const rect = el.getBoundingClientRect();
      const scrollTop = window.scrollY;
      return rect.width > 1000 && rect.height > 200 && rect.height < 3000;
    }).map(el => {
      const rect = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);
      return {
        top: Math.round(rect.top + window.scrollY),
        height: Math.round(rect.height),
        width: Math.round(rect.width),
        bg: cs.backgroundColor,
        bgImage: cs.backgroundImage !== 'none' ? 'yes' : 'no',
        borderRadius: cs.borderRadius,
        overflow: cs.overflow,
        position: cs.position,
        className: (el.className || '').toString().substring(0, 80),
        childCount: el.children.length
      };
    });

    // Deduplicate by top position
    const seen = new Set();
    result.sections = sections.filter(s => {
      const key = `${s.top}-${s.height}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).sort((a, b) => a.top - b.top).slice(0, 50);

    // Get all scroll-based animations (transform, opacity transitions)
    const animated = allDivs.filter(el => {
      const cs = window.getComputedStyle(el);
      return cs.transform !== 'none' || cs.transition !== 'all 0s ease 0s' || cs.animation !== 'none 0s ease 0s 1 normal none running';
    }).map(el => {
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        top: Math.round(rect.top + window.scrollY),
        transform: cs.transform,
        transition: cs.transition,
        opacity: cs.opacity,
        className: (el.className || '').toString().substring(0, 50),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      };
    });
    result.animated = animated.slice(0, 30);

    // Get all sticky/fixed elements
    const sticky = allDivs.filter(el => {
      const cs = window.getComputedStyle(el);
      return cs.position === 'sticky' || cs.position === 'fixed';
    }).map(el => {
      const rect = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);
      return {
        position: cs.position,
        top: cs.top,
        zIndex: cs.zIndex,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        className: (el.className || '').toString().substring(0, 50)
      };
    });
    result.sticky = sticky;

    // Check for horizontal scroll/carousel elements
    const carousels = allDivs.filter(el => {
      return el.scrollWidth > el.clientWidth + 10;
    }).map(el => {
      const rect = el.getBoundingClientRect();
      return {
        top: Math.round(rect.top + window.scrollY),
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        height: Math.round(rect.height),
        className: (el.className || '').toString().substring(0, 50)
      };
    });
    result.carousels = carousels;

    return result;
  });

  console.log('\n=== PAGE STRUCTURE ===');
  console.log(JSON.stringify(structure, null, 2));

  await browser.close();
})();
