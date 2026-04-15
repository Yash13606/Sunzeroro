const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const dir = path.join(__dirname);

  // Screenshot localhost
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, 3000));
  
  await page.screenshot({ path: path.join(dir, 'local-hero.png') });
  
  // Scroll and capture more sections
  await page.evaluate(() => window.scrollTo(0, 900));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(dir, 'local-section2.png') });
  
  await page.evaluate(() => window.scrollTo(0, 1800));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(dir, 'local-section3.png') });
  
  await page.evaluate(() => window.scrollTo(0, 2700));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(dir, 'local-section4.png') });

  // Full page
  await page.screenshot({ path: path.join(dir, 'local-full.png'), fullPage: true });
  
  // Also compare Framer hero
  const page2 = await browser.newPage();
  await page2.setViewport({ width: 1440, height: 900 });
  await page2.goto('https://sunzerotwo.framer.website', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  await page2.screenshot({ path: path.join(dir, 'framer-hero.png') });
  await page2.screenshot({ path: path.join(dir, 'framer-full.png'), fullPage: true });

  // Check if fonts loaded on localhost
  const fontCheck = await page.evaluate(() => {
    return document.fonts.check('800 25.6px "Owners Wide Black"');
  });
  console.log('Owners Wide Black loaded:', fontCheck);
  
  // Check what the heading looks like
  const headingInfo = await page.evaluate(() => {
    const ps = document.querySelectorAll('p');
    const results = [];
    for (const p of ps) {
      const cs = window.getComputedStyle(p);
      const rect = p.getBoundingClientRect();
      if (rect.width > 0) {
        results.push({
          text: p.textContent.substring(0, 60),
          fontSize: cs.fontSize,
          fontFamily: cs.fontFamily.substring(0, 60),
          fontWeight: cs.fontWeight,
          top: Math.round(rect.top),
          width: Math.round(rect.width)
        });
      }
    }
    return results;
  });
  console.log('Heading info:', JSON.stringify(headingInfo, null, 2));

  await browser.close();
  console.log('Done!');
})();
