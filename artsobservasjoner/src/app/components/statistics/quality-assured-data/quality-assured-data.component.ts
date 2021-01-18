import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-quality-assured-data',
  templateUrl: './quality-assured-data.component.html',
  styleUrls: ['./quality-assured-data.component.scss']
})

export class QualityAssuredDataComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void { }

}
