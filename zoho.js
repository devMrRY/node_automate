#!/usr/bin/env node
const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log('starting script...');
        const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });
        const page = await browser.newPage();
        let url = 'https://projects.zoho.com/portal/iworklab#myclassic/customview/19'
        await page.goto(url, {
            waitUntil: 'networkidle2',
        });
        await page.waitForTimeout(2000)
        await page.click('#login_id');
        await page.type('#login_id', process.env.ZOHO_MAIL_ID)
        await page.click('#nextbtn');
        await page.waitForTimeout(2000);
        
        await page.click('#password');
        await page.type('#password', process.env.ZOHO_PASSWORD);
        await page.click('#nextbtn');
        await page.waitForTimeout(15000);
        // await page.click('#rmLaterBtn');

        await page.goto('https://projects.zoho.com/portal/iworklab#taskdetail/1056743000009748573/1056743000009755006/1056743000012656604')
        await page.waitForTimeout(3000);
        await page.click('#tlid_tab');
        await page.waitForTimeout(3000);
        await page.click('#addloghr');
        await page.waitForTimeout(3000);
        await page.click('#dailylog');
        await page.type('#dailylog', '08:35')
        await page.click('#btn_1');
        
        await browser.close();
        console.log('ending script...');
    } catch (error) {
        console.log(error)
    }
})();