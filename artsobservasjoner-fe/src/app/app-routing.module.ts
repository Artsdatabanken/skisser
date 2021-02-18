import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { RedListedSpeciesComponent } from './components/statistics/red-listed-species/red-listed-species.component';
import { AlienSpeciesComponent } from './components/statistics/alien-species/alien-species.component';
import { UserStatisticsComponent } from './components/statistics/user-statistics/user-statistics.component';
import { DesignComponent } from './misc/design/design.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SightingsComponent } from './components/observations/sightings/sightings.component';
import { SightingComponent } from './components/observations/sighting/sighting.component';
import { ObservationsComponent } from './components/observations/observations.component';
import { ReportComponent } from './components/report/report.component';
import { MapComponent } from './misc/map/map.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MyDataComponent } from './components/my-data/my-data.component';
import { MyObservationsComponent } from './components/my-data/my-observations/my-observations.component';
import { MyStatisticsComponent } from './components/my-data/my-statistics/my-statistics.component';
import { MyProjectsComponent } from './components/my-data/my-projects/my-projects.component';
import { MyLocationsComponent } from './components/my-data/my-locations/my-locations.component';
import { ChecklistComponent } from './components/report/checklist/checklist.component';
import { ImportObservationsComponent } from './components/report/import-observations/import-observations.component';
import { EventProjectComponent } from './components/report/event-project/event-project.component';
import { OverviewChild1Component } from './components/statistics/overview/overview-child1/overview-child1.component';
import { OverviewChild2Component } from './components/statistics/overview/overview-child2/overview-child2.component';
import { OverviewChild9Component } from './components/statistics/overview/overview-child9/overview-child9.component';
import { OverviewChild8Component } from './components/statistics/overview/overview-child8/overview-child8.component';
import { OverviewChild3Component } from './components/statistics/overview/overview-child3/overview-child3.component';
import { OverviewChild4Component } from './components/statistics/overview/overview-child4/overview-child4.component';
import { OverviewChild6Component } from './components/statistics/overview/overview-child6/overview-child6.component';
import { OverviewChild7Component } from './components/statistics/overview/overview-child7/overview-child7.component';
import { OverviewChild10Component } from './components/statistics/overview/overview-child10/overview-child10.component';
import { OverviewChild11Component } from './components/statistics/overview/overview-child11/overview-child11.component';
import { NewsComponent } from './components/news/news.component';
import { NewsItemComponent } from './components/news/news-item/news-item.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutPageComponent } from './components/about/about-page/about-page.component';
import { KnowledgeGapComponent } from './components/statistics/knowledge-gap/knowledge-gap.component';
import { AddSightingComponent } from './components/report/add-sighting/add-sighting.component';
import { CoObserversComponent } from './components/my-data/co-observers/co-observers.component';
import { ValidatedDataComponent } from './components/statistics/validated-data/validated-data.component';
import { OverviewStatisticsComponent } from './components/statistics/overview-statistics/overview-statistics.component';
import { OverviewItemComponent } from './components/statistics/overview/overview-item/overview-item.component';
import { OverviewChild5Component } from './components/statistics/overview/overview-child5/overview-child5.component';

/*

DOCUMENTATION:

* Husk at siste segment i path (url) må være lik id-property under data
* TODO: legg til property order

*/

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      text: 'Artsobservasjoner',
      title: 'frontpage',
      id: 'frontpage',
      layout: 'frontpage',
      rank: '',
      parent: '',
      menu: '',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  }
];

const reportRoutes: Routes = [
  {
    path: 'report',
    component: ReportComponent,
    data: {
      text: 'Rapportere observasjoner',
      title: 'menu_report',
      translation: {
        no: 'Rapportere observasjoner',
        en: 'Sightings register'
      },
      id: 'report',
      layout: 'landing',
      rank: 'primary',
      parent: '',
      menu: 'mainMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'report/add-observation',
    component: AddSightingComponent,
    data: {
      text: 'Legg til observasjon',
      title: 'menu_report_addSighting',
      translation: {
        no: 'Legg til observasjon',
        en: 'Add sighting'
      },
      id: 'add-sighting',
      layout: 'page',
      rank: 'primary',
      parent: 'report',
      menu: 'mainMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'report/checklist-observation',
    component: ChecklistComponent,
    data: {
      text: 'Sjekkliste observasjoner',
      title: 'menu_report_addByChecklist',
      translation: {
        no: 'Sjekkliste observasjoner',
        en: 'Sightings checklist registration'
      },
      id: 'sightings-checklist',
      layout: 'page',
      rank: 'primary',
      parent: 'report',
      menu: 'mainMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'report/import-observations',
    component: ImportObservationsComponent,
    data: {
      text: 'Importere observasjoner',
      title: 'menu_report_importSightings',
      translation: {
        no: 'Importere observasjoner',
        en: 'Sightings import'
      },
      id: 'sightings-import',
      layout: 'page',
      rank: 'secondary',
      parent: 'report',
      menu: 'mainMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'report/event-project',
    component: EventProjectComponent,
    data: {
      text: 'Arrangementer',
      title: 'menu_report_events',
      translation: {
        no: 'Arrangementer',
        en: 'Sighting registration events'
      },
      id: 'event-project',
      layout: 'page',
      rank: 'secondary',
      parent: 'report',
      menu: 'mainMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'report/projects',
    component: EventProjectComponent,
    data: {
      text: 'Kartleggingsprosjekter',
      title: 'menu_report_projects',
      translation: {
        no: 'Kartleggingsprosjekter',
        en: 'Survey sightings registration'
      },
      id: 'projects',
      layout: 'page',
      rank: 'secondary',
      parent: 'report',
      menu: 'mainMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  }
];

const sightingsRoutes: Routes = [
  {
    path: 'observations',
    component: ObservationsComponent,
    data: {
      text: 'Observasjonsdata',
      title: 'menu_observations',
      id: 'observations',
      layout: 'landing',
      rank: 'primary',
      parent: '',
      menu: 'mainMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'observations/sightings',
    component: SightingsComponent,
    data: {
      text: 'Se, søk og filtrer observasjoner',
      title: 'menu_observations_sightings',
      id: 'sightings',
      layout: 'page',
      rank: 'primary',
      parent: 'observations',
      menu: 'mainMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'observations/sightings/sighting',
    component: SightingComponent,
    data: {
      text: 'Observasjon',
      title: 'menu_observations_sighting',
      id: 'sighting',
      layout: 'page',
      rank: '',
      parent: '',
      menu: '',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'observations/statistics',
    component: StatisticsComponent,
    data: {
      text: 'Tall og statistikk', 
      title: 'menu_statistics',
      id: 'statistics',
      layout: 'landing',
      rank: 'primary', // må endres til secondary når det begynner å komme mer innhold
      parent: 'observations',
      menu: 'mainMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'observations/statistics/overview-statistics',
    component: OverviewStatisticsComponent,
    data: {
      text: 'Volumstatistikk',  
      title: 'menu_statistics_overview',
      id: 'overview-statistics',
      layout: 'spa',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metatitle: '',
      metaDescription: '',
      hidden: false
    },
    children: [
      {
        path: 'observations/statistics/overview-statistics/:id',
        component: OverviewItemComponent,
        data: {
          text: 'Oversikt stats item',
          id: 'overviewStatsItem',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metatitle: '',
          metaDescription: '',
          hidden: true
        }
      },
      {
        path: 'overview-1',
        component: OverviewChild1Component,
        data: {
          text: 'Antall observasjoner per artsgruppe',
          title: 'statistics.overviewStats_heading_1',
          id: 'overview-1',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metatitle: '',
          metaDescription: '',
          hidden: false
        }
      },
      {
        path: 'overview-2',
        component: OverviewChild2Component,
        data: {
          text: 'Antall bilder per artsgruppe og antall bilder per artsgruppe med åpen lisens',
          title: 'statistics.overviewStats_heading_2',
          id: 'overview-2',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metatitle: 'menu_Antall arter rapportert per artsgruppe',
          metaDescription: '',
          hidden: false
        }
      },
      {
        path: 'overview-3',
        component: OverviewChild3Component,
        data: {
          text: 'Antall observasjoner fra Artsobservasjoner og funn i Artskart per år siden 2007',
          title: 'statistics.overviewStats_heading_3',
          id: 'overview-3',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metatitle: 'menu_Antall bilder per artsgruppe',
          metaDescription: '',
          hidden: false
        }
      },
      {
        path: 'overview-4',
        component: OverviewChild4Component,
        data: {
          text: 'Antall brukere',
          title: 'statistics.overviewStats_heading_4',
          id: 'overview-4',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metatitle: '',
          metaDescription: '',
          hidden: false
        }
      },
      {
        path: 'overview-5',
        component: OverviewChild5Component,
        data: {
          text: 'Antall prosjekter',
          title: 'statistics.overviewStats_heading_5',
          id: 'overview-6',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metatitle: '',
          metaDescription: '',
          hidden: false
        }
      },
      {
        path: 'overview-6',
        component: OverviewChild6Component,
        data: {
          text: 'Antall rapporterte observasjoner etter rapporteringsmåte',
          title: 'statistics.overviewStats_heading_6',
          id: 'overview-6',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metatitle: '',
          metaDescription: '',
          hidden: false
        }
      },
      {
        path: 'overview-7',
        component: OverviewChild7Component,
        data: {
          text: 'Geografisk fordeling',
          title: 'statistics.overviewStats_heading_7',
          id: 'overview-7',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metatitle: '',
          metaDescription: '',
          hidden: false
        }
      },
      {
        path: 'overview-8',
        component: OverviewChild8Component,
        data: {
          text: 'Månedlige observasjoner per artsgruppe totalt og per år',
          title: 'statistics.overviewStats_heading_8',
          id: 'overview-8',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metatitle: '',
          metaDescription: '',
          hidden: false
        }
      },
      {
        path: 'overview-9',
        component: OverviewChild9Component,
        data: {
          text: 'Rapporteringsoversikt per artsgruppe totalt og per år',
          title: 'statistics.overviewStats_heading_9',
          id: 'overview-9',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metatitle: '',
          metaDescription: '',
          hidden: false
        }
      },
      {
        path: 'overview-10',
        component: OverviewChild10Component,
        data: {
          text: 'Månedlige registreringer per artsgruppe totalt og per år',
          title: 'statistics.overviewStats_heading_10',
          id: 'overview-10',
          layout: 'spa',
          rank: 'secondary',
          parent: 'overview',
          menu: '',
          metatitle: 'r',
          metaDescription: '',
          hidden: false
        }
      },
      // {
      //   path: 'overview-11',
      //   component: OverviewChild11Component,
      //   data: {
      //     text: '',
      //     title: '',
      //     id: 'overview-11',
      //     layout: 'spa',
      //     rank: 'secondary',
      //     parent: 'overview',
      //     menu: '',
      //     metatitle: '',
      //     metaDescription: '',
      //     hidden: false
      //   }
      // }
    ]
  },
  {
    path: 'observations/statistics/validated-data',
    component: ValidatedDataComponent,
    data: {
      text: 'Kvalitetssikrede data', 
      title: 'menu_statistics_validatedData', 
      id: 'validated-data',
      layout: 'page',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metatitle: '',
      metaDescription: ''
    }
  },
  {
    path: 'observations/statistics/redlisted-species',
    component: RedListedSpeciesComponent,
    data: {
      text: 'Rødlistede arter',  
      title: 'menu_statistics_redlistedSpecies',
      id: 'redlisted-species',
      layout: 'page',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metatitle: '',
      metaDescription: ''
    }
  },
  {
    path: 'observations/statistics/alien-species',
    component: AlienSpeciesComponent,
    data: {
      text: 'Fremmede arter',  
      title: 'menu_statistics_alienSpecies',
      translation: {
        no: 'Fremmede arter',
        en: 'Alien species'
      },
      id: 'alien-species',
      layout: 'page',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metatitle: '',
      metaDescription: ''
    }
  },
  {
    path: 'observations/statistics/knowledge-gaps',
    component: KnowledgeGapComponent,
    data: {
      text: 'Kunnskapshull',  
      title: 'menu_statistics_knowledgeGaps',
      translation: {
        no: 'Kunnskapshull',
        en: 'Knowledge gaps'
      },
      id: 'knowledge-gaps',
      layout: 'page',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metatitle: '',
      metaDescription: ''
    }
  },
  {
    path: 'observations/statistics/user-statistics',
    component: UserStatisticsComponent,
    data: {
      text: 'Brukerstatistikk',  
      title: 'menu_statistics_userStatistics',
      translation: {
        no: 'Brukerstatistikk',
        en: 'User statistics'
      },
      id: 'user-statistics',
      layout: 'wide',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metatitle: '',
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
      title: 'menu_myData',
      id: 'my-data',
      layout: 'landing',
      rank: 'primary',
      parent: '',
      menu: 'mainMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'my-data/my-observations',
    component: MyObservationsComponent,
    data: {
      text: 'Mine observasjoner',
      title: 'menu_myData_myObservations',
      translation: {
        no: 'Mine observasjoner',
        en: 'My sightings'
      },
      id: 'my-observations',
      layout: 'page',
      rank: 'primary',
      parent: 'my-data',
      menu: 'mainMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'my-data/my-statistics',
    component: MyStatisticsComponent,
    data: {
      text: 'Min statistikk',
      title: 'menu_myData_myStatistics',
      translation: {
        no: 'Min statistikk',
        en: 'My stats'
      },
      id: 'my-statistics',
      layout: 'page',
      rank: 'secondary',
      parent: 'my-data',
      menu: 'mainMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'my-data/my-projects',
    component: MyProjectsComponent,
    data: {
      text: 'Mine prosjekter',
      title: 'menu_myData_myProjects',
      translation: {
        no: 'Mine prosjekter',
        en: 'My projects'
      },
      id: 'my-projects',
      layout: 'page',
      rank: 'secondary',
      parent: 'my-data',
      menu: 'mainMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'my-data/my-locations',
    component: MyLocationsComponent,
    data: {
      text: 'Mine lokaliteter',
      title: 'menu_myData_myLocations',
      translation: {
        no: 'Mine lokaliteter',
        en: 'My locations'
      },
      id: 'my-locations',
      layout: 'page',
      rank: 'secondary',
      parent: 'my-data',
      menu: 'mainMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'my-data/co-observers',
    component: CoObserversComponent,
    data: {
      text: 'Medobservatører',
      title: 'menu_myData__myCoObservers',
      translation: {
        no: 'Medobservatører',
        en: 'Co-observers'
      },
      id: 'co-observers',
      layout: 'page',
      rank: 'secondary',
      parent: 'my-data',
      menu: 'mainMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  }
];

const aboutRoutes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    data: {
      text: 'Om tjenesten', 
      title: 'menu_about',
      id: 'about',
      layout: 'landing',
      rank: 'primary',
      parent: '',
      menu: 'mainMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'about/:id',
    component: AboutPageComponent,
    data: {
      text: 'About item',
      translation: {
        no: '',
        en: ''
      },
      id: 'about',
      layout: 'text',
      rank: '',
      parent: 'about',
      menu: 'mainMenu',
      metatitle: 'menu_About Item',
      metaDescription: '',
      hidden: true
    }
  },
  // {
  //   path: 'about/artsobs',
  //   component: ArtsObsComponent,
  //   data: {
  //     text: 'Om artsobservasjoner.no',
  //     id: 'artsobs',
  //     layout: 'text',
  //     rank: 'secondary',
  //     parent: 'about',
  //     menu: 'mainMenu',
  //     metatitle: 'menu_Om artsobservasjoner.no',
  //     metaDescription: '',
  //     hidden: false
  //   }
  // },
  // {
  //   path: 'about/quality-assurance',
  //   component: QualityAssuranceComponent,
  //   data: {
  //     text: 'Kvalitetssikring',
  //     id: 'quality-assurance',
  //     layout: 'text',
  //     rank: 'secondary',
  //     parent: 'about',
  //     menu: 'mainMenu',
  //     metatitle: 'menu_Kvalitetssikring',
  //     metaDescription: '',
  //     hidden: false
  //   }
  // },
  // {
  //   path: 'about/contribute',
  //   component: ContributeComponent,
  //   data: {
  //     text: 'Hvordan du kan bidra',
  //     id: 'contribute',
  //     layout: 'text',
  //     rank: 'secondary',
  //     parent: 'about',
  //     menu: 'mainMenu',
  //     metatitle: 'menu_Hvordan du kan bidra',
  //     metaDescription: '',
  //     hidden: false
  //   }
  // },
  // {
  //   path: 'about/tos',
  //   component: TosComponent,
  //   data: {
  //     text: 'Brukervilkår',
  //     id: 'tos',
  //     layout: 'text',
  //     rank: 'secondary',
  //     parent: 'about',
  //     menu: 'mainMenu',
  //     metatitle: 'menu_Brukervilkår',
  //     metaDescription: '',
  //     hidden: false
  //   }
  // },
  // {
  //   path: 'about/support',
  //   component: SupportComponent,
  //   data: {
  //     text: 'Brukerstøtte',
  //     id: 'support',
  //     layout: 'text',
  //     rank: 'secondary',
  //     parent: 'about',
  //     menu: 'mainMenu',
  //     metatitle: 'menu_Brukerstøtte',
  //     metaDescription: '',
  //     hidden: false
  //   }
  // }
];

const accountRoutes: Routes = [
  {
    path: 'register',
    component: RegistrationComponent,
    data: {
      text: 'Registrer deg',
      title: 'menu_account_register',
      id: 'register',
      layout: 'page',
      rank: '',
      parent: 'accountMenu',
      menu: 'accountMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      text: 'Logg inn',
      title: 'menu_account_login',
      id: 'login',
      layout: 'page',
      rank: '',
      parent: 'accountMenu',
      menu: 'accountMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      text: 'Min side',
      title: 'menu_account',
      id: 'dashboard',
      layout: 'page',
      rank: 'primary',
      parent: 'accountMenu',
      menu: 'accountMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'messages',
    component: MessagesComponent,
    data: {
      text: 'Meldinger',
      title: 'menu_account_messages',
      id: 'messages',
      layout: 'page',
      rank: 'primary',
      parent: 'accountMenu',
      menu: 'accountMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
];

const extraRoutes: Routes = [
  {
    path: 'news',
    component: NewsComponent,
    data: {
      text: 'Aktuelle saker',
      title: 'menu_news',
      id: 'news',
      layout: 'text',
      rank: 'secondary',
      parent: '',
      menu: 'extraMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'news/:id',
    component: NewsItemComponent,
    data: {
      text: 'News item',
      translation: {
        no: '',
        en: ''
      },
      id: 'news',
      layout: 'article',
      rank: '',
      parent: 'news',
      menu: '',
      metatitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'sitemap',
    component: SitemapComponent,
    data: {
      text: 'Innholdskart fra A-Å',
      title: 'menu_sitemap',
      translation: {
        no: 'Innholdskart fra A-Å',
        en: 'Sitemap'
      },
      id: 'sitemap',
      layout: 'page',
      rank: '',
      parent: '',
      menu: 'extraMenu',
      metatitle: '',
      metaDescription: '',
      hidden: false
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
      metatitle: 'menu_Artsobservasjoner',
      metaDescription: '',
      hidden: false
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
      metatitle: 'menu_Artsobservasjoner',
      metaDescription: '',
      hidden: false
    }
  }
];

const wildcardRoutes: Routes = [
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      text: 'Ikke funnet - 404',
      title: 'menu_404',
      id: 'not-found',
      layout: 'page',
      rank: '',
      parent: '',
      menu: '',
      metatitle: 'menu_404',
      metaDescription: '',
      hidden: false
    }
  }
];

const routes: Routes = [...homeRoutes, ...sightingsRoutes, ...aboutRoutes, ...accountRoutes, ...extraRoutes, ...testRoutes, ...wildcardRoutes];
//const routes: Routes = [...homeRoutes, ...reportRoutes, ...sightingsRoutes, ...userDataRoutes, ...aboutRoutes, ...accountRoutes, ...extraRoutes, ...testRoutes, ...wildcardRoutes];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
