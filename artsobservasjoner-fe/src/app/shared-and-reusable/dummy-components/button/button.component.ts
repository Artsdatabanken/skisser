import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {

  @Input() style?: string | string[];
  @Input() text: string;

  constructor() { }

  ngOnInit(): void { }

}
