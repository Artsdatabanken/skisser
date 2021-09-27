import { Component, OnInit, Input, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service.js';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {

  mainMenu: object = {};
  @ViewChildren('navigationElement') navigationElements: QueryList<ElementRef>;  
  @ViewChild('firstNavigationElement') firstNavigationElement: ElementRef;
  
  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {   
    this.mainMenu = this.navigationService.getMainMenu();
  }

}