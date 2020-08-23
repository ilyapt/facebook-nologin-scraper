#!/usr/bin/node

var request = require('request');
var scraper = require('..');

if(process.argv.length !== 3) {
  console.log('Usage: node facebook-nologin-scraper.ts <full_url_to_facebook_profile>');
  console.log('Example: node facebook-nologin-scraper.ts https://www.facebook.com/zuck');
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
