import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {  }
  
  onPageChange(pageNo: number, pageSize: number) {
    console.log("Current page: ", pageNo, pageSize);
  }

}
