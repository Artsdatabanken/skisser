import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-intersection',
  templateUrl: './intersection.component.html',
  styleUrls: ['./intersection.component.scss']
})

export class IntersectionComponent implements OnInit {

  @Input() type: string; // if button, , this. anchor link or div
  @Input() cssClass: string | null;
  @Input() size: string;
  @Input() icon: string | null;
  @Input() text: string | null;
  @Input() url: string | null;

  constructor() { }

  ngOnInit(): void { }

}
