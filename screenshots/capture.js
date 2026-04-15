const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  
  // Capture Framer reference site
  const page1 = await browser.newPage();
  await page1.setViewport({ width: 1440, height: 900 });
  await page1.goto('https://sunzerotwo.framer.website', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  
  // Full page screenshot
  await page1.screenshot({ path: path.join(__dirname, 'framer-full.png'), fullPage: true });
  // Hero only
  await page1.screenshot({ path: path.join(__dirname, 'framer-hero.png') });

  // Extract heading styles
  const headingStyles = await page1.evaluate(() => {
    // Try to find the main heading
    const allElements = document.querySelectorAll('*');
    let headingEl = null;
    for (const el of allElements) {
      if (el.textContent && el.textContent.includes('We make Net Zero adoption') && el.children.length < 5) {
        const cs = window.getComputedStyle(el);
        if (parseInt(cs.fontSize) > 20) {
          headingEl = el;
          break;
        }
      }
    }
    
    if (!headingEl) return { error: 'heading not found' };
    
    const cs = window.getComputedStyle(headingEl);
    return {
      tagName: headingEl.tagName,
      innerHTML: headingEl.innerHTML.substring(0, 200),
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      color: cs.color,
      fontStyle: cs.fontStyle,
      textTransform: cs.textTransform,
      textAlign: cs.textAlign,
      width: cs.width,
      marginTop: cs.marginTop,
      marginBottom: cs.marginBottom,
      paddingTop: cs.paddingTop,
      paddingBottom: cs.paddingBottom
    };
  });
  console.log('HEADING STYLES:', JSON.stringify(headingStyles, null, 2));

  // Extract navbar styles
  const navStyles = await page1.evaluate(() => {
    const nav = document.querySelector('nav, header, [class*="nav"]');
    if (!nav) return { error: 'nav not found' };
    const cs = window.getComputedStyle(nav);
    return {
      tagName: nav.tagName,
      height: cs.height,
      paddingLeft: cs.paddingLeft,
      paddingRight: cs.paddingRight,
      background: cs.background,
      classes: nav.className
    };
  });
  console.log('NAV STYLES:', JSON.stringify(navStyles, null, 2));

  // Extract button styles
  const buttonStyles = await page1.evaluate(() => {
    const allElements = document.querySelectorAll('*');
    let btnEl = null;
    for (const el of allElements) {
      if (el.textContent && el.textContent.trim() === 'Book a Free Call') {
        btnEl = el;
        break;
      }
    }
    if (!btnEl) return { error: 'button not found' };
    const cs = window.getComputedStyle(btnEl);
    return {
      tagName: btnEl.tagName,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      fontFamily: cs.fontFamily,
      letterSpacing: cs.letterSpacing,
      textTransform: cs.textTransform,
      border: cs.border,
      borderRadius: cs.borderRadius,
      padding: cs.padding,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      height: cs.height,
      width: cs.width
    };
  });
  console.log('BUTTON STYLES:', JSON.stringify(buttonStyles, null, 2));

  // Extract nav link styles
  const navLinkStyles = await page1.evaluate(() => {
    const allElements = document.querySelectorAll('*');
    let homeEl = null;
    for (const el of allElements) {
      if (el.textContent && el.textContent.trim() === 'Home') {
        const cs = window.getComputedStyle(el);
        if (parseInt(cs.fontSize) < 20) {
          homeEl = el;
          break;
        }
      }
    }
    if (!homeEl) return { error: 'home link not found' };
    const cs = window.getComputedStyle(homeEl);
    return {
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      fontFamily: cs.fontFamily,
      letterSpacing: cs.letterSpacing,
      textTransform: cs.textTransform,
      color: cs.color
    };
  });
  console.log('NAV LINK STYLES:', JSON.stringify(navLinkStyles, null, 2));

  // Extract logo styles
  const logoStyles = await page1.evaluate(() => {
    const allElements = document.querySelectorAll('*');
    let logoEl = null;
    for (const el of allElements) {
      if (el.textContent && el.textContent.trim() === 'SunZero' && el.children.length === 0) {
        const cs = window.getComputedStyle(el);
        if (parseInt(cs.fontSize) > 15) {
          logoEl = el;
          break;
        }
      }
    }
    if (!logoEl) return { error: 'logo not found' };
    const cs = window.getComputedStyle(logoEl);
    return {
      tagName: logoEl.tagName,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      fontFamily: cs.fontFamily,
      fontStyle: cs.fontStyle,
      letterSpacing: cs.letterSpacing,
      color: cs.color
    };
  });
  console.log('LOGO STYLES:', JSON.stringify(logoStyles, null, 2));

  // Get hero section layout
  const heroLayout = await page1.evaluate(() => {
    // Find the video or hero container
    const video = document.querySelector('video');
    const videoRect = video ? video.getBoundingClientRect() : null;
    
    // Overall page height
    return {
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
      videoTop: videoRect ? videoRect.top : null,
      videoHeight: videoRect ? videoRect.height : null,
      videoWidth: videoRect ? videoRect.width : null
    };
  });
  console.log('HERO LAYOUT:', JSON.stringify(heroLayout, null, 2));

  // Capture localhost
  const page2 = await browser.newPage();
  await page2.setViewport({ width: 1440, height: 900 });
  await page2.goto('http://localhost:5174', { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  await page2.screenshot({ path: path.join(__dirname, 'localhost-hero.png') });
  await page2.screenshot({ path: path.join(__dirname, 'localhost-full.png'), fullPage: true });

  await browser.close();
  console.log('Done!');
})();
