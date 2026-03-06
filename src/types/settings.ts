import { SECTION, SETTINGS_TYPE } from './enums'


export interface Settings {
    id: number;
    name: string;
    section: SECTION;
    type: SETTINGS_TYPE;
    value: string;
}
