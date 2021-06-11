import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-species-data',
  templateUrl: './species-data.component.html',
  styleUrls: ['./species-data.component.scss']
})

export class SpeciesDataComponent implements OnInit {

  subMenu: Route[];

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.subMenu = this.navigationService.getSubMenu('species-data');
  }

}
