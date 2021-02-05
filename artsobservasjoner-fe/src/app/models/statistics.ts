export interface ValidatedDataItem {
    id: number | string;
    sightingCount: number;
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

export interface RedlistedSpeciesItem extends SpecialSpeciesItem {}
export interface AlienSpeciesItem extends SpecialSpeciesItem {}

export interface Category {
    id: number;
    label?: string;
    labelEnglish?: string;
    labelNorwegian?: string;
}

export interface AssessmentCategory extends Category {
    code: string;
}