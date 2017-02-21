import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BestSellerComponent } from './home-page/best-seller/best-seller.component';
import { KeyNumberComponent } from './home-page/key-number/key-number.component';
import { ResearchComponent } from './home-page/research/research.component';
import { PlatformCardComponent } from './home-page/platform-card/platform-card.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    HomePageComponent,
    BestSellerComponent,
    KeyNumberComponent,
    ResearchComponent,
    PlatformCardComponent
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
