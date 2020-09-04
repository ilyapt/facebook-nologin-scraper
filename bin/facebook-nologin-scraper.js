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
