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
import { GalleryComponent } from './components/gallery/gallery.component';
import { DesignComponent } from './components/design/design.component';
import { ValidationComponent } from './components/validation/validation.component';
import { TodaySightingsComponent } from './components/fas/today-sightings/today-sightings.component';
import { LoginComponent } from './components/login/login.component';
import { FasComponent } from './components/fas/fas.component';
import { ReportingComponent } from './components/report/reporting/reporting.component';

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
  },
  {
    path: 'about/tou',
    component: TouComponent,
    data: {
      title: 'Brukervilkår',
      name: 'tou',
      type: 'page',
      breadcrumb: 'Brukervilkår'
    }
  },
  {
    path: 'fas/statistics',
    component: StatisticsComponent,
    data: {
      title: 'Statistikk',
      name: 'fas/statistics',
      type: 'mega',
      breadcrumb: 'Funn & Observasjoner / Statistikk'
    },
  },
  {
    path: 'fas/statistics/overview-numbers',
    component: OverviewNumbersComponent,
    data: {
      title: 'Oversiktstall',
      name: 'overview-numbers',
      type: 'std',
      breadcrumb: 'Statistikk: Oversiktstall'
    }
  },
  {
    path: 'fas/statistics/quality-assured-data',
    component: QualityAssuredDataComponent,
    data: {
      title: 'Kvalitetssikrede data',
      name: 'quality-assured-data',
      type: 'std',
      breadcrumb: 'Statistikk: Kvalitetssikrede data'
    }
  },
  {
    path: 'fas/statistics/red-listed-species',
    component: RedListedSpeciesComponent,
    data: {
      title: 'Rødlistede arter',
      name: 'red-listed-species',
      type: 'std',
      breadcrumb: 'Statistikk: Rødlistede arter'
    }
  },
  {
    path: 'fas/statistics/alien-species',
    component: AlienSpeciesComponent,
    data: {
      title: 'Fremmede arter',
      name: 'alien-species',
      type: 'std',
      breadcrumb: 'Statistikk: Fremmede arter'
    }
  },
  {
    path: 'fas/statistics/user-statistics',
    component: UserStatisticsComponent,
    data: {
      title: 'Brukerstatistikk',
      name: 'user-statistics',
      type: 'std',
      breadcrumb: 'Statistikk: Brukerstatistikk'
    }
  },
  {
    path: 'fas/statistics/user-lists',
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
      type: 'page',
      breadcrumb: 'Rapportere'
    }
  },
  {
    path: 'report/reporting',
    component: ReportingComponent,
    data: {
      title: 'Rapportering',
      name: 'reporting',
      type: 'std',
      breadcrumb: 'Rapportering'
    }
  },
  {
    path: 'fas',
    component: FasComponent,
    data: {
      title: 'Funn & Observasjoner',
      name: 'fas',
      type: 'page',
      breadcrumb: 'Funn & Observasjoner'
    }
  },
  {
    path: 'fas/today-sightings',
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
      title: 'Kvalitetssikring av data',
      name: 'validation',
      type: 'page',
      breadcrumb: 'Kvalitetssikring av data'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Logginn',
      name: 'login',
      type: 'page',
      breadcrumb: 'Logginn'
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
