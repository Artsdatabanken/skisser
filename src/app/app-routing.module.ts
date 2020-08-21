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
import { TouComponent } from './components/tou/tou.component';
import { FaqComponent } from './components/faq/faq.component';
import { ReportComponent } from './components/report/report.component';
import { NoDataSpeciesComponent } from './components/statistics/no-data-species/no-data-species.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Forsiden',
      name: 'home',
      breadcrumb: [
        {
          label: 'Forsiden',
          url: ''
        }
      ]
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Forsiden',
      name: 'home',
      breadcrumb: [
        {
          label: 'Forsiden',
          url: ''
        }
      ]
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'Om Artsobservasjoner',
      name: 'about',
      breadcrumb: [
        {
          label: 'Om Artsobservasjoner',
          url: 'about'
        }
      ]
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      title: 'Kontakt',
      name: 'contact',
      breadcrumb: [
        {
          label: 'Kontakt',
          url: 'contact'
        }
      ]
    }
  },
  {
    path: 'tou',
    component: TouComponent,
    data: {
      title: 'Brukervilkår',
      name: 'tou',
      breadcrumb: [
        {
          label: 'Brukervilkår',
          url: 'tou'
        }
      ]
    }
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: {
      title: 'Ofte stilte spørsmål',
      name: 'faq',
      breadcrumb: [
        {
          label: 'Ofte stilte spørsmål',
          url: 'faq'
        }
      ]
    }
  },
  {
    path: 'dictionary',
    component: FaqComponent,
    data: {
      title: 'Ordliste',
      name: 'dictionary',
      breadcrumb: [
        {
          label: 'Ordliste',
          url: 'dictionary'
        }
      ]
    }
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    data: {
      title: 'Statistikk',
      name: 'statistics',
      breadcrumb: [
        {
          label: 'Statistikk',
          url: 'statistics'
        }
      ]
    },
    children: [
      {
        path: 'overview-numbers', // child route path
        component: OverviewNumbersComponent, 
        data: {
          title: 'Oversiktstall',
          name: 'overview-numbers'
        }
      },
      {
        path: 'quality-assured-data',
        component: QualityAssuredDataComponent, 
        data: {
          title: 'Kvalitetssikrede data',
          name: 'quality-assured-data'
        }
      },
      {
        path: 'red-listed-species',
        component: RedListedSpeciesComponent,  
        data: {
          title: 'Rødlistede arter',
          name: 'red-listed-species'
        }
      },
      {
        path: 'alien-species',
        component: AlienSpeciesComponent, 
        data: {
          title: 'Fremmede arter',
          name: 'alien-species'
        }
      },
      {
        path: 'no-data-species',
        component: NoDataSpeciesComponent, 
        data: {
          title: 'Arter uten nok data',
          name: 'no-data-species'
        }
      },
      {
        path: 'user-statistics',
        component: UserStatisticsComponent, 
        data: {
          title: 'Brukerstatistikk',
          name: 'user-statistics'
        }
      },
      {
        path: 'user-lists',
        component: UserListsComponent, 
        data: {
          title: 'Mine lister',
          name: 'user-lists'
        }
      },
    ],
  },

  // {
  //   path: 'statistics/overview-numbers', 
  //   component: OverviewNumbersComponent, 
  //   data: {
  //     title: 'Oversiktstall',
  //     name: 'overview-numbers',
  //     breadcrumb: [
  //       {
  //         label: 'Oversiktstall',
  //         url: 'statistics/overview-numbers'
  //       }
  //     ]
  //   }
  // },
  // {
  //   path: 'statistics/quality-assured-data',
  //   component: QualityAssuredDataComponent, 
  //   data: {
  //     title: 'Kvalitetssikrede data',
  //     name: 'quality-assured-data',
  //     breadcrumb: [
  //       {
  //         label: 'Kvalitetssikrede data',
  //         url: 'statistics/quality-assured-data'
  //       }
  //     ]
  //   }
  // },
  // {
  //   path: 'statistics/red-listed-species',
  //   component: RedListedSpeciesComponent,  
  //   data: {
  //     title: 'Rødlistede arter',
  //     name: 'red-listed-species',
  //     breadcrumb: [
  //       {
  //         label: 'Rødlistede arter',
  //         url: 'statistics/red-listed-species'
  //       }
  //     ]
  //   }
  // },
  // {
  //   path: 'statistics/alien-species',
  //   component: AlienSpeciesComponent, 
  //   data: {
  //     title: 'Fremmede arter',
  //     name: 'alien-species',
  //     breadcrumb: [
  //       {
  //         label: 'Fremmede arter',
  //         url: 'statistics/alien-species'
  //       }
  //     ]
  //   }
  // },
  // {
  //   path: 'statistics/user-statistics',
  //   component: UserStatisticsComponent, 
  //   data: {
  //     title: 'Brukerstatistikk',
  //     name: 'user-statistics',
  //     breadcrumb: [
  //       {
  //         label: 'Brukerstatistikk',
  //         url: 'statistics/user-statistics'
  //       }
  //     ]
  //   }
  // },
  // {
  //   path: 'statistics/user-lists',
  //   component: UserListsComponent, 
  //   data: {
  //     title: 'Mine lister',
  //     name: 'user-lists',
  //     breadcrumb: [
  //       {
  //         label: 'Mine lister',
  //         url: 'statistics/user-lists'
  //       }
  //     ]
  //   }
  // },
  {
    path: 'report',
    component: ReportComponent,
    data: {
      title: 'Rapportere',
      name: 'report',
      breadcrumb: [
        {
          label: 'Rapportere',
          url: 'report'
        }
      ]
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: 'Not found',
      name: 'notfound',
      breadcrumb: [
        {
          label: '404',
          url: '**'
        }
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
