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
import { DesignComponent } from './components/design/design.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManagementComponent } from './components/management/management.component';
import { SightingsComponent } from './components/observations/sightings/sightings.component';
import { SightingComponent } from './components/observations/sighting/sighting.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateProjectComponent } from './components/projects/create-project/create-project.component';
import { ObservationsComponent } from './components/observations/observations.component';
import { ReportObservationComponent } from './components/report/report-observation/report-observation.component';
import { ReportComponent } from './components/report/report.component';
import { MapComponent } from './components/map/map.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ContributeComponent } from './components/about/contribute/contribute.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: HomeComponent,
//     data: {
//       label: 'Forsiden',
//       name: 'home',
//       layout: 'frontpage'
//     }
//   },
//   {
//     path: 'home',
//     component: HomeComponent,
//     data: {
//       label: 'Forsiden',
//       name: 'home',
//       layout: 'frontpage'
//     }
//   },
//   {
//     path: 'about',
//     component: AboutComponent,
//     data: {
//       label: 'Om tjenesten',
//       name: 'about',
//       layout: 'page',
//       breadcrumb: 'Om tjenesten'
//     },
//   },
//   {
//     path: 'about/contribute',
//     component: ContributeComponent,
//     data: {
//       label: 'Hvordan du kan bidra',
//       name: 'contribute',
//       layout: 'page',
//       breadcrumb: 'Hvordan du kan bidra'
//     },
//   },
//   {
//     path: 'report',
//     component: ReportComponent,
//     data: {
//       label: 'Rapportere',
//       name: 'report',
//       layout: 'page',
//       breadcrumb: 'Rapportere'
//     }
//   },
//   {
//     path: 'report-observation',
//     component: ReportObservationComponent,
//     data: {
//       label: 'Rapportere observasjon',
//       name: 'report',
//       layout: 'page',
//       breadcrumb: 'Rapportere observasjon'
//     }
//   },
//   {
//     path: 'projects',
//     component: ProjectsComponent,
//     data: {
//       label: 'Prosjekter',
//       name: 'projects',
//       layout: 'page',
//       breadcrumb: 'Prosjekter'
//     }
//   },
//   {
//     path: 'projects/create',
//     component: CreateProjectComponent,
//     data: {
//       label: 'Opprett prosjekt',
//       name: 'create-project',
//       layout: 'page',
//       breadcrumb: 'Opprett prosjekt'
//     }
//   },
//   {
//     path: 'observations',
//     component: ObservationsComponent,
//     data: {
//       label: 'Observasjoner',
//       name: 'observations',
//       layout: 'page',
//       breadcrumb: ' Observasjoner'
//     }
//   },
//   {
//     path: 'sightings',
//     component: SightingsComponent,
//     data: {
//       label: 'Se, søk og filtrer observasjoner',
//       name: 'sightings',
//       layout: 'std',
//       breadcrumb: 'Se, søk og filtrer observasjoner'
//     }
//   },
//   {
//     path: 'sightings/sighting',
//     component: SightingComponent,
//     data: {
//       label: 'Observasjon',
//       name: 'sighting',
//       layout: 'std',
//       breadcrumb: 'Observasjon'
//     }
//   },
//   {
//     path: 'statistics',
//     component: StatisticsComponent,
//     data: {
//       label: 'Tall og statistikk',
//       name: 'statistics',
//       layout: 'page',
//       breadcrumb: 'Tall og statistikk'
//     },
//   },
//   {
//     path: 'statistics/overview-numbers',
//     component: OverviewNumbersComponent,
//     data: {
//       label: 'Oversiktstall',
//       name: 'overview-numbers',
//       layout: 'std',
//       breadcrumb: 'Statistikk: Oversiktstall'
//     }
//   },
//   {
//     path: 'statistics/quality-assured-data',
//     component: QualityAssuredDataComponent,
//     data: {
//       label: 'Kvalitetssikrede data',
//       name: 'quality-assured-data',
//       layout: 'std',
//       breadcrumb: 'Statistikk: Kvalitetssikrede data'
//     }
//   },
//   {
//     path: 'statistics/red-listed-species',
//     component: RedListedSpeciesComponent,
//     data: {
//       label: 'Rødlistede arter',
//       name: 'red-listed-species',
//       layout: 'std',
//       breadcrumb: 'Statistikk: Rødlistede arter'
//     }
//   },
//   {
//     path: 'statistics/alien-species',
//     component: AlienSpeciesComponent,
//     data: {
//       label: 'Fremmede arter',
//       name: 'alien-species',
//       layout: 'std',
//       breadcrumb: 'Statistikk: Fremmede arter'
//     }
//   },
//   {
//     path: 'statistics/user-statistics',
//     component: UserStatisticsComponent,
//     data: {
//       label: 'Brukerstatistikk',
//       name: 'user-statistics',
//       layout: 'std',
//       breadcrumb: 'Statistikk: Brukerstatistikk'
//     }
//   },
//   {
//     path: 'messages',
//     component: MessagesComponent,
//     data: {
//       label: 'Meldinger',
//       name: 'logmessagesin',
//       layout: 'page',
//       breadcrumb: 'Meldinger'
//     }
//   },
//   {
//     path: 'login',
//     component: LoginComponent,
//     data: {
//       label: 'Logg inn',
//       name: 'login',
//       layout: 'page',
//       breadcrumb: 'Logg inn'
//     }
//   },
//   {
//     path: 'register',
//     component: RegistrationComponent,
//     data: {
//       label: 'Registrer deg',
//       name: 'registration',
//       layout: 'page',
//       breadcrumb: 'Registrer deg'
//     }
//   },
//   {
//     path: 'management',
//     component: ManagementComponent,
//     data: {
//       label: 'Administrere',
//       name: 'management',
//       layout: 'page',
//       breadcrumb: 'Administrere'
//     }
//   },
//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     data: {
//       label: 'Minside',
//       name: 'dashboard',
//       layout: 'page',
//       breadcrumb: 'Minside'
//     }
//   },
//   {
//     path: 'map',
//     component: MapComponent,
//     data: {
//       label: 'MAP',
//       name: 'map',
//       layout: 'mega',
//       breadcrumb: 'Map'
//     }
//   },
//   {
//     path: 'sitemap',
//     component: SitemapComponent,
//     data: {
//       label: 'Innholdskart A-å',
//       name: 'sitemap',
//       layout: 'page',
//       breadcrumb: 'Innholdskart A-å'
//     }
//   },
//   {
//     path: 'design',
//     component: DesignComponent,
//     data: {
//       label: 'Designssystem',
//       name: 'design',
//       layout: 'std',
//       breadcrumb: 'Designssystem'
//     }
//   },
//   {
//     path: '**',
//     component: PageNotFoundComponent,
//     data: {
//       label: 'Not found',
//       name: 'notfound',
//       layout: 'page',
//       breadcrumb: '404'
//     }
//   }
// ];

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      label: 'Forsiden',
      name: 'home',
      layout: 'frontpage'
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      label: 'Forsiden',
      name: 'home',
      layout: 'frontpage'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      label: 'Om tjenesten',
      name: 'about',
      layout: 'page',
      breadcrumb: 'Om tjenesten'
    },
  },
  {
    path: 'about/contribute',
    component: ContributeComponent,
    data: {
      label: 'Hvordan du kan bidra',
      name: 'contribute',
      layout: 'page',
      breadcrumb: 'Hvordan du kan bidra'
    },
  },
  {
    path: 'report',
    component: ReportComponent,
    data: {
      label: 'Rapportere',
      name: 'report',
      layout: 'page',
      breadcrumb: 'Rapportere'
    }
  },
  {
    path: 'report-observation',
    component: ReportObservationComponent,
    data: {
      label: 'Rapportere observasjon',
      name: 'report',
      layout: 'page',
      breadcrumb: 'Rapportere observasjon'
    }
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: {
      label: 'Prosjekter',
      name: 'projects',
      layout: 'page',
      breadcrumb: 'Prosjekter'
    }
  },
  {
    path: 'projects/create',
    component: CreateProjectComponent,
    data: {
      label: 'Opprett prosjekt',
      name: 'create-project',
      layout: 'page',
      breadcrumb: 'Opprett prosjekt'
    }
  },
  {
    path: 'observations',
    component: ObservationsComponent,
    data: {
      label: 'Observasjoner',
      name: 'observations',
      layout: 'page',
      breadcrumb: ' Observasjoner'
    }
  },
  {
    path: 'sightings',
    component: SightingsComponent,
    data: {
      label: 'Se, søk og filtrer observasjoner',
      name: 'sightings',
      layout: 'std',
      breadcrumb: 'Se, søk og filtrer observasjoner'
    }
  },
  {
    path: 'sightings/sighting',
    component: SightingComponent,
    data: {
      label: 'Observasjon',
      name: 'sighting',
      layout: 'std',
      breadcrumb: 'Observasjon'
    }
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    data: {
      label: 'Tall og statistikk',
      name: 'statistics',
      layout: 'page',
      breadcrumb: 'Tall og statistikk'
    },
  },
  {
    path: 'statistics/overview-numbers',
    component: OverviewNumbersComponent,
    data: {
      label: 'Oversiktstall',
      name: 'overview-numbers',
      layout: 'std',
      breadcrumb: 'Statistikk: Oversiktstall'
    }
  },
  {
    path: 'statistics/quality-assured-data',
    component: QualityAssuredDataComponent,
    data: {
      label: 'Kvalitetssikrede data',
      name: 'quality-assured-data',
      layout: 'std',
      breadcrumb: 'Statistikk: Kvalitetssikrede data'
    }
  },
  {
    path: 'statistics/red-listed-species',
    component: RedListedSpeciesComponent,
    data: {
      label: 'Rødlistede arter',
      name: 'red-listed-species',
      layout: 'std',
      breadcrumb: 'Statistikk: Rødlistede arter'
    }
  },
  {
    path: 'statistics/alien-species',
    component: AlienSpeciesComponent,
    data: {
      label: 'Fremmede arter',
      name: 'alien-species',
      layout: 'std',
      breadcrumb: 'Statistikk: Fremmede arter'
    }
  },
  {
    path: 'statistics/user-statistics',
    component: UserStatisticsComponent,
    data: {
      label: 'Brukerstatistikk',
      name: 'user-statistics',
      layout: 'std',
      breadcrumb: 'Statistikk: Brukerstatistikk'
    }
  },
  {
    path: 'messages',
    component: MessagesComponent,
    data: {
      label: 'Meldinger',
      name: 'logmessagesin',
      layout: 'page',
      breadcrumb: 'Meldinger'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      label: 'Logg inn',
      name: 'login',
      layout: 'page',
      breadcrumb: 'Logg inn'
    }
  },
  {
    path: 'register',
    component: RegistrationComponent,
    data: {
      label: 'Registrer deg',
      name: 'registration',
      layout: 'page',
      breadcrumb: 'Registrer deg'
    }
  },
  {
    path: 'management',
    component: ManagementComponent,
    data: {
      label: 'Administrere',
      name: 'management',
      layout: 'page',
      breadcrumb: 'Administrere'
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      label: 'Minside',
      name: 'dashboard',
      layout: 'page',
      breadcrumb: 'Minside'
    }
  },
  {
    path: 'map',
    component: MapComponent,
    data: {
      label: 'MAP',
      name: 'map',
      layout: 'mega',
      breadcrumb: 'Map'
    }
  },
  {
    path: 'sitemap',
    component: SitemapComponent,
    data: {
      label: 'Innholdskart A-å',
      name: 'sitemap',
      layout: 'page',
      breadcrumb: 'Innholdskart A-å'
    }
  },
  {
    path: 'design',
    component: DesignComponent,
    data: {
      label: 'Designssystem',
      name: 'design',
      layout: 'std',
      breadcrumb: 'Designssystem'
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      label: 'Not found',
      name: 'notfound',
      layout: 'page',
      breadcrumb: '404'
    }
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
