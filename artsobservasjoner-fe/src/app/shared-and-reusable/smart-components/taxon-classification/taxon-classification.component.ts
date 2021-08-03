import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaxonClassification } from 'src/app/models/taxon';
import { TaxonService } from 'src/app/services/taxon.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-taxon-classification',
  templateUrl: './taxon-classification.component.html',
  styleUrls: ['./taxon-classification.component.scss']
})

export class TaxonClassificationComponent implements OnInit {

 
  @Input() taxonClassificationId: number;
  taxonClassificationLabel$: Observable<string>;
  currentLanguage$: Observable<string>;

  constructor(
    private translationService: TranslationService,
    private taxonService: TaxonService
  ) { }

  ngOnInit(): void {

    this.currentLanguage$ = this.translationService.currentLanguage$;

    this.taxonClassificationLabel$ = combineLatest([
      this.currentLanguage$,
      this.taxonService.taxonClassifications
    ]).pipe(
      map(([currentLanguage, taxonClassifications]) => {

        const taxonClassificationObject: TaxonClassification = taxonClassifications.find(tClassification => tClassification.id == this.taxonClassificationId);

        let result: string = '';

        if (taxonClassificationObject) {
          if (currentLanguage == 'no') result = taxonClassificationObject.no;
          if (currentLanguage == 'en') result = taxonClassificationObject.en;
        }

        return result;

      })
    );

  }

}
