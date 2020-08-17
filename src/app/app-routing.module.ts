import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

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
    path: 'statistics',
    component: StatisticsComponent,
    data: {
      title: 'Statistikk',
      name: 'statistics'
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
