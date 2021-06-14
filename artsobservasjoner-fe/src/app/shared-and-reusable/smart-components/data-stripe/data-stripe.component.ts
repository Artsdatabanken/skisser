import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-stripe',
  templateUrl: './data-stripe.component.html',
  styleUrls: ['./data-stripe.component.scss']
})

export class DataStripeComponent implements OnInit {


  @Input() data: any;
  @Input() position?: number;
  @Input() styleClass?: string | null = 'spcl';

  isExpanded: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  toggle(smth: any, event: any) {
    this.isExpanded = !this.isExpanded;
  }

}
