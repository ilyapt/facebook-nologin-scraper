const fs = require('fs');
import scraper from '../src/facebook-nologin-scraper';

const readPage = (file: string): string => fs.readFileSync(process.cwd() + `/tests/pages/${file}.html`).toString()

it('Organization Profile should correctly parsed', async () => {
    const data = scraper(readPage('fb-log-organization'));

    expect(data.hasOwnProperty('error')).toBeFalsy()
    expect(data.name).toBe('Volkswagen Poznań - Fabryka Samochodów Dostawczych i Komponentów');
    expect(data.link).toBe('https://facebook.com/VolkswagenPoznan/');
});

it('Michał Burtowy - Adwokat organization should be parsed', async () => {
    const data = scraper(readPage('fb-log-adwokatburtowy'));
    expect(data.name).toBe('Michał Burtowy - Adwokat');
    expect(data.link).toBe('https://facebook.com/adwokatburtowy/');
});

// this line fixed Cannot redeclare block-scoped variable 'fs'
// https://medium.com/@muravitskiy.mail/cannot-redeclare-block-scoped-variable-varname-how-to-fix-b1c3d9cc8206
export {};
