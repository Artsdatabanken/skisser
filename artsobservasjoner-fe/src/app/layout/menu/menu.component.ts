import { DOCUMENT } from '@angular/common';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
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
  @ViewChild('hamburgerMenu') menuButton: ElementRef;
  focusedElements: any[] = [];


  // @ViewChildren('navigationElement') navigationLinks: QueryList<any>;

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

  // @HostListener('document:keyup', ['$event'])
  // onKeyupHandler(event?: KeyboardEvent) {

  //   this.focusedElements.push(this.document.activeElement);

  //   // console.log('focused elements', this.focusedElements)

  //   const allNavigationLinks: any = this.navigationComponent.navigationLinks.toArray().concat(this.extraNavigationComponent.navigationLinks.toArray());


  //   allNavigationLinks.forEach(link => {
  //     this.focusedElements.forEach(element => {
  //       console.log('nav link ------------->>>>', link)
  //       console.log('focused element ------------->>>>', element)
  //       console.log('TEST ------------->>>>', link === element)


  //     });
  //   });

  // }

  // @HostListener('document:keypress', ['$event'])
  // onKeypressHandler(event?: KeyboardEvent) {

  //   console.log('event ---------->>>>>>', event)
  //   console.log('active ---------->>>>>>', this.document.activeElement)
  //   console.log('TEST ---------->>>>>>', this.document.activeElement === this.extraNavigationComponent.lastNavigationElement.nativeElement)



  // }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event?: KeyboardEvent) {

    // if (this.extraNavigationComponent.secondLastNavigationElement.nativeElement === this.document.activeElement) {
    //   this.menuButton.nativeElement.focus();
    // }

    console.log('TEST second last ---------->>>>>>', this.document.activeElement === this.extraNavigationComponent.secondLastNavigationElement.nativeElement)
    console.log('TEST last ---------->>>>>>', this.document.activeElement === this.extraNavigationComponent.lastNavigationElement.nativeElement)


    if (this.activeMenu) {

      if (event.key === 'Escape' || event.code === 'Escape') {
        this.menuService.closeMenu();
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
