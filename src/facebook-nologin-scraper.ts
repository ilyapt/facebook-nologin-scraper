import * as cheerio from 'cheerio';

import {normalizeFbLink as normalizeLink} from './normalizeLink';
import {PersonProfile} from './interfaces/PersonProfile';
import {OrganizationProfile} from './interfaces/OrganizationProfile';
import {checkIsPublicPage} from './checkIsPublicPage';
import {processPublicPage} from './processPublicPage';
import {processPrivatePage} from './processPrivatePage';
// import {Cheerio} from '@types/cheerio';

export const normalizeFbLink = normalizeLink;

export default function (body: string): PersonProfile | OrganizationProfile {
    const $ = cheerio.load(body);
    if (checkIsPublicPage($)) {
        return processPublicPage($);
    } else {
        return processPrivatePage($);
    }
}
