import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-teaser',
  templateUrl: './teaser.component.html',
  styleUrls: ['./teaser.component.scss']
})

export class TeaserComponent implements OnInit {

  @Input() cssClass: string | null;
  @Input() title: string;
  @Input() source: string | null;
  @Input() text: string | null;
  @Input() url: string | null;
  @Input() tag: string | null;
  @Input() date: string | Date | null;

  constructor() { }

  ngOnInit(): void {  }

}
