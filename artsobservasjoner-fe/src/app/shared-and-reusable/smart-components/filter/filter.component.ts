import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
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
  taxonSubscription: Subscription = new Subscription();
  areaSubscription: Subscription = new Subscription();

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

    // this.filterSubscription = combineLatest([
    //   this.filterService.filters.area$,
    //   this.filterService.filters.year$,
    //   this.filterService.filters.speciesGroup$,
    //   this.filterService.filters.taxon$
    // ]).pipe(
    //   tap(data => console.log('...filters START', data)),
    //   map(filters => ({
    //     area: filters[0],
    //     year: filters[1],
    //     speciesGroup: filters[2],
    //     taxon: filters[3]
    //   })),
    //   tap(data => console.log('...filters BEFORE SWITCHMAP', data)),
    //   switchMap(filters => {


    this.filtersSubscription = combineLatest([
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

        if (filters.year) this.activeFilters.year = filters.year;

        if (filters.speciesGroup) {
          this.isTaxonDisabled = true;
          this.activeFilters.speciesGroup = filters.speciesGroup;
        }
    
        if (filters.taxon) {

          this.isSpeciesGroupDisabled = true;

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

        if (!this.isEmpty(filters)) {
          this.showResetButton = true;
        }

        return of(null);

      }),
      tap(t => console.log('...filters SLUTT'))
    ).subscribe(data => console.log());

  }

  ngOnDestroy(): void {
    //this.filterService.resetFilters(); // reset filters when navigating away (we don't need to do this actually; it was a bug)

    this.filtersSubscription.unsubscribe();
    this.taxonSubscription.unsubscribe();
    this.areaSubscription.unsubscribe();

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

    // if (taxon.vernacularName) {
    //   this.activeFilters.taxon = taxon.scientificName.name + ' - ' + taxon.vernacularName?.name;
    // }
    // else {
    //   this.activeFilters.taxon = taxon.scientificName.name;
    // }

    this.showTaxonPane = false;
    this.isSpeciesGroupDisabled = true;
    this.showResetButton = true;

  }

  onAreaSelection(id: string, name: string): void {

    this.filterService.updateArea(id);
    this.showAreaPane = false;
    this.showResetButton = true;

  }

  // ----------***

  resetFilters(): void {

    this.filterService.resetFilters();

    for (let property in this.activeFilters) {
      console.log('reset active filters?', property)
      this.activeFilters[property] = null;
    }

    this.showTaxonPane = false;
    this.showAreaPane = false;
    this.showResetButton = false;

    this.isSpeciesGroupDisabled = false;
    this.isTaxonDisabled = false;

  }

  resetFilter(key: string): void {

    console.log('filter to be deleted', key)

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
