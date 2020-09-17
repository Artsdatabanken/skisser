import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})

export class DateComponent implements OnInit {

  today: Date = new Date();
  yesterday: Date = new Date();
  tomorrow: Date = new Date();

  constructor() { }

  ngOnInit(): void {

    this.yesterday = new Date(this.yesterday.setDate(this.today.getDate() - 1));
    this.tomorrow = new Date(this.tomorrow.setDate(this.today.getDate() + 1));

    console.log('date', 'yesterday', this.yesterday)
    console.log('date', 'today', this.today)
    console.log('date', 'tomorrow', this.tomorrow)
  }

}

