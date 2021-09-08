import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  isActive: boolean = false;
  buttonClicked: number;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(): void {
    this.isActive = !this.isActive;
  }

  close(): void {
    this.isActive = false;
  }

  toggleBulk(event: any, index: number) {

    if (this.buttonClicked === index) this.buttonClicked = -1;
    else this.buttonClicked = index;

  }

}
