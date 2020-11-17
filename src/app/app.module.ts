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
import { RegistrationComponent } from './components/registration/registration.component';
import { TopNavigationComponent, ClickElsewhereDirective, DetectClickDirective } from './layout/top-navigation/top-navigation.component';
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
import { TeaserComponent } from './components/shared/teaser/teaser.component';
import { MapComponent } from './components/map/map.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageComponent } from './components/messages/message/message.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { MenuDirective } from './helpers/menu.directive';
import { ContributeComponent } from './components/about/contribute/contribute.component';
// import { ArtsObsComponent } from './components/about/artsobs/artsobs.component';
import { ArtsObsComponent } from './components/about/artsobs/artsobs.component';
import { QualityAssuranceComponent } from './components/about/quality-assurance/quality-assurance.component';
import { TosComponent } from './components/about/tos/tos.component';
import { SupportComponent } from './components/about/support/support.component';
import { LatestNewsComponent } from './components/about/latest-news/latest-news.component';
import { MyDataComponent } from './components/my-data/my-data.component';
import { MyObservationsComponent } from './components/my-data/my-observations/my-observations.component';
import { MyProjectsComponent } from './components/my-data/my-projects/my-projects.component';
import { MyLocationsComponent } from './components/my-data/my-locations/my-locations.component';
import { MyObserversComponent } from './components/my-data/my-observers/my-observers.component';
import { MyStatisticsComponent } from './components/my-data/my-statistics/my-statistics.component';
import { SpeciesWithNoDataComponent } from './components/statistics/species-with-no-data/species-with-no-data.component';
import { AddObservationComponent } from './components/report/add-observation/add-observation.component';
import { ChecklistComponent } from './components/report/checklist/checklist.component';
import { ImportObservationsComponent } from './components/report/import-observations/import-observations.component';
import { SurveyProjectComponent } from './components/report/survey-project/survey-project.component';
import { EventProjectComponent } from './components/report/event-project/event-project.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { FellowObserversComponent } from './components/my-data/fellow-observers/fellow-observers.component';
import { ExtraNavigationComponent } from './layout/extra-navigation/extra-navigation.component';
import { CategoryRedlistedComponent } from './components/shared/non-dummy/category-redlisted/category-redlisted.component';
import { CategoryAlienComponent } from './components/shared/non-dummy/category-alien/category-alien.component';
import { SubheaderComponent } from './layout/subheader/subheader.component';
import { SessionComponent } from './components/session/session.component';

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
    TeaserComponent,
    MapComponent,
    MessagesComponent,
    MessageComponent,
    SitemapComponent,
    MenuDirective,
    ContributeComponent,
    ArtsObsComponent,
    QualityAssuranceComponent,
    TosComponent,
    SupportComponent,
    LatestNewsComponent,
    MyDataComponent,
    MyObservationsComponent,
    MyProjectsComponent,
    MyLocationsComponent,
    MyObserversComponent,
    MyStatisticsComponent,
    SpeciesWithNoDataComponent,
    AddObservationComponent,
    ChecklistComponent,
    ImportObservationsComponent,
    SurveyProjectComponent,
    EventProjectComponent,
    ProfileComponent,
    FellowObserversComponent,
    ExtraNavigationComponent,
    CategoryRedlistedComponent,
    CategoryAlienComponent,
    SubheaderComponent,
    SessionComponent,
    ClickElsewhereDirective,
    DetectClickDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [NavigationService],
  bootstrap: [AppComponent]
})

export class AppModule { }
