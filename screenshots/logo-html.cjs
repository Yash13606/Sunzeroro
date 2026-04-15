const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://sunzerotwo.framer.website', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  const logoHtml = await page.evaluate(() => {
    const el = document.querySelector('.framer-1kwf9aa');
    if (!el) return 'not found';
    return {
      outerHTML: el.outerHTML,
      innerHTML: el.innerHTML,
      style: el.getAttribute('style'),
      parent: el.parentElement ? el.parentElement.outerHTML.substring(0, 500) : 'none'
    };
  });
  console.log(JSON.stringify(logoHtml, null, 2));
  await browser.close();
})();
