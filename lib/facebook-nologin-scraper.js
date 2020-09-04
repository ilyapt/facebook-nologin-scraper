"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsPublicPage = exports.normalizeFbLink = void 0;
const cheerio = require("cheerio");
const entities = require("html-entities").XmlEntities;
const getGenderFromName_1 = require("./getGenderFromName");
const normalizeLink_1 = require("./normalizeLink");
// import {Cheerio} from '@types/cheerio';
exports.normalizeFbLink = normalizeLink_1.normalizeFbLink;
function default_1(body) {
    const $ = cheerio.load(body);
    if (checkIsPublicPage($)) {
        // console.debug('that is organization page');
        return processPublicPage($);
    }
    else {
        const _contact = contact($('#pagelet_contact'));
        // if (!_contact) throw new Error($('title').text());
        const name = $('#fbProfileCover h1').text();
        const cover = $('#fbProfileCover h1 a');
        return {
            name,
            'name-based-gender': getGenderFromName_1.getGenderFromName(name),
            link: normalizeLink_1.normalizeFbLink(String(cover ? cover.attr('href') : '')),
            avatar: $('#fbTimelineHeadline .profilePicThumb img').attr('src'),
            eduwork: eduwork($('#pagelet_eduwork')),
            hometown: hometown($('#pagelet_hometown')),
            bio: bio($('#pagelet_bio')),
            contact: _contact,
            favorites: favorites($('#favorites'))
        };
    }
}
exports.default = default_1;
;
function eduwork(section) {
    const cls = section.find('div[data-pnref]').attr('class');
    return section.find('.' + cls).toArray().map(function (documentElement) {
        const element = cheerio.load(documentElement)('html');
        if (element.attr('data-pnref'))
            return eduwork_common(element);
        else
            return {
                caption: element.children('div').text(),
                items: element.find('a').toArray().map(function (el) {
                    return {
                        text: cheerio.load(el)('*').text(),
                        url: cheerio.load(el)('*').attr('href') || ''
                    };
                })
            };
    });
}
function eduwork_common(element) {
    return {
        section: element.attr('data-pnref'),
        text: element.children('div').text(),
        items: element.children('ul').children('li').toArray().map(function (item) {
            item = cheerio.load(item)('li');
            const data = item.find('a').next('div'); // find div after link with image
            const link = data.find('a');
            const caption = link.parent().next('div');
            const _tmp = caption.next('div').text();
            const additional = _tmp ? [_tmp] : [];
            const retval = {
                url: link.attr('href'),
                caption: link.text()
            };
            link.remove();
            const text = caption.text();
            if (text) {
                const delim = caption.find('[role="presentation"]').html();
                retval.text = delim ? text.split(entities.decode(delim)) : [text];
            }
            item.find('li').toArray().forEach(function (li) {
                additional.push(cheerio.load(li)('li').text());
            });
            if (additional.length)
                retval.additional = additional;
            return retval;
        })
    };
}
function hometown(element) {
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
                var link = cheerio(element.find('a').toArray()[0]);
                var result = { text: link.text(), url: link.attr('href') };
                link.remove();
                //@ts-ignore
                result.type = li.text();
                return result;
            })
        };
    });
}
function bio(element) {
    var caption = element.children('div').children('div').children('span');
    var main = element.find('ul');
    return (caption && main && main.html()) ? {
        caption: caption.text(),
        //@ts-ignore
        text: cheerio(main.html().replace(/<br[^>]*>/gi, '\n')).text()
    } : null;
}
function contact(element) {
    element = element.html();
    if (!element)
        return false;
    //@ts-ignore
    var section = element.match(/<span[^>]+class[^>]+>[^<]+</g).map(function (el) {
        return el.match(/<span[^>]*class="[^"]+"[^>]*>/)[0];
    });
    //@ts-ignore
    return element.split(section[1]).slice(1).map(function (section) {
        return {
            section: section.match(/^([^<]+)</)[1],
            //@ts-ignore
            urls: cheerio(section).find('a').toArray().map(function (element) {
                //@ts-ignore
                element = cheerio(element);
                //@ts-ignore
                var url = element.attr('href');
                return {
                    url: url.match(/facebook.com\/l\.php/) ? decodeURIComponent(url.match(/u=([^&]+)/)[1]) : url,
                    //@ts-ignore
                    text: element.text()
                };
            })
        };
        //@ts-ignore
    }).filter(function (section) { return section.urls.length; });
}
// function contact(element:any):Contact[]|false {
//   element = element.html();
//   if (!element) return false;
//   const section = element.match(/<span[^>]+class[^>]+>[^<]+</g).map(function (el:any) {
//     return el.match(/<span[^>]*class="[^"]+"[^>]*>/)[0]
//   });
//   return element.split(section[1]).slice(1).map(function (section:any) {
//     return {
//       section: section.match(/^([^<]+)</)[1],
//       urls: cheerio.load(section)('a').find('a').toArray().map(function (elementDoc:CheerioElement) {
//         element = cheerio.load(elementDoc)('a');
//         const url = element.attr('href');
//         return {
//           url: url.match(/facebook.com\/l\.php/) ? decodeURIComponent(url.match(/u=([^&]+)/)[1]) : url,
//           text: element.text()
//         };
//       })
//     };
//   }).filter(function (section:any) {
//     return section.urls.length;
//   });
// }
function favorites(element) {
    var sections = element.find('tbody').toArray();
    //@ts-ignore
    var other = cheerio(sections.pop());
    var retval = sections.map(function (section) {
        //@ts-ignore
        section = cheerio(section);
        return {
            //@ts-ignore
            label: section.find('.label').text(),
            //@ts-ignore
            url: section.find('.data a').attr('href'),
            //@ts-ignore
            text: section.find('.data a').text()
        };
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
        }).filter(function (link) { return link.url !== '#'; })
    });
    return retval;
}
// function favorites(element: any):any {
//   const sections = element.find('tbody').toArray();
//   const other = cheerio.load(sections.pop())('');
//   const retval = sections.map(function (section:any) {
//     section = cheerio.load(section)('');
//     return {
//       label: section.find('.label').text(),
//       url: section.find('.data a').attr('href'),
//       text: section.find('.data a').text()
//     }
//   });
//   retval.push({
//     label: other.find('.label').text(),
//     items: other.find('a').toArray().map(function (link:any) {
//       link = cheerio.load(link)('a');
//       return {
//         url: link.attr('href'),
//         text: link.text()
//       };
//     }).filter(function (link:any) {
//       return link.url !== '#'
//     })
//   });
//   return retval;
// }
function checkIsPublicPage(doc) {
    let isPage = false;
    if (doc('#pagelet_group_').length > 0) {
        isPage = true;
    }
    if (doc('#PagesProfileHomePrimaryColumnPagelet').length > 0) {
        isPage = true;
    }
    // TODO just public page
    if (doc('.userContentWrapper').length > 0) {
        isPage = true;
    }
    return isPage;
}
exports.checkIsPublicPage = checkIsPublicPage;
function processPublicPage($) {
    // console.log('hidden elements : ', doc('div.hidden_elem').length);
    // console.debug(doc.html());
    let posts = [];
    $('.userContentWrapper').map((o, post) => {
        // @ts-ignore
        post = cheerio(post, { decodeEntities: false });
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
                link: exports.normalizeFbLink(postLink)
            };
            posts.push(item);
        }
    });
    const title = $('title');
    const name = title.text().split('').filter((c) => {
        // remove LRE 0x202a character https://unicodemap.org/details/0x202A/index.html
        return c.charCodeAt(0) !== 8234;
    }).join('').replace(/\|.*$/, '').split('-').reverse().filter((e, i) => i > 0).reverse().join('-').trim();
    const link = exports.normalizeFbLink($('title+*').attr('href').replace(/\?.*?$/, ''));
    return {
        name,
        link,
        posts
    };
}
//@ts-ignore-end
