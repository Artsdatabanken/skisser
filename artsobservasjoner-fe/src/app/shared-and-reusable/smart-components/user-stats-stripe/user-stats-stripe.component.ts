import { Component, Input, OnInit } from '@angular/core';
import { TopObserver, TopPhotographer } from 'src/app/models/statistics';

@Component({
  selector: 'app-user-stats-stripe',
  templateUrl: './user-stats-stripe.component.html',
  styleUrls: ['./user-stats-stripe.component.scss']
})

export class UserStatsStripeComponent implements OnInit {

  @Input() topObserver: TopObserver | TopPhotographer;
  @Input() position: number;

  constructor() { }

  ngOnInit(): void { }

}
