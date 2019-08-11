import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChannelSettingsComponent } from './channel-settings/channel-settings.component';
import { AppRoutingModule } from './app-routing.module';
import { SflSidebarModule } from 'sfl-shared/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [
        AppComponent,
        ChannelSettingsComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FlexLayoutModule,
        MatListModule,
        SflSidebarModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
