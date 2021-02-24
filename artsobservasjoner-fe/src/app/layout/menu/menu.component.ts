import { Component, OnInit, Input, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
  @Input() ariaLabel: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private menuService: MenuService
  ) {

    this.activeMenu = this.menuService.activeMenu;
    this.subscription = this.menuService.menuVisibility.subscribe((value) => {
      this.activeMenu = value;
    });

  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'active-menu');
    this.subscription.unsubscribe();
  }

  toggleMenu(): void {

    this.menuService.toggleMenu(); 
    
    if (this.menuService.activeMenu) {
      this.renderer.addClass(this.document.body, 'active-menu');
    }
    else {
      this.renderer.removeClass(this.document.body, 'active-menu');
    }

  }

}
