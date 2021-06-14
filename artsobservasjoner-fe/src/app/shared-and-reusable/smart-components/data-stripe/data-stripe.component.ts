import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-stripe',
  templateUrl: './data-stripe.component.html',
  styleUrls: ['./data-stripe.component.scss']
})

export class DataStripeComponent implements OnInit {


  @Input() data: any;
  @Input() position?: number;
  @Input() styleClass?: string | null = 'spcl';

  constructor() { }

  ngOnInit(): void {
    console.log('data', this.data)
  }

}
