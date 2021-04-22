import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe, registerLocaleData } from '@angular/common';
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
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
import { DesignComponent } from './misc/design/design.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SubNavigationComponent } from './layout/sub-navigation/sub-navigation.component';
import { MenuComponent } from './layout/menu/menu.component';
import { LoginButtonComponent } from './layout/login-button/login-button.component';
import { SightingComponent } from './components/sightings-data/sighting/sighting.component';
import { ReportComponent } from './components/report/report.component';
import { MapComponent } from './misc/map/map.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageComponent } from './components/messages/message/message.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { MenuDirective } from './directives/menu.directive';
import { MyDataComponent } from './components/my-data/my-data.component';
import { MyProjectsComponent } from './components/my-data/my-projects/my-projects.component';
import { MyLocationsComponent } from './components/my-data/my-locations/my-locations.component';
import { MyObserversComponent } from './components/my-data/my-observers/my-observers.component';
import { MyStatisticsComponent } from './components/my-data/my-statistics/my-statistics.component';
import { ChecklistComponent } from './components/report/checklist/checklist.component';
import { SurveyProjectComponent } from './components/report/survey-project/survey-project.component';
import { EventProjectComponent } from './components/report/event-project/event-project.component';
import { ExtraNavigationComponent } from './layout/extra-navigation/extra-navigation.component';
import { SubheaderComponent } from './layout/subheader/subheader.component';
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
import { GetDropdownItemDirective } from './directives/get-dropdown-item.directive';
import { ClickElsewhereDirective } from './directives/click-elsewhere.directive';
import { ShortcutsComponent } from './layout/shortcuts/shortcuts.component';
import { ArtsobsNumbersComponent } from './components/statistics/artsobs-numbers/artsobs-numbers.component';
import { NewsComponent } from './components/news/news.component';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { AboutPageComponent } from './components/about/about-page/about-page.component';
import { KnowledgeGapComponent } from './components/statistics/knowledge-gap/knowledge-gap.component';
import { AddSightingComponent } from './components/report/add-sighting/add-sighting.component';
import { OverviewStatisticsComponent } from './components/statistics/overview-statistics/overview-statistics.component';
import { CoObserversComponent } from './components/my-data/co-observers/co-observers.component';

import localeNor from '@angular/common/locales/nb';
import localeNorExtra from '@angular/common/locales/nb';
import { SimplifiedMenuComponent } from './layout/simplified-menu/simplified-menu.component';
import { AccountComponent } from './components/account/account.component';
import { ValidatedDataComponent } from './components/statistics/validated-data/validated-data.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { NewKeyValuePipe } from './pipes/new-key-value.pipe';
import { GraphComponent } from './components/graph/graph.component';
import { OverviewChild5Component } from './components/statistics/overview/overview-child5/overview-child5.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { StatusPageComponent } from './components/status-page/status-page.component';
import { LocalizedDatePipe } from './pipes/localized-date.pipe';
import { StripHtmlPipe } from './pipes/strip-html.pipe';
import { PressComponent } from './components/press/press.component';
import { FormatNumberPipe } from './pipes/format-number.pipe';
import { SearchComponent } from './components/search/search.component';
import { TopObserversComponent } from './components/statistics/user-statistics/top-observers/top-observers.component';
import { AreaLeagueComponent } from './components/statistics/user-statistics/area-league/area-league.component';
import { ImportSightingsComponent } from './components/report/import-sightings/import-sightings.component';
import { MySightingsComponent } from './components/my-data/my-sightings/my-sightings.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { SightingsDataComponent } from './components/sightings-data/sightings-data.component';
import { SightingsComponent } from './components/sightings-data/sightings/sightings.component';
import { AssessmentCategoryComponent } from './shared-and-reusable/smart-components/assessment-category/assessment-category.component';
import { AccordionItemComponent } from './shared-and-reusable/dummy-components/accordion/accordion-item/accordion-item.component';
import { AccordionComponent } from './shared-and-reusable/dummy-components/accordion/accordion.component';
import { ButtonComponent } from './shared-and-reusable/dummy-components/button/button.component';
import { CardComponent } from './shared-and-reusable/dummy-components/card/card.component';
import { DropdownComponent, CloseDropdownDirective } from './shared-and-reusable/dummy-components/dropdown/dropdown.component';
import { FootnoteComponent } from './shared-and-reusable/dummy-components/footnotes/footnote/footnote.component';
import { FootnotesComponent } from './shared-and-reusable/dummy-components/footnotes/footnotes.component';
import { IconBadgeComponent } from './shared-and-reusable/dummy-components/icon-badge/icon-badge.component';
import { IntersectionComponent } from './shared-and-reusable/dummy-components/intersection/intersection.component';
import { TableComponent } from './shared-and-reusable/dummy-components/table/table.component';
import { TeaserComponent } from './shared-and-reusable/dummy-components/teaser/teaser.component';
import { ErrorResponseComponent } from './shared-and-reusable/smart-components/error-response/error-response.component';
import { LanguageSwitcherComponent } from './shared-and-reusable/smart-components/language-switcher/language-switcher.component';
import { SpeciesGroupComponent } from './shared-and-reusable/smart-components/species-group/species-group.component';
import { TotalCountStatisticsComponent } from './shared-and-reusable/smart-components/total-count-statistics/total-count-statistics.component';
import { ValidationStatusListComponent } from './shared-and-reusable/smart-components/validation-status-list/validation-status-list.component';
import { ValidationStatusComponent } from './shared-and-reusable/smart-components/validation-status/validation-status.component';
import { AssessmentCategoriesComponent } from './shared-and-reusable/smart-components/assessment-categories/assessment-categories.component';
import { HttpResponseInterceptor } from './interceptors/http-response.interceptor';

registerLocaleData(localeNor, 'no', localeNorExtra);

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
    BreadcrumbsComponent,
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
    ReportComponent,
    TeaserComponent,
    MapComponent,
    MessagesComponent,
    MessageComponent,
    SitemapComponent,
    MenuDirective,
    MyDataComponent,
    MyProjectsComponent,
    MyLocationsComponent,
    MyObserversComponent,
    MyStatisticsComponent,
    ChecklistComponent,
    SurveyProjectComponent,
    EventProjectComponent,
    ExtraNavigationComponent,
    SubheaderComponent,
    ClickElsewhereDirective,
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
    ArtsobsNumbersComponent,
    NewsComponent,
    NewsItemComponent,
    TruncateTextPipe,
    AboutPageComponent,
    KnowledgeGapComponent,
    AccordionComponent,
    AccordionItemComponent,
    AddSightingComponent,
    OverviewStatisticsComponent,
    CoObserversComponent,
    SimplifiedMenuComponent,
    AccountComponent,
    ValidatedDataComponent,
    TotalCountStatisticsComponent,
    AlertsComponent,
    AssessmentCategoryComponent,
    TableComponent,
    NewKeyValuePipe,
    GraphComponent,
    OverviewChild5Component,
    IntersectionComponent,
    ErrorResponseComponent,
    StatusPageComponent,
    DropdownComponent,
    AnnouncementsComponent,
    AnnouncementComponent,
    CloseDropdownDirective,
    LocalizedDatePipe,
    StripHtmlPipe,
    PressComponent,
    ValidationStatusComponent,
    IconBadgeComponent,
    FormatNumberPipe,
    ValidationStatusListComponent,
    SpeciesGroupComponent,
    FootnotesComponent,
    FootnoteComponent,
    SearchComponent,
    TopObserversComponent,
    AreaLeagueComponent,
    ImportSightingsComponent,
    MySightingsComponent,
    SightingsDataComponent,
    AssessmentCategoriesComponent
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
    { provide: DatePipe },
    // { provide: LOCALE_ID, useValue: 'no' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

// AoT (ahead of time) requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}