import {HomeTownSummary} from './interfaces/HomeTownSummary';
import * as cheerio from 'cheerio';

export const hometown = (element: Cheerio): HomeTownSummary[] => {
    return element.children('div').children('div[class]').toArray().map((item: CheerioElement): HomeTownSummary => {
        const itemElement = cheerio(item);
        return {
            caption: itemElement.children('div').text(),
            items: itemElement.find('ul li').toArray().map((li: CheerioElement) => {
                const liElement = cheerio(li);
                const link = cheerio(liElement.find('a').toArray()[0]);
                return {
                    text: link.text(),
                    url: link.attr('href') || '',
                    type: liElement.find('span + div').text() || ''
                };
            })
        };
    });
};
