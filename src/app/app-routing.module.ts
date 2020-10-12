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
import { TouComponent } from './components/about/tou/tou.component';
import { ReportComponent } from './components/report/report.component';
import { DesignComponent } from './components/design/design.component';
import { ValidationComponent } from './components/validation/validation.component';
import { LoginComponent } from './components/login/login.component';
import { FasComponent } from './components/fas/fas.component';
import { ReportingComponent } from './components/report/reporting/reporting.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManagementComponent } from './components/management/management.component';
import { SightingsComponent } from './components/fas/sightings/sightings.component';
import { SightingIdComponent } from './components/fas/sightings/sighting-id/sighting-id.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateProjectComponent } from './components/projects/create-project/create-project.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Forsiden',
      name: 'home',
      type: 'frontpage'
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Forsiden',
      name: 'home',
      type: 'frontpage'
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
    path: 'report/report-observation',
    component: ReportingComponent,
    data: {
      title: 'Rapportere observasjon',
      name: 'report-observation',
      type: 'std',
      breadcrumb: 'Rapportere observasjon'
    }
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: {
      title: 'Prosjekter',
      name: 'projects',
      type: 'page',
      breadcrumb: 'Prosjekter'
    }
  },
  {
    path: 'projects/create',
    component: CreateProjectComponent,
    data: {
      title: 'Opprett prosjekt',
      name: 'create-project',
      type: 'page',
      breadcrumb: 'Opprett prosjekt'
    }
  },
  {
    path: 'fas',
    component: FasComponent,
    data: {
      title: 'Om Observasjoner',
      name: 'fas',
      type: 'page',
      breadcrumb: 'Om Observasjoner'
    }
  },
  {
    path: 'sightings',
    component: SightingsComponent,
    data: {
      title: 'Observasjoner',
      name: 'sightings',
      type: 'std',
      breadcrumb: 'Observasjoner'
    }
  },
  {
    path: 'sightings/sighting-id',
    component: SightingIdComponent,
    data: {
      title: 'Observasjon',
      name: 'sighting-id',
      type: 'std',
      breadcrumb: 'Observasjon'
    }
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    data: {
      title: 'Tall og statistikk',
      name: 'statistics',
      type: 'mega',
      breadcrumb: 'Tall og statistikk'
    },
  },
  {
    path: 'statistics/overview-numbers',
    component: OverviewNumbersComponent,
    data: {
      title: 'Oversiktstall',
      name: 'overview-numbers',
      type: 'std',
      breadcrumb: 'Statistikk: Oversiktstall'
    }
  },
  {
    path: 'statistics/quality-assured-data',
    component: QualityAssuredDataComponent,
    data: {
      title: 'Kvalitetssikrede data',
      name: 'quality-assured-data',
      type: 'std',
      breadcrumb: 'Statistikk: Kvalitetssikrede data'
    }
  },
  {
    path: 'statistics/red-listed-species',
    component: RedListedSpeciesComponent,
    data: {
      title: 'Rødlistede arter',
      name: 'red-listed-species',
      type: 'std',
      breadcrumb: 'Statistikk: Rødlistede arter'
    }
  },
  {
    path: 'statistics/alien-species',
    component: AlienSpeciesComponent,
    data: {
      title: 'Fremmede arter',
      name: 'alien-species',
      type: 'std',
      breadcrumb: 'Statistikk: Fremmede arter'
    }
  },
  {
    path: 'statistics/user-statistics',
    component: UserStatisticsComponent,
    data: {
      title: 'Brukerstatistikk',
      name: 'user-statistics',
      type: 'std',
      breadcrumb: 'Statistikk: Brukerstatistikk'
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
      breadcrumb: 'Logg inn'
    }
  }, {
    path: 'register',
    component: RegistrationComponent,
    data: {
      title: 'Registrer deg',
      name: 'registration',
      type: 'page',
      breadcrumb: 'Registrer deg'
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Minside',
      name: 'dashboard',
      type: 'page',
      breadcrumb: 'Minside'
    }
  },
  {
    path: 'management',
    component: ManagementComponent,
    data: {
      title: 'Administrere',
      name: 'management',
      type: 'page',
      breadcrumb: 'Administrere'
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
