import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/shared';
import { StatisticsItem, ValidatedDataItem, VALIDATION_STATUS } from 'src/app/models/statistics';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-validated-data',
  templateUrl: './validated-data.component.html',
  styleUrls: ['./validated-data.component.scss']
})

export class ValidatedDataComponent implements OnInit {

  data$: Observable<ValidatedDataItem[]>;
  validatedDataByStatus$: Observable<any>;
  validationStatus$: Observable<Category[]>;
  speciesGroups$: Observable<Category[]>;
  currentLanguage$: Observable<string>;
  validationStatus: typeof VALIDATION_STATUS = VALIDATION_STATUS;

  constructor(
    private statisticsService: StatisticsService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.currentLanguage$ = this.translationService.currentLanguage$;
    this.getValidatedData();
    this.getValidatedDataByStatus();

  }

  getValidatedData(): void {

    this.data$ = forkJoin([
      this.statisticsService.getValidatedData(),
      this.statisticsService.getSpeciesGroups()
    ]).pipe(
      map(([species, speciesGroups]) => {

        // ---------------------------------------- ***

        const getSpeciesGroup = (id: number): Category => {
          return speciesGroups.find(speciesGroup => speciesGroup.id === id);
        }

        // ---------------------------------------- ***

        let validatedDataItem: ValidatedDataItem;
        let validatedData: ValidatedDataItem[] = [];

        species.forEach(speciesItem => {

          validatedDataItem = {
            id: speciesItem.id,
            speciesGroup: getSpeciesGroup(speciesItem.id),
            count: speciesItem.count,
            sightingTaxonCount: speciesItem.sightingTaxonCount,
            sightingWithMediaCount: speciesItem.sightingWithMediaCount,
            validatedSightingCount: speciesItem.validatedSightingCount,
            approvedSightingCount: speciesItem.approvedSightingCount,
            percentageSightedVsValidated: speciesItem.percentageSightedVsValidated,
            percentageValidatedVsApproved: speciesItem.percentageValidatedVsApproved,
          }

          validatedData.push(validatedDataItem);

        });

        this.translationService.currentLanguage$.subscribe(lang => {
          validatedData = validatedData.sort((a, b) => a.speciesGroup[lang].localeCompare(b.speciesGroup[lang]));
        });

        return validatedData;

      })
    );
  }

  getValidatedDataByStatus(): void {

    this.speciesGroups$ = this.statisticsService.getSpeciesGroups();
    this.validatedDataByStatus$ = this.statisticsService.getValidatedDataByStatus();


    this.statisticsService.getValidatedDataByStatus().subscribe(response => {


      // get the reference for the body
      var body = document.getElementById('tabletest');

      // creates a <table> element and a <tbody> element
      var tbl = document.createElement('table');
      var tblBody = document.createElement('tbody');
      for (var i = 0; i < response.size; i++) {

        console.log('xxyyyxxxx', Object.entries(response).length);

        // creates a table row
        var row = document.createElement('tr');

        for (var j = 0; j < 12; j++) {
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row

          console.log('fffggghhh', j);

          var cell = document.createElement('td');
          var cellText = document.createTextNode('cell in row ' + i + ', column ' + j);
          
          cell.appendChild(cellText);
          row.appendChild(cell);
        }

      }

    });



  }

  generateTable() {
    // get the reference for the body
    var body = document.getElementById('tabletest');

    // creates a <table> element and a <tbody> element
    var tbl = document.createElement('table');
    var tblBody = document.createElement('tbody');

    // creating all cells
    for (var i = 0; i < 2; i++) {

      // creates a table row
      var row = document.createElement('tr');

      for (var j = 0; j < 2; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement('td');
        var cellText = document.createTextNode('cell in row ' + i + ', column ' + j);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }

      // add the row to the end of the table body
      tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute('border', '1');
  }

}
