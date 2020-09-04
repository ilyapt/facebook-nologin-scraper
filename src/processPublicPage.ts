import * as cheerio from 'cheerio';
import * as entities from 'html-entities';

import {normalizeFbLink} from './facebook-nologin-scraper';
import {OrganizationProfile} from './interfaces/OrganizationProfile';
import {PostTimed} from './interfaces/PostTimed';

const noLreCharacter = (c: string): boolean => {
    // remove LRE 0x202a character https://unicodemap.org/details/0x202A/index.html
    return c.charCodeAt(0) !== 8234;
};

export const processPublicPage = ($: CheerioStatic): OrganizationProfile => {
    const posts: PostTimed[] = [];

    $('.userContentWrapper').map((o: number, post: CheerioElement) => {
        const postElement = cheerio(post);
        const postData = entities.XmlEntities.decode(postElement.find('.userContent').html() || '');
        let postTime = postElement.find('abbr.timestamp').data('utime');
        let postLink = 'https://facebook.com' + postElement.find('abbr.timestamp').parent().attr('href');
        if (!postTime) {
            postTime = postElement.find('abbr[data-utime]').data('utime');
            postLink = 'https://facebook.com' + postElement.find('abbr[data-utime]').parent().attr('href');
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

    const name = title
        .text()
        .split('')
        .filter(noLreCharacter)
        .join('')
        .replace(/\|.*$/, '')
        .split('-')
        .reverse()
        .filter((e: string, i: number): boolean => i > 0)
        .reverse()
        .join('-')
        .trim();

    const linkText = $('title+*').attr('href') || '';
    const link = normalizeFbLink(linkText.replace(/\?.*?$/, ''));

    return {
        name,
        link,
        posts
    };
};
