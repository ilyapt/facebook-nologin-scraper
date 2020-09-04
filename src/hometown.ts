import {HomeTownSummary} from "./interfaces/HomeTownSummary";
import * as cheerio from 'cheerio';

export const hometown = (element: any): HomeTownSummary[] => {
    //@ts-ignore
    return element.children('div').children('div[class]').toArray().map(function (item) {
        //@ts-ignore
        item = cheerio(item);
        return {
            caption: item.children('div').text(),
            //@ts-ignore
            items: item.find('ul li').toArray().map(function (li) {
                //@ts-ignore
                li = cheerio(li);
                //@ts-ignore
                const link = cheerio(element.find('a').toArray()[0]);
                const result = {text: link.text(), url: link.attr('href')};
                link.remove();
                //@ts-ignore
                result.type = li.text();
                return result;
            })
        };
    });
}
