import { Injectable } from '@angular/core';
import { Filters } from '../models/filter';

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  filters: Filters = new Filters();

  constructor() { }

  //----------UPDATE FILTERS ON SELECTION

  updateYear(year: string): void {
    this.filters.year$.next(year);
  }

  updateSpeciesGroup(speciesGroupId: string): void {
    this.filters.speciesGroup$.next(speciesGroupId);
  }

  updateTaxon(taxonId: string): void {    
    this.filters.taxon$.next(taxonId);
  }

  updateArea(areaId: string): void {    
    this.filters.area$.next(areaId);
  }

  //----------RESET FILTERS

  resetFilters(): void {

    console.log('..........................RESETTER ALLE FILTRE')

    // for (let filter in this.filters) {
    //   console.log('================================================================all filters?', filter)
    //   console.log('================================================================all filters?', this.filters[filter])
    //   this.filters[filter].next(null);
    // }

    this.filters.year$.next(null);
    this.filters.speciesGroup$.next(null);
    this.filters.taxon$.next(null);
    this.filters.area$.next(null);

  }

  resetFilter(key: string): void {

    if (this.filters[`${key}$`] || typeof this.filters[`${key}$`] !== 'undefined') {
      this.filters[`${key}$`].next(null);
    }

  }


}
