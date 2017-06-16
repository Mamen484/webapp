import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { HomepageModule } from "./homepage/homepage.module";
import { PathModule } from "./path/path.module";
import { ShopifyModule } from "./shopify/shopify.module";

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
    ShopifyModule,
    PathModule,
    RouterModule.forRoot(appRoutes),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
