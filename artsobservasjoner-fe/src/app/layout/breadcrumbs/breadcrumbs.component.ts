import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from '../../models/breadcrumb';
import { Router, ActivatedRoute, NavigationEnd, Route, PRIMARY_OUTLET } from '@angular/router';
import { filter, distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

export class BreadcrumbsComponent implements OnInit {

  breadcrumbs: Array<{ label: string; url: string }>;
  deliminator: string = ' > ';

  isHome: boolean;

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


            console.log('route', this.breadcrumbs, route.snapshot.data);

            if (route.outlet === 'primary') {
              const routeSnapshot = route.snapshot;
              url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');

              this.breadcrumbs.push({
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