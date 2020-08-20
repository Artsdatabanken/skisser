import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss']
})

export class HamburgerComponent implements OnInit {

  isActive: boolean = false;
  navigationLinks$: Observable<string[]>;
  subNavigationLinks$: Observable<string[]>;
  @Input() ariaLabel: string;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationLinks$ = this.navigationService.getMenuItems();
    this.subNavigationLinks$ = this.navigationService.getSubMenuItems();
  }

  toggleMenu(): void {
    this.isActive = !this.isActive;

    console.log('is active', this.isActive)
  }

}
