import { Directive, HostListener, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MenuService } from '../services/menu.service';

@Directive({
  selector: '[closeMenu]'
})

export class MenuDirective {

  @HostListener('click') onClick() {
    this.renderer.removeClass(this.document.body, 'prevent-scroll');
    this.renderer.removeClass(this.document.getElementById('hamburger'), 'hamburger--is-active');
    this.renderer.removeClass(this.document.getElementById('menu'), 'menu--open');
    this.menuService.closeMenu();
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private menuService: MenuService
  ) { }

}