import * as cheerio from 'cheerio';
const entities = require("html-entities").XmlEntities;

import {EducationDetail} from "./interfaces/EducationDetail";

export const eduwork_common = (element: Cheerio) => {
    return {
        section: element.attr('data-pnref'),
        text: element.children('div').text(),
        items: element.children('ul').children('li').toArray().map(function (item: any) {
            item = cheerio.load(item)('li');
            const data = item.find('a').next('div');  // find div after link with image
            const link = data.find('a');
            const caption = link.parent().next('div');
            const _tmp = caption.next('div').text()
            const additional = _tmp ? [_tmp] : [];
            const retval: EducationDetail = {
                url: link.attr('href'),
                caption: link.text()
            };
            link.remove();
            const text = caption.text();
            if (text) {
                const delim = caption.find('[role="presentation"]').html();
                retval.text = delim ? text.split(entities.decode(delim)) : [text];
            }
            item.find('li').toArray().forEach(function (li: any) {
                additional.push(cheerio.load(li)('li').text());
            });
            if (additional.length) retval.additional = additional;
            return retval;
        })
    };
}
