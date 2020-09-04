import {Contact} from './interfaces/Contact';
import * as cheerio from 'cheerio';

const sectionSelector = (section: string): string => {
    const matching = section.match(/^([^<]+)</) || ['', ''];
    return matching ? matching[1] : '';
};

export const contact = (element: Cheerio): Contact[] | false => {
    const htmlElement = element.html() || '';
    if (!element) return false;

    const elements = htmlElement.match(/<span[^>]+class[^>]+>[^<]+</g) || [];

    const section = elements.map((el: string): string => {
        const e = el.match(/<span[^>]*class="[^"]+"[^>]*>/) || [''];
        return e.length ? e[0] : '';
    });

    return htmlElement.split(section[1]).slice(1).map((section: string) => {
        return {
            section: sectionSelector(section),
            urls: cheerio(section).find('a').toArray().map((element: CheerioElement) => {
                const processedElement = cheerio(element);
                const url = processedElement.attr('href') || '';
                const matching = url.match(/u=([^&]+)/) || ['', ''];
                return {
                    url: url.match(/facebook.com\/l\.php/) ? decodeURIComponent(matching[1] || '') : url,
                    text: processedElement.text() || ''
                };
            })
        };
    }).filter((section) => section.urls.length);
};
