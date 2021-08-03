import { Category } from "./shared";

export interface Taxon {
    taxonId: number;
    taxonCategoryId: number;
    speciesGroupId: number;
    protectionLevelId: number;
    scientificName: TaxonName;    
    vernacularName: TaxonName;
    scientificNameSynonyms: TaxonName[];
    vernacularNameSynonyms: TaxonName[];
}

export interface TaxonName {
    name: string;
    author: string;
    taxonLanguage: string;
    isSearchMatch: boolean;
}

export interface TaxonClassification extends Category {  
    sortOrder: number;
}

export interface TaxonData {
    taxon: Taxon;
    taxonClassification: TaxonClassification;
}