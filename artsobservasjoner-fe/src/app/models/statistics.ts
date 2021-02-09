export interface ValidatedDataItem {
    id: number | string;
    sightingCount: number;
    sightingTaxonCount: number;
    validatedSightingCount: number;
    approvedSightingCount: number;
    percentageSightedVsValidated: number;
    percentageValidatedVsApproved: number;
}

export interface SpecialSpeciesItem {
    id: number;
    data?: object[];
    risk?: SpecialSpeciesItemStats[];
}

export interface SpecialSpeciesItemStats {
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