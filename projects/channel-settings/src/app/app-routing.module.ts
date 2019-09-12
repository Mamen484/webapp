import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChannelSettingsComponent } from './channel-settings/channel-settings.component';
import { IsAuthorizedGuard } from './login/is-authorized.guard';
import { ChannelResolveGuard } from './channel-settings/channel-resolve.guard';
import { FieldsResolveGuard } from './channel-settings/fields-resolve.guard';

const routes = [
    {
        path: '', component: ChannelSettingsComponent, canActivate: [IsAuthorizedGuard], resolve: {
            channel: ChannelResolveGuard,
            fields: FieldsResolveGuard,
        }
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
