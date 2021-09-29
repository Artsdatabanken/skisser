import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})

export class MenuComponent implements OnInit {

  activeMenu: boolean;
  subscription: Subscription;

  @ViewChild('menuToggle', { read: ElementRef, static: true }) menuButton: ElementRef<HTMLElement>;
  @ViewChild('menuWrapper', { read: ElementRef, static: true }) menuWrapper: ElementRef<HTMLElement>;

  /* static true: tells Angular that it’s OK to resolve query results before change detection runs, 
  as the element is not dynamic. */

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private menuService: MenuService
  ) {

    this.subscription = this.menuService.menuVisibility.subscribe((value) => {
      this.activeMenu = value;
    });

  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.onKeydownHandler();
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

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event?: KeyboardEvent) {

    const menuButton: HTMLElement = this.menuButton.nativeElement;
    const allFocusableElements: any = this.menuWrapper.nativeElement.querySelectorAll('a[href], button#hamburger');
    const focusableElements = Array.from(allFocusableElements).filter((el: any) => !el.disabled);
    const firstFocusableElement: any = focusableElements[1]; // because first is menu
    const lastFocusableElement: any = focusableElements[focusableElements.length - 1];

    // console.log({ focusableElements })
    // console.log('first---------->>>>>>>>>>>>>', firstFocusableElement)
    // console.log('last---------->>>>>>>>>>>>>', lastFocusableElement)

    if (this.activeMenu) {

      if (event.key === 'Escape' || event.code === 'Escape') {
        this.menuService.closeMenu();
        menuButton.focus();
      }

      else if (event.key === 'Home' || event.code === 'Home') {
        firstFocusableElement.focus();
      }

      else if (event.key === 'End' || event.code === 'End') {
        lastFocusableElement.focus();
      }

      const isTabPressed: boolean = event.key === 'Tab' || event.code === 'Tab';

      if (!isTabPressed) return;

      if (event.shiftKey) /* shift + tab */ {

        if (document.activeElement === menuButton) {
          lastFocusableElement.focus();
          event.preventDefault();
        }

      }

      else if (event.key === 'Tab' || event.code === 'Tab') /* tab */ {

        if (document.activeElement === lastFocusableElement) {
          menuButton.focus();
          event.preventDefault();
        }

      }

    }

  }

}
