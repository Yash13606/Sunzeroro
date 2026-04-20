import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  try {
    console.log('Navigating...');
    await page.goto('http://localhost:5175', { waitUntil: 'networkidle2' });
    console.log('Looking for section...');
    await page.evaluate(() => {
      const element = Array.from(document.querySelectorAll('*')).find(el => el.textContent.includes('Calculate your savings'));
      if (element) {
        element.scrollIntoView();
      }
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'savings_section.png' });
    console.log('Screenshot saved to savings_section.png');
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();
