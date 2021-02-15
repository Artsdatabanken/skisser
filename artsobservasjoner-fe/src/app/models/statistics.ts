// VIEWMODELS FOR ALL STATISTICS ITEMS

export interface StatisticsItem {
    id: number;
    speciesGroup?: Category;
    sightingCount?: number;
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