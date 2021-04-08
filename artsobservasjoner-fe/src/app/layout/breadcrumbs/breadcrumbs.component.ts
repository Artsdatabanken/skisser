import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

export class BreadcrumbsComponent implements OnInit {

  breadcrumbs: Array<{ parentKey: string | any; label: string; url: string }>;
  deliminator: string = ' > ';
  translationParentKey: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe(event => {

        this.breadcrumbs = [];
        let currentRoute = this.activatedRoute.root;
        let url: string = '';

        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;

          childrenRoutes.forEach(route => {

            if (route.outlet === 'primary') {
              const routeSnapshot = route.snapshot;
              url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
              
              console.log('route.data', route.snapshot.url);

              this.breadcrumbs.push({
                parentKey: route.snapshot.data.parent,
                label: route.snapshot.data.title,
                url: url
              });

              currentRoute = route;

            }
          });

        } while (currentRoute);

        console.log('breadcrumbs', this.breadcrumbs);

      });

  }


}