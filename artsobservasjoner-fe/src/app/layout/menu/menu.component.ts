import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('hamburgerMenu') menuButton: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private menuService: MenuService
  ) {

    this.subscription = this.menuService.menuVisibility.subscribe((value) => {
      this.activeMenu = value;
    });

  }

  ngOnInit(): void {
    console.log('TEST', this.document.activeElement)
  }

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

  @HostListener('document:keyup', ['$event'])
  onKeyupHandler(event: KeyboardEvent) {

    // console.log('TEST', this.document.activeElement)
    console.log('TEST', this.document.activeElement === this.extraNavigationComponent.lastNavElement.nativeElement)

    if (this.document.activeElement === this.extraNavigationComponent.lastNavElement.nativeElement) {
      this.menuButton.nativeElement.focus();
    }

  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {

    // console.log('HOSTLISTENER', event)

    if (this.activeMenu) {
      if (event.key === 'Escape' || event.code === 'Escape') {
        this.menuService.closeMenu();
      }
      else if (event.key === 'Home' || event.code === 'Home') {
        this.navigationComponent.firstNavElement.nativeElement.focus();
        // this.menuService.setFocusOnFirstElement(); // if we want to use a service
      }
      else if (event.key === 'End' || event.code === 'End') {
        this.extraNavigationComponent.lastNavElement.nativeElement.focus();
      }
    }

  }

  // @HostListener('document:keydown.escape', ['$event'])
  // onKeydownEscape(event: KeyboardEvent) {

  //   console.log('HOSTLISTENER escape', event)

  //   if (this.activeMenu) {
  //     this.menuService.closeMenu();
  //   }

  // }

  // @HostListener('document:keydown.home', ['$event'])
  // onKeydownHome(event: KeyboardEvent) {

  //   console.log('HOSTLISTENER home', event)

  //   if (this.activeMenu) {
  //     this.navigationComponent.firstNavElement.nativeElement.focus();
  //     // this.menuService.setFocusOnFirstElement(); // if we want to use a service
  //   }

  // }

  // @HostListener('document:keydown.end', ['$event'])
  // onKeydownEnd(event: KeyboardEvent) {

  //   console.log('HOSTLISTENER end', event)

  //   if (this.activeMenu) {
  //     this.extraNavigationComponent.lastNavElement.nativeElement.focus();
  //   }

  // }

  @HostListener('document.focus', ['$event'])
  onFocus(event) {
    console.log('FOCUS', event)
  }

  @HostListener('blur', ['$event'])
  onblur(event) {
    console.log('FOCUS', event)
  }

}
