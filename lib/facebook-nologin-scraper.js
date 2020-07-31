var cheerio = require('cheerio');
var entities = require("html-entities").XmlEntities;

module.exports = function (body) {
  var $ = cheerio.load(body);
  if (checkIsPublicPage($)) {
    // console.debug('that is organization page');
    return processPublicPage($);
  } else {
    const _contact = contact($('#pagelet_contact'));
    if (!_contact) return {error: $('title').text()};
    return {
      name: $('#fbProfileCover h1').text(),
      link: $('#fbProfileCover h1 a').attr('href'),
      avatar: $('#fbTimelineHeadline .profilePicThumb img').attr('src'),
      eduwork: eduwork($('#pagelet_eduwork')),
      hometown: hometown($('#pagelet_hometown')),
      bio: bio($('#pagelet_bio')),
      contact: _contact,
      favorites: favorites($('#favorites'))
    };
  }
};

function eduwork(section) {
  var cls = section.find('div[data-pnref]').attr('class');
  return section.find('.' + cls).toArray().map(function (element) {
    element = cheerio(element);
    if (element.attr('data-pnref')) return eduwork_common(element);
    else return {
      caption: element.children('div').text(),
      items: element.find('a').toArray().map(function (el) {
        return {
          text: cheerio(el).text(),
          url: cheerio(el).attr('href')
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
      item = cheerio(item);
      var data = item.find('a').next('div');  // find div after link with image
      var link = data.find('a');
      var caption = link.parent().next('div');
      var _tmp = caption.next('div').text()
      var additional = _tmp ? [_tmp] : [];
      var retval = {
        url: link.attr('href'),
        caption: link.text()
      };
      link.remove();
      var text = caption.text();
      if (text) {
        var delim = caption.find('[role="presentation"]').html();
        retval.text = delim ? text.split(entities.decode(delim)) : [text];
      }
      item.find('li').toArray().forEach(function (li) {
        additional.push(cheerio(li).text());
      });
      if (additional.length) retval.additional = additional;
      return retval;
    })
  };
}

function hometown(element) {
  return element.children('div').children('div[class]').toArray().map(function (item) {
    item = cheerio(item);
    return {
      caption: item.children('div').text(),
      items: item.find('ul li').toArray().map(function (li) {
        li = cheerio(li);
        var link = cheerio(element.find('a').toArray()[0]);
        var result = {text: link.text(), url: link.attr('href')};
        link.remove();
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
    text: cheerio(main.html().replace(/<br[^>]*>/gi, '\n')).text()
  } : null;
}

function contact(element) {
  element = element.html();
  if (!element) return false;
  var section = element.match(/<span[^>]+class[^>]+>[^<]+</g).map(function (el) {
    return el.match(/<span[^>]*class="[^"]+"[^>]*>/)[0]
  });
  return element.split(section[1]).slice(1).map(function (section) {
    return {
      section: section.match(/^([^<]+)</)[1],
      urls: cheerio(section).find('a').toArray().map(function (element) {
        element = cheerio(element);
        var url = element.attr('href');
        return {
          url: url.match(/facebook.com\/l\.php/) ? decodeURIComponent(url.match(/u=([^&]+)/)[1]) : url,
          text: element.text()
        };
      })
    };
  }).filter(function (section) {
    return section.urls.length;
  });
}

function favorites(element) {
  var sections = element.find('tbody').toArray();
  var other = cheerio(sections.pop());
  var retval = sections.map(function (section) {
    section = cheerio(section);
    return {
      label: section.find('.label').text(),
      url: section.find('.data a').attr('href'),
      text: section.find('.data a').text()
    }
  });
  retval.push({
    label: other.find('.label').text(),
    items: other.find('a').toArray().map(function (link) {
      link = cheerio(link);
      return {
        url: link.attr('href'),
        text: link.text()
      };
    }).filter(function (link) {
      return link.url !== '#'
    })
  });
  return retval;
}

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

function processPublicPage($) {
  // console.log('hidden elements : ', doc('div.hidden_elem').length);
  // console.debug(doc.html());

  let posts = [];

  $('.userContentWrapper').map((o, post) => {
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
        link: postLink
      };
      posts.push(item);
    }
  });

  const title = $('title');

  const name = title.text().split('').filter(c => {
    // remove LRE 0x202a character https://unicodemap.org/details/0x202A/index.html
    return c.charCodeAt(0) !== 8234
  }).join('').replace(/\|.*$/, '').split('-').reverse().filter((e, i) => i > 0).reverse().join('-').trim();

  const link = $('title+*').attr('href').replace(/\?.*?$/, '');

  return {
    name,
    link,
    posts
  };
}
