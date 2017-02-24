import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageResearchComponent } from './home-page/home-page-research/home-page-research.component';
import { HomePageBestSellerComponent } from './home-page/home-page-best-seller/home-page-best-seller.component';
import { HomePageKeyNumberComponent } from './home-page/home-page-key-number/home-page-key-number.component';
import { HomePagePlatformCardComponent } from './home-page/home-page-platform-card/home-page-platform-card.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    HomePageComponent,
    HomePageResearchComponent,
    HomePageBestSellerComponent,
    HomePageKeyNumberComponent,
    HomePagePlatformCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
