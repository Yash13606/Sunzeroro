const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const dir = __dirname;
  
  // Capture Framer reference site
  const page1 = await browser.newPage();
  await page1.setViewport({ width: 1440, height: 900 });
  await page1.goto('https://sunzerotwo.framer.website', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  
  await page1.screenshot({ path: path.join(dir, 'framer-hero.png') });
  await page1.screenshot({ path: path.join(dir, 'framer-full.png'), fullPage: true });

  // Extract ALL styles
  const styles = await page1.evaluate(() => {
    const results = {};
    
    // Find heading
    const allEls = [...document.querySelectorAll('*')];
    const headingEl = allEls.find(el => {
      const text = el.textContent || '';
      const cs = window.getComputedStyle(el);
      return text.includes('We make Net Zero') && parseInt(cs.fontSize) > 20 && el.children.length < 10;
    });
    
    if (headingEl) {
      const cs = window.getComputedStyle(headingEl);
      const rect = headingEl.getBoundingClientRect();
      results.heading = {
        tag: headingEl.tagName,
        html: headingEl.innerHTML.substring(0, 300),
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        color: cs.color,
        fontStyle: cs.fontStyle,
        textAlign: cs.textAlign,
        top: rect.top,
        width: rect.width,
        height: rect.height
      };
    }

    // Find button
    const btnEl = allEls.find(el => el.textContent && el.textContent.trim() === 'Book a Free Call');
    if (btnEl) {
      const cs = window.getComputedStyle(btnEl);
      const rect = btnEl.getBoundingClientRect();
      results.button = {
        tag: btnEl.tagName,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        fontFamily: cs.fontFamily,
        letterSpacing: cs.letterSpacing,
        textTransform: cs.textTransform,
        border: cs.border,
        borderRadius: cs.borderRadius,
        padding: cs.padding,
        color: cs.color,
        bg: cs.backgroundColor,
        width: rect.width,
        height: rect.height,
        top: rect.top
      };
    }

    // Find logo
    const logoEl = allEls.find(el => {
      const text = (el.textContent || '').trim();
      return text === 'SunZero' && el.children.length === 0 && parseInt(window.getComputedStyle(el).fontSize) > 15;
    });
    if (logoEl) {
      const cs = window.getComputedStyle(logoEl);
      results.logo = {
        tag: logoEl.tagName,
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        fontStyle: cs.fontStyle,
        letterSpacing: cs.letterSpacing,
        color: cs.color
      };
    }

    // Find HOME link
    const homeEl = allEls.find(el => {
      const text = (el.textContent || '').trim();
      return (text === 'Home' || text === 'HOME') && el.children.length === 0 && parseInt(window.getComputedStyle(el).fontSize) < 20;
    });
    if (homeEl) {
      const cs = window.getComputedStyle(homeEl);
      results.homeLink = {
        text: homeEl.textContent.trim(),
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        fontFamily: cs.fontFamily,
        letterSpacing: cs.letterSpacing,
        textTransform: cs.textTransform,
        color: cs.color
      };
    }

    // Find nav container
    const navEl = document.querySelector('nav') || document.querySelector('header');
    if (navEl) {
      const cs = window.getComputedStyle(navEl);
      const rect = navEl.getBoundingClientRect();
      results.nav = {
        tag: navEl.tagName,
        height: rect.height,
        width: rect.width,
        paddingLeft: cs.paddingLeft,
        paddingRight: cs.paddingRight,
        bg: cs.backgroundColor
      };
    }

    // Find video
    const video = document.querySelector('video');
    if (video) {
      const rect = video.getBoundingClientRect();
      results.video = {
        top: rect.top,
        height: rect.height,
        width: rect.width
      };
    }

    results.viewport = { w: window.innerWidth, h: window.innerHeight };
    results.pageHeight = document.documentElement.scrollHeight;
    
    return results;
  });
  
  console.log(JSON.stringify(styles, null, 2));

  // Also capture localhost
  try {
    const page2 = await browser.newPage();
    await page2.setViewport({ width: 1440, height: 900 });
    await page2.goto('http://localhost:5174', { waitUntil: 'networkidle2', timeout: 10000 });
    await new Promise(r => setTimeout(r, 2000));
    await page2.screenshot({ path: path.join(dir, 'localhost-hero.png') });
    await page2.screenshot({ path: path.join(dir, 'localhost-full.png'), fullPage: true });
    console.log('Localhost captured!');
  } catch(e) {
    console.log('Localhost not available:', e.message);
  }

  await browser.close();
  console.log('Done!');
})();
