#!/usr/bin/node

const request = require('request');
const scraper = require('..').default;

console.log(scraper)

if(process.argv.length !== 3) {
  console.log('Usage: node facebook-nologin-scraper.js <full_url_to_facebook_profile>');
  console.log('Example: node facebook-nologin-scraper.js https://www.facebook.com/zuck');
  process.exit(1);
}

request(process.argv[2],
  {
    headers: {
      'user-agent': 'curl/7.47.0',
      'accept-language': 'en-US,en',
      'accept': '*/*'
    }
  }, function (error, response, body) {
    if (error) {
      throw (error);
    }
    if (response.statusCode === 200) {
      console.log(JSON.stringify(scraper(body), null, 2));
    } else {
      console.log('HTTP Error: ' + response.statusCode);
    }
});
