import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {

  constructor(private testService: TestService) { }

  ngOnInit(): void {

    this.testService.getData().subscribe();
    this.testService.getTaxonInfo().subscribe();

  }

}