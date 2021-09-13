import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { tap, map, switchMap, concatMap } from 'rxjs/operators';
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

  filtersSubscription: Subscription;

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

    this.filtersSubscription = combineLatest([
      this.filterService.filters.year$,
      this.filterService.filters.speciesGroup$,
      this.filterService.filters.taxon$,
      this.filterService.filters.area$,
    ]).pipe(
      tap(data => console.log('============== filters t1', data)),
      map(filters => ({
        year: filters[0],
        speciesGroup: filters[1],
        taxon: filters[2],
        area: filters[3]
      })),
      tap(data => console.log('============== filters t2', data)),
      switchMap(filters => {

        if (filters.year) this.activeFilters.year = filters.year;

        if (filters.speciesGroup) {
          this.isTaxonDisabled = true;
          this.activeFilters.speciesGroup = filters.speciesGroup;
        }

        if (filters.taxon) {
          this.isSpeciesGroupDisabled = true;
          this.activeFilters.taxon = filters.taxon;
        }

        if (filters.area) this.activeFilters.area = filters.area;

        if (!this.isEmpty(filters)) {
          this.showResetButton = true;
        }

        return of(filters);

      }),
      map(filters => console.log('filters', filters, '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n', '\n'))
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.filterService.resetFilters(); // (we need to test this more: without it, the filters stay wherever the filter component is used; we need to see if resetting them creates bugs while using in the same component and filtering)
    this.filtersSubscription.unsubscribe();
  }

  // ON SELECTION

  onYearSelection(year: string): void {

    this.filterService.updateYear(year);
    this.showYearsPane = false;
    this.showResetButton = true;

  }

  onSpeciesGroupsSelection(id: string): void {

    this.filterService.updateSpeciesGroup(id);
    this.isTaxonDisabled = true;
    this.showSpeciesGroupsPane = false;
    this.showResetButton = true;

  }

  onTaxonSelection(taxon: Taxon): void {

    this.filterService.updateTaxon(taxon.taxonId.toString());
    this.showTaxonPane = false;
    this.isSpeciesGroupDisabled = true;
    this.showResetButton = true;
    this.taxonInput.nativeElement.value = '';

  }

  onAreaSelection(id: string, name: string): void {

    this.filterService.updateArea(id);
    this.showAreaPane = false;
    this.showResetButton = true;
    this.areaInput.nativeElement.value = '';

  }

  // ----------***

  resetFilters(): void {

    this.filterService.resetFilters();

    for (let key in this.activeFilters) {
       if (this.activeFilters[key] || typeof this.activeFilters[key] !== 'undefined') {
        this.activeFilters[key] = null;
      }
    }

    // this.activeFilters.year = null;
    // this.activeFilters.speciesGroup = null;
    // this.activeFilters.taxon = null;
    // this.activeFilters.area = null;

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
