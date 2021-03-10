// VIEWMODELS FOR ALL STATISTICS ITEMS

import { Category } from "./shared";

export interface StatisticsItem {
    id: number;
    data?: object[];
    speciesGroup?: Category;
    count?: number;
}

export interface ImageStatisticsItem extends StatisticsItem {
    imageCount: number;
    imageCountWithOpenLicence: number;
}

export interface ValidatedDataItem extends StatisticsItem {
    sightingTaxonCount: number;
    sightingWithMediaCount: number;
    validatedSightingCount: number;
    approvedSightingCount: number;
    percentageSightedVsValidated: number;
    percentageValidatedVsApproved: number;
}

export interface ValidatedDataItemByStatus {
    speciesGroup?: Category;
    count?: number;
}

export interface AssessedSpeciesItem extends StatisticsItem {
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

export interface AssessmentCategory extends Category {
    code: string;
}

export interface TotalCountStatistic {
    count: number;
    iconSource?: string;
    text?: string;
}

// ENUMS

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

export enum ASSESSMENT_CATEGORIES {
    redlist = 'redlist',
    alienlist = 'alienlist'
}