import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopifyGuard } from '../core/guards/shopify.guard';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PlatformComponent } from './platform/platform.component';
import { ScheduleCallComponent } from './schedule-call/schedule-call.component';

const routes: Routes = [
    {
        path: 'shopify/authentify', canActivate: [ShopifyGuard], component: CreatePasswordComponent
    },
    {path: 'register', component: CreatePasswordComponent},
    {path: 'register/create-account', component: CreateAccountComponent},
    {path: 'register/welcome', component: WelcomeComponent},
    {path: 'register/platform/:channelName', component: PlatformComponent},
    {path: 'register/schedule-call', component: ScheduleCallComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
