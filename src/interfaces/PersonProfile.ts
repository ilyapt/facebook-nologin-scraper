import {Gender} from '../getGenderFromName';
import {EduWork} from './EduWork';
import {HomeTownSummary} from './HomeTownSummary';
import {Bio} from './Bio';
import {Contact} from './Contact';
import {EduWorkCommon} from './EduWorkCommon';
import {Favorite} from './Favorite';
import {OtherFavorites} from './OtherFavorites';

export interface PersonProfile {
    name?: string;
    'name-based-gender'?: Gender;
    link: string;
    avatar?: string;
    eduwork?: (EduWork | EduWorkCommon)[];
    hometown?: HomeTownSummary[];
    bio?: Bio | null;
    contact?: Contact[] | false;
    favorites?: (Favorite | OtherFavorites)[];
}
