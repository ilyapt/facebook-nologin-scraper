import * as cheerio from 'cheerio';
const entities = require("html-entities").XmlEntities;

import {normalizeFbLink} from "./facebook-nologin-scraper";

export const processPublicPage = ($: any) => {
    let posts: PostTimed[] = [];

    $('.userContentWrapper').map((o: any, post: any) => {
        // @ts-ignore
        post = cheerio(post, {decodeEntities: false});
        const postData = entities.decode(post.find('.userContent').html());
        let postTime = post.find('abbr.timestamp').data('utime');
        let postLink = 'https://facebook.com' + post.find('abbr.timestamp').parent().attr('href');
        if (!postTime) {
            postTime = post.find('abbr[data-utime]').data('utime');
            postLink = 'https://facebook.com' + post.find('abbr[data-utime]').parent().attr('href');
        }

        if (postData && postTime) {
            const item = {
                content: postData,
                time: postTime,
                link: normalizeFbLink(postLink)
            };
            posts.push(item);
        }
    });

    const title = $('title');

    const name = title.text().split('').filter((c: string): boolean => {
        // remove LRE 0x202a character https://unicodemap.org/details/0x202A/index.html
        return c.charCodeAt(0) !== 8234
    }).join('').replace(/\|.*$/, '').split('-').reverse().filter((e: string, i: number): boolean => i > 0).reverse().join('-').trim();

    const link = normalizeFbLink($('title+*').attr('href').replace(/\?.*?$/, ''));

    return {
        name,
        link,
        posts
    };
}
