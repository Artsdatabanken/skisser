import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { RedListedSpeciesComponent } from './components/statistics/red-listed-species/red-listed-species.component';
import { AlienSpeciesComponent } from './components/statistics/alien-species/alien-species.component';
import { DesignComponent } from './misc/design/design.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SightingComponent } from './components/sightings-data/sighting/sighting.component';
import { ReportComponent } from './components/report/report.component';
import { MapComponent } from './misc/map/map.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MyDataComponent } from './components/my-data/my-data.component';
import { MyStatisticsComponent } from './components/my-data/my-statistics/my-statistics.component';
import { MyProjectsComponent } from './components/my-data/my-projects/my-projects.component';
import { MyLocationsComponent } from './components/my-data/my-locations/my-locations.component';
import { ChecklistComponent } from './components/report/checklist/checklist.component';
import { EventProjectComponent } from './components/report/event-project/event-project.component';
import { OverviewChild1Component } from './components/statistics/overview/overview-child1/overview-child1.component';
import { OverviewChild2Component } from './components/statistics/overview/overview-child2/overview-child2.component';
import { OverviewChild8Component } from './components/statistics/overview/overview-child8/overview-child8.component';
import { OverviewChild3Component } from './components/statistics/overview/overview-child3/overview-child3.component';
import { OverviewChild4Component } from './components/statistics/overview/overview-child4/overview-child4.component';
import { OverviewChild6Component } from './components/statistics/overview/overview-child6/overview-child6.component';
import { OverviewChild7Component } from './components/statistics/overview/overview-child7/overview-child7.component';
import { NewsComponent } from './components/news/news.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { AboutPageComponent } from './components/about/about-page/about-page.component';
import { KnowledgeGapComponent } from './components/statistics/knowledge-gap/knowledge-gap.component';
import { AddSightingComponent } from './components/report/add-sighting/add-sighting.component';
import { CoObserversComponent } from './components/my-data/co-observers/co-observers.component';
import { ValidatedDataComponent } from './components/statistics/validated-data/validated-data.component';
import { OverviewStatisticsComponent } from './components/statistics/overview-statistics/overview-statistics.component';
import { OverviewChild5Component } from './components/statistics/overview/overview-child5/overview-child5.component';
import { StatusPageComponent } from './components/status-page/status-page.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { PressComponent } from './components/press/press.component';
import { SearchComponent } from './components/search/search.component';
import { ImportSightingsComponent } from './components/report/import-sightings/import-sightings.component';
import { MySightingsComponent } from './components/my-data/my-sightings/my-sightings.component';
import { SightingsDataComponent } from './components/sightings-data/sightings-data.component';
import { TestComponent } from './misc/test/test.component';
import { ExploreSightingsComponent } from './components/sightings-data/explore-sightings/explore-sightings.component';
import { AboutStatisticsComponent } from './components/statistics/about-statistics/about-statistics.component';
import { SearchSightingsComponent } from './components/sightings-data/search-sightings/search-sightings.component';
import { UserStatisticsComponent } from './components/user-statistics/user-statistics.component';
import { UserCountSightingsComponent } from './components/user-statistics/user-count-sightings/user-count-sightings.component';
import { UserCountPicturesComponent } from './components/user-statistics/user-count-pictures/user-count-pictures.component';
import { SpeciesInventoryComponent } from './components/sightings-data/species-inventory/species-inventory.component';
import { CompareDataComponent } from './components/statistics/compare-data/compare-data.component';
import { SpeciesListsComponent } from './components/species-data/species-lists/species-lists.component';
import { CountyDataComponent } from './components/species-data/county-data/county-data.component';
import { MunicipalityDataComponent } from './components/species-data/municipality-data/municipality-data.component';
import { DetailedSpeciesListComponent } from './components/species-data/detailed-species-list/detailed-species-list.component';
import { CountiesComponent } from './components/species-data/counties/counties.component';
import { MunicipalitiesComponent } from './components/species-data/municipalities/municipalities.component';
import { SightingsComponent } from './components/sightings-data/sightings/sightings.component';

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
      metaTitle: '',
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
      title: 'menu.menu_report',
      translation: {
        no: 'Rapportere observasjoner',
        en: 'Sightings register'
      },
      id: 'report',
      layout: 'landing',
      rank: 'primary',
      parent: '',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'report/add-sighting',
    component: AddSightingComponent,
    data: {
      text: 'Legg til observasjon',
      title: 'menu.menu_report_addSighting',
      translation: {
        no: 'Legg til observasjon',
        en: 'Add sighting'
      },
      id: 'add-sighting',
      layout: 'page',
      rank: 'primary',
      parent: 'report',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'report/checklist-sightings',
    component: ChecklistComponent,
    data: {
      text: 'Sjekkliste observasjoner',
      title: 'menu.menu_report_addByChecklist',
      translation: {
        no: 'Sjekkliste observasjoner',
        en: 'Sightings checklist registration'
      },
      id: 'sightings-checklist',
      layout: 'page',
      rank: 'primary',
      parent: 'report',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'report/import-sightings',
    component: ImportSightingsComponent,
    data: {
      text: 'Importere observasjoner',
      title: 'menu.menu_report_importSightings',
      translation: {
        no: 'Importere observasjoner',
        en: 'Sightings import'
      },
      id: 'sightings-import',
      layout: 'page',
      rank: 'secondary',
      parent: 'report',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'report/event-project',
    component: EventProjectComponent,
    data: {
      text: 'Arrangementer',
      title: 'menu.menu_report_events',
      translation: {
        no: 'Arrangementer',
        en: 'Sighting registration events'
      },
      id: 'event-project',
      layout: 'page',
      rank: 'secondary',
      parent: 'report',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'report/projects',
    component: EventProjectComponent,
    data: {
      text: 'Kartleggingsprosjekter',
      title: 'menu.menu_report_projects',
      translation: {
        no: 'Kartleggingsprosjekter',
        en: 'Survey sightings registration'
      },
      id: 'projects',
      layout: 'page',
      rank: 'secondary',
      parent: 'report',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  }
];

const sightingsRoutes: Routes = [
  {
    path: 'sightings-data',
    component: SightingsDataComponent,
    data: {
      text: 'Observasjonsdata',
      title: 'menu.menu_sightings',
      id: 'sightings-data',
      layout: 'landing',
      rank: 'primary',
      parent: '',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'sightings-data/test',
    component: SightingsComponent,
    data: {
      text: 'Se, søk og filtrer observasjoner',
      title: 'menu.menu_sightings_sightingsCollection',
      id: 'sightings',
      layout: 'landing',
      rank: 'primary',
      parent: 'sightings-data',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'sightings-data/search-sightings',
    component: SearchSightingsComponent,
    data: {
      text: 'Se, søk og filtrer observasjoner',
      title: 'menu.menu_sightings_sightingsCollection',
      id: 'sightings',
      layout: 'landing',
      rank: 'primary',
      parent: 'sightings-data',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'sightings-data/explore-sightings',
    component: ExploreSightingsComponent,
    data: {
      text: 'Utforsk observasjoner',
      title: 'menu.menu_sightings_exploreSightings',
      id: 'explore-sightings',
      layout: 'page',
      rank: 'primary',
      parent: 'sightings-data',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'sightings-data/sightings/sighting',
    component: SightingComponent,
    data: {
      text: 'Observasjon',
      title: 'menu.menu_sightings_sighting',
      id: 'sighting',
      layout: 'page',
      rank: '',
      parent: '',
      menu: '',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'sightings-data/species-inventory',
    component: SpeciesInventoryComponent,
    data: {
      text: 'Artsinventar',
      title: 'menu.menu_sightings_speciesInventory',
      id: 'species-inventory',
      layout: 'page',
      rank: 'primary',
      parent: 'sightings-data',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'sightings-data/species-data/species-lists',
    component: SpeciesListsComponent,
    data: {
      text: 'Arter per område',
      title: 'menu.menu_sightings_speciesData_speciesLists',
      id: 'species-lists',
      layout: 'spa',
      rank: '',
      parent: 'sightings-data',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    },
    children: [
      {
        path: 'county-data',
        component: CountiesComponent,
        data: {
          text: 'Fylkesliga',
          title: 'menu.menu_sightings_speciesData_speciesLists_countyData',
          id: 'county-data',
          layout: 'spa',
          rank: '',
          parent: '',
          menu: '',
          metaTitle: '',
          metaDescription: '',
          hidden: false
        }
      }, {
        path: 'municipality-data',
        component: MunicipalitiesComponent,
        data: {
          text: 'Fylkesliga',
          title: 'menu.menu_sightings_speciesData_speciesLists_municipalityData',
          id: 'municipality-data',
          layout: 'spa',
          rank: '',
          parent: '',
          menu: '',
          metaTitle: '',
          metaDescription: '',
          hidden: false
        }
      }
    ]
  },
  // {
  //   path: 'sightings-data/species-data/species-lists/detailed-species-list/:id',
  //   component: DetailedSpeciesListComponent,
  //   data: {
  //     text: 'Detaljert artsliste',
  //     title: 'menu.menu_sightings_speciesData_speciesLists_detailedSpeciesList',
  //     id: 'detailed-species-list',
  //     layout: 'spa',
  //     rank: '',
  //     parent: '',
  //     menu: '',
  //     metaTitle: '',
  //     metaDescription: '',
  //     hidden: false
  //   }
  // }
  {
    path: 'sightings-data/species-data/species-lists/detailed-species-list',
    component: DetailedSpeciesListComponent,
    data: {
      text: 'Detaljert artsliste',
      title: 'menu.menu_sightings_speciesData_speciesLists_detailedSpeciesList',
      id: 'detailed-species-list',
      layout: 'spa',
      rank: '',
      parent: '',
      menu: '',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  }
];

const statisticsRoutes: Routes = [
  {
    path: 'sightings-data/statistics',
    component: StatisticsComponent,
    data: {
      text: 'Tall og statistikk',
      title: 'menu.menu_statistics',
      id: 'statistics',
      layout: 'landing',
      rank: 'primary', // må endres til secondary når det begynner å komme mer innhold
      parent: 'sightings-data',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'sightings-data/statistics/about-statistics',
    component: AboutStatisticsComponent,
    data: {
      text: 'Om statistikk',
      title: 'menu.menu_statistics_about',
      id: 'about_statistics',
      layout: 'landing',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'sightings-data/statistics/overview-statistics',
    component: OverviewStatisticsComponent,
    data: {
      text: 'Volumstatistikk',
      title: 'menu.menu_statistics_overview',
      id: 'overview-statistics',
      layout: 'spa',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    },
    children: [
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
          metaTitle: '',
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
          metaTitle: 'menu_Antall arter rapportert per artsgruppe',
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
          metaTitle: 'menu_Antall bilder per artsgruppe',
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
          metaTitle: '',
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
          metaTitle: '',
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
          metaTitle: '',
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
          metaTitle: '',
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
          metaTitle: '',
          metaDescription: '',
          hidden: false
        }
      }
    ]
  },
  {
    path: 'sightings-data/statistics/validated-data',
    component: ValidatedDataComponent,
    data: {
      text: 'Kvalitetssikrede data',
      title: 'menu.menu_statistics_validatedData',
      id: 'validated-data',
      layout: 'page',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metaTitle: '',
      metaDescription: ''
    }
  },
  {
    path: 'sightings-data/statistics/redlisted-species',
    component: RedListedSpeciesComponent,
    data: {
      text: 'Rødlistede arter',
      title: 'menu.menu_statistics_redlistedSpecies',
      id: 'redlisted-species',
      layout: 'page',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metaTitle: '',
      metaDescription: ''
    }
  },
  {
    path: 'sightings-data/statistics/alien-species',
    component: AlienSpeciesComponent,
    data: {
      text: 'Fremmede arter',
      title: 'menu.menu_statistics_alienSpecies',
      id: 'alien-species',
      layout: 'page',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metaTitle: '',
      metaDescription: ''
    }
  },
  {
    path: 'sightings-data/statistics/knowledge-gaps',
    component: KnowledgeGapComponent,
    data: {
      text: 'Kunnskapshull',
      title: 'menu.menu_statistics_knowledgeGaps',
      id: 'knowledge-gaps',
      layout: 'page',
      rank: 'secondary',
      parent: 'statistics',
      menu: '',
      metaTitle: '',
      metaDescription: ''
    }
  },
  {
    path: 'sightings-data/statistics/compare-data',
    component: CompareDataComponent,
    data: {
      text: 'Sammenlikn observasjonsstatistikk',
      title: 'menu.menu_statistics_compareSpeciesStatistics',
      id: 'compare-data',
      layout: 'page',
      rank: '',
      parent: 'statistics',
      menu: '',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
];

const userStatisticsRoutes: Routes = [
  {
    path: 'sightings-data/statistics/user-statistics',
    component: UserStatisticsComponent,
    data: {
      text: 'Brukerstatistikk',
      title: 'menu.menu_statistics_userStatistics',
      id: 'user-statistics',
      layout: 'spa',
      rank: '',
      parent: 'statistics',
      menu: '',
      metaTitle: '',
      metaDescription: ''
    },
    children: [
      {
        path: 'sightings-count-per-user',
        component: UserCountSightingsComponent,
        data: {
          text: 'Antall observasjoner per bruker',
          title: 'menu.menu_statistics_userStatistics_topObservers',
          id: 'top-observers',
          layout: 'spa',
          rank: '',
          parent: '',
          menu: '',
          metaTitle: '',
          metaDescription: '',
          hidden: false
        }
      },
      {
        path: 'media-count-per-user',
        component: UserCountPicturesComponent,
        data: {
          text: 'Antall bilder per bruker',
          title: 'menu.menu_statistics_userStatistics_topPhotographers',
          id: 'top-photographers',
          layout: 'spa',
          rank: '',
          parent: '',
          menu: '',
          metaTitle: '',
          metaDescription: '',
          hidden: false
        }
      },
    ]
  }
];

const userDataRoutes: Routes = [
  {
    path: 'my-data',
    component: MyDataComponent,
    data: {
      text: 'Min data',
      title: 'menu.menu_myData',
      id: 'my-data',
      layout: 'landing',
      rank: 'primary',
      parent: '',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'my-data/my-sightings',
    component: MySightingsComponent,
    data: {
      text: 'Mine observasjoner',
      title: 'menu.menu_myData_mySightings',
      id: 'my-sightings',
      layout: 'page',
      rank: 'primary',
      parent: 'my-data',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'my-data/my-statistics',
    component: MyStatisticsComponent,
    data: {
      text: 'Min statistikk',
      title: 'menu.menu_myData_myStatistics',
      id: 'my-statistics',
      layout: 'page',
      rank: 'secondary',
      parent: 'my-data',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'my-data/my-projects',
    component: MyProjectsComponent,
    data: {
      text: 'Mine prosjekter',
      title: 'menu.menu_myData_myProjects',
      id: 'my-projects',
      layout: 'page',
      rank: 'secondary',
      parent: 'my-data',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'my-data/my-locations',
    component: MyLocationsComponent,
    data: {
      text: 'Mine lokaliteter',
      title: 'menu.menu_myData_myLocations',
      id: 'my-locations',
      layout: 'page',
      rank: 'secondary',
      parent: 'my-data',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'my-data/co-observers',
    component: CoObserversComponent,
    data: {
      text: 'Medobservatører',
      title: 'menu.menu_myData__myCoObservers',
      id: 'co-observers',
      layout: 'page',
      rank: 'secondary',
      parent: 'my-data',
      menu: 'mainMenu',
      metaTitle: '',
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
      title: 'menu.menu_about',
      id: 'about',
      layout: 'landing',
      rank: 'primary',
      parent: '',
      menu: 'mainMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'about/:id',
    component: AboutPageComponent,
    data: {
      text: 'About item',
      title: '',
      id: 'about',
      layout: 'text',
      rank: '',
      parent: 'about',
      menu: '',
      metaTitle: '',
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
  //     metaTitle: 'menu_Om artsobservasjoner.no',
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
  //     metaTitle: 'menu_Kvalitetssikring',
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
  //     metaTitle: 'menu_Hvordan du kan bidra',
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
  //     metaTitle: 'menu_Brukervilkår',
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
  //     metaTitle: 'menu_Brukerstøtte',
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
      title: 'menu.menu_account_register',
      id: 'register',
      layout: 'page',
      rank: '',
      parent: 'accountMenu',
      menu: 'accountMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      text: 'Logg inn',
      title: 'menu.menu_account_login',
      id: 'login',
      layout: 'page',
      rank: '',
      parent: 'accountMenu',
      menu: 'accountMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'messages',
    component: MessagesComponent,
    data: {
      text: 'Meldinger',
      title: 'menu.menu_account_messages',
      id: 'messages',
      layout: 'page',
      rank: 'primary',
      parent: 'accountMenu',
      menu: 'accountMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
];

const pressRoutes: Routes = [
  {
    path: 'press',
    component: PressComponent,
    data: {
      text: 'Presse',
      title: 'menu.menu_press',
      id: 'press',
      layout: 'full-width',
      rank: 'secondary',
      parent: '',
      menu: '',
      metaTitle: '',
      metaDescription: '',
      hidden: true
    }
  },
  {
    path: 'press/news',
    component: NewsComponent,
    data: {
      text: 'Aktuelle saker',
      title: 'menu.menu_news',
      id: 'news',
      layout: 'wide',
      rank: 'secondary',
      parent: '',
      menu: '',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'press/news/:id',
    component: NewsItemComponent,
    data: {
      text: 'News item',
      id: 'news',
      layout: 'article',
      rank: '',
      parent: 'news',
      menu: '',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'press/announcements',
    component: AnnouncementsComponent,
    data: {
      text: 'Kunngjøringer',
      title: 'menu.menu_announcements',
      id: 'announcements',
      layout: 'page',
      rank: 'secondary',
      parent: '',
      menu: '',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'press/announcements/:id',
    component: AnnouncementComponent,
    data: {
      text: 'Kunngjøring',
      title: 'menu.menu_announcement',
      id: 'announcement',
      layout: 'article',
      rank: 'secondary',
      parent: '',
      menu: '',
      metaTitle: '',
      metaDescription: '',
      hidden: true
    }
  }
];

const extraRoutes: Routes = [
  {
    path: 'press',
    component: PressComponent,
    data: {
      text: 'Presse',
      title: 'menu.menu_press',
      id: 'press',
      layout: 'full-width',
      rank: '',
      parent: '',
      menu: 'extraMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'sitemap',
    component: SitemapComponent,
    data: {
      text: 'Innholdskart fra A-Å',
      title: 'menu.menu_sitemap',
      id: 'sitemap',
      layout: 'page',
      rank: '',
      parent: '',
      menu: 'extraMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'status-page',
    component: StatusPageComponent,
    data: {
      text: 'Driftsmeldinger',
      title: 'menu.menu_statusPage',
      id: 'statusPage',
      layout: 'page',
      rank: '',
      parent: '',
      menu: 'extraMenu',
      metaTitle: '',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'search',
    component: SearchComponent,
    data: {
      text: 'Søk',
      title: 'menu.menu_search',
      id: 'search',
      layout: 'page',
      rank: '',
      parent: '',
      menu: '',
      metaTitle: '',
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
      layout: 'full-width',
      rank: '',
      parent: '',
      menu: '',
      metaTitle: 'menu_Artsobservasjoner',
      metaDescription: '',
      hidden: false
    }
  },
  {
    path: 'test',
    component: TestComponent,
    data: {
      text: 'Test',
      id: '',
      layout: 'page',
      rank: '',
      parent: '',
      menu: '',
      metaTitle: 'Test',
      metaDescription: '',
      hidden: false
    }
  },
  // {
  //   path: 'search-taxon',
  //   component: SearchTaxonComponent,
  //   data: {
  //     text: 'Søk takson',
  //     id: '',
  //     layout: 'page',
  //     rank: '',
  //     parent: '',
  //     menu: '',
  //     metaTitle: '',
  //     metaDescription: '',
  //     hidden: false
  //   }
  // },
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
      metaTitle: 'menu_Artsobservasjoner',
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
      metaTitle: 'menu_404',
      metaDescription: '',
      hidden: false
    }
  }
];

//const routes: Routes = [...homeRoutes, ...sightingsRoutes, ...statisticsRoutes, ...userStatisticsRoutes, ...aboutRoutes, ...accountRoutes, ...pressRoutes, ...extraRoutes, ...testRoutes, ...wildcardRoutes];
const routes: Routes = [...homeRoutes, ...reportRoutes, ...sightingsRoutes, ...statisticsRoutes, ...userStatisticsRoutes, ...userDataRoutes, ...aboutRoutes, ...accountRoutes, ...pressRoutes, ...extraRoutes, ...testRoutes, ...wildcardRoutes];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
