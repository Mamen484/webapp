import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePasswordComponent } from "./create-password/create-password.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PlatformComponent } from './platform/platform.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CreatePasswordService } from "./create-password/create-password.service";
import { CoreModule } from "../../core/core.module";
import { ScheduleCallComponent } from './schedule-call/schedule-call.component';

const initialPathRoutes = [
  {path: 'path/initial', component: CreatePasswordComponent},
  {path: 'path/initial/create-account', component: CreateAccountComponent},
  {path: 'path/initial/welcome', component: WelcomeComponent},
  {path: 'path/initial/platform/:channelName', component: PlatformComponent},
  {path: 'path/initial/schedule-call', component: ScheduleCallComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(initialPathRoutes),
    FormsModule,
    CoreModule
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
export class InitialPathModule { }
