import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service.js';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {

  mainMenu: {};

  @Input() ariaLabel: string;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {   
    this.mainMenu = this.navigationService.getMainMenu();
  }

  getStyle(style: string | null, type: string | null): string {
    return this.navigationService.getStyle(style, type);
  }

}