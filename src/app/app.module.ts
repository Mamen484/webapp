import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BaseModule } from './base/base.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
    declarations: [
        AppComponent,
        StatisticsComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        CoreModule,
        BaseModule,
        SharedModule,
        AppRoutingModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
