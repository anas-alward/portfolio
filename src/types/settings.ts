import { SECTION, SETTINGS_TYPE } from './enums'


export const enum DATA_TYPE {
    STRING = 'STRING',
    INT = 'INT',
    FLOAT = 'FLOAT',
    BOOLEAN = 'BOOLEAN',
    ARRAY = 'ARRAY',
    OBJECT = 'OBJECT',
}


export interface Settings {
    id: number;
    name: string;
    section: SECTION;
    type: SETTINGS_TYPE;
    value: string;
    data_type: DATA_TYPE;
}
