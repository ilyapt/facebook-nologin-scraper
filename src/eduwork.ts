import * as cheerio from 'cheerio';
const entities = require("html-entities").XmlEntities;

import {EduWork} from "./interfaces/EduWork";
import {eduwork_common} from "./eduwork_common";

export const eduwork = (section: any) => {
    const cls = section.find('div[data-pnref]').attr('class');
    return section.find('.' + cls).toArray().map(function (documentElement: CheerioElement) {
        const element = cheerio.load(documentElement)('html');
        if (element.attr('data-pnref')) return eduwork_common(element);
        else return {
            caption: element.children('div').text(),
            items: element.find('a').toArray().map(function (el: CheerioElement): EduWork {
                return {
                    text: cheerio.load(el)('*').text(),
                    url: cheerio.load(el)('*').attr('href') || ''
                };
            })
        };
    });
}
