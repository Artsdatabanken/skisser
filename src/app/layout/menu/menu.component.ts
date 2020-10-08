import { Component, OnInit, Input, Inject, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  
  isActive: boolean = false;
  navigationLinks$: Observable<string[]>;
  subNavigationLinks$: Observable<string[]>;
  topNavigationLinks$: Observable<string[]>;
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
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'mobile');
  }

  toggleMenu(): void {
    this.isActive = !this.isActive;

    if (this.isActive) {
      this.renderer.addClass(this.document.body, 'mobile');
    }
    else {
      this.renderer.removeClass(this.document.body, 'mobile');
    }
  }

}
