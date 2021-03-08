// VIEWMODELS FOR ALL STATISTICS ITEMS

export interface StatisticsItem {
    id: number;
    speciesGroup?: Category;
    count?: number;
}

export interface ImageStatisticsItem extends StatisticsItem {
    imageCount: number;
    imageCountWithOpenLicence: number;
}

export interface ValidatedDataItem extends StatisticsItem {
    // id: number;
    // speciesGroup: Category;
    // sightingCount: number;
    sightingTaxonCount: number;
    sightingWithMediaCount: number;
    validatedSightingCount: number;
    approvedSightingCount: number;
    percentageSightedVsValidated: number;
    percentageValidatedVsApproved: number;
}

export interface AssessedSpeciesItem {
    id: number;
    data?: object[] | AssessedSpeciesItemStats[];
}

export interface AssessedSpeciesItemStats {
    id: number;
    speciesGroupId: number;
    speciesGroup: string | Category;
    assessmentCategoryId: number;
    assessmentCategory: AssessmentCategory;
    sightingsCount: number;
    imagesCount: number;
    validatedCount: number;
    approvedCount: number;
}

export interface Category {
    id: number;
    label?: string;
    labelEnglish?: string;
    labelNorwegian?: string;
}

export interface AssessmentCategory extends Category {
    code: string;
}

export interface TotalCountStatistic {
    count: number;
    iconSource?: string;
    text?: string;
}

export enum TOTAL_COUNT_STATISTICS {
    totalSightings = 'totalSightings',
    totalSpecies = 'totalSpecies',
    totalImages = 'totalImages',
    totalUsers = 'totalUsers'
}

export enum VALIDATION_STATUS {
    notValidated = 'NotValidated',
    inProgress = 'InProgress',
    validated = 'Validated',
    rejected = 'Rejected',
    approved = 'Approved'
}