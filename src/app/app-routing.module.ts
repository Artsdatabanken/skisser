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

// TODO: Dynamic routes from json

/* {
  path: '',
  component: HomeComponent,
  data: {
    linkName: '',
    linkLayout: '',
    linkType: '',
    menu: '',
    menuSection: '',
    menuSectionUrl: '',
    menuSectionType: '',
    metaTitle: '',
    metaDescription: ''
  }
}, */

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      label: 'Forsiden',
      name: 'home',
      layout: 'frontpage',
      linkName: '',
      linkLayout: '',
      linkType: '',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      label: 'Forsiden',
      name: 'home',
      layout: 'frontpage',
      linkName: '',
      linkLayout: '',
      linkType: '',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    }
  },

  //--------------------------------------------------MAIN MENU

  //------------------------------section observations / observasjoner

  {
    path: 'observations',
    component: ObservationsComponent,
    data: {
      label: 'Observasjonsdata',
      name: 'observations',
      layout: 'page',
      breadcrumb: 'Observasjoner',
      linkName: '',
      linkLayout: '',
      linkType: '',
      linkHierarchy: 'parent',
      menu: 'primary-menu',
      menuSection: 'Observasjoner',
      menuSectionUrl: '/observations',
      menuSectionType: 'primary',
      metaTitle: '',
      metaDescription: ''
    }
  },
  {
    path: 'sightings',
    component: SightingsComponent,
    data: {
      label: 'Se, søk og filtrer observasjoner',
      name: 'sightings',
      layout: 'std',
      breadcrumb: 'Se, søk og filtrer observasjoner',
      linkName: '',
      linkLayout: '',
      linkType: '',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    }
  },
  {
    path: 'sightings/sighting',
    component: SightingComponent,
    data: {
      label: 'Observasjon',
      name: 'sighting',
      layout: 'item',
      breadcrumb: 'Observasjon',
      linkName: '',
      linkLayout: '',
      linkType: '',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    }
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    data: {
      label: 'Tall og statistikk',
      name: 'statistics',
      layout: 'page',
      breadcrumb: 'Tall og statistikk',
      linkName: '',
      linkLayout: '',
      linkType: '',
      linkHierarchy: 'parent',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    },
  },
  {
    path: 'statistics/overview-numbers',
    component: OverviewNumbersComponent,
    data: {
      label: 'Oversiktstall',
      name: 'overview-numbers',
      layout: 'std',
      breadcrumb: 'Statistikk: Oversiktstall',
      linkName: '',
      linkLayout: '',
      linkType: '',
      linkHierarchy: 'parent',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    }
  },

  //--------------------section report / rapportering

  {
    path: 'report',
    component: ReportComponent,
    data: {
      label: 'Rapportere observasjoner',
      name: 'report',
      layout: 'page',
      breadcrumb: 'Rapportere',
      linkName: '',
      linkLayout: '',
      linkType: '',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    }
  },
  {
    path: 'report-observation',
    component: ReportObservationComponent,
    data: {
      label: 'Legg til observasjon',
      name: 'report',
      layout: 'page',
      breadcrumb: 'Legg til observasjon',
      linkName: '',
      linkLayout: '',
      linkType: '',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: 'Legg til observasjon',
      metaDescription: ''
    }
  },

  {
    path: 'projects',
    component: ProjectsComponent,
    data: {
      label: 'Arrangementer',
      name: 'projects',
      layout: 'page',
      breadcrumb: 'Arrangementer',
      linkName: '',
      linkLayout: '',
      linkType: '',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    }
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: {
      label: 'Kartleggingsprosjekter',
      name: 'projects',
      layout: 'page',
      breadcrumb: 'Kartleggingsprosjekter',
      linkName: '',
      linkLayout: '',
      linkType: '',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    }
  },

  //------------------------------section dashboard / minside

  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      label: 'Min data',
      name: 'dashboard',
      layout: 'page',
      breadcrumb: 'Min data',
      linkName: '',
      linkLayout: '',
      linkType: '',
      linkHierarchy: 'parent',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    }
  },

  //------------------------------section about / om tjenesten

  {
    path: 'about',
    component: AboutComponent,
    data: {
      label: 'Om tjenesten',
      name: 'about',
      layout: 'page',
      breadcrumb: 'Om tjenesten',
      linkName: '',
      linkLayout: '',
      linkType: '',
      linkHierarchy: 'parent',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    },
  },
  {
    path: 'about/contribute',
    component: ContributeComponent,
    data: {
      label: 'Hvordan du kan bidra',
      name: 'contribute',
      layout: 'page',
      breadcrumb: 'Hvordan du kan bidra',
      linkName: '',
      linkLayout: '',
      linkType: '',
      linkHierarchy: 'parent',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    },
  },

  //--------------------------------------------------TOP MENU

  {
    path: 'messages',
    component: MessagesComponent,
    data: {
      label: 'Meldinger',
      name: 'messages',
      layout: 'page',
      breadcrumb: 'Meldinger',
      linkName: '',
      linkLayout: '',
      linkType: '',
      linkHierarchy: 'parent',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      label: 'Logg inn',
      name: 'login',
      layout: 'page',
      breadcrumb: 'Logg inn',
      linkName: '',
      linkLayout: '',
      linkType: '',
      linkHierarchy: 'parent',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    }
  },
  {
    path: 'register',
    component: RegistrationComponent,
    data: {
      label: 'Registrer deg',
      name: 'registration',
      layout: 'page',
      breadcrumb: 'Registrer deg',
      linkName: '',
      linkLayout: '',
      linkType: '',
      linkHierarchy: 'parent',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    }
  },
  //--------------------------------------------------EXTRA MENU

  {
    path: 'sitemap',
    component: SitemapComponent,
    data: {
      label: 'Innholdskart A-å',
      name: 'sitemap',
      layout: 'page',
      breadcrumb: 'Innholdskart A-å',
      linkName: '',
      linkLayout: '',
      linkType: '',
      linkHierarchy: 'parent',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    }
  },

  //--------------------------------------------------for testing purposes
  {
    path: 'map',
    component: MapComponent,
    data: {
      label: 'MAP',
      name: 'map',
      layout: 'mega',
      breadcrumb: 'Map',
      linkName: '',
      linkLayout: '',
      linkType: '',
      linkHierarchy: 'parent',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    }
  },

  {
    path: 'design',
    component: DesignComponent,
    data: {
      label: 'Designssystem',
      name: 'design',
      layout: 'std',
      breadcrumb: 'Designssystem',
      linkName: '',
      linkLayout: '',
      linkType: '',
      linkHierarchy: 'parent',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    }
  },

  //--------------------------------------------------WILDCARD

  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      label: 'Not found',
      name: 'notfound',
      layout: 'page',
      breadcrumb: '404',
      linkName: '',
      linkLayout: '',
      linkType: '',
      linkHierarchy: 'parent',
      menu: '',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionType: '',
      metaTitle: '',
      metaDescription: ''
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
