import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
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

  @Input() predefinedArea?: string;

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

    if (this.predefinedArea) {
      this.activeFilters.area = this.predefinedArea;
    }

    // then check if not empty to show labels

    if (!this.isEmpty()) {
      this.showResetButton = true;
    }

  }

  ngOnDestroy(): void {
    this.filterService.resetFilters(); // reset filters when navigating away
  }

  onYearSelection(year: string): void {

    this.filterService.updateYear(year);
    this.activeFilters.year = year;
    this.showYearsPane = false;
    this.showResetButton = true;

  }

  onSpeciesGroupsSelection(id: string): void {

    this.filterService.updateSpeciesGroup(id);
    this.activeFilters.speciesGroup = id;
    this.isTaxonDisabled = true;
    this.showSpeciesGroupsPane = false;
    this.showResetButton = true;

  }

  onTaxonSelection(taxon: Taxon): void {

    this.filterService.updateTaxon(taxon.taxonId.toString());
    this.showTaxonPane = false;

    if (taxon.vernacularName) {
      this.activeFilters.taxon = taxon.scientificName.name + ' - ' + taxon.vernacularName?.name;
    }
    else {
      this.activeFilters.taxon = taxon.scientificName.name;
    }

    this.isSpeciesGroupDisabled = true;
    this.showResetButton = true;

  }

  onAreaSelection(id: string, name: string): void {

    this.filterService.updateArea(id);
    this.activeFilters.area = name;
    this.showAreaPane = false;
    this.showResetButton = true;

  }

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

    //const isEmpty: boolean = Object.values(this.activeFilters).every(x => x === null);
    // eller mer effektiv: const isEmpty = !Object.values(object).some(x => x !== null);

    if (this.isEmpty()) {
      this.showResetButton = false;
    }

  }

  // ----------***

  private isEmpty(): boolean {

    // eller mer effektiv hvis mange properties: const isEmpty = !Object.values(object).some(x => x !== null);
    return Object.values(this.activeFilters).every(x => x === null);

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
