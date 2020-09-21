import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { OverviewNumbersComponent } from './components/statistics/overview-numbers/overview-numbers.component';
import { QualityAssuredDataComponent } from './components/statistics/quality-assured-data/quality-assured-data.component';
import { RedListedSpeciesComponent } from './components/statistics/red-listed-species/red-listed-species.component';
import { AlienSpeciesComponent } from './components/statistics/alien-species/alien-species.component';
import { UserStatisticsComponent } from './components/statistics/user-statistics/user-statistics.component';
import { UserListsComponent } from './components/statistics/user-lists/user-lists.component';
import { ContactComponent } from './components/contact/contact.component';
import { TouComponent } from './components/about/tou/tou.component';
import { FaqComponent } from './components/faq/faq.component';
import { ReportComponent } from './components/report/report.component';
import { NoDataSpeciesComponent } from './components/statistics/no-data-species/no-data-species.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { FindingsComponent } from './components/findings/findings.component';
import { DesignComponent } from './components/design/design.component';
import { ValidationComponent } from './components/validation/validation.component';
import { SightingsComponent } from './components/sightings/sightings.component';
import { TodaySightingsComponent } from './components/sightings/today-sightings/today-sightings.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Forsiden',
      name: 'home',
      type: 'page'
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Forsiden',
      name: 'home',
      type: 'page'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'Om Artsobservasjoner',
      name: 'about',
      type: 'page',
      breadcrumb: 'Om Artsobservasjoner'
    },
    children: [
      {
        path: 'tou',
        component: TouComponent,
        data: {
          title: 'Brukervilkår',
          name: 'tou',
          type: 'page',
          breadcrumb: 'Brukervilkår'
        }
      }
    ]
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      title: 'Kontakt',
      name: 'contact',
      type: 'page',
      breadcrumb: 'Kontakt'
    }
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: {
      title: 'Ofte stilte spørsmål',
      name: 'faq',
      type: 'page',
      breadcrumb: 'Ofte stilte spørsmål'
    }
  },
  {
    path: 'dictionary',
    component: FaqComponent,
    data: {
      title: 'Ordliste',
      name: 'dictionary',
      type: 'page',
      breadcrumb: 'Ordliste'
    }
  },
  {
    path: 'sightings/statistics',
    component: StatisticsComponent,
    data: {
      title: 'Statistikk',
      name: 'sightings/statistics',
      type: 'mega',
      breadcrumb: 'Funn & Observasjoner / Statistikk'
    },
    // children: [
    //   {
    //     path: 'overview-numbers',
    //     component: OverviewNumbersComponent,
    //     data: {
    //       title: 'Oversiktstall',
    //       name: 'overview-numbers',
    //       type: 'mega'
    //     }
    //   },
    //   {
    //     path: 'quality-assured-data',
    //     component: QualityAssuredDataComponent,
    //     data: {
    //       title: 'Kvalitetssikrede data',
    //       name: 'quality-assured-data',
    //       type: 'mega'
    //     }
    //   },
    //   {
    //     path: 'red-listed-species',
    //     component: RedListedSpeciesComponent,
    //     data: {
    //       title: 'Rødlistede arter',
    //       name: 'red-listed-species',
    //       type: 'mega'
    //     }
    //   },
    //   {
    //     path: 'alien-species',
    //     component: AlienSpeciesComponent,
    //     data: {
    //       title: 'Fremmede arter',
    //       name: 'alien-species',
    //       type: 'mega'
    //     }
    //   },
    //   {
    //     path: 'no-data-species',
    //     component: NoDataSpeciesComponent,
    //     data: {
    //       title: 'Arter uten nok data',
    //       name: 'no-data-species',
    //       type: 'mega'
    //     }
    //   },
    //   {
    //     path: 'user-statistics',
    //     component: UserStatisticsComponent,
    //     data: {
    //       title: 'Brukerstatistikk',
    //       name: 'user-statistics',
    //       type: 'mega'
    //     }
    //   },
    //   {
    //     path: 'user-lists',
    //     component: UserListsComponent,
    //     data: {
    //       title: 'Mine lister',
    //       name: 'user-lists',
    //       type: 'mega'
    //     }
    //   },
    // ],
  },

  {
    path: 'sightings/statistics/overview-numbers',
    component: OverviewNumbersComponent,
    data: {
      title: 'Oversiktstall',
      name: 'overview-numbers',
      type: 'std',
      breadcrumb: 'Statistikk: Oversiktstall'
    }
  },
  {
    path: 'sightings/statistics/quality-assured-data',
    component: QualityAssuredDataComponent,
    data: {
      title: 'Kvalitetssikrede data',
      name: 'quality-assured-data',
      type: 'std',
      breadcrumb: 'Statistikk: Kvalitetssikrede data'
    }
  },
  {
    path: 'sightings/statistics/red-listed-species',
    component: RedListedSpeciesComponent,
    data: {
      title: 'Rødlistede arter',
      name: 'red-listed-species',
      type: 'std',
      breadcrumb: 'Statistikk: Rødlistede arter'
    }
  },
  {
    path: 'sightings/statistics/alien-species',
    component: AlienSpeciesComponent,
    data: {
      title: 'Fremmede arter',
      name: 'alien-species',
      type: 'std',
      breadcrumb: 'Statistikk: Fremmede arter'
    }
  },
  {
    path: 'sightings/statistics/user-statistics',
    component: UserStatisticsComponent,
    data: {
      title: 'Brukerstatistikk',
      name: 'user-statistics',
      type: 'std',
      breadcrumb: 'Statistikk: Brukerstatistikk'
    }
  },
  {
    path: 'sightings/statistics/user-lists',
    component: UserListsComponent,
    data: {
      title: 'Mine lister',
      name: 'user-lists',
      type: 'std',
      breadcrumb: 'Statistikk: Mine lister'
    }
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    data: {
      title: 'Fotogallery',
      name: 'gallery'
    }
  },
  {
    path: 'report',
    component: ReportComponent,
    data: {
      title: 'Rapportere',
      name: 'report',
      type: 'std',
      breadcrumb: 'Rapportere'
    }
  }, 
  {
    path: 'findings',
    component: FindingsComponent,
    data: {
      title: 'Funn & Observasjoner',
      name: 'findings',
      type: 'std',
      breadcrumb: 'Funn & Observasjoner'
    }
  },
  {
    path: 'sightings',
    component: SightingsComponent,
    data: {
      title: 'Funn & Observasjoner',
      name: 'sightings',
      type: 'std',
      breadcrumb: 'Funn & Observasjoner'
    }
  },
  {
    path: 'sightings/today-sightings',
    component: TodaySightingsComponent,
    data: {
      title: 'Dagens funn',
      name: 'today-sightings',
      type: 'std',
      breadcrumb: 'Dagens funn'
    }
  },
  {
    path: 'validation',
    component: ValidationComponent,
    data: {
      title: 'Validering',
      name: 'validation',
      type: 'std',
      breadcrumb: 'Validering'
    }
  },
  {
    path: 'design',
    component: DesignComponent,
    data: {
      title: 'Designssystem',
      name: 'design',
      type: 'std',
      breadcrumb: 'Designssystem'
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: 'Not found',
      name: 'notfound',
      type: 'page',
      breadcrumb: '404'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
