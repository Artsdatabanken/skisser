import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  activeMenu: boolean;
  menuVisibility: Subject<boolean> = new Subject<boolean>();
  private renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.activeMenu = false;
  }

  toggleMenu(): void {
    this.activeMenu = !this.activeMenu;
    this.menuVisibility.next(this.activeMenu);

    if (this.activeMenu) {
      this.renderer.addClass(this.document.body, 'prevent-scroll');
    }
    else {
      this.renderer.removeClass(this.document.body, 'prevent-scroll');
    }

  }

  closeMenu(): void {

    this.activeMenu = false;
    this.menuVisibility.next(this.activeMenu);
    this.renderer.removeClass(this.document.body, 'prevent-scroll');

  }

  setFocusOnFirstElement(): void {
    this.renderer.selectRootElement('#navigationLink00', true).focus(); // this feels wrong and hacky as selctrootelement wasn't intended for this user

    console.log('TEST', this.document.getElementById('navigationLink00'))
    console.log('TEST', this.renderer.selectRootElement('#navigationLink00', true))
  }

}
