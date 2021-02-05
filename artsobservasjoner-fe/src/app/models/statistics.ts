import { AssessmentCategory } from "./assessmentCategory";

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
    assessmentCategoryId: number;
    assessmentCategory: AssessmentCategory;
    sightingsCount: number;
    imagesCount: number;
    validatedCount: number;
    approvedCount: number;
}

export interface RedlistedSpeciesItem extends SpecialSpeciesItem {}
export interface AlienSpeciesItem extends SpecialSpeciesItem {}
