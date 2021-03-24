// MODELS, CLASSES, INTERFACES AND ENUMS that are shared across components and data types

export interface Category {
    id: number;
    label?: string;
    en: string;
    no: string;
}

export class Months {
    no: string[] = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];
    en: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
}

export enum OLD_COUNTIES {
    'Østfold' = 1,
    'Vest-Agder',
    'Rogaland',
    'Hordaland',
    'Hedmark',
    'Oppland',
    'Trøndelag',
    'Buskerud',
    'Vestfold',
    'Telemark',
    'Aust-Agder',
    'Norskekysten hav S',
    'Sogn og Fjordane',
    'Møre og Romsdal',
    'Nordland',
    'Troms',
    'Akershus',
    'Finnmark',
    'Svalbard med sjøområder',
    'Jan Mayen',
    'Norskekysten hav N',
    'Oslo'
}