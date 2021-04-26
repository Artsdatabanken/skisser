import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bird-area-league',
  templateUrl: './bird-area-league.component.html',
  styleUrls: ['./bird-area-league.component.scss']
})

export class BirdAreaLeagueComponent implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;

  constructor() { }

  ngOnInit(): void { }

}
