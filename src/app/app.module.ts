import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import {HomepageModule} from "./home-page/homepage.module";

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HomepageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
