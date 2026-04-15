const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://sunzerotwo.framer.website', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  // Scroll through and extract section data
  const sectionData = await page.evaluate(() => {
    const results = {};
    const allEls = [...document.querySelectorAll('*')];
    
    // Get ALL text elements with their styles and positions
    const textElements = [];
    for (const el of allEls) {
      if (el.children.length > 0) continue;
      const text = (el.textContent || '').trim();
      if (!text || text.length < 2 || text.length > 300) continue;
      
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      
      if (rect.width === 0 || rect.height === 0) continue;
      if (parseFloat(cs.fontSize) < 8) continue;
      
      textElements.push({
        text: text.substring(0, 100),
        tag: el.tagName,
        top: Math.round(rect.top + window.scrollY),
        left: Math.round(rect.left),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        fontFamily: cs.fontFamily.split(',')[0].replace(/"/g, '').trim(),
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        color: cs.color,
        textTransform: cs.textTransform,
        fontStyle: cs.fontStyle
      });
    }
    
    results.textElements = textElements;
    
    // Get all sections/containers with backgrounds
    const sections = [];
    for (const el of allEls) {
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      
      if (rect.width < 1000 || rect.height < 100) continue;
      
      const bg = cs.backgroundColor;
      const bgImage = cs.backgroundImage;
      const borderRadius = cs.borderRadius;
      
      if (bg !== 'rgba(0, 0, 0, 0)' || bgImage !== 'none') {
        sections.push({
          tag: el.tagName,
          className: (el.className || '').toString().substring(0, 50),
          top: Math.round(rect.top + window.scrollY),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          bg: bg,
          bgImage: bgImage !== 'none' ? bgImage.substring(0, 100) : 'none',
          borderRadius: borderRadius,
          padding: cs.padding
        });
      }
    }
    results.sections = sections.slice(0, 40);
    
    // Get all images
    const images = [];
    for (const img of document.querySelectorAll('img, video')) {
      const rect = img.getBoundingClientRect();
      images.push({
        tag: img.tagName,
        src: (img.src || img.currentSrc || '').substring(0, 100),
        top: Math.round(rect.top + window.scrollY),
        left: Math.round(rect.left),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      });
    }
    results.images = images;
    
    results.pageHeight = document.documentElement.scrollHeight;
    
    return results;
  });

  // Print text elements grouped by vertical position
  console.log('=== TEXT ELEMENTS ===');
  const sorted = sectionData.textElements.sort((a, b) => a.top - b.top);
  for (const el of sorted) {
    console.log(`TOP:${el.top} | ${el.fontSize} ${el.fontWeight} ${el.fontFamily} | "${el.text}" | color:${el.color} transform:${el.textTransform}`);
  }
  
  console.log('\n=== SECTIONS ===');
  const sortedSections = sectionData.sections.sort((a, b) => a.top - b.top);
  for (const s of sortedSections) {
    console.log(`TOP:${s.top} H:${s.height} W:${s.width} | bg:${s.bg} radius:${s.borderRadius} padding:${s.padding}`);
  }
  
  console.log('\n=== IMAGES ===');
  for (const img of sectionData.images) {
    console.log(`TOP:${img.top} ${img.tag} ${img.width}x${img.height} | ${img.src}`);
  }

  await browser.close();
})();
