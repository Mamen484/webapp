import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BaseModule } from './base/base.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { StatisticsModule } from './statistics/statistics.module';
import { LoginModule } from './login/login.module';
import { InitialPathModule } from './path/initial-path/initial-path.module';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        CoreModule,
        BaseModule,
        SharedModule,
        StatisticsModule,
        AppRoutingModule,
        LoginModule,
        InitialPathModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
