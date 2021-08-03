// VIEWMODELS FOR ALL STATISTICS ITEMS

import { Category } from "./shared";
import { TaxonData } from "./taxon";

export interface StatisticsItem {
    id: number;
    data?: object[];
    speciesGroup?: Category | number;
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
    validationStatusId: number;
    speciesGroupId: number;
    validationStatus?: Category,
    speciesGroup?: Category;
    count: number;
}

export interface AssessedSpeciesItem extends StatisticsItem {
    data?: object[] | AssessedSpeciesItemStats[];
}

export interface AssessedSpeciesItemStats {
    id: number;
    speciesGroupId: number;
    speciesGroup?: Category;
    assessmentCategoryId: number;
    assessmentCategory?: AssessmentCategory;
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

// 

export interface PaginatedStatistics {
    pageNumber: number;
    pageSize: number;
    results: object[] | TaxonData[];
    totalCount: number;
}

// USER STATISTICS

export interface UserStatistics {
    pageNumber: number;
    pageSize: number;
    topObservers: TopObserver[] | TopPhotographer[];
    totalCount: number;
}

export interface TopObserver {
    id: number;
    name: string;
    position?: number;
    city: string;
    sightingsCount: number;
    mediaCount?: number;
}

export interface TopPhotographer extends TopObserver {
    mediaCount: number;
}

// ENUMS

export enum TOTAL_COUNT_STATISTICS {
    totalSightings = 'totalSightings',
    totalSpecies = 'totalSpecies',
    totalImages = 'totalImages',
    totalUsers = 'totalUsers',
    projects = 'projects',
    usersThisYear = 'thisYear',
    usersLastYear = 'lastYear',
    usersLast7Days = 'last7'
}

export enum VALIDATION_STATUS {
    notValidated = 'NotValidated',
    inProgress = 'InProgress',
    validated = 'Validated',
    rejected = 'Rejected',
    approved = 'Approved'
}

export enum ASSESSMENT_CATEGORY_TYPES {
    redlist = 'redlist',
    alienlist = 'alienlist'
}

export enum SIGHTINGS_PER_YEAR {
    artsobs = 'artsobs',
    artskart = 'artskart'
}

