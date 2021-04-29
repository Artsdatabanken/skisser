import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {

  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;  
  @Input() totalPages: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((event) => this.doSomething(event));
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  onPageChange(event: number) {
    console.log("Current page: ", event);

    // here we have to emit that this has been clicked
  }

  doSomething(event: any): void {
    console.log('event', event);
  }

}
