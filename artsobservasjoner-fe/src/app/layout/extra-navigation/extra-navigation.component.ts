import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-extra-navigation',
  templateUrl: './extra-navigation.component.html',
  styleUrls: ['./extra-navigation.component.scss']
})

export class ExtraNavigationComponent implements OnInit {

  extraMenu: any[];  
  @ViewChild('lastNavigationElement') lastNavElement: ElementRef;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.extraMenu = this.navigationService.getExtraMenu();
  }

}
