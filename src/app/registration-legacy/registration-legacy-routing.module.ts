import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleCallComponent } from './schedule-call/schedule-call.component';
import { PlatformComponent } from './platform/platform.component';

const routes: Routes = [
    {path: 'platform/:channelName', component: PlatformComponent},
    {path: 'schedule-call', component: ScheduleCallComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationLegacyRoutingModule { }
