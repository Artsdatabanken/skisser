// MODELS, CLASSES, INTERFACES AND ENUMS that are shared across components and data types

export interface Category {
    id: number;
    label?: string;
    en: string;
    no: string;
}

export enum MONTHS_EN {
    January = 1,
    February = 2,
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

export enum MONTHS_NO {
    Januar = 1,
    Februar = 2,
    Mars = 3,
    April = 4,
    Mai = 5,
    Juni = 6,
    Juli = 7,
    August = 8,
    September = 9,
    Oktober = 10,
    November = 11,
    Desember = 12
}

export class Months {
    no: string[] = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];
    en: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
}