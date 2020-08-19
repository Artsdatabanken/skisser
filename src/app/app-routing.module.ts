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
import { NoDataSpeciesComponent } from './components/statistics/no-data-species/no-data-species.component';
import { ContactComponent } from './components/contact/contact.component';
import { TouComponent } from './components/tou/tou.component';
import { FaqComponent } from './components/faq/faq.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Forsiden',
      name: 'home'
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Forsiden',
      name: 'home'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'Om',
      name: 'about'
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      title: 'Kontakt',
      name: 'contact'
    }
  },
  {
    path: 'tou',
    component: TouComponent,
    data: {
      title: 'Brukervilkår',
      name: 'tou'
    }
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: {
      title: 'Ofte stilte spørsmål',
      name: 'faq'
    }
  },
  {
    path: 'dictionary',
    component: FaqComponent,
    data: {
      title: 'Ordliste',
      name: 'dictionary'
    }
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    data: {
      title: 'Statistikk',
      name: 'statistics'
    },
    // children: [
    //   {
    //     path: 'overview-numbers', // child route path
    //     component: OverviewNumbersComponent, // child route component that the router renders 
    //     data: {
    //       title: 'Oversiktstall',
    //       name: 'overview-numbers'
    //     }
    //   },
    //   {
    //     path: 'quality-assured-data',
    //     component: QualityAssuredDataComponent, // another child route component that the router renders
    //     data: {
    //       title: 'Kvalitetssikrede data',
    //       name: 'quality-assured-data'
    //     }
    //   },
    //   {
    //     path: 'red-listed-species',
    //     component: RedListedSpeciesComponent, // another child route component that the router renders 
    //     data: {
    //       title: 'Rødlistede arter',
    //       name: 'red-listed-species'
    //     }
    //   },
    //   {
    //     path: 'alien-species',
    //     component: AlienSpeciesComponent, // another child route component that the router renders
    //     data: {
    //       title: 'Fremmede arter',
    //       name: 'alien-species'
    //     }
    //   },
    //   {
    //     path: 'no-data-species',
    //     component: NoDataSpeciesComponent, // another child route component that the router renders
    //     data: {
    //       title: 'Arter uten nok data',
    //       name: 'no-data-species'
    //     }
    //   },
    //   {
    //     path: 'user-statistics',
    //     component: UserStatisticsComponent, // another child route component that the router renders
    //     data: {
    //       title: 'Brukerstatistikk',
    //       name: 'user-statistics'
    //     }
    //   },
    //   {
    //     path: 'user-lists',
    //     component: UserListsComponent, // another child route component that the router renders
    //     data: {
    //       title: 'Mine lister',
    //       name: 'user-lists'
    //     }
    //   },
    // ],
  },

  {
    path: 'statistics/overview-numbers', // child route path
    component: OverviewNumbersComponent, // child route component that the router renders 
    data: {
      title: 'Oversiktstall',
      name: 'overview-numbers'
    }
  },
  {
    path: 'statistics/quality-assured-data',
    component: QualityAssuredDataComponent, // another child route component that the router renders
    data: {
      title: 'Kvalitetssikrede data',
      name: 'quality-assured-data'
    }
  },
  {
    path: 'statistics/red-listed-species',
    component: RedListedSpeciesComponent, // another child route component that the router renders 
    data: {
      title: 'Rødlistede arter',
      name: 'red-listed-species'
    }
  },
  {
    path: 'statistics/alien-species',
    component: AlienSpeciesComponent, // another child route component that the router renders
    data: {
      title: 'Fremmede arter',
      name: 'alien-species'
    }
  },
  {
    path: 'statistics/user-statistics',
    component: UserStatisticsComponent, // another child route component that the router renders
    data: {
      title: 'Brukerstatistikk',
      name: 'user-statistics'
    }
  },
  {
    path: 'statistics/user-lists',
    component: UserListsComponent, // another child route component that the router renders
    data: {
      title: 'Mine lister',
      name: 'user-lists'
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: 'Not found',
      name: 'notfound'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
