const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        let logs = [];
        
        page.on('console', msg => {
            logs.push(`[CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
            console.log(`[CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
        });
        
        page.on('pageerror', error => {
            logs.push(`[PAGE ERROR]: ${error.message}`);
            console.log(`[PAGE ERROR]: ${error.message}`);
        });
        
        page.on('response', response => {
            if (!response.ok()) {
                logs.push(`[RESPONSE ERROR] ${response.status()}: ${response.url()}`);
            }
        });

        page.on('requestfailed', request => {
            logs.push(`[REQUEST FAILED]: ${request.url()} - ${request.failure().errorText}`);
        });

        console.log("Navigating to login...");
        await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
        
        console.log("Logging in...");
        // Fill out login form based on the browser UI earlier
        // Ensure selectors are correct based on common practices or by examining the DOM
        
        // Let's assume there are two inputs for email and password
        await page.type('input[type="email"]', 'manojkumar.ec23@bitsathy.ac.in');
        await page.type('input[type="password"]', '491194');
        
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
            page.click('button[type="submit"]')
        ]);
        
        console.log("Current URL after login:", page.url());
        
        // Wait a bit
        await new Promise(r => setTimeout(r, 2000));
        
        console.log("Navigating to Police Dashboard...");
        // URL should be /police
        if (!page.url().includes('police')) {
            await page.goto('http://localhost:5173/police', { waitUntil: 'networkidle0' });
        }
        
        console.log("Searching for user...");
        await page.type('input[placeholder*="Identify subject"]', 'manojkumar.ec23@bitsathy.ac.in');
        
        // Press Enter
        await page.keyboard.press('Enter');
        
        await new Promise(r => setTimeout(r, 2000));
        
        console.log("Clicking GPS Track...");
        // GPS Track button
        // <button className="primary-action">
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const trackingBtn = btns.find(b => b.textContent.includes('GPS Track'));
            if(trackingBtn) trackingBtn.click();
        });
        
        await new Promise(r => setTimeout(r, 3000));
        console.log("URL after clicking GPS Track:", page.url());
        
        // Take a screenshot
        await page.screenshot({path: 'gps_track.png'});
        
        console.log("Going back to Police Dashboard...");
        await page.goto('http://localhost:5173/police', { waitUntil: 'networkidle0' });
        
        console.log("Searching for user again...");
        await page.type('input[placeholder*="Identify subject"]', 'manojkumar.ec23@bitsathy.ac.in');
        await page.keyboard.press('Enter');
        await new Promise(r => setTimeout(r, 2000));
        
        console.log("Clicking Travel History...");
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const histBtn = btns.find(b => b.textContent.includes('Travel History'));
            if(histBtn) histBtn.click();
        });
        
        await new Promise(r => setTimeout(r, 3000));
        console.log("URL after clicking Travel History:", page.url());
        
        // Take a screenshot
        await page.screenshot({path: 'travel_history.png'});

        fs.writeFileSync('browser_logs.txt', logs.join('\n'));
        
        await browser.close();
        console.log("Done checking with Puppeteer.");
    } catch (e) {
        console.error("PUPPETEER SCRIPT ERROR:", e);
    }
})();
