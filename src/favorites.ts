import * as cheerio from 'cheerio';
import {Favorite} from './interfaces/Favorite';
import {OtherFavorites} from './interfaces/OtherFavorites';

export const favorites = (element: Cheerio): (Favorite | OtherFavorites)[] => {
    const sections = element.find('tbody').toArray();
    const other = cheerio(sections.pop());

    return [
        ...sections.map((section: CheerioElement): Favorite => {
            const sectionElement = cheerio(section);
            return {
                label: sectionElement.find('.label').text(),
                url: sectionElement.find('.data a').attr('href') || '',
                text: sectionElement.find('.data a').text()
            };
        }),
        ...[{
            label: other.find('.label').text() || '',
            items: other.find('a').toArray().map((link: CheerioElement) => {
                const linkElement = cheerio(link);
                return {
                    url: linkElement.attr('href') || '',
                    text: linkElement.text() || ''
                };
            }).filter((link) => link.url !== '#'),
        }]
    ];
};
