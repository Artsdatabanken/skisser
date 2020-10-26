import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-sub-navigation',
  templateUrl: './sub-navigation.component.html',
  styleUrls: ['./sub-navigation.component.scss']
})

export class SubNavigationComponent implements OnInit {

  subMenu$: Observable<string[]>;
  extraMenu$: Observable<string[]>;
  @Input() ariaLabel: string;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.subMenu$ = this.navigationService.getSubMenuItems();
    this.extraMenu$ = this.navigationService.getExtraMenuItems();
  }

  getCSSClass(link: string): string {
    return this.navigationService.getMenuCSSClass(link);
  }

}
