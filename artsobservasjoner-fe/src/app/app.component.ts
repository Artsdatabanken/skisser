import { Component, Inject, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import defaultLanguage from "./../assets/i18n/no.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'Artsobservasjoner';

  pageTitle: string = '';
  pageId: string = '';
  pageLayout: string = '';

  skipLinkPath: string;
  windowScrolled: boolean = false;
  routerSubscription: Subscription;
  subscriptions: Subscription[] = [];

  layoutTypes: string[] = [];
  layoutTypesForbidden: string[] = ['article', 'frontpage', 'item', 'spa', 'text'];

  selectedLanguage: string;
  languages: any[] = [];

  @ViewChild('mainContent', { static: true }) mainContent: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object,
    public translate: TranslateService
  ) {

    // translate.addLangs(['no', 'en']);
    // translate.setDefaultLang('en');
    // translate.use('en');

    
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|no/) ? browserLang : 'en');

    this.handleLanguage();

  }

  ngOnInit(): void {

    this.setPageLayout();
    this.setPageTitle();

  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  handleLanguage(): void {
    
    // DEFINE SUPPORTED LANGUAGES
    this.translate.addLangs(['no', 'en']);

    // DEFINE AND USE DEFAULT LANGUAGE
    // this.translate.setTranslation('no', defaultLanguage);
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    if (localStorage.getItem('LANGUAGE')) {
      this.translate.setDefaultLang(localStorage.getItem('LANGUAGE'));
      this.translate.use(localStorage.getItem('LANGUAGE'));
    }
    else {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
      localStorage.setItem('LANGUAGE', 'en');
    }
    
  }

  setPageTitle(): void {

    this.subscriptions.push(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) { route = route.firstChild; }
          return route;
        }),
        mergeMap(route => route.data)).subscribe(routeData => {

          this.pageId = routeData.id;

          this.translate.stream(['menu.' + routeData.title]).subscribe(res => {

            this.pageTitle = res[`menu.${routeData.title}`];

            if (this.pageId === 'frontpage') {
              this.titleService.setTitle(`Artsobservasjoner - Rapporteringssytem for arter`);
            }
            else {
              this.titleService.setTitle(`${this.pageTitle} - Artsobservasjoner`);
            }
          });

        })
    );

  }

  setPageLayout(): void {
    this.subscriptions.push(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) { route = route.firstChild; }
          return route;
        }),
        mergeMap(route => route.data)).subscribe(obj => {

          // set skip to content
          if (!this.router.url.endsWith('#mainContent')) {
            this.skipLinkPath = `${this.router.url}#mainContent`;
          }

          this.pageLayout = obj.layout;

        })
    );
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