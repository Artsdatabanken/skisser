import { Component, OnInit, Input, Inject, Renderer2 } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss']
})

export class HamburgerComponent implements OnInit {

  isActive: boolean = false;
  navigationLinks$: Observable<string[]>;
  subNavigationLinks$: Observable<string[]>;
  @Input() ariaLabel: string;

  constructor(
    private navigationService: NavigationService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.navigationLinks$ = this.navigationService.getMenuItems();
    this.subNavigationLinks$ = this.navigationService.getSubMenuItems();
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