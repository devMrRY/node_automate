const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log('starting script...');
        const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });
        const page = await browser.newPage();
        let url = 'https://amazon.in'
        await page.goto(url, {
            waitUntil: 'networkidle2',
        });
        await page.waitForTimeout(2000)
        await page.click('#nav-link-accountList');
        await page.waitForTimeout(2000)
        await page.click('#ap_email');
        await page.type('#ap_email', AMAZON_MAIL_ID)
        await page.click('#continue');
        await page.waitForTimeout(2000)
        await page.click('#ap_password');
        await page.type('#ap_password', AMAZON_PASSWORD)
        await page.click('#signInSubmit');
        await page.waitForTimeout(2000);
        await page.goto('https://www.amazon.in/dp/B082MDMW3X/ref=s9_acsd_al_bw_c2_x_0_i?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-5&pf_rd_r=W9KSQ2ZH9GHBYTPGP674&pf_rd_t=101&pf_rd_p=8398f427-fbf5-4310-a31e-29a4be7a59bc&pf_rd_i=26297682031')
        for(let i=0; i<10; i++){
            let price = await page.evaluate(async ()=>{
                let price = null;
                await new Promise((resolve)=>{
                    setTimeout(()=>{
                        price = document.querySelector('#priceblock_ourprice').innerHTML
                        resolve();
                    },30000)
                })
                return price
            })
            console.log(price)
        }
        // await browser.close();
        console.log('ending script...');
    } catch (error) {
        console.log(error)
    }
})();
