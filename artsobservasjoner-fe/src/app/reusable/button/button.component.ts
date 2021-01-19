import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {

  @Input() cssClass: string | null;
  @Input() text: string;

  constructor() { }

  ngOnInit(): void {

    // console.log('button',
    //   'css', this.cssClass,
    //   'text', this.text
    // )

  }

}
