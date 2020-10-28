import { Component, OnInit, Input, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})

export class MenuComponent implements OnInit {
 
  public isActive: boolean = false;
  @Input() ariaLabel: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void { }

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

}
