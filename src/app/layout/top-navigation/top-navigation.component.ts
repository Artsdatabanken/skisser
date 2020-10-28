import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})

export class TopNavigationComponent implements OnInit {

  topMenu$: Observable<string[]>;
  @Input() ariaLabel: string;
  @Input() location: string;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.topMenu$ = this.navigationService.getTopMenuItems();
  }

  getLinkStyle(link: string): string {
    return this.navigationService.getMenuCSSClass(link);
  }

  getCSSClass(link: string | null): string {
    return `top-navigation__link--${link['name']}`;
  }

}
