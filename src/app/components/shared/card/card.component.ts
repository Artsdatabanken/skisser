import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {

  @Input() type: string; // if button, , this. anchor link or div
  @Input() cssClass: string | null;
  @Input() size: string | null;
  @Input() icon: string | null;
  @Input() title: string;
  @Input() text: string | null;
  @Input() url: string | null;

  constructor() { }

  ngOnInit(): void {

    // console.log('CARD',
    //   'type', this.type,
    //   'size', this.size,
    //   'icon', this.icon,
    //   'title', this.title,
    //   'text', this.text,
    //   'url', this.url
    // )

  }

}
