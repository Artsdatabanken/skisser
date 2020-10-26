import { Directive, HostListener, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MenuComponent } from '../layout/menu/menu.component';

@Directive({
  selector: '[closeMenu]'
})

export class MenuDirective {

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