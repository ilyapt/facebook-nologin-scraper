const fs = require('fs');
import scraper, {checkIsPublicPage} from '../src/facebook-nologin-scraper';
const cheerio = require('cheerio');

it('Zuck Profile should correctly parsed', async () => {
    const page:string = fs.readFileSync(process.cwd() + '/tests/pages/fb-log-zuck.html').toString();
    const zuckDataString = fs.readFileSync(process.cwd() + '/tests/pages/fb-log-zuck.json').toString().trim();

    const $ = cheerio.load(page);

    expect(checkIsPublicPage($)).toBeFalsy();

    const data = scraper(page);


    expect(data.name).toBe('Mark Zuckerberg');
    expect(data.link).toBe('https://facebook.com/zuck');
    expect(Array.isArray(data.hometown)).toBeTruthy();

    expect(JSON.stringify(data)).toBe(zuckDataString);
});
