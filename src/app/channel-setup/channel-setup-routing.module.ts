import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesConfigurationComponent } from './categories-configuration/categories-configuration.component';
import { SetupResolverGuard } from './setup-resolver.guard';
import { UnsavedDataGuard } from './categories-configuration/unsaved-data.guard';

const routes: Routes = [
    {
        path: ':channelId/:feedId', component: CategoriesConfigurationComponent,
        resolve: {
            data: SetupResolverGuard
        },
        canDeactivate: [UnsavedDataGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChannelSetupRoutingModule {
}
