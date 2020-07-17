#!/usr/bin/node

var request = require('request');
var scraper = require('../lib/facebook-nologin-scraper');
const puppeteer = require('puppeteer');

if (process.argv.length !== 3) {
    console.log('Usage: node facebook-nologin-scraper.js <full_url_to_facebook_profile>');
    console.log('Example: node facebook-nologin-scraper.js https://www.facebook.com/zuck');
    process.exit(1);
}

async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });

  const page = await browser.newPage();
  await page.setViewport({
    width  : 1440,
    height : 900
  });

  await page.goto(process.argv[2]).catch((e) => {
    console.log('error', e);
  });

  await page.waitFor('#content_container', {timeout : 15000})
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
