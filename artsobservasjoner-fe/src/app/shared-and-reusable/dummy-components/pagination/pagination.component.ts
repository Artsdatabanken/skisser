import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {

  @Input() events: Observable<void>;
  @Input() totalPages: number = 1;

  @Output() switchedPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {}

  onPageChange(event: number) {
    // console.log("Current page: ", event);
    
    // here we have to emit that this has been clicked
    this.switchedPage.emit(event);
  }

}
