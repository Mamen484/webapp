import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationLegacyRoutingModule } from './registration-legacy-routing.module';
import { ScheduleCallComponent } from './schedule-call/schedule-call.component';
import { PlatformComponent } from './platform/platform.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        RegistrationLegacyRoutingModule
    ],
    declarations: [
        PlatformComponent,
        WelcomeComponent,
        ScheduleCallComponent,
    ]
})
export class RegistrationLegacyModule {
}
