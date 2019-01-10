import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesConfigurationComponent } from './categories-configuration/categories-configuration.component';
import { SetupResolverGuard } from './setup-resolver.guard';

const routes: Routes = [
    {path: ':channelId', component: CategoriesConfigurationComponent, resolve: {
        data: SetupResolverGuard}},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChannelSetupRoutingModule {
}
