// VIEWMODELS, INTERFACES AND CLASSES FOR FILTERS

import { BehaviorSubject } from "rxjs";

export const PAGE_SIZE: number = 20;

export class Filters {
  year$: BehaviorSubject<string> = new BehaviorSubject(null);
  speciesGroup$: BehaviorSubject<string> = new BehaviorSubject(null);
  taxon$: BehaviorSubject<string> = new BehaviorSubject(null);
  area$: BehaviorSubject<string> = new BehaviorSubject(null);
}

export class ActiveFilters {
  year: string | null = null;
  speciesGroup: string | null = null;
  taxon: string | null = null;
  area: string | null = null;
}

export class SelectedFilters extends ActiveFilters { }