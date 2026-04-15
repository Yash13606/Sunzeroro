const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://sunzerotwo.framer.website', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  const data = await page.evaluate(() => {
    const allEls = [...document.querySelectorAll('*')];
    const results = [];
    for (const el of allEls) {
      if (el.children.length > 0) continue;
      const text = (el.textContent || '').trim();
      if (!text || text.length < 2 || text.length > 300) continue;
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (parseFloat(cs.fontSize) < 8) continue;
      const top = Math.round(rect.top + window.scrollY);
      if (top > 4000) continue; // Only first half
      results.push({
        t: text.substring(0, 120),
        top: top,
        fs: cs.fontSize,
        fw: cs.fontWeight,
        ff: cs.fontFamily.split(',')[0].replace(/"/g, '').trim(),
        c: cs.color,
        tt: cs.textTransform,
        w: Math.round(rect.width),
        h: Math.round(rect.height),
        l: Math.round(rect.left)
      });
    }
    return results.sort((a,b) => a.top - b.top);
  });

  for (const el of data) {
    console.log(`TOP:${el.top} L:${el.l} W:${el.w} | ${el.fs} ${el.fw} ${el.ff} | c:${el.c} tt:${el.tt} | "${el.t}"`);
  }
  await browser.close();
})();
