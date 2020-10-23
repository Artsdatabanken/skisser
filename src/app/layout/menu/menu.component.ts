import { Component, OnInit, Input, Inject, Renderer2, Directive, HostListener, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { NavigationService } from 'src/app/services/navigation.service';

@Directive({
  selector: '[closeMenu]'
})

export class CloseMenuDirective {

  @HostListener('click') onClick() {
    this.renderer.removeClass(this.document.body, 'active-menu');
    this.renderer.removeClass(this.document.getElementById('hamburger'), 'hamburger--is-active');
    this.renderer.removeClass(this.document.getElementById('menu'), 'menu--open');
    this.host.isActive = false;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private host: MenuComponent
  ) { }

}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})

export class MenuComponent implements OnInit {

  public isActive: boolean = false;
  navigationLinks$: Observable<string[]>;
  subNavigationLinks$: Observable<string[]>;
  topNavigationLinks$: Observable<string[]>;
  extraNavigationLinks$: Observable<string[]>;

  @Input() ariaLabel: string;

  constructor(
    private navigationService: NavigationService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.navigationLinks$ = this.navigationService.getMenuItems();
    this.subNavigationLinks$ = this.navigationService.getSubMenuItems();
    this.topNavigationLinks$ = this.navigationService.getTopMenuItems();
    this.extraNavigationLinks$ = this.navigationService.getExtraMenuItems();
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'active-menu');
  }

  toggleMenu(): void {

    this.isActive = !this.isActive;

    if (this.isActive) {
      this.renderer.addClass(this.document.body, 'active-menu');
    }
    else {
      this.renderer.removeClass(this.document.body, 'active-menu');
    }

  }

  getCSSClass(link: string | null): string {

    if (link['sectionType']) {
      return `navigation__section--${link['sectionType']}`;
    }
    else if (link['type']){
      return `navigation__link--${link['type']}`;
    }

  }

}
