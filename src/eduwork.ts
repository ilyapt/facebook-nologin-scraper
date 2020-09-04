import * as cheerio from 'cheerio';

import {EduWork} from './interfaces/EduWork';
import {eduwork_common} from './eduwork_common';
import {EduWorkCommon} from './interfaces/EduWorkCommon';

export const eduwork = (section: Cheerio): (EduWork | EduWorkCommon)[] => {
    const cls = section.find('div[data-pnref]').attr('class');

    return section.find('.' + cls)
        .toArray()
        .map((documentElement: CheerioElement): EduWork | EduWorkCommon => {
            const element = cheerio.load(documentElement)('html');
            if (element.attr('data-pnref'))
                return eduwork_common(element);
            else
                return {
                    caption: element.children('div').text() || '',
                    items: element.find('a').toArray().map((el: CheerioElement): { text: string, url: string } => ({
                        text: cheerio.load(el)('*').text() || '',
                        url: cheerio.load(el)('*').attr('href') || ''
                    }))
                };
        });
};
