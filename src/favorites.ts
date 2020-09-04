import * as cheerio from 'cheerio';

export const favorites = (element: Cheerio): any => {
    const sections = element.find('tbody').toArray();
    //@ts-ignore
    const other = cheerio(sections.pop());
    const retval = sections.map(function (section) {
        //@ts-ignore
        section = cheerio(section);
        return {
            //@ts-ignore
            label: section.find('.label').text(),
            //@ts-ignore
            url: section.find('.data a').attr('href'),
            //@ts-ignore
            text: section.find('.data a').text()
        }
    });
    retval.push({
        label: other.find('.label').text(),
        //@ts-ignore
        items: other.find('a').toArray().map(function (link) {
            //@ts-ignore
            link = cheerio(link);
            return {
                //@ts-ignore
                url: link.attr('href'),
                //@ts-ignore
                text: link.text()
            };
            //@ts-ignore
        }).filter(function (link) {
            return link.url !== '#'
        })
    });
    return retval;
}
