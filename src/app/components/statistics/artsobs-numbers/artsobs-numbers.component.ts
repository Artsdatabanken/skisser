import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-artsobs-numbers',
  templateUrl: './artsobs-numbers.component.html',
  styleUrls: ['./artsobs-numbers.component.scss']
})

export class ArtsobsNumbersComponent implements OnInit {

  fakeData: any[] = [];
  users: User[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    //this.fakeData$ = this.dataService.getStatsData();

    this.dataService.getUsers().subscribe(res => {
      console.log('results', res)
      this.users = res;
    });

    this.dataService.getStatsData()
      .subscribe(
        data => {
          this.fakeData = data;
          console.log('type', typeof this.fakeData)
          console.log('type',  this.fakeData)
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            let httpError = <HttpErrorResponse>error;
            if (httpError.status == 403) {
              console.log('Ingen tilgang.');
            }
          }
          else {
            console.log('error', error);
          }
        }
      );

  }

}
 