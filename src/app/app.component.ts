import { Component, Inject, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'Artsobservasjoner';
  page: string = '';
  pageName: string = '';
  skipLinkPath: string;
  routerSubscription: Subscription;
  windowScrolled: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(x => {

      //console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', x)

      if (!this.router.url.endsWith('#content')) {
        this.skipLinkPath = `${this.router.url}#content`;
      }

      this.page = x.title;
      this.pageName = x.name;

      // if (this.pageName === "home") {
      //   this.page = null;
      // }

      if (this.pageName === 'home') {
        this.titleService.setTitle(`Forsiden - Artsobservasjoner`);
      }
      else {
        this.titleService.setTitle(`${this.page} - Artsobservasjoner`);
      }
    });

  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  onActivate(event: any) {

    if (environment.production) {

      if (isPlatformBrowser(this.platformId) && environment.production) {
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