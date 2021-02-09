import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelsListComponent } from './channels-list/channels-list.component';
import { ConnectedChannelsComponent } from './channels-list/connected-channels/connected-channels.component';
import { AllChannelsComponent } from './channels-list/all-channels/all-channels.component';
import { ConnectedChannelsGuard } from './channels-list/connected-channels/connected-channels.guard';
import { AllChannelsGuard } from './channels-list/all-channels/all-channels.guard';

const routes: Routes = [
    {
        path: '', component: ChannelsListComponent, children: [
            {path: '', redirectTo: 'connected', pathMatch: 'full'},
            {path: 'connected', component: ConnectedChannelsComponent, canActivate: [ConnectedChannelsGuard]},
            {path: 'all', component: AllChannelsComponent, canActivate: [AllChannelsGuard]},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChannelsRoutingModule {
}
