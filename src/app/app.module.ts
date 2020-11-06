import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { LogoComponent } from './layout/logo/logo.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PageComponent } from './components/shared/page/page.component';
import { OverviewNumbersComponent } from './components/statistics/overview-numbers/overview-numbers.component';
import { QualityAssuredDataComponent } from './components/statistics/quality-assured-data/quality-assured-data.component';
import { RedListedSpeciesComponent } from './components/statistics/red-listed-species/red-listed-species.component';
import { AlienSpeciesComponent } from './components/statistics/alien-species/alien-species.component';
import { UserStatisticsComponent } from './components/statistics/user-statistics/user-statistics.component';
import { UserListsComponent } from './components/statistics/user-lists/user-lists.component';
import { NoDataSpeciesComponent } from './components/statistics/no-data-species/no-data-species.component';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
import { TranslationPipe } from './helpers/translation.pipe';
import { NavigationService } from './services/navigation.service';
import { LanguageSwitcherComponent } from './layout/language-switcher/language-switcher.component';
import { TrimPipe } from './helpers/trim.pipe';
import { DesignComponent } from './components/design/design.component';
import { CardComponent } from './components/shared/card/card.component';
import { ButtonComponent } from './components/shared/button/button.component';
import { SiteSearchComponent } from './components/shared/site-search/site-search.component';
import { DateComponent } from './components/shared/date/date.component';
import { PageTitleComponent } from './components/shared/page-title/page-title.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TopNavigationComponent } from './layout/top-navigation/top-navigation.component';
import { SubNavigationComponent } from './layout/sub-navigation/sub-navigation.component';
import { SightingsComponent } from './components/observations/sightings/sightings.component';
import { FilterComponent } from './components/shared/filter/filter.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { CreateProjectComponent } from './components/projects/create-project/create-project.component';
//import { CloseMenuDirective, MenuComponent } from './layout/menu/menu.component';
import { MenuComponent } from './layout/menu/menu.component';
import { LoginButtonComponent } from './layout/login-button/login-button.component';
import { ObservationsComponent } from './components/observations/observations.component';
import { SightingComponent } from './components/observations/sighting/sighting.component';
import { ReportComponent } from './components/report/report.component';
import { ReportObservationComponent } from './components/report/report-observation/report-observation.component';
import { TeaserComponent } from './components/shared/teaser/teaser.component';
import { MapComponent } from './components/map/map.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageComponent } from './components/messages/message/message.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { MenuDirective } from './helpers/menu.directive';
import { ContributeComponent } from './components/about/contribute/contribute.component';

@NgModule({
  declarations: [
    AppComponent,
    StatisticsComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    LogoComponent,
    PageNotFoundComponent,
    HomeComponent,
    AboutComponent,
    PageComponent,
    OverviewNumbersComponent,
    QualityAssuredDataComponent,
    RedListedSpeciesComponent,
    AlienSpeciesComponent,
    UserStatisticsComponent,
    UserListsComponent,
    NoDataSpeciesComponent,
    BreadcrumbsComponent,
    TranslationPipe,
    TrimPipe,
    LanguageSwitcherComponent,
    DesignComponent,
    CardComponent,
    ButtonComponent,
    SiteSearchComponent,
    DateComponent,
    PageTitleComponent,
    LoginComponent,
    DashboardComponent,
    RegistrationComponent,
    TopNavigationComponent,
    SubNavigationComponent,
    SightingsComponent,
    SightingComponent,
    FilterComponent,
    ProjectsComponent,
    ProjectComponent,
    CreateProjectComponent,
    MenuComponent,
    LoginButtonComponent,
    //CloseMenuDirective,
    ObservationsComponent,
    ReportComponent,
    ReportObservationComponent,
    TeaserComponent,
    MapComponent,
    MessagesComponent,
    MessageComponent,
    SitemapComponent,
    MenuDirective,
    ContributeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [NavigationService],
  bootstrap: [AppComponent]
})

export class AppModule { }
