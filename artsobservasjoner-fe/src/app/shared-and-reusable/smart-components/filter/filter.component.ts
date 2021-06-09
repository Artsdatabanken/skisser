import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveFilters } from 'src/app/models/filter';
import { Area, AREA_TYPE, Category } from 'src/app/models/shared';
import { Taxon } from 'src/app/models/taxon';
import { AreasService } from 'src/app/services/areas.service';
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

  @Input() showYears: boolean;
  @Input() showSpeciesGroups: boolean;
  @Input() showTaxonSearch: boolean;
  @Input() showAreaSearch: boolean;
  @Input() embeddedIn?: string;

  areaType: typeof AREA_TYPE = AREA_TYPE;
  years: number[];
  speciesGroups$: Observable<Category[]>;
  taxons$: Observable<Taxon[]>;
  areas$: Observable<Area[]>;

  activeFilters: ActiveFilters = new ActiveFilters();

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
    private areaService: AreasService,
    private taxonService: TaxonService,
    private utilitiesService: UtilitiesService
  ) { }

  ngOnInit(): void {

    console.log('embeddedIn', this.embeddedIn)
    
    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.years = this.utilitiesService.generateYears();
    this.speciesGroups$ = this.speciesService.speciesGroups;

  }

  ngOnDestroy(): void {
    this.filterService.resetFilters(); // reset filters when navigating away
  }

  onYearSelection(year: string): void {

    this.filterService.updateYear(year);
    this.activeFilters.year = year;

  }

  onSpeciesGroupSelection(id: string): void {

    this.filterService.updateSpeciesGroup(id);
    this.activeFilters.speciesGroup = id;
    this.isTaxonDisabled = true;

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

  }

  onAreaSelection(id: string, name: string): void {

    this.filterService.updateArea(id);
    this.activeFilters.area = name;
    this.showAreaPane = false;

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

    // this.isSpeciesGroupDisabled = !this.isSpeciesGroupDisabled;
    // this.isTaxonDisabled = !this.isTaxonDisabled;

    if (this.isSpeciesGroupDisabled === true) {
      this.isSpeciesGroupDisabled = false;
    }

    if (this.isTaxonDisabled === true) {
      this.isTaxonDisabled = false;
    }

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
      this.areas$ = this.areaService.getArea(searchString);
      this.showAreaPane = true;
    }

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
