import {contact} from './contact';
import {getGenderFromName} from './getGenderFromName';
import {normalizeFbLink as normalizeLink} from './normalizeLink';
import {eduwork} from './eduwork';
import {hometown} from './hometown';
import {bio} from './bio';
import {favorites} from './favorites';
import {PersonProfile} from './interfaces/PersonProfile';

export const processPrivatePage = ($: CheerioStatic): PersonProfile => {
    const _contact = contact($('#pagelet_contact'));

    const name = $('#fbProfileCover h1').text();
    const cover: Cheerio = $('#fbProfileCover h1 a');

    return {
        name,
        'name-based-gender': getGenderFromName(name),
        link: normalizeLink(String(cover ? cover.attr('href') : '')),
        avatar: $('#fbTimelineHeadline .profilePicThumb img').attr('src'),
        eduwork: eduwork($('#pagelet_eduwork')),
        hometown: hometown($('#pagelet_hometown')),
        bio: bio($('#pagelet_bio')),
        contact: _contact,
        favorites: favorites($('#favorites'))
    };
};
