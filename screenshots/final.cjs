const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const dir = __dirname;
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(dir, 'final-hero.png') });
  
  // Scroll sections
  for (let i = 1; i <= 8; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * 900);
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(dir, `final-scroll-${i}.png`) });
  }
  
  await page.screenshot({ path: path.join(dir, 'final-full.png'), fullPage: true });
  
  await browser.close();
  console.log('Done!');
})();
