import {Contact} from "./interfaces/Contact";
import * as cheerio from 'cheerio';

export const contact = (element: any): Contact[] | false => {
    element = element.html();
    if (!element) return false;
    //@ts-ignore
    const section = element.match(/<span[^>]+class[^>]+>[^<]+</g).map(function (el) {
        return el.match(/<span[^>]*class="[^"]+"[^>]*>/)[0]
    });
    //@ts-ignore
    return element.split(section[1]).slice(1).map(function (section) {
        return {
            section: section.match(/^([^<]+)</)[1],
            //@ts-ignore
            urls: cheerio(section).find('a').toArray().map(function (element) {
                //@ts-ignore
                element = cheerio(element);
                //@ts-ignore
                const url = element.attr('href');
                return {
                    url: url.match(/facebook.com\/l\.php/) ? decodeURIComponent(url.match(/u=([^&]+)/)[1]) : url,
                    //@ts-ignore
                    text: element.text()
                };
            })
        };
        //@ts-ignore
    }).filter(function (section) {
        return section.urls.length;
    });
}
