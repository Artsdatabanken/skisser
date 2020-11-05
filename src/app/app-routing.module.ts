import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { QualityAssuredDataComponent } from './components/statistics/quality-assured-data/quality-assured-data.component';
import { RedListedSpeciesComponent } from './components/statistics/red-listed-species/red-listed-species.component';
import { AlienSpeciesComponent } from './components/statistics/alien-species/alien-species.component';
import { UserStatisticsComponent } from './components/statistics/user-statistics/user-statistics.component';
import { DesignComponent } from './components/design/design.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SightingsComponent } from './components/observations/sightings/sightings.component';
import { SightingComponent } from './components/observations/sighting/sighting.component';
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
import { SpeciesWithNoDataComponent } from './components/statistics/species-with-no-data/species-with-no-data.component';
import { AddObservationComponent } from './components/report/add-observation/add-observation.component';
import { ChecklistComponent } from './components/report/checklist/checklist.component';
import { ImportObservationsComponent } from './components/report/import-observations/import-observations.component';
import { EventProjectComponent } from './components/report/event-project/event-project.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { FellowObserversComponent } from './components/my-data/fellow-observers/fellow-observers.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      linkText: '',
      linkId: 'frontpage',
      linkLayout: 'frontpage',
      linkRank: '',
      menuType: '',
      menuSection: '',
      metaTitle: 'Artsobservasjoner',
      metaDescription: ''
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      linkText: '',
      linkId: 'frontpage',
      linkLayout: 'frontpage',
      linkRank: '',
      menuType: '',
      menuSection: '',
      metaTitle: 'Artsobservasjoner',
      metaDescription: ''
    }
  },
];

const reportRoutes: Routes = [
  {
    path: 'report',
    component: ReportComponent,
    data: {
      linkText: 'Rapportere observasjoner',
      linkId: 'report',
      linkLayout: 'page',
      linkRank: 'primary',
      menuType: 'mainMenu',
      menuSection: 'primary',
      metaTitle: 'Rapportere observasjoner',
      metaDescription: ''
    },
    children: [
      {
        path: 'add-observation',
        component: AddObservationComponent,
        data: {
          linkText: 'Legg til observasjon',
          linkId: 'add-observation',
          linkLayout: 'page',
          linkRank: 'primary',
          menuType: 'mainMenu',
          menuSection: 'primary',
          metaTitle: 'Legg til observasjoner',
          metaDescription: ''
        }
      },
      {
        path: 'checklist-observation',
        component: ChecklistComponent,
        data: {
          linkText: 'Sjekkliste observasjoner',
          linkId: 'checklist-observation',
          linkLayout: 'page',
          linkRank: 'primary',
          menuType: 'mainMenu',
          menuSection: 'primary',
          metaTitle: 'Sjekkliste observasjoner',
          metaDescription: ''
        }
      },
      {
        path: 'import-observations',
        component: ImportObservationsComponent,
        data: {
          linkText: 'Importere observasjoner',
          linkId: 'import-observations',
          linkLayout: 'page',
          linkRank: 'secondary',
          menuType: 'mainMenu',
          menuSection: 'primary',
          metaTitle: 'Importere observasjoner',
          metaDescription: ''
        }
      },
      {
        path: 'event-project',
        component: EventProjectComponent,
        data: {
          linkText: 'Arrangementer',
          linkId: 'event-project',
          linkLayout: 'page',
          linkRank: 'secondary',
          menuType: 'mainMenu',
          menuSection: 'primary',
          metaTitle: 'Arrangementer',
          metaDescription: ''
        }
      },
      {
        path: 'survey-project',
        component: EventProjectComponent,
        data: {
          linkText: 'kartleggingsprosjekter',
          linkId: 'survey-project',
          linkLayout: 'page',
          linkRank: 'secondary',
          menuType: 'mainMenu',
          menuSection: 'primary',
          metaTitle: 'Kartleggingsprosjekter',
          metaDescription: ''
        }
      }
    ]
  },
];

const observationRoutes: Routes = [
  {
    path: 'observations',
    component: ObservationsComponent,
    data: {
      linkText: 'Observasjonsdata',
      linkId: 'observations',
      linkLayout: 'page',
      linkRank: 'primary',
      menuType: 'mainMenu',
      menuSection: 'primary',
      metaTitle: 'Observasjonsdata',
      metaDescription: ''
    },
    children: [
      {
        path: 'sightings',
        component: SightingsComponent,
        data: {
          linkText: 'Se, søk og filtrer observasjoner',
          linkId: 'sightings',
          linkLayout: 'page',
          linkRank: 'primary',
          menuType: 'mainMenu',
          menuSection: 'primary',
          metaTitle: 'Se, søk og filtrer observasjoner',
          metaDescription: ''
        },
        children: [
          {
            path: 'sighting',
            component: SightingComponent,
            data: {
              linkText: 'Observasjon',
              linkId: 'sighting',
              linkLayout: 'page',
              linkRank: 'secondary',
              menuType: '',
              menuSection: 'primary',
              metaTitle: 'Observasjon',
              metaDescription: ''
            }
          }
        ]
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
        data: {
          linkText: 'Tall og statistikk',
          linkId: 'statistics',
          linkLayout: 'page',
          linkRank: 'secondary',         
          menuType: 'mainMenu',
          menuSection: 'primary',
          metaTitle: 'Tall og statistikk',
          metaDescription: ''
        },
        children: [
          {
            path: 'quality-checked-data',
            component: QualityAssuredDataComponent,
            data: {
              linkText: 'Kvalitetssikrede data',
              linkId: 'quality-assured-data',
              linkLayout: 'page',
              linkRank: 'secondary',
              menuType: 'submenu',
              menuSection: 'secondary',
              metaTitle: 'Kvalitetssikrede data',
              metaDescription: ''
            }
          },
          {
            path: 'red-listed-species',
            component: RedListedSpeciesComponent,
            data: {
              linkText: 'Rødlistede arter',
              linkId: 'red-listed-species',
              linkLayout: 'page',
              linkRank: 'secondary',
              menuType: 'submenu',
              menuSection: 'secondary',
              metaTitle: 'Rødlistede arter',
              metaDescription: ''
            }
          },
          {
            path: 'alien-species',
            component: AlienSpeciesComponent,
            data: {
              linkText: 'Fremmede arter',
              linkId: 'alien-species',
              linkLayout: 'page',
              linkRank: 'secondary',
              menuType: 'submenu',
              menuSection: 'secondary',
              metaTitle: 'Fremmede arter',
              metaDescription: ''
            }
          },
          {
            path: 'species-with-no-data',
            component: SpeciesWithNoDataComponent,
            data: {
              linkText: 'Arter uten data',
              linkId: 'species-with-no-data',
              linkLayout: 'page',
              linkRank: 'secondary',
              menuType: 'submenu',
              menuSection: 'secondary',
              metaTitle: 'Arter uten data',
              metaDescription: ''
            }
          },
          {
            path: 'user-statistics',
            component: UserStatisticsComponent,
            data: {
              linkText: 'Brukerstatistikk',
              linkId: 'user-statistics',
              linkLayout: 'page',
              linkRank: 'secondary',
              menuType: 'submenu',
              menuSection: 'secondary',
              metaTitle: 'Brukerstatistikk',
              metaDescription: ''
            }
          }
        ]
      }
    ]
  }
];

const userDataRoutes: Routes = [
  {
    path: 'my-data',
    component: MyDataComponent,
    data: {
      linkText: 'Min data',
      linkId: 'my-data',
      linkLayout: 'page',
      linkRank: 'primary',
      menuType: 'mainMenu',
      menuSection: 'primary',
      metaTitle: 'Min data',
      metaDescription: ''
    },
    children: [
      {
        path: 'my-observations',
        component: MyObservationsComponent,
        data: {
          linkText: 'Mine observasjoner',
          linkId: 'my-observations',
          linkLayout: 'page',
          linkRank: 'primary',
          menuType: 'mainMenu',
          menuSection: 'secondary',
          metaTitle: 'Mine observasjoner',
          metaDescription: ''
        }
      },
      {
        path: 'my-statistics',
        component: MyStatisticsComponent,
        data: {
          linkText: 'Min statistikk',
          linkId: 'my-statistics',
          linkLayout: 'page',
          linkRank: 'secondary',
          menuType: 'mainMenu',
          menuSection: 'secondary',
          metaTitle: 'Min statistikk',
          metaDescription: ''
        }
      },
      {
        path: 'my-projects',
        component: MyProjectsComponent,
        data: {
          linkText: 'Mine prosjekter',
          linkId: 'my-projects',
          linkLayout: 'page',
          linkRank: 'secondary',
          menuType: 'mainMenu',
          menuSection: 'secondary',
          metaTitle: 'Mine prosjekter',
          metaDescription: ''
        }
      },
      {
        path: 'my-locations',
        component: MyLocationsComponent,
        data: {
          linkText: 'Mine lokaliteter',
          linkId: 'my-locations',
          linkLayout: 'page',
          linkRank: 'secondary',
          menuType: 'mainMenu',
          menuSection: 'secondary',
          metaTitle: 'Mine lokaliteter',
          metaDescription: ''
        }
      },
      {
        path: 'fellow-observers',
        component: FellowObserversComponent,
        data: {
          linkText: 'Medobservatører',
          linkId: 'fellow-observers',
          linkLayout: 'page',
          linkRank: 'secondary',
          menuType: 'mainMenu',
          menuSection: 'secondary',
          metaTitle: 'Medobservatører',
          metaDescription: ''
        }
      }
    ]
  }
];

const aboutRoutes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    data: {
      linkText: 'Om tjenesten',
      linkId: 'about',
      linkLayout: 'page',
      linkRank: 'secondary',
      menuType: 'mainMenu',
      menuSection: 'secondary',
      metaTitle: 'Om tjenesten',
      metaDescription: ''
    },
    children: [
      {
        path: 'about-site',
        component: AboutSiteComponent,
        data: {
          linkText: 'Om artsobservasjoner.no',
          linkId: 'about-site',
          linkLayout: 'page',
          linkRank: 'secondary',
          menuType: 'mainMenu',
          menuSection: 'secondary',
          metaTitle: 'Om artsobservasjoner.no',
          metaDescription: ''
        }
      },

      {
        path: 'quality-assurance',
        component: QualityAssuranceComponent,
        data: {
          linkText: 'Kvalitetssikring',
          linkId: 'quality-assurance',
          linkLayout: 'page',
          linkRank: 'secondary',
          menuType: 'mainMenu',
          menuSection: 'secondary',
          metaTitle: 'Kvalitetssikring',
          metaDescription: ''
        }
      },
      {
        path: 'about/contribute',
        component: ContributeComponent,
        data: {
          linkText: 'Hvordan du kan bidra',
          linkId: 'contribute',
          linkLayout: 'page',
          linkRank: 'secondary',
          menuType: 'mainMenu',
          menuSection: 'secondary',
          metaTitle: 'Hvordan du kan bidra',
          metaDescription: ''
        }
      },
      {
        path: 'tos',
        component: TosComponent,
        data: {
          linkText: 'Brukervilkår',
          linkId: 'tos',
          linkLayout: 'page',
          linkRank: 'secondary',
          menuType: 'mainMenu',
          menuSection: 'secondary',
          metaTitle: 'Brukervilkår',
          metaDescription: ''
        }
      },
      {
        path: 'support',
        component: SupportComponent,
        data: {
          linkText: 'Brukerstøtte',
          linkId: 'support',
          linkLayout: 'page',
          linkRank: 'secondary',
          menuType: 'mainMenu',
          menuSection: 'secondary',
          metaTitle: 'Brukerstøtte',
          metaDescription: ''
        }
      },
      {
        path: 'latest-news',
        component: LatestNewsComponent,
        data: {
          linkText: 'Aktuelle saker',
          linkId: 'latest-news',
          linkLayout: 'page',
          linkRank: 'secondary',
          menuType: 'mainMenu',
          menuSection: 'secondary',
          metaTitle: 'Aktuelle saker / siste nytt',
          metaDescription: ''
        }
      }
    ]
  }
];

const userRoutes: Routes = [
  {
    path: 'messages',
    component: MessagesComponent,
    data: {
      linkText: 'Meldinger',
      linkId: 'messages',
      linkLayout: 'page',
      linkRank: '',
      menuType: 'topMenu',
      menuSection: '',
      metaTitle: 'Meldinger',
      metaDescription: ''
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      linkText: 'Logg inn',
      linkId: 'login',
      linkLayout: 'page',
      linkRank: '',
      menuType: 'topMenu',
      menuSection: '',
      metaTitle: 'Logg inn',
      metaDescription: ''
    }
  },
  {
    path: 'user-profile',
    component: ProfileComponent,
    data: {
      linkText: 'Min side',
      linkId: 'user-profile',
      linkLayout: 'page',
      linkRank: 'primary',
      menuType: 'topMenu',
      menuSection: '',
      metaTitle: 'Min side',
      metaDescription: ''
    }
  },
  {
    path: 'register',
    component: RegistrationComponent,
    data: {
      linkText: 'Registrer deg',
      linkId: 'register',
      linkLayout: 'page',
      linkRank: 'secondary',
      menuType: '',
      menuSection: '',
      metaTitle: 'Registrer deg',
      metaDescription: ''
    }
  },
];

const extraRoutes: Routes = [
  {
    path: 'sitemap',
    component: SitemapComponent,
    data: {
      linkText: 'Innholdskart fra A-Å',
      linkId: 'sitemap',
      linkLayout: 'page',
      linkRank: '',
      menuType: 'extra',
      menuSection: '',
      metaTitle: 'Innholdskart A-Å',
      metaDescription: ''
    }
  }
];

const testRoutes: Routes = [  // for testing purposes

  {
    path: 'map',
    component: MapComponent,
    data: {
      linkId: 'map',
      linkLayout: 'page',
      linkRank: '',
      menuType: '',
      menuSection: '',
      metaTitle: 'Map',
      metaDescription: ''
    }
  },

  {
    path: 'design',
    component: DesignComponent,
    data: {
      linkId: 'design-system',
      linkLayout: 'page',
      linkRank: '',
      menuType: '',
      menuSection: '',
      metaTitle: 'Designssystem',
      metaDescription: ''
    }
  },
];

const wildcardRoutes: Routes = [
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      linkText: 'Ikke funnet - 404',
      linkId: 'not-found',
      linkLayout: 'page',
      linkRank: '',
      menuType: '',
      menuSection: '',
      metaTitle: '404',
      metaDescription: ''
    }
  }
];

export const routes: Routes = [...homeRoutes, ...reportRoutes, ...observationRoutes, ...userDataRoutes, ...aboutRoutes, ...userRoutes, ...wildcardRoutes, ...extraRoutes, ...testRoutes];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
