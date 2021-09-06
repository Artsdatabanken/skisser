import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ActiveFilters } from 'src/app/models/filter';
import { Area, AREA_TYPE, Category } from 'src/app/models/shared';
import { Taxon } from 'src/app/models/taxon';
import { AreaService } from 'src/app/services/area.service';
import { FilterService } from 'src/app/services/filter.service';
import { SpeciesService } from 'src/app/services/species.service';
import { TaxonService } from 'src/app/services/taxon.service';
import { TranslationService } from 'src/app/services/translation.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit {

  currentLanguage$: Observable<string>;

  @Input() dfYears?: boolean = true;
  @Input() dfSpeciesGroups?: boolean = true;
  @Input() dfTaxon?: boolean = true;
  @Input() dfArea?: boolean = true;

  areaType: typeof AREA_TYPE = AREA_TYPE;
  years: number[];
  speciesGroups$: Observable<Category[]>;
  taxons$: Observable<Taxon[]>;
  areas$: Observable<Area[]>;

  activeFilters: ActiveFilters = new ActiveFilters();

  showYearsPane: boolean = false;
  showSpeciesGroupsPane: boolean = false;
  showTaxonPane: boolean = false;
  showAreaPane: boolean = false;
  showResetButton: boolean = false;

  @ViewChild('speciesGroup') speciesGroupInput: any;
  @ViewChild('taxon') taxonInput: any;
  @ViewChild('area') areaInput: any;

  isSpeciesGroupDisabled: boolean = false;
  isTaxonDisabled: boolean = false;

  activeFiltersSubscription: Subscription;
  taxonSubscription: Subscription;
  areaSubscription: Subscription;

  constructor(
    private translationService: TranslationService,
    private filterService: FilterService,
    private speciesService: SpeciesService,
    private areaService: AreaService,
    private taxonService: TaxonService,
    private utilitiesService: UtilitiesService
  ) { }

  ngOnInit(): void {

    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.years = this.utilitiesService.generateYears();
    this.speciesGroups$ = this.speciesService.speciesGroups;

    // check predefined filters

    this.activeFiltersSubscription = combineLatest([
      this.filterService.filters.area$,
      this.filterService.filters.year$,
      this.filterService.filters.speciesGroup$,
      this.filterService.filters.taxon$
    ]).pipe(
      tap(data => console.log('START t1', data)),
      map(filters => ({
        area: filters[0],
        year: filters[1],
        speciesGroup: filters[2],
        taxon: filters[3],
      })),
      tap(data => console.log('t2', data)),
      map(filters => {

        this.activeFilters.year = filters.year;
        this.activeFilters.speciesGroup = filters.speciesGroup;

        if (filters.taxon) {

          const taxonObject$: Observable<object> = this.taxonService.getTaxonData(+filters.taxon);

          this.taxonSubscription = taxonObject$.subscribe(taxon => {
            if (taxon['vernacularName']) {
              this.activeFilters.taxon = taxon['scientificName'].name + ' - ' + taxon['vernacularName']?.name;
            }
            else {
              this.activeFilters.taxon = taxon['scientificName'].name;
            }
          });

        }

        if (filters.area) {
          const areaObject$: Observable<Area> = this.areaService.getAreaById(+filters.area);
          this.areaSubscription = areaObject$.subscribe(area => this.activeFilters.area = area.name);
        }

        // check if any filters are active to show labels and reset buttons

        if (!this.isEmpty(filters)) {
          this.showResetButton = true;
        }

        return filters;

      })
    ).subscribe(res => console.log('ACTIVE FILTERS?', res));

  }

  ngOnDestroy(): void {
    //this.filterService.resetFilters(); // reset filters when navigating away (we don't need to do this actually; it was a bug)

    this.activeFiltersSubscription.unsubscribe();
    this.taxonSubscription.unsubscribe();
    this.areaSubscription.unsubscribe();

  }

  // ON SELECTION

  onYearSelection(year: string): void {

    console.log('year', year)

    this.filterService.updateYear(year);
    // this.activeFilters.year = year;
    this.showYearsPane = false;
    this.showResetButton = true;

  }

  onSpeciesGroupsSelection(id: string): void {

    console.log('speciesGroup', id)

    this.filterService.updateSpeciesGroup(id);
    //this.activeFilters.speciesGroup = id;
    this.isTaxonDisabled = true;
    this.showSpeciesGroupsPane = false;
    this.showResetButton = true;

  }

  onTaxonSelection(taxon: Taxon): void {

    console.log('taxon', taxon.taxonId)

    this.filterService.updateTaxon(taxon.taxonId.toString());
    this.showTaxonPane = false;

    // if (taxon.vernacularName) {
    //   this.activeFilters.taxon = taxon.scientificName.name + ' - ' + taxon.vernacularName?.name;
    // }
    // else {
    //   this.activeFilters.taxon = taxon.scientificName.name;
    // }

    this.isSpeciesGroupDisabled = true;
    this.showResetButton = true;

  }

  onAreaSelection(id: string, name: string): void {

    this.filterService.updateArea(id);
    //this.activeFilters.area = name;
    this.showAreaPane = false;
    this.showResetButton = true;

  }

  // RESET 

  resetFilters(): void {

    this.filterService.resetFilters();

    for (let property in this.activeFilters) {
      this.activeFilters[property] = null;
    }

    this.showTaxonPane = false;
    this.showAreaPane = false;
    this.showResetButton = false;

    this.isSpeciesGroupDisabled = false;
    this.isTaxonDisabled = false;

  }

  resetFilter(key: string): void {

    this.filterService.resetFilter(key);

    if (this.activeFilters[key] || typeof this.activeFilters[key] !== 'undefined') {
      this.activeFilters[key] = null;
    }

    this.showTaxonPane = false;
    this.showAreaPane = false;

    if (this.isSpeciesGroupDisabled === true) {
      this.isSpeciesGroupDisabled = false;
    }

    if (this.isTaxonDisabled === true) {
      this.isTaxonDisabled = false;
    }

    if (this.isEmpty(this.activeFilters)) {
      this.showResetButton = false;
    }

  }

  // ----------***

  private isEmpty(activeFilters: any): boolean {

    // eller mer effektiv hvis mange properties: const isEmpty = !Object.values(object).some(x => x !== null);
    return Object.values(activeFilters).every(x => x === null);

  }

  // ----------***

  getTaxon(searchString: string): void {

    if (searchString.length > 1) {
      this.taxons$ = this.taxonService.getTaxon(searchString);
      this.showTaxonPane = true;
    }

  }

  getArea(searchString: string): void {

    if (searchString.length > 1) {
      this.areas$ = this.areaService.getAreasByString(searchString);
      this.showAreaPane = true;
    }

  }

  // ----------***

  toggleYearsDropdown(): void {
    this.showYearsPane = !this.showYearsPane;

  }

  toggleSpeciesGroupsDropdown(): void {
    this.showSpeciesGroupsPane = !this.showSpeciesGroupsPane;
  }

  closeYearsPane(pane: any): void {
    this.showYearsPane = false;
  }

  closeSpeciesGroupsPane(pane: any): void {
    this.showSpeciesGroupsPane = false;
  }

  closeTaxonPane(pane: any): void {

    if (this.showTaxonPane) {
      this.taxonInput.nativeElement.value = '';
      this.showTaxonPane = false;
    }

  }

  closeAreaPane(pane: any): void {

    if (this.showAreaPane) {
      this.areaInput.nativeElement.value = '';
      this.showAreaPane = false;
    }

  }

}
