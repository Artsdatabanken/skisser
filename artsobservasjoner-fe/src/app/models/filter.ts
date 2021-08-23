// VIEWMODELS, INTERFACES AND CLASSES FOR FILTERS

import { BehaviorSubject } from "rxjs";

export const PAGE_SIZE: number = 20;

export class Filters {
  year$: BehaviorSubject<number> = new BehaviorSubject(0);
  speciesGroup$: BehaviorSubject<number> = new BehaviorSubject(0);
  taxon$: BehaviorSubject<number> = new BehaviorSubject(0);
  area$: BehaviorSubject<number> = new BehaviorSubject(0);
}

export class ActiveFilters {
  year: string | null = null;
  speciesGroup: string | null = null;
  taxon: string | null = null;
  area: string | null = null;
}

export class SelectedFilters extends ActiveFilters { }