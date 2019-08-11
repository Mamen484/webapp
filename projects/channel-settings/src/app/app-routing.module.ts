import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChannelSettingsComponent } from './channel-settings/channel-settings.component';

const routes = [
    {path: '', component: ChannelSettingsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}