import * as cheerio from 'cheerio';
import * as entities from 'html-entities';
import {EducationDetail} from './interfaces/EducationDetail';
import {EduWork} from './interfaces/EduWork';

export const eduwork_common = (element: Cheerio): EduWork => {
    return {
        section: element.attr('data-pnref') || '',
        text: element.children('div').text() || '',
        items: element.children('ul').children('li').toArray().map((item: CheerioElement) => {
            const itemElement = cheerio.load(item)('li');
            const data = itemElement.find('a').next('div');  // find div after link with image
            const link = data.find('a');
            const caption = link.parent().next('div');
            const _tmp = caption.next('div').text();
            const additional = _tmp ? [_tmp] : [];
            const retval: EducationDetail = {
                url: link.attr('href') || '',
                caption: link.text() || '',
                text: []
            };
            link.remove();
            const text = caption.text();
            if (text) {
                const delim = caption.find('[role="presentation"]').html();
                retval.text = delim ? text.split(entities.XmlEntities.decode(delim)) : [text];
            }
            itemElement.find('li').toArray().forEach((li: CheerioElement) => {
                additional.push(cheerio.load(li)('li').text());
            });
            if (additional.length) retval.additional = additional;
            return retval;
        })
    };
};
