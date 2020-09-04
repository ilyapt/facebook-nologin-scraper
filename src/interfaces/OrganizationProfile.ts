import {PostTimed} from './PostTimed';

export interface OrganizationProfile {
    name: string;
    link: string;
    posts: PostTimed[];
    hometown?: null
}
