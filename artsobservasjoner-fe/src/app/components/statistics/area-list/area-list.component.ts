import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  @ViewChildren('speciesRow') rows: QueryList<any>;

  species: object[] = [
    {
      id: '1',
      vernacularName: 'svovelveis ',
      scientificName: 'Anemone nemorosa × ranunculoides'
    },

    {
      id: '2',
      scientificName: 'Elaphrus uliginosus'
    },

    {
      id: '3',
      vernacularName: 'bleikkorkje',
      scientificName: 'Ochrolechia pallescens'
    },

    {
      id: '4',
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
      scientificName: 'Nypeta brincki'
    },

    {
      id: '13',
      scientificName: 'Corticeus suturalis'
    },

    {
      id: '14',
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
      scientificName: 'Myrmechixenus subterraneus'
    },

    {

      id: '18',
      scientificName: 'Atheta atramentaria'
    },

    {

      id: '19',
      vernacularName: 'leopardskrubbedderkopp',
      scientificName: 'Arctosa leopardus'
    },

    {

      id: '20',
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

  ngAfterViewInit() {
    // print array of CustomComponent objects
    console.log('ROWS', this.rows.toArray());
  }

  toggleInfo(elem: any): void {
    console.log('row', elem)
  }


  getSpeciesGroupLabel(id: number): Observable<string> {

    const label = combineLatest([this.currentLanguage$, this.speciesGroups$]).pipe(
      map(([currentLanguage, speciesGroups]) => {

        const speciesGroupObject: Category = speciesGroups.find(sg => sg.id == id);

        let result: string = '';

        if (speciesGroupObject) {
          if (currentLanguage == 'no') result = speciesGroupObject.no;
          if (currentLanguage == 'en') result = speciesGroupObject.en;
        }

        return result;

      })
    );

    return label;

  }

}
