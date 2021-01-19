import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ElementRef, Renderer2, Inject } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})

export class LogoComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void { }

  closeMenu(): void {
    // this.renderer.removeClass(this.document.getElementById('menu'), 'menu--open');
    // this.renderer.removeClass(this.document.getElementById('hamburger'), 'hamburger--is-active');
  }

}
