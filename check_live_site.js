const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Listen for console messages and errors
    page.on('console', msg => console.log('Page log:', msg.text()));
    page.on('error', err => console.error('Page error:', err));
    page.on('pageerror', err => console.error('Page error:', err));
    
    // Go to the page
    await page.goto('https://aatif786.github.io/pta-grade4/', { waitUntil: 'networkidle2' });
    
    // Wait for page to load
    await new Promise(r => setTimeout(r, 2000));
    
    // Check what's on the page
    const pageInfo = await page.evaluate(() => {
        return {
            hasVisualization: document.querySelector('.visualization') !== null,
            hasNumberDisplay: document.getElementById('numberDisplay') !== null,
            hasPlaceValueDisplay: document.getElementById('placeValueDisplay') !== null,
            visualizationHTML: document.querySelector('.visualization')?.innerHTML || 'NOT FOUND',
            hasUpdateFunction: typeof updateVisualization !== 'undefined',
            bodyLength: document.body.innerHTML.length
        };
    });
    
    console.log('Page info:', pageInfo);
    
    // Take a screenshot
    await page.screenshot({ path: 'live_site_check.png', fullPage: true });
    
    await browser.close();
})();