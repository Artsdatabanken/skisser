import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-sightings-data',
  templateUrl: './sightings-data.component.html',
  styleUrls: ['./sightings-data.component.scss']
})

export class SightingsDataComponent implements OnInit {

  subMenu: any[];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.subMenu = this.navigationService.getSubMenu('sightings-data');
  }

}
