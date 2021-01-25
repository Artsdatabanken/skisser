import { Component, Inject, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'Artsobservasjoner';
  siteLanguage: string;
  pageTitle: string = '';
  pageId: string = '';
  pageLayout: string = '';
  
  skipLinkPath: string;
  windowScrolled: boolean = false;
  routerSubscription: Subscription;
  subscription: Subscription;

  layoutTypes: string[] = [];
  layoutTypesForbidden: string[] = ['article', 'frontpage', 'item', 'spa', 'text'];

  @ViewChild('mainContent', { static: true }) mainContent: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object,
    private translationService: TranslationService
  ) {
    this.subscription = this.translationService.selectedLanguage.subscribe(l => {
      this.siteLanguage = l;
    })
  }

  ngOnInit(): void {

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      mergeMap(route => route.data)).subscribe(obj => {

        if (!this.router.url.endsWith('#mainContent')) {
          this.skipLinkPath = `${this.router.url}#mainContent`;
        }

        // this.pageTitle = obj.text;
        this.pageTitle = this.siteLanguage === 'no' ? obj.translation.no : obj.translation.en;
        this.pageId = obj.id;
        this.pageLayout = obj.layout;

        if (this.pageId === 'frontpage') {
          this.titleService.setTitle(`Artsobservasjoner - Rapporteringssytem for arter`);
        }
        else {
          this.titleService.setTitle(`${this.pageTitle} - Artsobservasjoner`);
        }

      });

  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe(); // IMPORTANT!!
    this.subscription.unsubscribe();
  }

  getLayoutStyle(layout: string): string {
    return `main-grid--${layout}`;
  }

  getAllowedLayoutStyle(pageLayout: string): boolean {
    if (!this.layoutTypesForbidden.includes(pageLayout)) {
      return true;
    }
  }

  onActivate(event: any) {

    this.mainContent.nativeElement.focus();

    if (isPlatformBrowser(this.platformId)) {
      const scrollToTop = window.setInterval(() => {

        const pos = window.pageYOffset;

        if (pos > 0) {
          window.scrollTo(0, pos - 50); // how far to scroll on each step
        }
        else {
          window.clearInterval(scrollToTop);
        }

      }, 10);

    }

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

}