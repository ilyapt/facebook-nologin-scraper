#!/usr/bin/node

const axios = require('axios')
const scraper = require('..').default

if (process.argv.length !== 3) {
    console.log('Usage: node facebook-nologin-scraper.js <full_url_to_facebook_profile>')
    console.log('Example: node facebook-nologin-scraper.js https://www.facebook.com/zuck')
    process.exit(1)
}

axios.get(process.argv[2], {
    headers: {
        'user-agent': 'curl/7.47.0',
        'accept-language': 'en-US,en',
        'accept': '*/*'
    }
}).then(response => {
    console.log(JSON.stringify(scraper(response.data), null, 2))
}).catch(error => {
    if (error.response && error.response.status) {
        console.error(`HTTP Error: ${error.response.status}`)
    } else {
        console.error(error)
    }
})

// const scraper = require('../lib/facebook-nologin-scraper').default;
// const puppeteer = require('puppeteer');
//
// const { link, proxyHost, proxyPort, proxyUser, proxyPass } = argv;
//
// if (!link) {
//     console.log('Usage: node facebook-nologin-scraper.js <full_url_to_facebook_profile>');
//     console.log('Example: node facebook-nologin-scraper.js --link=https://www.facebook.com/zuck');
//     process.exit(1);
// }
//
// async function timeout(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
//
// (async () => {
//
//     const browserArgs = [];
//     if(proxyHost && proxyPort){
//         browserArgs.push('--proxy-server=' + proxyHost + ':' + proxyPort);
//         browserArgs.push('--disable-session-crashed-bubble');
//         browserArgs.push('--disable-restore-session-state');
//     }
//
//     const browser = await puppeteer.launch({
//         headless: true,
//         args: browserArgs
//     });
//
//     browser.on('disconnected', () => {
//         console.log("disconnected");
//         process.exit();
//     });
//
//     const page = await browser.newPage();
//     await page.setViewport({
//         width: 1440,
//         height: 900
//     });
//
//     if(proxyUser && proxyPass) {
//         await page.authenticate({username: proxyUser, password: proxyPass});
//     }
//
//     await page.goto(link).catch((e) => {
//         console.log('error', e);
//     });
//
//     try {
//         await page.waitFor('#content_container', {timeout: 15000})
//         if(await page.$('div[data-key="tab_posts"]') !== null){
//             await page.click('div[data-key="tab_posts"]');
//             await page.waitForNavigation({timeout : 120000});
//             await page.waitFor('#content_container', {timeout: 15000})
//         }
//     } catch (error) {
//         console.log(error)
//         process.exit();
//     }
//     // await page.waitForNavigation({timeout : 120000});
//     await timeout(10000);
//     const body = await page.evaluate(() => new XMLSerializer().serializeToString(document));
//     // console.log(body);
//     console.log(JSON.stringify(scraper(body), null, 2));
//
//     await browser.close();
//
// })();
