const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  try {
    await page.goto('http://localhost:5175', { waitUntil: 'networkidle0' });
    // Scroll to find "Calculate your savings"
    await page.evaluate(() => {
      const element = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, div, p')).find(el => el.textContent.includes('Calculate your savings'));
      if (element) {
        element.scrollIntoView();
      }
    });
    await new Promise(r => setTimeout(r, 2000)); // Wait for any animations
    await page.screenshot({ path: 'savings_section.png' });
    console.log('Screenshot saved to savings_section.png');
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await browser.close();
  }
})();
