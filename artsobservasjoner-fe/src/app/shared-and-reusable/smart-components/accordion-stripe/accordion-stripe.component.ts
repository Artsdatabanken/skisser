import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion-stripe',
  templateUrl: './accordion-stripe.component.html',
  styleUrls: ['./accordion-stripe.component.scss']
})

export class AccordionStripeComponent implements OnInit {

  @Input() data: any;
  @Input() position?: number;
  @Input() styleClass?: string | null = 'accordion';
  @Input() width?: string | null = 'wide';

  isExpanded: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  toggle(smth: any, event: any) {
    this.isExpanded = !this.isExpanded;
  }


}
