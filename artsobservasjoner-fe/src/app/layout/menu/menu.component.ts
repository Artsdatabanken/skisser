import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/services/menu.service';
import { ExtraNavigationComponent } from '../extra-navigation/extra-navigation.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})

export class MenuComponent implements OnInit {

  activeMenu: boolean;
  subscription: Subscription;
  
  @ViewChild(NavigationComponent) navigationComponent: NavigationComponent;
  @ViewChild(ExtraNavigationComponent) extraNavigationComponent: ExtraNavigationComponent;

  constructor(private menuService: MenuService) {
    
    this.subscription = this.menuService.menuVisibility.subscribe((value) => {
      this.activeMenu = value;
    });

  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.menuService.closeMenu();
    this.subscription.unsubscribe();
  }

  toggleMenu(): void {
    this.menuService.toggleMenu();
  }

  closeMenu(event: KeyboardEvent): void {
    this.menuService.closeMenu();
  }

  setFocusOnFirstElement(event: KeyboardEvent): void {
    this.navigationComponent.firstNavElement.nativeElement.focus();
    // this.menuService.setFocusOnFirstElement(); // if we want to use a service
  }

  setFocusOnLastElement(event: KeyboardEvent): void {
    this.extraNavigationComponent.lastNavElement.nativeElement.focus();
  }

}
