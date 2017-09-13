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
import { RegistrationModule } from './registration/registration.module';


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
        RegistrationModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
