import {Gender} from "../getGenderFromName";
import {EduWork} from "./EduWork";
import {HomeTownSummary} from "./HomeTownSummary";
import {Bio} from "./Bio";
import {Contact} from "./Contact";

export interface PersonProfile {
    error?: any;
    name?: string;
    'name-based-gender'?: Gender;
    link: string;
    avatar?: string;
    eduwork?: EduWork[];
    hometown?: HomeTownSummary[];
    bio?: Bio | null;
    contact?: Contact[] | false;
    favorites?: any;
}
