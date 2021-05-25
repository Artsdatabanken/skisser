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

export interface Area {
    id: number;
    name: string;
    type: string;
}

export enum AREA_TYPE {
    county = 'County',
    municipality = 'Municipality'
}

export interface Filter {
    id: string | string;
    title: string;
    active?: boolean;
}

export interface ActiveFilter {
    id: number | string;
    parameter: string;
}