#!/usr/bin/node

var request = require('request');
var scraper = require('../lib/facebook-nologin-scraper');
const argv = require('yargs').argv;
const puppeteer = require('puppeteer');

const bloggerPage = argv.link
const proxyHost = argv.proxyHost;
const proxyPort = argv.proxyPort;
const proxyUser = argv.proxyUser;
const proxyPass = argv.proxyPass;

if (!bloggerPage) {
    console.log('Usage: node facebook-nologin-scraper.js <full_url_to_facebook_profile>');
    console.log('Example: node facebook-nologin-scraper.js --link=https://www.facebook.com/zuck');
    process.exit(1);
}

async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {

    const browserArgs = [];
    if(proxyHost && proxyPort){
        browserArgs.push('--proxy-server=' + proxyHost + ':' + proxyPort);
        browserArgs.push('--disable-session-crashed-bubble');
        browserArgs.push('--disable-restore-session-state');
    }

    const browser = await puppeteer.launch({
        headless: true,
        args: browserArgs
    });

    browser.on('disconnected', () => {
        process.exit();
    });

    const page = await browser.newPage();
    await page.setViewport({
        width: 1440,
        height: 900
    });

    if(proxyUser && proxyPass) {
        await page.authenticate({username: proxyUser, password: proxyPass});
    }

    await page.goto(bloggerPage).catch((e) => {
        console.log('error', e);
    });

    try {
        await page.waitFor('#content_container', {timeout: 15000})
        if(await page.$('div[data-key="tab_posts"]') !== null){
            await page.click('div[data-key="tab_posts"]');
            await page.waitForNavigation({timeout : 120000});
            await page.waitFor('#content_container', {timeout: 15000})
        }
    } catch (error) {
        process.exit();
    }
    // await page.waitForNavigation({timeout : 120000});
    await timeout(10000);
    const body = await page.evaluate(() => new XMLSerializer().serializeToString(document));
    // console.log(body);
    console.log(JSON.stringify(scraper(body), null, 2));

    browser.close();

})();

// request(process.argv[2],
//     {
//         headers: {
//             'user-agent': 'curl/7.47.0',
//             'accept-language': 'en-US,en',
//             'accept': '*/*'
//         }
//     }, function (error, response, body) {
//         if (error) {
//             throw (error);
//         }
//         if (response.statusCode === 200) {
//             console.log(JSON.stringify(scraper(body), null, 2));
//         } else {
//             console.log('HTTP Error: ' + response.statusCode);
//         }
//     });
