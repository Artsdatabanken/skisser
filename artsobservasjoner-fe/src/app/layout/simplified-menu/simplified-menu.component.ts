import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-simplified-menu',
  templateUrl: './simplified-menu.component.html',
  styleUrls: ['./simplified-menu.component.scss']
})

export class SimplifiedMenuComponent implements OnInit {

  simplifiedMenu: any;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.simplifiedMenu = this.navigationService.getSimplifiedMainMenu();
  }

}
