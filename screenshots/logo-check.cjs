const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://sunzerotwo.framer.website', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  const logoInfo = await page.evaluate(() => {
    const allEls = [...document.querySelectorAll('*')];
    // Look for elements in the nav area (top 70px)
    const navEls = allEls.filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.top < 70 && rect.left > 300 && rect.left < 1100;
    });
    
    return navEls.map(el => {
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        text: (el.textContent || '').trim().substring(0, 30),
        children: el.children.length,
        className: (el.className || '').toString().substring(0, 50),
        src: el.src || el.currentSrc || '',
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        fontSize: cs.fontSize,
        fontFamily: cs.fontFamily.substring(0, 60),
        fontWeight: cs.fontWeight,
        backgroundImage: cs.backgroundImage !== 'none' ? cs.backgroundImage.substring(0, 100) : 'none'
      };
    }).filter(el => el.width > 10);
  });
  
  console.log(JSON.stringify(logoInfo, null, 2));
  await browser.close();
})();
