import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { StatisticsComponent } from './components/statistics/statistics.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { LogoComponent } from './layout/logo/logo.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RedListedSpeciesComponent } from './components/statistics/red-listed-species/red-listed-species.component';
import { AlienSpeciesComponent } from './components/statistics/alien-species/alien-species.component';
import { UserStatisticsComponent } from './components/statistics/user-statistics/user-statistics.component';
import { UserListsComponent } from './components/statistics/user-lists/user-lists.component';
import { NoDataSpeciesComponent } from './components/statistics/no-data-species/no-data-species.component';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
import { LanguageSwitcherComponent } from './layout/language-switcher/language-switcher.component';
import { TrimPipe } from './pipes/trim.pipe';
import { DesignComponent } from './misc/design/design.component';
import { CardComponent } from './reusable/card/card.component';
import { ButtonComponent } from './reusable/button/button.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SubNavigationComponent } from './layout/sub-navigation/sub-navigation.component';
import { SightingsComponent } from './components/observations/sightings/sightings.component';
import { MenuComponent } from './layout/menu/menu.component';
import { LoginButtonComponent } from './layout/login-button/login-button.component';
import { ObservationsComponent } from './components/observations/observations.component';
import { SightingComponent } from './components/observations/sighting/sighting.component';
import { ReportComponent } from './components/report/report.component';
import { TeaserComponent } from './reusable/teaser/teaser.component';
import { MapComponent } from './misc/map/map.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageComponent } from './components/messages/message/message.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { MenuDirective } from './directives/menu.directive';
import { ContributeComponent } from './components/about/contribute/contribute.component';
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
import { ChecklistComponent } from './components/report/checklist/checklist.component';
import { ImportObservationsComponent } from './components/report/import-observations/import-observations.component';
import { SurveyProjectComponent } from './components/report/survey-project/survey-project.component';
import { EventProjectComponent } from './components/report/event-project/event-project.component';
import { ExtraNavigationComponent } from './layout/extra-navigation/extra-navigation.component';
import { CategoryRedlistedComponent } from './components/shared/category-redlisted/category-redlisted.component';
import { CategoryAlienComponent } from './components/shared/category-alien/category-alien.component';
import { SubheaderComponent } from './layout/subheader/subheader.component';
import { ClosePaneDirective } from './directives/close-pane.directive';
import { OverviewChild1Component } from './components/statistics/overview/overview-child1/overview-child1.component';
import { OverviewChild2Component } from './components/statistics/overview/overview-child2/overview-child2.component';
import { OverviewChild3Component } from './components/statistics/overview/overview-child3/overview-child3.component';
import { OverviewChild4Component } from './components/statistics/overview/overview-child4/overview-child4.component';
import { OverviewChild6Component } from './components/statistics/overview/overview-child6/overview-child6.component';
import { OverviewChild7Component } from './components/statistics/overview/overview-child7/overview-child7.component';
import { OverviewChild8Component } from './components/statistics/overview/overview-child8/overview-child8.component';
import { OverviewChild9Component } from './components/statistics/overview/overview-child9/overview-child9.component';
import { OverviewChild10Component } from './components/statistics/overview/overview-child10/overview-child10.component';
import { OverviewChild11Component } from './components/statistics/overview/overview-child11/overview-child11.component';
import { OverviewChild12Component } from './components/statistics/overview/overview-child12/overview-child12.component';
import { CloseDropdownDirective } from './directives/close-dropdown.directive';
import { GetDropdownItemDirective } from './directives/get-dropdown-item.directive';
import { ClickElsewhereDirective } from './directives/click-elsewhere.directive';
import { ShortcutsComponent } from './layout/shortcuts/shortcuts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArtsobsNumbersComponent } from './components/statistics/artsobs-numbers/artsobs-numbers.component';
import { NewsComponent } from './components/news/news.component';
import { NewsItemComponent } from './components/news/news-item/news-item.component';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { SightingsMapComponent } from './components/observations/sightings-map/sightings-map.component';
import { AboutPageComponent } from './components/about/about-page/about-page.component';
import { KnowledgeGapComponent } from './components/statistics/knowledge-gap/knowledge-gap.component';
import { AccordionComponent } from './reusable/accordion/accordion.component';
import { AccordionItemComponent } from './reusable/accordion/accordion-item/accordion-item.component';
import { VolumeStatisticsComponent } from './components/statistics/volume-statistics/volume-statistics.component';
import { AddSightingComponent } from './components/report/add-sighting/add-sighting.component';
import { OverviewStatisticsComponent } from './components/statistics/overview-statistics/overview-statistics.component';
import { CoObserversComponent } from './components/my-data/co-observers/co-observers.component';

import localeNor from '@angular/common/locales/nb';
import localeNorExtra from '@angular/common/locales/nb';
import { SimplifiedMenuComponent } from './layout/simplified-menu/simplified-menu.component';
import { AccountComponent } from './components/account/account.component';
import { NumberProxyPipe } from './pipes/number-proxy.pipe';
import { ValidatedDataComponent } from './components/statistics/validated-data/validated-data.component';

// registerLocaleData(localeNor, 'no', localeNorExtra);

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
    RedListedSpeciesComponent,
    AlienSpeciesComponent,
    UserStatisticsComponent,
    UserListsComponent,
    NoDataSpeciesComponent,
    BreadcrumbsComponent,
    TrimPipe,
    LanguageSwitcherComponent,
    DesignComponent,
    CardComponent,
    ButtonComponent,
    LoginComponent,
    RegistrationComponent,
    SubNavigationComponent,
    SightingsComponent,
    SightingComponent,
    MenuComponent,
    LoginButtonComponent,
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
    ChecklistComponent,
    ImportObservationsComponent,
    SurveyProjectComponent,
    EventProjectComponent,
    ExtraNavigationComponent,
    CategoryRedlistedComponent,
    CategoryAlienComponent,
    SubheaderComponent,
    ClickElsewhereDirective,
    ClosePaneDirective,
    CloseDropdownDirective,
    OverviewChild1Component,
    OverviewChild2Component,
    OverviewChild3Component,
    OverviewChild4Component,
    OverviewChild6Component,
    OverviewChild7Component,
    OverviewChild8Component,
    OverviewChild9Component,
    OverviewChild10Component,
    OverviewChild11Component,
    OverviewChild12Component,
    GetDropdownItemDirective,
    ShortcutsComponent,
    DashboardComponent,
    ArtsobsNumbersComponent,
    NewsComponent,
    NewsItemComponent,
    TruncateTextPipe,
    SightingsMapComponent,
    AboutPageComponent,
    KnowledgeGapComponent,
    AccordionComponent,
    AccordionItemComponent,
    VolumeStatisticsComponent,
    AddSightingComponent,
    OverviewStatisticsComponent,
    CoObserversComponent,
    SimplifiedMenuComponent,
    AccountComponent,
    NumberProxyPipe,
    ValidatedDataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }
    ),
    AppRoutingModule
  ],
  providers: [
    //{ provide: LOCALE_ID, useValue: 'no' }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

// AoT (ahead of time) requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}