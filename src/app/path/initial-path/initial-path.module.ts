import { NgModule } from '@angular/core';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { RouterModule } from '@angular/router';
import { PlatformComponent } from './platform/platform.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CreatePasswordService } from './create-password/create-password.service';
import { ScheduleCallComponent } from './schedule-call/schedule-call.component';
import { SharedModule } from '../../shared/shared.module';
import { MenuModule } from '../../menu/menu.module';
import { ShopifyGuard } from '../../core/guards/shopify.guard';

const initialPathRoutes = [
    {
        path: 'shopify/authentify', canActivate: [ShopifyGuard], component: CreatePasswordComponent
    },
    {path: 'path/initial', component: CreatePasswordComponent},
    {path: 'path/initial/create-account', component: CreateAccountComponent},
    {path: 'path/initial/welcome', component: WelcomeComponent},
    {path: 'path/initial/platform/:channelName', component: PlatformComponent},
    {path: 'path/initial/schedule-call', component: ScheduleCallComponent},
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(initialPathRoutes),
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
export class InitialPathModule {
}
