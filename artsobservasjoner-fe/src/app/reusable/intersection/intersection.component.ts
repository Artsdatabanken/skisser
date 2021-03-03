import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-intersection',
  templateUrl: './intersection.component.html',
  styleUrls: ['./intersection.component.scss']
})

export class IntersectionComponent implements OnInit {

  @Input() text: string | null;
  @Input() url: string | null;

  constructor() { }

  ngOnInit(): void { }

}
