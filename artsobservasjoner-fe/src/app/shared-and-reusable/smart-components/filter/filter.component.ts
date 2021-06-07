import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Filters, ActiveFilters } from 'src/app/models/filter';
import { Area, AREA_TYPE, Category } from 'src/app/models/shared';
import { Taxon } from 'src/app/models/taxon';
import { AreasService } from 'src/app/services/areas.service';
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

  areaType: typeof AREA_TYPE = AREA_TYPE;
  years: number[];
  speciesGroups$: Observable<Category[]>;
  taxons$: Observable<Taxon[]>;
  areas$: Observable<Area[]>;

  filters: Filters = new Filters();
  activeFilters: ActiveFilters = new ActiveFilters();

  showTaxonPane: boolean = false;
  showAreaPane: boolean = false;
  showResetButton: boolean = false;

  @ViewChild('area') areaInput: any;
  @ViewChild('taxon') taxonInput: any;

  @Output() selectedYear = new EventEmitter<string>();
  @Output() selectedSpeciesGroup = new EventEmitter<string>();
  @Output() selectedTaxon = new EventEmitter<string>();
  @Output() selectedArea = new EventEmitter<string>();

  @Output() outputFilters = new EventEmitter<ActiveFilters>();

  constructor(
    private translationService: TranslationService,
    private speciesService: SpeciesService,
    private areaService: AreasService,
    private taxonService: TaxonService,
    private utilitiesService: UtilitiesService
  ) { }

  ngOnInit(): void {

    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.years = this.utilitiesService.generateYears();
    this.speciesGroups$ = this.speciesService.speciesGroups;

  }

  onYearSelection(year: string): void {

    this.filters.year$.next(year);
    this.activeFilters.year = year;
    this.selectedYear.emit(year);
    this.outputFilters.emit(this.activeFilters);

  }

  onSpeciesGroupSelection(id: string): void {

    this.filters.speciesGroup$.next(id);
    this.activeFilters.speciesGroup = id;
    this.selectedSpeciesGroup.emit(id);
    this.outputFilters.emit(this.activeFilters);

  }

  onTaxonSelection(taxon: Taxon): void {

    this.filters.taxon$.next(taxon.taxonId.toString());
    this.showTaxonPane = false;

    if (taxon.vernacularName) {
      this.activeFilters.taxon = taxon.scientificName.name + ' - ' + taxon.vernacularName?.name;
    }
    else {
      this.activeFilters.taxon = taxon.scientificName.name;
    }

    this.selectedTaxon.emit(taxon.taxonId.toString());
    this.outputFilters.emit(this.activeFilters);

  }

  onAreaSelection(id: string, name: string): void {

    this.filters.area$.next(id);
    this.selectedArea.emit(id);
    this.showAreaPane = false;
    this.activeFilters.area = name;
    this.outputFilters.emit(this.activeFilters);
  }

  resetFilters(): void {

    for (let filter in this.filters) {
      this.filters[filter].next(null);
    }

    for (let property in this.activeFilters) {
      this.activeFilters[property] = null;
    }

    this.outputFilters.emit(this.activeFilters);

    this.showTaxonPane = false;
    this.showAreaPane = false;
    this.showResetButton = false;

    this.selectedYear.emit(null);
    this.selectedSpeciesGroup.emit(null);
    this.selectedTaxon.emit(null);
    this.selectedArea.emit(null);

  }

  resetFilter(key: string): void {

    if (this.filters[`${key}$`] || typeof this.filters[`${key}$`] !== 'undefined') {
      this.filters[`${key}$`].next(null);
    }

    if (this.activeFilters[key] || typeof this.activeFilters[key] !== 'undefined') {
      this.activeFilters[key] = null;
    }

    this.outputFilters.emit(this.activeFilters);

    this.showTaxonPane = false;
    this.showAreaPane = false;

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
