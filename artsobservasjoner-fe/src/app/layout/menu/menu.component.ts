import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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

  @ViewChild('menuToggle', { read: ElementRef, static: true }) menuButton: ElementRef<HTMLElement>;
  @ViewChild('menu', { read: ElementRef, static: true }) menu: ElementRef<HTMLElement>;
  @ViewChild('menuWrapper', { read: ElementRef, static: true }) menuWrapper: ElementRef<HTMLElement>;

  // static true: tells Angular that it’s OK to resolve query results before change detection runs, as the element is not dynamic.

  menuItems: ElementRef[] = [];

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
    // this.trapFocus(this.menuWrapper);
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

  trapFocus(element: any): void {

    const menuButton: any = document.querySelector('#hamburger');

    const allFocusableElements = element.querySelectorAll(
      'a[href], button, textarea, input[type="text"],' +
      'input[type="radio"], input[type="checkbox"], select'
    );

    const focusableElements = Array.from(allFocusableElements).filter((el: any) => !el.disabled);
    const firstFocusableElement: any = focusableElements[1]; // because first is menu
    const lastFocusableElement: any = focusableElements[focusableElements.length - 1];

    console.log({ focusableElements })
    // we ue native JS because we can't use @HostListener inside a method in Angular
    
    console.log('firstFocusableElementfirstFocusableElementfirstFocusableElement', firstFocusableElement)

    element.addEventListener('keydown', function (event: KeyboardEvent) {

      // is Tab being pressed
      let isTabPressed: boolean = event.key === 'Tab' || event.code === 'Tab'; 

      if (!isTabPressed) return;

      if (event.shiftKey) /* shift + tab */ {

        if (document.activeElement === firstFocusableElement) {
          //lastFocusableElement.focus();
          menuButton.focus();
          event.preventDefault();
        }

        if (document.activeElement === menuButton) {
          console.log('are we here', firstFocusableElement)
          firstFocusableElement.focus();
          event.preventDefault();
        }

      }
      else /* tab */ {

        if (document.activeElement === lastFocusableElement) {
          //firstFocusableElement.focus();
          menuButton.focus();
          event.preventDefault();
        }

      }

    });
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event?: KeyboardEvent) {

    // if (this.extraNavigationComponent.secondLastNavigationElement.nativeElement === this.document.activeElement) {
    //   this.menuButton.nativeElement.focus();
    // }

    // console.log('TEST second last ---------->>>>>>', this.document.activeElement === this.extraNavigationComponent.secondLastNavigationElement.nativeElement)
    // console.log('TEST last ---------->>>>>>', this.document.activeElement === this.extraNavigationComponent.lastNavigationElement.nativeElement)

    this.menuItems = this.navigationComponent.navigationElements.toArray().concat(this.extraNavigationComponent.navigationElements.toArray());
    //this.menuItems = this.extraNavigationComponent.navigationElements;

    // console.log('safgsjfgadjgg', event)
    // console.log('safgsjfgadjgg', event.shiftKey)

    if (this.activeMenu) {

      if (event.key === 'Tab' || event.code === 'Tab') {
        //event.preventDefault();

        //console.log('active', this.document.activeElement)

        // console.log('second last', this.menuItems[this.menuItems.length - 2].nativeElement)

        // console.log('last', this.menuItems[this.menuItems.length - 1].nativeElement)
        // console.log('first', this.menuItems.first)
        //console.log('last', this.menuItems.last)
        // console.log('TEST', this.document.activeElement === this.menuItems[this.menuItems.length - 2].nativeElement)
        //console.log('TEST', this.document.activeElement === this.menuItems[this.menuItems.length - 1].nativeElement)

        //this.menuItems.get(this.menuItems.length - 1)

        // if (this.document.activeElement === this.menuItems[this.menuItems.length - 1].nativeElement) {
        //   this.menuButton.nativeElement.focus();
        // }

      }

      // ----------***

      if (event.key === 'Escape' || event.code === 'Escape') {
        this.menuService.closeMenu();
        this.menuButton.nativeElement.focus();
      }
      else if (event.key === 'Home' || event.code === 'Home') {
        this.navigationComponent.firstNavigationElement.nativeElement.focus();
        // this.menuService.setFocusOnFirstElement(); // if we want to use a service
      }
      else if (event.key === 'End' || event.code === 'End') {
        this.extraNavigationComponent.lastNavigationElement.nativeElement.focus();
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

}
