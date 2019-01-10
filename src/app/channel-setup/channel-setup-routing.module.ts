import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesConfigurationComponent } from './categories-configuration/categories-configuration.component';
import { ResolveChannelGuard } from './resolve-channel.guard';

const routes: Routes = [
    {path: ':channelId', component: CategoriesConfigurationComponent, resolve: {channel: ResolveChannelGuard}},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChannelSetupRoutingModule {
}
