// MODELS, CLASSES, INTERFACES AND ENUMS that are shared across components and data types

export interface Category {
    id: number;
    label?: string;
    en: string;
    no: string;
}

export enum MONTHS {
    January = 1,
    Februay = 2,
    March = 3,
    April = 4,
    May = 5,
    June = 6,
    July = 7,
    August = 8,
    September = 9,
    October = 10,
    November = 11,
    December = 12
}