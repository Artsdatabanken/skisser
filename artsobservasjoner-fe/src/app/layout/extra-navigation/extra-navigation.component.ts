import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-extra-navigation',
  templateUrl: './extra-navigation.component.html',
  styleUrls: ['./extra-navigation.component.scss']
})

export class ExtraNavigationComponent implements OnInit {

  extraMenu: any[];  
  @ViewChildren('navigationElement') navigationElements: QueryList<ElementRef>;  
  @ViewChild('lastNavigationElement') lastNavigationElement: ElementRef;  
  @ViewChild('secondLastNavigationElement') secondLastNavigationElement: ElementRef;  

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.extraMenu = this.navigationService.getExtraMenu();
  }

}
