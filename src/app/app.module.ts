import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { StatisticsComponent } from './components/statistics/statistics.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { LogoComponent } from './layout/logo/logo.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
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
import { DateComponent } from './components/shared/date/date.component';
import { PageTitleComponent } from './components/shared/page-title/page-title.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SubNavigationComponent } from './layout/sub-navigation/sub-navigation.component';
import { SightingsComponent } from './components/observations/sightings/sightings.component';
import { FilterComponent } from './components/shared/filter/filter.component';
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
import { FellowObserversComponent } from './components/my-data/fellow-observers/fellow-observers.component';
import { ExtraNavigationComponent } from './layout/extra-navigation/extra-navigation.component';
import { CategoryRedlistedComponent } from './components/shared/non-dummy/category-redlisted/category-redlisted.component';
import { CategoryAlienComponent } from './components/shared/non-dummy/category-alien/category-alien.component';
import { SubheaderComponent } from './layout/subheader/subheader.component';
import { SessionComponent } from './components/session/session.component';
import { ClosePaneDirective } from './helpers/close-pane.directive';
import { OverviewChild1Component } from './components/statistics/overview/overview-child1/overview-child1.component';
import { OverviewChild2Component } from './components/statistics/overview/overview-child2/overview-child2.component';
import { OverviewChild3Component } from './components/statistics/overview/overview-child3/overview-child3.component';
import { OverviewChild4Component } from './components/statistics/overview/overview-child4/overview-child4.component';
import { OverviewChild5Component } from './components/statistics/overview/overview-child5/overview-child5.component';
import { OverviewChild6Component } from './components/statistics/overview/overview-child6/overview-child6.component';
import { OverviewChild7Component } from './components/statistics/overview/overview-child7/overview-child7.component';
import { OverviewChild8Component } from './components/statistics/overview/overview-child8/overview-child8.component';
import { OverviewChild9Component } from './components/statistics/overview/overview-child9/overview-child9.component';
import { OverviewChild10Component } from './components/statistics/overview/overview-child10/overview-child10.component';
import { OverviewChild11Component } from './components/statistics/overview/overview-child11/overview-child11.component';
import { OverviewChild12Component } from './components/statistics/overview/overview-child12/overview-child12.component';
import { CloseDropdownDirective } from './helpers/close-dropdown.directive';
import { GetDropdownItemDirective } from './helpers/get-dropdown-item.directive';
import { ClickElsewhereDirective } from './helpers/click-elsewhere.directive';
import { ShortcutsComponent } from './layout/shortcuts/shortcuts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArtsobsNumbersComponent } from './components/statistics/artsobs-numbers/artsobs-numbers.component';
import { NewsComponent } from './components/news/news.component';
import { NewsItemComponent } from './components/news/news-item/news-item.component';
import { TruncateTextPipe } from './helpers/truncate-text.pipe';
import { OverviewStatsComponent } from './components/statistics/overview-stats/overview-stats.component';
import { OverviewStatsItemComponent } from './components/statistics/overview-stats/overview-stats-item/overview-stats-item.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SightingsMapComponent } from './components/observations/sightings-map/sightings-map.component';
import { AboutPageComponent } from './components/about/about-page/about-page.component';
import { KnowledgeGapComponent } from './components/statistics/knowledge-gap/knowledge-gap.component';
import { RefreshPageDirective } from './helpers/refresh-page.directive';
import { NavigateToPageDirective } from './helpers/navigate-to-page.directive';
import { AccordionComponent } from './components/shared/accordion/accordion.component';
import { AccordionItemComponent } from './components/shared/accordion-item/accordion-item.component';

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
    DateComponent,
    PageTitleComponent,
    LoginComponent,
    RegistrationComponent,
    SubNavigationComponent,
    SightingsComponent,
    SightingComponent,
    FilterComponent,
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
    SpeciesWithNoDataComponent,
    AddObservationComponent,
    ChecklistComponent,
    ImportObservationsComponent,
    SurveyProjectComponent,
    EventProjectComponent,
    FellowObserversComponent,
    ExtraNavigationComponent,
    CategoryRedlistedComponent,
    CategoryAlienComponent,
    SubheaderComponent,
    SessionComponent,
    ClickElsewhereDirective,
    ClosePaneDirective,
    CloseDropdownDirective,
    OverviewChild1Component,
    OverviewChild2Component,
    OverviewChild3Component,
    OverviewChild4Component,
    OverviewChild5Component,
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
    OverviewStatsComponent,
    OverviewStatsItemComponent,
    UserProfileComponent,
    SightingsMapComponent,
    AboutPageComponent,
    KnowledgeGapComponent,
    RefreshPageDirective,
    NavigateToPageDirective,
    AccordionComponent,
    AccordionItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [NavigationService],
  bootstrap: [AppComponent]
})

export class AppModule { }
