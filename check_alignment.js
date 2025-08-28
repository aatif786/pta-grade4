const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Go to the page
    await page.goto('https://aatif786.github.io/pta-grade4/', { waitUntil: 'networkidle2' });
    
    // Set viewport
    await page.setViewport({ width: 1200, height: 800 });
    
    // Change input to 200000
    await page.evaluate(() => {
        document.getElementById('inputNumber').value = '200000';
    });
    
    // Change place value to 100
    await page.evaluate(() => {
        document.getElementById('placeValue').value = '100';
    });
    
    // Trigger the update
    await page.evaluate(() => {
        updateVisualization();
    });
    
    // Wait a bit for rendering
    await new Promise(r => setTimeout(r, 1000));
    
    // Take a screenshot
    await page.screenshot({ path: 'alignment_check.png', fullPage: false });
    
    // Get the actual text content to check alignment
    const visualization = await page.evaluate(() => {
        const numberDisplay = document.getElementById('numberDisplay').textContent;
        const placeValueDisplay = document.getElementById('placeValueDisplay').textContent;
        return {
            number: numberDisplay,
            placeValue: placeValueDisplay,
            numberHTML: document.getElementById('numberDisplay').innerHTML,
            placeValueHTML: document.getElementById('placeValueDisplay').innerHTML
        };
    });
    
    console.log('Number display:', visualization.number);
    console.log('Place value display:', visualization.placeValue);
    console.log('\nHTML content:');
    console.log('Number HTML:', visualization.numberHTML);
    console.log('Place Value HTML:', visualization.placeValueHTML);
    
    await browser.close();
})();