const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://sunzerotwo.framer.website', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  const data = await page.evaluate(() => {
    const allEls = [...document.querySelectorAll('*')];
    
    // Find ALL elements containing heading text
    const headingEls = allEls.filter(el => {
      const text = (el.textContent || '').trim();
      const cs = window.getComputedStyle(el);
      return (text.startsWith('We make') || text.startsWith('and profitable')) 
        && parseInt(cs.fontSize) > 15 
        && el.children.length === 0;
    });

    const headings = headingEls.map(el => {
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        text: el.textContent.trim(),
        tag: el.tagName,
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        fontStyle: cs.fontStyle,
        color: cs.color,
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      };
    });

    // Get GO NETZERO link
    const goEl = allEls.find(el => {
      const text = (el.textContent || '').trim().toLowerCase();
      return text.includes('go n') && text.includes('zero') && el.children.length === 0;
    });
    let goLink = null;
    if (goEl) {
      const cs = window.getComputedStyle(goEl);
      goLink = {
        text: goEl.textContent.trim(),
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        fontFamily: cs.fontFamily,
        letterSpacing: cs.letterSpacing,
        textTransform: cs.textTransform,
        color: cs.color
      };
    }

    // Get button parent (the actual styled container)
    const btnTextEl = allEls.find(el => el.textContent && el.textContent.trim() === 'Book a Free Call' && el.children.length === 0);
    let btnParent = null;
    if (btnTextEl) {
      let parent = btnTextEl.parentElement;
      for (let i = 0; i < 5 && parent; i++) {
        const cs = window.getComputedStyle(parent);
        if (cs.borderWidth !== '0px' || cs.borderStyle !== 'none') {
          const rect = parent.getBoundingClientRect();
          btnParent = {
            tag: parent.tagName,
            border: cs.border,
            borderRadius: cs.borderRadius,
            padding: cs.padding,
            bg: cs.backgroundColor,
            width: rect.width,
            height: rect.height,
            top: rect.top
          };
          break;
        }
        parent = parent.parentElement;
      }
      
      // Also get the text element itself
      const cs = window.getComputedStyle(btnTextEl);
      btnParent = btnParent || {};
      btnParent.textFontSize = cs.fontSize;
      btnParent.textFontWeight = cs.fontWeight;
      btnParent.textFontFamily = cs.fontFamily;
      btnParent.textColor = cs.color;
      btnParent.textLetterSpacing = cs.letterSpacing;
      btnParent.textTransform = cs.textTransform;
    }

    // Get SunZero logo
    const logoEl = allEls.find(el => {
      const text = (el.textContent || '').trim();
      return text === 'SunZero' && el.children.length === 0;
    });
    let logo = null;
    if (logoEl) {
      const cs = window.getComputedStyle(logoEl);
      const rect = logoEl.getBoundingClientRect();
      logo = {
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        fontStyle: cs.fontStyle,
        color: cs.color,
        letterSpacing: cs.letterSpacing,
        width: rect.width,
        height: rect.height
      };
    }

    // Get nav container
    const navContainers = allEls.filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.top <= 5 && rect.height > 40 && rect.height < 120 && rect.width > 1000;
    });
    let navInfo = null;
    if (navContainers.length > 0) {
      const nav = navContainers[navContainers.length - 1];
      const cs = window.getComputedStyle(nav);
      const rect = nav.getBoundingClientRect();
      navInfo = {
        height: rect.height,
        paddingLeft: cs.paddingLeft,
        paddingRight: cs.paddingRight,
        paddingTop: cs.paddingTop,
        bg: cs.backgroundColor,
        position: cs.position
      };
    }

    // Get all font-face rules
    const fontFaces = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSFontFaceRule) {
            fontFaces.push({
              family: rule.style.fontFamily,
              src: (rule.style.src || '').substring(0, 200),
              weight: rule.style.fontWeight,
              style: rule.style.fontStyle
            });
          }
        }
      } catch(e) {}
    }

    return { headings, goLink, btnParent, logo, navInfo, fontFaces };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
