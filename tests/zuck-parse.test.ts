const fs = require('fs');
const scraper = require('../lib/facebook-nologin-scraper');

it('Zuck Profile should correctly parsed', async () => {
    const page = fs.readFileSync(process.cwd() + '/tests/pages/fb-log-zuck.html').toString();
    const zuckDataString = fs.readFileSync(process.cwd() + '/tests/pages/fb-log-zuck.json').toString().trim();

    const data = scraper(page);

    expect(data.name).toBe('Mark Zuckerberg');
    expect(data.link).toBe('https://www.facebook.com/zuck');
    expect(Array.isArray(data.hometown)).toBeTruthy();

    expect(JSON.stringify(data)).toBe(zuckDataString);
});
