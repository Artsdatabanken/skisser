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
import { SubnavigationComponent } from './layout/subnavigation/subnavigation.component';
import { LanguageSwitcherComponent } from './layout/language-switcher/language-switcher.component';
import { ContactComponent } from './components/contact/contact.component';
import { TouComponent } from './components/about/tou/tou.component';
import { FaqComponent } from './components/faq/faq.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { ReportComponent } from './components/report/report.component';
import { TrimPipe } from './helpers/trim.pipe';
import { HamburgerComponent } from './layout/hamburger/hamburger.component';

// import {NgDynamicBreadcrumbModule} from "ng-dynamic-breadcrumb";
import { GalleryComponent } from './components/gallery/gallery.component';
import { DesignComponent } from './components/design/design.component';
import { FindingsComponent } from './components/findings/findings.component';
import { EbwComponent } from './components/ebw/ebw.component';
import { CardComponent } from './components/shared/card/card.component';
import { ButtonComponent } from './components/shared/button/button.component';
import { SiteSearchComponent } from './components/shared/site-search/site-search.component';
import { ValidationComponent } from './components/validation/validation.component';

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
    SubnavigationComponent,
    LanguageSwitcherComponent,
    ContactComponent,
    TouComponent,
    FaqComponent,
    DictionaryComponent,
    ReportComponent,
    HamburgerComponent,
    GalleryComponent,
    DesignComponent,
    FindingsComponent,
    EbwComponent,
    CardComponent,
    ButtonComponent,
    SiteSearchComponent,
    ValidationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [NavigationService],
  bootstrap: [AppComponent]
})

export class AppModule { }
