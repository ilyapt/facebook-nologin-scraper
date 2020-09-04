import {Bio} from './interfaces/Bio';
import * as cheerio from 'cheerio';

export const bio = (element: Cheerio): Bio | null => {
    const caption = element.children('div').children('div').children('span');
    const main = element.find('ul');
    const html = main.html() || '';
    return (caption && main && main.html()) ? {
        caption: caption.text(),
        text: cheerio(html.replace(/<br[^>]*>/gi, '\n')).text()
    } : null;
};
