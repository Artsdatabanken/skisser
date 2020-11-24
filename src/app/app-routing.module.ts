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
import { ArtsObsComponent } from './components/about/artsobs/artsobs.component';
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
import { ProjectsComponent } from './components/projects/projects.component';
import { OverviewNumbersComponent } from './components/statistics/overview-numbers/overview-numbers.component';
import { OverviewChild1Component } from './components/statistics/overview/overview-child1/overview-child1.component';
import { OverviewChild2Component } from './components/statistics/overview/overview-child2/overview-child2.component';
import { OverviewChild9Component } from './components/statistics/overview/overview-child9/overview-child9.component';
import { OverviewChild8Component } from './components/statistics/overview/overview-child8/overview-child8.component';
import { OverviewChild3Component } from './components/statistics/overview/overview-child3/overview-child3.component';
import { OverviewChild4Component } from './components/statistics/overview/overview-child4/overview-child4.component';
import { OverviewChild5Component } from './components/statistics/overview/overview-child5/overview-child5.component';
import { OverviewChild6Component } from './components/statistics/overview/overview-child6/overview-child6.component';
import { OverviewChild7Component } from './components/statistics/overview/overview-child7/overview-child7.component';
import { OverviewChild10Component } from './components/statistics/overview/overview-child10/overview-child10.component';
import { OverviewChild11Component } from './components/statistics/overview/overview-child11/overview-child11.component';
import { OverviewChild12Component } from './components/statistics/overview/overview-child12/overview-child12.component';

/*

DOCUMENTATION:
* Husk at siste segment i path (url) må være lik id-property under data

TODO: legg til property order

*/

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      text: '',
      id: 'frontpage',
      layout: 'frontpage',
      rank: '',
      parent: '',
      menu: '',
      metaTitle: 'Artsobservasjoner',
      metaDescription: ''
    }
  },
  // {
  //   path: '',
  //   component: HomeComponent,
  //   data: {
  //     text: '',
  //     id: 'frontpage',
  //     layout: 'frontpage',
  //     rank: '',
  //     parent: '',
  //     menu: '',
  //     metaTitle: 'Artsobservasjoner',
  //     metaDescription: ''
  //   }
  // },
];

const reportRoutes: Routes = [
  {
    path: 'report',
    component: ReportComponent,
    data: {
      text: 'Rapportere observasjoner',
      id: 'report',
      layout: 'page',
      rank: 'primary',
      parent: '',
      menu: 'mainMenu',
      metaTitle: 'Rapportere observasjoner',
      metaDescription: ''
    }
  },

  {
    path: 'report/add-observation',
    component: AddObservationComponent,
    data: {
      text: 'Legg til observasjon',
      id: 'add-observation',
      layout: 'page',
      rank: 'primary',
      parent: 'report',
      menu: 'mainMenu',
      metaTitle: 'Legg til observasjoner',
      metaDescription: ''
    }
  },
  {
    path: 'report/checklist-observation',
    component: ChecklistComponent,
    data: {
      text: 'Sjekkliste observasjoner',
      id: 'checklist-observation',
      layout: 'page',
      rank: 'primary',
      parent: 'report',
      menu: 'mainMenu',
      metaTitle: 'Sjekkliste observasjoner',
      metaDescription: ''
    }
  },
  {
    path: 'report/import-observations',
    component: ImportObservationsComponent,
    data: {
      text: 'Importere observasjoner',
      id: 'import-observations',
      layout: 'page',
      rank: 'secondary',
      parent: 'report',
      menu: 'mainMenu',
      metaTitle: 'Importere observasjoner',
      metaDescription: ''
    }
  },
  {
    path: 'report/event-project',
    component: EventProjectComponent,
    data: {
      text: 'Arrangementer',
      id: 'event-project',
      layout: 'page',
      rank: 'secondary',
      parent: 'report',
      menu: 'mainMenu',
      metaTitle: 'Arrangementer',
      metaDescription: ''
    }
  },
  {
    path: 'report/survey-project',
    component: EventProjectComponent,
    data: {
      text: 'Kartleggingsprosjekter',
      id: 'survey-project',
      layout: 'page',
      rank: 'secondary',
      parent: 'report',
      menu: 'mainMenu',
      metaTitle: 'Kartleggingsprosjekter',
      metaDescription: ''
    }
  }
];

const observationRoutes: Routes = [
  {
    path: 'observations',
    component: ObservationsComponent,
    data: {
      text: 'Observasjonsdata',
      id: 'observations',
      layout: 'page',
      rank: 'primary',
      parent: '',
      menu: 'mainMenu',
      metaTitle: 'Observasjonsdata',
      metaDescription: ''
    }
  },
  {
    path: 'observations/sightings',
    component: SightingsComponent,
    data: {
      text: 'Se, søk og filtrer observasjoner',
      id: 'sightings',
      layout: 'page',
      rank: 'primary',
      parent: 'observations',
      menu: 'mainMenu',
      metaTitle: 'Se, søk og filtrer observasjoner',
      metaDescription: ''
    }
  },
  {
    path: 'observations/sightings/sighting',
    component: SightingComponent,
    data: {
      text: 'Observasjon',
      id: 'sighting',
      layout: 'page',
      rank: '',
      parent: '',
      menu: '',
      metaTitle: 'Observasjon',
      metaDescription: ''
    }
  },
  {
    path: 'observations/statistics',
    component: StatisticsComponent,
    data: {
      text: 'Tall og statistikk',
      id: 'statistics',
      layout: 'page',
      rank: 'secondary',
      parent: 'observations',
      menu: 'mainMenu',
      metaTitle: 'Tall og statistikk',
      metaDescription: ''
    }
  },
  {
    path: 'observations/statistics/overview',
    component: OverviewNumbersComponent,
    data: {
      text: 'Oversiktstall',
      id: 'overview',
      layout: 'spa',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metaTitle: 'Oversiktstall',
      metaDescription: ''
    },
    children: [
      {
        path: 'overview-1',
        component: OverviewChild1Component,
        data: {
          text: 'Antall observasjoner per artsgruppe',
          id: 'overview-1',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metaTitle: 'Antall observasjoner per artsgruppe',
          metaDescription: ''
        }
      },
      {
        path: 'overview-2',
        component: OverviewChild2Component,
        data: {
          text: 'Antall arter rapportert per artsgruppe',
          id: 'overview-2',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metaTitle: 'Antall arter rapportert per artsgruppe',
          metaDescription: ''
        }
      },
      {
        path: 'overview-3',
        component: OverviewChild3Component,
        data: {
          text: 'Antall bilder per artsgruppe',
          id: 'overview-3',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metaTitle: 'Antall bilder per artsgruppe',
          metaDescription: ''
        }
      },
      {
        path: 'overview-4',
        component: OverviewChild4Component,
        data: {
          text: 'Antall data akkumulert fra Artsobservasjoner og Artskart samlet over tid',
          id: 'overview-4',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metaTitle: 'Antall data akkumulert fra Artsobservasjoner og Artskart samlet over tid',
          metaDescription: ''
        }
      },
      {
        path: 'overview-5',
        component: OverviewChild5Component,
        data: {
          text: 'Antall kvalitetssikrede observasjoner per artsgruppe',
          id: 'overview-5',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metaTitle: 'Antall kvalitetssikrede observasjoner per artsgruppe',
          metaDescription: ''
        }
      },
      {
        path: 'overview-6',
        component: OverviewChild6Component,
        data: {
          text: 'Antall rapporterte observasjoner etter rapporteringsmåte',
          id: 'overview-6',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metaTitle: 'Antall rapporterte observasjoner etter rapporteringsmåte',
          metaDescription: ''
        }
      },
      {
        path: 'overview-7',
        component: OverviewChild7Component,
        data: {
          text: 'Antall observasjoner per fylke',
          id: 'overview-7',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metaTitle: 'Antall observasjoner per fylke',
          metaDescription: ''
        }
      },
      {
        path: 'overview-8',
        component: OverviewChild8Component,
        data: {
          text: 'Rapporteringsoversikt per artsgruppe totalt og per år',
          id: 'overview-8',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metaTitle: 'Rapporteringsoversikt per artsgruppe totalt og per år',
          metaDescription: ''
        }
      },
      {
        path: 'overview-9',
        component: OverviewChild9Component,
        data: {
          text: 'Månedlige rapporteringer per artsgruppe totalt og per år',
          id: 'overview-9',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metaTitle: 'Månedlige rapporteringer per artsgruppe totalt og per år',
          metaDescription: ''
        }
      },
      {
        path: 'overview-10',
        component: OverviewChild10Component,
        data: {
          text: 'Månedlige observasjoner per artsgruppe totalt og per år',
          id: 'overview-10',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metaTitle: 'Månedlige observasjoner per artsgruppe totalt og per år',
          metaDescription: ''
        }
      },
      {
        path: 'overview-11',
        component: OverviewChild11Component,
        data: {
          text: 'Antall aktive brukere',
          id: 'overview-11',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metaTitle: 'Antall aktive brukere',
          metaDescription: ''
        }
      }
    ]
  },
  {
    path: 'observations/statistics/quality-checked-data',
    component: QualityAssuredDataComponent,
    data: {
      text: 'Kvalitetssikrede data',
      id: 'quality-checked-data',
      layout: 'text',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metaTitle: 'Kvalitetssikrede data',
      metaDescription: ''
    }
  },
  {
    path: 'observations/statistics/red-listed-species',
    component: RedListedSpeciesComponent,
    data: {
      text: 'Rødlistede arter',
      id: 'red-listed-species',
      layout: 'text',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metaTitle: 'Rødlistede arter',
      metaDescription: ''
    }
  },
  {
    path: 'observations/statistics/alien-species',
    component: AlienSpeciesComponent,
    data: {
      text: 'Fremmede arter',
      id: 'alien-species',
      layout: 'text',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metaTitle: 'Fremmede arter',
      metaDescription: ''
    }
  },
  {
    path: 'observations/statistics/species-with-no-data',
    component: SpeciesWithNoDataComponent,
    data: {
      text: 'Arter uten data',
      id: 'species-with-no-data',
      layout: 'text',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metaTitle: 'Arter uten data',
      metaDescription: ''
    }
  },
  {
    path: 'observations/statistics/user-statistics',
    component: UserStatisticsComponent,
    data: {
      text: 'Brukerstatistikk',
      id: 'user-statistics',
      layout: 'wide',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metaTitle: 'Brukerstatistikk',
      metaDescription: ''
    }
  }
];

const userDataRoutes: Routes = [
  {
    path: 'my-data',
    component: MyDataComponent,
    data: {
      text: 'Min data',
      id: 'my-data',
      layout: 'page',
      rank: 'primary',
      parent: '',
      menu: 'mainMenu',
      metaTitle: 'Min data',
      metaDescription: ''
    }
  },
  {
    path: 'my-data/my-observations',
    component: MyObservationsComponent,
    data: {
      text: 'Mine observasjoner',
      id: 'my-observations',
      layout: 'page',
      rank: 'primary',
      parent: 'my-data',
      menu: 'mainMenu',
      metaTitle: 'Mine observasjoner',
      metaDescription: ''
    }
  },
  {
    path: 'my-data/my-statistics',
    component: MyStatisticsComponent,
    data: {
      text: 'Min statistikk',
      id: 'my-statistics',
      layout: 'page',
      rank: 'secondary',
      parent: 'my-data',
      menu: 'mainMenu',
      metaTitle: 'Min statistikk',
      metaDescription: ''
    }
  },
  {
    path: 'my-data/my-projects',
    component: MyProjectsComponent,
    data: {
      text: 'Mine prosjekter',
      id: 'my-projects',
      layout: 'page',
      rank: 'secondary',
      parent: 'my-data',
      menu: 'mainMenu',
      metaTitle: 'Mine prosjekter',
      metaDescription: ''
    }
  },
  {
    path: 'my-data/my-locations',
    component: MyLocationsComponent,
    data: {
      text: 'Mine lokaliteter',
      id: 'my-locations',
      layout: 'page',
      rank: 'secondary',
      parent: 'my-data',
      menu: 'mainMenu',
      metaTitle: 'Mine lokaliteter',
      metaDescription: ''
    }
  },
  {
    path: 'my-data/fellow-observers',
    component: FellowObserversComponent,
    data: {
      text: 'Medobservatører',
      id: 'fellow-observers',
      layout: 'page',
      rank: 'secondary',
      parent: 'my-data',
      menu: 'mainMenu',
      metaTitle: 'Medobservatører',
      metaDescription: ''
    }
  }
];

const aboutRoutes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    data: {
      text: 'Om tjenesten',
      id: 'about',
      layout: 'page',
      rank: 'primary',
      parent: '',
      menu: 'mainMenu',
      metaTitle: 'Om tjenesten',
      metaDescription: ''
    }
  },
  {
    path: 'about/artsobs',
    component: ArtsObsComponent,
    data: {
      text: 'Om artsobservasjoner.no',
      id: 'artsobs',
      layout: 'text',
      rank: 'secondary',
      parent: 'about',
      menu: 'mainMenu',
      metaTitle: 'Om artsobservasjoner.no',
      metaDescription: ''
    }
  },

  {
    path: 'about/quality-assurance',
    component: QualityAssuranceComponent,
    data: {
      text: 'Kvalitetssikring',
      id: 'quality-assurance',
      layout: 'text',
      rank: 'secondary',
      parent: 'about',
      menu: 'mainMenu',
      metaTitle: 'Kvalitetssikring',
      metaDescription: ''
    }
  },
  {
    path: 'about/contribute',
    component: ContributeComponent,
    data: {
      text: 'Hvordan du kan bidra',
      id: 'contribute',
      layout: 'text',
      rank: 'secondary',
      parent: 'about',
      menu: 'mainMenu',
      metaTitle: 'Hvordan du kan bidra',
      metaDescription: ''
    }
  },
  {
    path: 'about/tos',
    component: TosComponent,
    data: {
      text: 'Brukervilkår',
      id: 'tos',
      layout: 'text',
      rank: 'secondary',
      parent: 'about',
      menu: 'mainMenu',
      metaTitle: 'Brukervilkår',
      metaDescription: ''
    }
  },
  {
    path: 'about/support',
    component: SupportComponent,
    data: {
      text: 'Brukerstøtte',
      id: 'support',
      layout: 'text',
      rank: 'secondary',
      parent: 'about',
      menu: 'mainMenu',
      metaTitle: 'Brukerstøtte',
      metaDescription: ''
    }
  },
  // {
  //   path: 'about/latest-news',
  //   component: LatestNewsComponent,
  //   data: {
  //     text: 'Aktuelle saker',
  //     id: 'latest-news',
  //     layout: 'page',
  //     rank: 'secondary',
  //     parent: 'about',
  //     menu: 'mainMenu',
  //     metaTitle: 'Aktuelle saker / siste nytt',
  //     metaDescription: ''
  //   }
  //}
];

const userRoutes: Routes = [
  {
    path: 'messages',
    component: MessagesComponent,
    data: {
      text: 'Meldinger',
      id: 'messages',
      layout: 'page',
      rank: 'primary',
      parent: '',
      menu: 'topMenu',
      metaTitle: 'Meldinger',
      metaDescription: ''
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      text: 'Logg inn',
      id: 'login',
      layout: 'page',
      rank: '',
      parent: '',
      menu: 'topMenu',
      metaTitle: 'Logg inn',
      metaDescription: ''
    }
  },
  {
    path: 'user-profile',
    component: ProfileComponent,
    data: {
      text: 'Min side',
      id: 'user-profile',
      layout: 'page',
      rank: 'primary',
      parent: '',
      menu: 'topMenu',
      metaTitle: 'Min side',
      metaDescription: ''
    }
  },
  {
    path: 'register',
    component: RegistrationComponent,
    data: {
      text: 'Registrer deg',
      id: 'register',
      layout: 'page',
      rank: '',
      parent: '',
      menu: 'topMenu',
      metaTitle: 'Registrer deg',
      metaDescription: ''
    }
  },
];

const extraRoutes: Routes = [
  {
    path: 'about/latest-news',
    component: LatestNewsComponent,
    data: {
      text: 'Aktuelle saker',
      id: 'latest-news',
      layout: 'page',
      rank: 'secondary',
      parent: 'about',
      menu: 'extraMenu',
      metaTitle: 'Aktuelle saker / siste nytt',
      metaDescription: ''
    }
  },
  {
    path: 'sitemap',
    component: SitemapComponent,
    data: {
      text: 'Innholdskart fra A-Å',
      id: 'sitemap',
      layout: 'page',
      rank: '',
      parent: '',
      menu: 'extraMenu',
      metaTitle: 'Innholdskart A-Å',
      metaDescription: ''
    }
  },
  {
    path: 'english',
    component: SitemapComponent,
    data: {
      text: 'English',
      id: 'english',
      layout: 'page',
      rank: '',
      parent: '',
      menu: 'extraMenu',
      metaTitle: 'English',
      metaDescription: ''
    }
  }
];

const testRoutes: Routes = [  // for testing purposes
  {
    path: 'map',
    component: MapComponent,
    data: {
      text: 'Kart',
      id: '',
      layout: 'mega',
      rank: '',
      parent: '',
      menu: '',
      metaTitle: 'Artsobservasjoner',
      metaDescription: ''
    }
  },
  {
    path: 'design',
    component: DesignComponent,
    data: {
      text: 'Designmanual',
      id: '',
      layout: 'page',
      rank: '',
      parent: '',
      menu: '',
      metaTitle: 'Artsobservasjoner',
      metaDescription: ''
    }
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: {
      text: 'Projects',
      id: '',
      layout: 'page',
      rank: '',
      parent: '',
      menu: '',
      metaTitle: 'Prosjekter',
      metaDescription: ''
    }
  },
  {
    path: 'projects/create-project',
    component: ProjectsComponent,
    data: {
      text: 'Opprett prosjekt',
      id: '',
      layout: 'page',
      rank: '',
      parent: '',
      menu: '',
      metaTitle: 'Opprett prosjekt',
      metaDescription: ''
    }
  },
  {
    path: 'projects/project',
    component: ProjectsComponent,
    data: {
      text: 'Project',
      id: '',
      layout: 'page',
      rank: '',
      parent: '',
      menu: '',
      metaTitle: 'Prosjekt',
      metaDescription: ''
    }
  },
];

const wildcardRoutes: Routes = [
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      text: 'Ikke funnet - 404',
      id: 'not-found',
      layout: 'page',
      rank: '',
      parent: '',
      menu: '',
      metaTitle: '404',
      metaDescription: ''
    }
  }
];

const routes: Routes = [...homeRoutes, ...reportRoutes, ...observationRoutes, ...userDataRoutes, ...aboutRoutes, ...userRoutes, ...extraRoutes, ...testRoutes, ...wildcardRoutes];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
