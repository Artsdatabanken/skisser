import { Component, OnInit } from '@angular/core';
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
  
  constructor(private menuService: MenuService) {

    this.activeMenu = this.menuService.activeMenu;
    this.subscription = this.menuService.menuVisibility.subscribe((value) => {
      this.activeMenu = value;
    });

  }

  ngOnInit(): void { }

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

    // @HostListener('document:keyup.escape', ['$event']) onKeyupHandler(event: KeyboardEvent) {

  //   console.log('HOSTLISTENER', event)
  //   if (this.activeMenu) {
  //     this.renderer.removeClass(this.document.body, 'prevent-scroll');
  //     this.menuService.closeMenu();
  //   }

  // }

}
