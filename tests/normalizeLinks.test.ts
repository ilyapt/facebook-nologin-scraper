import {normalizeFbLink} from "../src/normalizeLink";

it('Links from FB should be normalized for comparison', () => {
    const wwwLink = 'https://www.facebook.com/poznan.volkswagen/';
    const mobileLink = 'https://m.facebook.com/poznan.volkswagen/';
    const normalLink = 'https://facebook.com/poznan.volkswagen/';

    expect(normalizeFbLink(wwwLink)).toEqual(normalLink)
    expect(normalizeFbLink(mobileLink)).toEqual(normalLink)
    expect(normalizeFbLink('')).toEqual('')
})
