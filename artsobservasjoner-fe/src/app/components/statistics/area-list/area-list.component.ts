import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DropdownOption } from 'src/app/models/reusable';
import { Area, Category } from 'src/app/models/shared';
import { CoreService } from 'src/app/services/core.service';
import { LayoutService } from 'src/app/services/layout.service';
import { SpeciesService } from 'src/app/services/species.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss']
})

export class AreaListComponent implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  children: any[] = [];
  dropdownOptions: DropdownOption[] = [];
  counties$: Observable<Area[]>;
  speciesGroups$: Observable<Category[]>;

  species: object[] = [
    {
      id: '1',
      vernacularName: 'svovelveis ',
      scientificName: 'Anemone nemorosa × ranunculoides'
    },

    {
      id: '2',
      vernacularName: '',
      scientificName: 'Elaphrus uliginosus'
    },

    {
      id: '3',
      vernacularName: 'bleikkorkje',
      scientificName: 'Ochrolechia pallescens'
    },

    {
      id: '4',
      vernacularName: '',
      scientificName: 'Phloeonomus pusillus'
    },

    {
      id: '5',
      vernacularName: 'damsnipe ',
      scientificName: 'Tringa stagnatilis'
    },

    {
      id: '6',
      vernacularName: 'dypvannsrur ',
      scientificName: 'Chirona hameri'
    },

    {
      id: '7',
      vernacularName: '',
      scientificName: 'Boreotrophon truncatus'
    },

    {
      id: '8',
      vernacularName: 'perleberberis ',
      scientificName: 'Berberis aggregata'
    },

    {
      id: '9',
      vernacularName: 'askeskål ',
      scientificName: 'Episphaeria fraxinicola'
    },

    {
      id: '10',
      vernacularName: 'kobberpraktbille ',
      scientificName: 'Dicerca moesta'
    },

    {
      id: '11',
      vernacularName: 'piggknoppgullhette ',
      scientificName: 'Plenogemma phyllantha'
    },

    {
      id: '12',
      vernacularName: '',
      scientificName: 'Nypeta brincki'
    },

    {
      id: '13',
      vernacularName: '',
      scientificName: 'Corticeus suturalis'
    },

    {
      id: '14',
      vernacularName: '',
      scientificName: 'Dendrodochium citrinum'
    },

    {
      id: '15',
      vernacularName: 'kuhegre',
      scientificName: 'Bubulcus ibis'
    },

    {
      id: '16',
      vernacularName: 'grå furuskuddvikler ',
      scientificName: 'Rhyacionia duplana'
    },

    {
      id: '17',
      vernacularName: '',
      scientificName: 'Myrmechixenus subterraneus'
    },

    {
      id: '18',
      vernacularName: '',
      scientificName: 'Atheta atramentaria'
    },

    {
      id: '19',
      vernacularName: 'leopardskrubbedderkopp',
      scientificName: 'Arctosa leopardus'
    },

    {
      id: '20',
      vernacularName: '',
      scientificName: 'Thiasophila angulata'
    },

    {
      id: '21',
      vernacularName: 'engeitermaur ',
      scientificName: 'Myrmica schencki',
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private layoutService: LayoutService,
    private translationService: TranslationService,
    private coreService: CoreService,
    private speciesService: SpeciesService
  ) { }

  ngOnInit(): void {

    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.counties$ = this.coreService.getCounties();
    this.speciesGroups$ = this.speciesService.speciesGroups;

  }

  getSpeciesLabel(scientificName: string, vernacularName: string): string {

    if (vernacularName) {
      return `${scientificName} &mdash; ${vernacularName}`;
    }
    else {
      return scientificName;
    }

  }

  // public get speciesLabel( ): string {
  //   return `${this.code} - ${this.title}`;
  // }

}
