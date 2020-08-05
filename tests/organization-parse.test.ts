const fs = require('fs');
import scraper from '../lib/facebook-nologin-scraper';

it('Organization Profile should correctly parsed', async () => {
    const page = fs.readFileSync(process.cwd() + '/tests/pages/fb-log-organization.html').toString();

    const data = scraper(page);

    expect(data.hasOwnProperty('error')).toBeFalsy()
    expect(data.name).toBe('Volkswagen Poznań - Fabryka Samochodów Dostawczych i Komponentów');
    expect(data.link).toBe('https://facebook.com/VolkswagenPoznan/');});

// this line fixed Cannot redeclare block-scoped variable 'fs'
// https://medium.com/@muravitskiy.mail/cannot-redeclare-block-scoped-variable-varname-how-to-fix-b1c3d9cc8206
export {};
