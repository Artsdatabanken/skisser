import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

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
    this.subscription.unsubscribe();
  }
  
}
