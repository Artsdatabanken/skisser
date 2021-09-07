import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/shared';
import { TaxonService } from 'src/app/services/taxon.service';
import { TranslationService } from 'src/app/services/translation.service';
import { TaxonClassificationComponent } from '../taxon-classification/taxon-classification.component';

@Component({
  selector: 'app-taxon',
  templateUrl: './taxon.component.html',
  styleUrls: ['./taxon.component.scss']
})

export class TaxonComponent implements OnInit {

  @Input() taxonId: number;
  taxonLabel$: Observable<string>;
  currentLanguage$: Observable<string>;

  constructor(
    private taxonService: TaxonService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.currentLanguage$ = this.translationService.currentLanguage$;

    this.taxonLabel$ = this.taxonService.getTaxonData(this.taxonId).pipe(
      map(taxon => {

        let taxonName: string = '';

        if (taxon['vernacularName']) {
          taxonName = taxon['scientificName'].name + ' - ' + taxon['vernacularName']?.name;
        }
        else {
          taxonName = taxon['scientificName'].name;
        }

        return taxonName;

      })
    );

    // this.taxonLabel$ = combineLatest([
    //   this.currentLanguage$,
    //   this.taxonService.getTaxonData(this.taxonId)
    // ]).pipe(
    //   map(([currentLanguage, taxon]) => {

    //     let taxonName: string = '';

    //     if (taxon['vernacularName']) {
    //       taxonName = taxon['scientificName'].name + ' - ' + taxon['vernacularName']?.name;
    //     }
    //     else {
    //       taxonName = taxon['scientificName'].name;
    //     }

    //     return taxonName;

    //   })
    // );

  }

}
