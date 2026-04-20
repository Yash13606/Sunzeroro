import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  try {
    await page.goto('http://localhost:5175', { waitUntil: 'networkidle2' });
    
    // Find ring and interact
    const ring = await page.waitForSelector('div[style*="cursor: grab"]');
    const box = await ring.boundingBox();
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;

    // Movement 1: Drag to set value to 24000
    await page.mouse.move(centerX, centerY);
    await page.mouse.down();
    // Simulate radial movement to hit the 24000 stop (left stop according to config: left: 82.5, top: 336.5)
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.8, { steps: 10 });
    await page.mouse.up();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: 'savings_interaction_24k.png' });

    // Movement 2: Drag to set value to 34000 (top stop: left: 218.5, top: 38.5)
    await page.mouse.move(centerX, centerY);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.1, { steps: 10 });
    await page.mouse.up();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: 'savings_interaction_34k.png' });

    console.log('Interactions complete.');
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await browser.close();
  }
})();
