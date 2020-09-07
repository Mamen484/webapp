import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedSetupComponent } from './feed-setup/feed-setup.component';
import { SetupResolverGuard } from './setup-resolver.guard';
import { UnsavedDataGuard } from 'sfl-tools/unsaved-data-guard';
import { ProductSetupComponent } from './product-setup/product-setup.component';
import { ChannelsRouteGuard } from '../core/guards/channels-route.guard';

const routes: Routes = [
    {
        path: ':feedId/setup', children: [
            {path: '', component: FeedSetupComponent, canDeactivate: [UnsavedDataGuard]},
            {path: 'products', component: ProductSetupComponent, canDeactivate: [UnsavedDataGuard]},
        ],
        canActivate: [ChannelsRouteGuard],
        resolve: {data: SetupResolverGuard},
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SetupRoutingModule {
}
