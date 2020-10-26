import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {

  mainMenu$: Observable<string[]>;
  @Input() ariaLabel: string;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.mainMenu$ = this.navigationService.getMenuItems();
  }

  getCSSClass(link: string): string {
    return this.navigationService.getMenuCSSClass(link);
  }

}