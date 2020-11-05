import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {

  //mainMenu$: Observable<string[]>;
  mainMenu: {};

  @Input() ariaLabel: string;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    //this.mainMenu$ = this.navigationService.getMenuItems();
   
    this.mainMenu = this.navigationService.getMainMenu();
  }

  getLinkStyle(style: string | null, type: string | null): string {
    return this.navigationService.getMenuCSSClass(style, type);
  }

}