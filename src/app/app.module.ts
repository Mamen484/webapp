import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { HomepageModule } from "./homepage/homepage.module";
import { PathModule } from "./path/path.module";
import { RouterModule } from "@angular/router";

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
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
