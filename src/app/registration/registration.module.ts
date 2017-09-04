import { NgModule } from '@angular/core';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { RouterModule } from '@angular/router';
import { PlatformComponent } from './platform/platform.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CreatePasswordService } from './create-password/create-password.service';
import { ScheduleCallComponent } from './schedule-call/schedule-call.component';
import { SharedModule } from '../shared/shared.module';
import { MenuModule } from '../menu/menu.module';
import { RegistrationRoutingModule } from './registration-routing.module';

@NgModule({
    imports: [
        SharedModule,
        RegistrationRoutingModule,
        MenuModule,
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        CreatePasswordService
    ],
    declarations: [
        CreatePasswordComponent,
        PlatformComponent,
        WelcomeComponent,
        CreateAccountComponent,
        ScheduleCallComponent,
    ]
})
export class RegistrationModule {
}
