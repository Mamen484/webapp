import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { HomepageModule } from "./home-page/homepage.module";
import { PathModule } from "./path/path.module";
import { RouterModule } from "@angular/router";

import { MaterialModule } from '@angular/material';
import 'hammerjs';

const appRoutes = [];

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
    PathModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
