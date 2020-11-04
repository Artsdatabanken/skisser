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
import { SightingsComponent } from './components/observations/sightings/sightings.component';
import { SightingComponent } from './components/observations/sighting/sighting.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ObservationsComponent } from './components/observations/observations.component';
import { ReportComponent } from './components/report/report.component';
import { MapComponent } from './components/map/map.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ContributeComponent } from './components/about/contribute/contribute.component';
import { AboutSiteComponent } from './components/about/about-site/about-site.component';
import { QualityAssuranceComponent } from './components/about/quality-assurance/quality-assurance.component';
import { TosComponent } from './components/about/tos/tos.component';
import { SupportComponent } from './components/about/support/support.component';
import { LatestNewsComponent } from './components/about/latest-news/latest-news.component';
import { MyDataComponent } from './components/my-data/my-data.component';
import { MyObservationsComponent } from './components/my-data/my-observations/my-observations.component';
import { MyStatisticsComponent } from './components/my-data/my-statistics/my-statistics.component';
import { MyProjectsComponent } from './components/my-data/my-projects/my-projects.component';
import { MyLocationsComponent } from './components/my-data/my-locations/my-locations.component';
import { MyObserversComponent } from './components/my-data/my-observers/my-observers.component';
import { SpeciesWithNoDataComponent } from './components/statistics/species-with-no-data/species-with-no-data.component';
import { AddObservationComponent } from './components/report/add-observation/add-observation.component';
import { ChecklistComponent } from './components/report/checklist/checklist.component';
import { ImportObservationsComponent } from './components/report/import-observations/import-observations.component';
import { EventProjectComponent } from './components/report/event-project/event-project.component';
import { ProfileComponent } from './components/user/profile/profile.component';



// const routes: Routes = [
//   {
//     path: '',
//     component: HomeComponent,
//     data: {
//       label: 'Forsiden',
//       name: 'home',
//       layout: 'frontpage',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     }
//   },
//   {
//     path: 'home',
//     component: HomeComponent,
//     data: {
//       label: 'Forsiden',
//       name: 'home',
//       layout: 'frontpage',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     }
//   },

//   //--------------------------------------------------MAIN MENU

//   //------------------------------section observations / observasjoner

//   {
//     path: 'observations',
//     component: ObservationsComponent,
//     data: {
//       label: 'Observasjonsdata',
//       name: 'observations',
//       layout: 'page',
//       breadcrumb: 'Observasjoner',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       linkHierarchy: 'parent',
//       menu: 'primary-menu',
//       menuSection: 'Observasjoner',
//       menuSectionUrl: '/observations',
//       menuSectionType: 'primary',
//       metaTitle: '',
//       metaDescription: ''
//     }
//   },
//   {
//     path: 'sightings',
//     component: SightingsComponent,
//     data: {
//       label: 'Se, søk og filtrer observasjoner',
//       name: 'sightings',
//       layout: 'std',
//       breadcrumb: 'Se, søk og filtrer observasjoner',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     }
//   },
//   {
//     path: 'sightings/sighting',
//     component: SightingComponent,
//     data: {
//       label: 'Observasjon',
//       name: 'sighting',
//       layout: 'item',
//       breadcrumb: 'Observasjon',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     }
//   },
//   {
//     path: 'statistics',
//     component: StatisticsComponent,
//     data: {
//       label: 'Tall og statistikk',
//       name: 'statistics',
//       layout: 'page',
//       breadcrumb: 'Tall og statistikk',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       linkHierarchy: 'parent',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     },
//   },
//   {
//     path: 'statistics/overview-numbers',
//     component: OverviewNumbersComponent,
//     data: {
//       label: 'Oversiktstall',
//       name: 'overview-numbers',
//       layout: 'std',
//       breadcrumb: 'Statistikk: Oversiktstall',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       linkHierarchy: 'parent',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     }
//   },

//   //--------------------section report / rapportering

//   {
//     path: 'report',
//     component: ReportComponent,
//     data: {
//       label: 'Rapportere observasjoner',
//       name: 'report',
//       layout: 'page',
//       breadcrumb: 'Rapportere',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     }
//   },
//   {
//     path: 'add-observation',
//     component: AddObservationComponent,
//     data: {
//       label: 'Legg til observasjon',
//       name: 'report',
//       layout: 'page',
//       breadcrumb: 'Legg til observasjon',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: 'Legg til observasjon',
//       metaDescription: ''
//     }
//   },

//   {
//     path: 'projects',
//     component: ProjectsComponent,
//     data: {
//       label: 'Arrangementer',
//       name: 'projects',
//       layout: 'page',
//       breadcrumb: 'Arrangementer',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     }
//   },
//   {
//     path: 'projects',
//     component: ProjectsComponent,
//     data: {
//       label: 'Kartleggingsprosjekter',
//       name: 'projects',
//       layout: 'page',
//       breadcrumb: 'Kartleggingsprosjekter',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     }
//   },

//   //------------------------------section dashboard / minside

//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     data: {
//       label: 'Min data',
//       name: 'dashboard',
//       layout: 'page',
//       breadcrumb: 'Min data',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       linkHierarchy: 'parent',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     }
//   },

//   //------------------------------section about / om tjenesten

//   {
//     path: 'about',
//     component: AboutComponent,
//     data: {
//       label: 'Om tjenesten',
//       name: 'about',
//       layout: 'page',
//       breadcrumb: 'Om tjenesten',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       linkHierarchy: 'parent',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     },
//   },
//   {
//     path: 'about/contribute',
//     component: ContributeComponent,
//     data: {
//       label: 'Hvordan du kan bidra',
//       name: 'contribute',
//       layout: 'page',
//       breadcrumb: 'Hvordan du kan bidra',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       linkHierarchy: 'parent',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     },
//   },

//   //--------------------------------------------------TOP MENU

//   {
//     path: 'messages',
//     component: MessagesComponent,
//     data: {
//       label: 'Meldinger',
//       name: 'messages',
//       layout: 'page',
//       breadcrumb: 'Meldinger',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       linkHierarchy: 'parent',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     }
//   },
//   {
//     path: 'login',
//     component: LoginComponent,
//     data: {
//       label: 'Logg inn',
//       name: 'login',
//       layout: 'page',
//       breadcrumb: 'Logg inn',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       linkHierarchy: 'parent',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     }
//   },
//   {
//     path: 'register',
//     component: RegistrationComponent,
//     data: {
//       label: 'Registrer deg',
//       name: 'registration',
//       layout: 'page',
//       breadcrumb: 'Registrer deg',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       linkHierarchy: 'parent',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     }
//   },
//   //--------------------------------------------------EXTRA MENU

//   {
//     path: 'sitemap',
//     component: SitemapComponent,
//     data: {
//       label: 'Innholdskart A-å',
//       name: 'sitemap',
//       layout: 'page',
//       breadcrumb: 'Innholdskart A-å',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       linkHierarchy: 'parent',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     }
//   },

//   //--------------------------------------------------for testing purposes
//   {
//     path: 'map',
//     component: MapComponent,
//     data: {
//       label: 'MAP',
//       name: 'map',
//       layout: 'mega',
//       breadcrumb: 'Map',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       linkHierarchy: 'parent',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     }
//   },

//   {
//     path: 'design',
//     component: DesignComponent,
//     data: {
//       label: 'Designssystem',
//       name: 'design',
//       layout: 'std',
//       breadcrumb: 'Designssystem',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       linkHierarchy: 'parent',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     }
//   },

//   //--------------------------------------------------WILDCARD

//   {
//     path: '**',
//     component: PageNotFoundComponent,
//     data: {
//       label: 'Not found',
//       name: 'notfound',
//       layout: 'page',
//       breadcrumb: '404',
//       linkName: '',
//       linkLayout: '',
//       linkType: '',
//       linkHierarchy: 'parent',
//       menu: '',
//       menuSection: '',
//       menuSectionUrl: '',
//       menuSectionType: '',
//       metaTitle: '',
//       metaDescription: ''
//     }
//   }
// ];

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      linkId: 'frontpage',
      linkLayout: 'frontpage',
      linkRank: '',
      linkType: '',
      menuType: 'main',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionRank: '',
      metaTitle: 'Artsobservasjoner',
      metaDescription: ''
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      linkId: 'frontpage',
      linkLayout: 'frontpage',
      linkRank: '',
      linkType: '',
      menuType: 'main',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionRank: '',
      metaTitle: 'Artsobservasjoner',
      metaDescription: ''
    }
  },
];

const observationRoutes: Routes = [
  {
    path: 'observations',
    component: ObservationsComponent,
    data: {
      linkId: 'observations',
      linkLayout: 'page',
      linkRank: 'primary',
      linkType: 'landing',
      menuType: 'main',
      menuSection: 'Observasjonsdata',
      menuSectionUrl: '/observations',
      menuSectionRank: 'primary',
      metaTitle: 'Observasjonsdata',
      metaDescription: ''
    }
  },
  {
    path: 'observations/sightings',
    component: SightingsComponent,
    data: {
      linkId: 'sightings',
      linkLayout: 'page',
      linkRank: 'primary',
      linkType: '',
      menuType: 'main',
      menuSection: 'Observasjonsdata',
      menuSectionUrl: '/observations',
      menuSectionRank: 'primary',
      metaTitle: 'Se, søk og filtrer observasjoner',
      metaDescription: ''
    }
  },
  {
    path: 'observations/sightings/sighting',
    component: SightingComponent,
    data: {
      linkId: 'sighting',
      linkLayout: 'page',
      linkRank: 'secondary',
      linkType: '',
      menuType: 'main',
      menuSection: 'Observasjonsdata',
      menuSectionUrl: '/observations',
      menuSectionRank: 'primary',
      metaTitle: 'Observasjon',
      metaDescription: ''
    }
  },
  {
    path: 'observations/statistics',
    component: StatisticsComponent,
    data: {
      linkId: 'statistics',
      linkLayout: 'page',
      linkRank: 'secondary',
      linkType: 'landing',
      menuType: 'main',
      menuSection: 'Observasjonsdata',
      menuSectionUrl: '/observations',
      menuSectionRank: 'primary',
      metaTitle: 'Tall og statistikk',
      metaDescription: ''
    }
  },
  {
    path: 'observations/statistics/quality-checked-data',
    component: QualityAssuredDataComponent,
    data: {
      linkId: 'statistics',
      linkLayout: 'page',
      linkRank: 'secondary',
      linkType: '',
      menuType: 'main',
      menuSection: 'Observasjonsdata',
      menuSectionUrl: '/observations',
      menuSectionRank: 'primary',
      metaTitle: 'Kvalitetssikrededata',
      metaDescription: ''
    }
  },
  {
    path: 'observations/statistics/red-listed-species',
    component: RedListedSpeciesComponent,
    data: {
      linkId: 'red-listed-species',
      linkLayout: 'page',
      linkRank: 'secondary',
      linkType: '',
      menuType: 'main',
      menuSection: 'Observasjonsdata',
      menuSectionUrl: '/observations',
      menuSectionRank: 'primary',
      metaTitle: 'Rødlistede arter',
      metaDescription: ''
    }
  },
  {
    path: 'observations/statistics/alien-species',
    component: AlienSpeciesComponent,
    data: {
      linkId: 'alien-species',
      linkLayout: 'page',
      linkRank: 'secondary',
      linkType: '',
      menuType: 'main',
      menuSection: 'Observasjonsdata',
      menuSectionUrl: '/observations',
      menuSectionRank: 'primary',
      metaTitle: 'Fremmede arter',
      metaDescription: ''
    }
  },
  {
    path: 'observations/statistics/species-with-no-data',
    component: SpeciesWithNoDataComponent,
    data: {
      linkId: 'species-with-no-data',
      linkLayout: 'page',
      linkRank: 'secondary',
      linkType: '',
      menuType: 'main',
      menuSection: 'Observasjonsdata',
      menuSectionUrl: '/observations',
      menuSectionRank: 'primary',
      metaTitle: 'Arter uten data',
      metaDescription: ''
    }
  },
  {
    path: 'observations/statistics/user-statistics',
    component: UserStatisticsComponent,
    data: {
      linkId: 'user-statistics',
      linkLayout: 'page',
      linkRank: 'secondary',
      linkType: '',
      menuType: 'main',
      menuSection: 'Observasjonsdata',
      menuSectionUrl: '/observations',
      menuSectionRank: 'primary',
      metaTitle: 'Brukerstatistikk',
      metaDescription: ''
    }
  }
];

const reportRoutes: Routes = [
  {
    path: 'report',
    component: ReportComponent,
    data: {
      linkId: 'report',
      linkLayout: 'page',
      linkRank: 'primary',
      linkType: 'landing',
      menuType: 'main',
      menuSection: 'Rapportere observasjoner',
      menuSectionUrl: '/report',
      menuSectionRank: 'primary',
      metaTitle: 'Rapportere observasjoner',
      metaDescription: ''
    }
  },
  {
    path: 'report/add-observation',
    component: AddObservationComponent,
    data: {
      linkId: 'add-observation',
      linkLayout: 'page',
      linkRank: 'primary',
      linkType: '',
      menuType: 'main',
      menuSection: 'Rapportere observasjoner',
      menuSectionUrl: '/report',
      menuSectionRank: 'primary',
      metaTitle: 'Legg til observasjoner',
      metaDescription: ''
    }
  },
  {
    path: 'report/chelist-observation',
    component: ChecklistComponent,
    data: {
      linkId: 'checklist-observation',
      linkLayout: 'page',
      linkRank: 'primary',
      linkType: '',
      menuType: 'main',
      menuSection: 'Rapportere observasjoner',
      menuSectionUrl: '/report',
      menuSectionRank: 'primary',
      metaTitle: 'Sjekkliste observasjoner',
      metaDescription: ''
    }
  },
  {
    path: 'report/import-observations',
    component: ImportObservationsComponent,
    data: {
      linkId: 'import-observations',
      linkLayout: 'page',
      linkRank: 'secondary',
      linkType: '',
      menuType: 'main',
      menuSection: 'Rapportere observasjoner',
      menuSectionUrl: '/report',
      menuSectionRank: 'primary',
      metaTitle: 'Importere observasjoner',
      metaDescription: ''
    }
  },
  {
    path: 'report/event-project',
    component: EventProjectComponent,
    data: {
      linkId: 'event-project',
      linkLayout: 'page',
      linkRank: 'secondary',
      linkType: '',
      menuType: 'main',
      menuSection: 'Rapportere observasjoner',
      menuSectionUrl: '/report',
      menuSectionRank: 'primary',
      metaTitle: 'Arrangementer',
      metaDescription: ''
    }
  },
  {
    path: 'report/survey-project',
    component: EventProjectComponent,
    data: {
      linkId: 'survey-project',
      linkLayout: 'page',
      linkRank: 'secondary',
      linkType: '',
      menuType: 'main',
      menuSection: 'Rapportere observasjoner',
      menuSectionUrl: '/report',
      menuSectionRank: 'primary',
      metaTitle: 'Kartleggingsprosjekt',
      metaDescription: ''
    }
  }
];

const userDataRoutes: Routes = [
  {
    path: 'my-data',
    component: MyDataComponent,
    data: {
      linkId: 'my-data',
      linkLayout: 'page',
      linkRank: '',
      linkType: '',
      menuType: 'main',
      menuSection: 'Min data',
      menuSectionUrl: '/my-data',
      menuSectionRank: 'secondary',
      metaTitle: 'Min data',
      metaDescription: ''
    }
  },
  {
    path: 'my-data/my-observations',
    component: MyObservationsComponent,
    data: {
      linkId: 'my-observations',
      linkLayout: 'page',
      linkRank: '',
      linkType: '',
      menuType: 'main',
      menuSection: 'Min data',
      menuSectionUrl: '/my-data',
      menuSectionRank: 'secondary',
      metaTitle: 'Mine observasjoner',
      metaDescription: ''
    }
  },
  {
    path: 'my-data/my-statistics',
    component: MyStatisticsComponent,
    data: {
      linkId: 'my-statistics',
      linkLayout: 'page',
      linkRank: '',
      linkType: '',
      menuType: 'main',
      menuSection: 'Min data',
      menuSectionUrl: '/my-data',
      menuSectionRank: 'secondary',
      metaTitle: 'Min statistikk',
      metaDescription: ''
    }
  },
  {
    path: 'my-data/my-projects',
    component: MyProjectsComponent,
    data: {
      linkId: 'my-data',
      linkLayout: 'page',
      linkRank: '',
      linkType: '',
      menuType: 'main',
      menuSection: 'Min data',
      menuSectionUrl: '/my-data',
      menuSectionRank: 'secondary',
      metaTitle: 'Mine prosjekter',
      metaDescription: ''
    }
  },
  {
    path: 'my-data/my-locations',
    component: MyLocationsComponent,
    data: {
      linkId: 'my-data',
      linkLayout: 'page',
      linkRank: '',
      linkType: '',
      menuType: 'main',
      menuSection: 'Min data',
      menuSectionUrl: '/my-data',
      menuSectionRank: 'secondary',
      metaTitle: 'Mine lokaliteter',
      metaDescription: ''
    }
  },
  {
    path: 'my-data/my-observers',
    component: MyObserversComponent,
    data: {
      linkId: 'my-data',
      linkLayout: 'page',
      linkRank: '',
      linkType: '',
      menuType: 'main',
      menuSection: 'Min data',
      menuSectionUrl: '/my-data',
      menuSectionRank: 'secondary',
      metaTitle: 'Medobservatører',
      metaDescription: ''
    }
  },
];

const aboutRoutes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    data: {
      linkId: 'about',
      linkLayout: 'page',
      linkRank: '',
      linkType: '',
      menuType: 'main',
      menuSection: 'Om tjenesten',
      menuSectionUrl: '/about',
      menuSectionRank: 'secondary',
      metaTitle: 'Om tjenesten',
      metaDescription: ''
    }
  },
  {
    path: 'about/about-site',
    component: AboutSiteComponent,
    data: {
      linkId: 'about-site',
      linkLayout: 'page',
      linkRank: '',
      linkType: '',
      menuType: 'main',
      menuSection: 'Om tjenesten',
      menuSectionUrl: '/about',
      menuSectionRank: 'secondary',
      metaTitle: 'Om artsobservasjoner.no',
      metaDescription: ''
    }
  },

  {
    path: 'about/quality-assurance',
    component: QualityAssuranceComponent,
    data: {
      linkId: 'quality-assurance',
      linkLayout: 'page',
      linkRank: '',
      linkType: '',
      menuType: 'main',
      menuSection: 'Om tjenesten',
      menuSectionUrl: '/about',
      menuSectionRank: 'secondary',
      metaTitle: 'Kvalitetssikring',
      metaDescription: ''
    }
  },
  {
    path: 'about/contribute',
    component: ContributeComponent,
    data: {
      linkId: 'contribute',
      linkLayout: 'page',
      linkRank: '',
      linkType: '',
      menuType: 'main',
      menuSection: 'Om tjenesten',
      menuSectionUrl: '/about',
      menuSectionRank: 'secondary',
      metaTitle: 'Hvordan du kan bidra',
      metaDescription: ''
    }
  },
  {
    path: 'about/tos',
    component: TosComponent,
    data: {
      linkId: 'tos',
      linkLayout: 'page',
      linkRank: '',
      linkType: '',
      menuType: 'main',
      menuSection: 'Om tjenesten',
      menuSectionUrl: '/about',
      menuSectionRank: 'secondary',
      metaTitle: 'Brukervilkår',
      metaDescription: ''
    }
  },
  {
    path: 'about/support',
    component: SupportComponent,
    data: {
      linkId: 'support',
      linkLayout: 'page',
      linkRank: '',
      linkType: '',
      menuType: 'main',
      menuSection: 'Om tjenesten',
      menuSectionUrl: '/about',
      menuSectionRank: 'secondary',
      metaTitle: 'Brukerstøtte',
      metaDescription: ''
    }
  },
  {
    path: 'about/latest-news',
    component: LatestNewsComponent,
    data: {
      linkId: 'latest-news',
      linkLayout: 'page',
      linkRank: '',
      linkType: '',
      menuType: 'main',
      menuSection: 'Om tjenesten',
      menuSectionUrl: '/about',
      menuSectionRank: 'secondary',
      metaTitle: 'Aktuelle saker / siste nytt',
      metaDescription: ''
    }
  }
];

const userRoutes: Routes = [
  {
        path: 'messages',
        component: MessagesComponent,
        data: {
          linkId: 'messages',
          linkLayout: 'page',
          linkRank: '',
          linkType: '',
          menuType: 'top',
          menuSection: '',
          menuSectionUrl: '',
          menuSectionRank: '',
          metaTitle: 'Meldinger',
          metaDescription: ''
        }
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          linkId: 'login',
          linkLayout: 'page',
          linkRank: '',
          linkType: '',
          menuType: 'top',
          menuSection: '',
          menuSectionUrl: '',
          menuSectionRank: '',
          metaTitle: 'Logg inn',
          metaDescription: ''
        }
      },
      {
        path: 'user/profile',
        component: ProfileComponent,
        data: {
          linkId: 'user-profile',
          linkLayout: 'page',
          linkRank: 'primary',
          linkType: '',
          menuType: 'top',
          menuSection: '',
          menuSectionUrl: '',
          menuSectionRank: '',
          metaTitle: 'Min side',
          metaDescription: ''
        }
      },
      {
        path: 'register',
        component: RegistrationComponent,
        data: {
          linkId: 'register',
          linkLayout: 'page',
          linkRank: '',
          linkType: '',
          menuType: '',
          menuSection: '',
          menuSectionUrl: '',
          menuSectionRank: '',
          metaTitle: 'Registrer deg',
          metaDescription: ''
        }
      },
];

const extraRoutes: Routes = [];

const wildcardRoutes: Routes = [
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      linkId: 'not-found',
      linkLayout: 'page',
      linkRank: '',
      linkType: '',
      menuType: 'main',
      menuSection: '',
      menuSectionUrl: '',
      menuSectionRank: '',
      metaTitle: '404',
      metaDescription: ''
    }
  }
];

const routes: Routes = [...observationRoutes, ...reportRoutes, ...userDataRoutes, ...aboutRoutes];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
