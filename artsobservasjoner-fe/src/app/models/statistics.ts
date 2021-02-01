export interface ValidatedDataItem {
    id: number | string;
    sightingCount: number;
    validatedSightingCount: number;
    approvedSightingCount: number;
    percentageSightedVsValidated: number;
    percentageValidatedVsApproved: number;
}

export interface SpecialSpeciesDataItem {
    id: number | string;
    data?: object[];
    risk?: any;
}

export interface SpecialSpeciesDataObject {
    id: number | string;
    riskGroup: string;
    sightingCount: number;
    sightingsWithMedia: number;
    validatedSightingsCount: number;
    approvedSightingsCount: number;
}