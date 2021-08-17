import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DropdownOption } from 'src/app/models/reusable';
import { LayoutService } from 'src/app/services/layout.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-species-lists',
  templateUrl: './species-lists.component.html',
  styleUrls: ['./species-lists.component.scss']
})

export class SpeciesListsComponent implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;

  children: any[] = [];
  subscriptions: Subscription[] = [];
  dropdownOptions: DropdownOption[] = [];

  constructor(
    private layoutService: LayoutService,
    private translationService: TranslationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.pageTitle$ = this.layoutService.setPageTitle('menu.menu_sightings_speciesData_speciesLists');
    this.currentLanguage$ = this.translationService.currentLanguage$;
  }

  ngOnInit(): void {

    this.children = this.activatedRoute.routeConfig.children.filter(ch => ch.data.hidden === false);

    this.children.forEach(child => {

      let item: DropdownOption = {
        text: child.data.title,
        url: `/sightings-data/species-data/species-lists/${child.path}`
      }

      this.dropdownOptions.push(item);


    });

    
    console.log('xxxx', this.dropdownOptions)
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
