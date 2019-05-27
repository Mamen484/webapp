import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreListComponent } from './store-list/store-list.component';
import { GroupListComponent } from './group-list/group-list.component';
import { InvoicingDetailsComponent } from './store-list/invoicing-details/invoicing-details.component';
import { StoreResolverGuard } from './store-resolver.guard';

const routes: Routes = [
    {path: '', component: StoreListComponent},
    {path: 'groups', component: GroupListComponent},
    {
        path: 'store/:storeId/details', component: InvoicingDetailsComponent, resolve: {
            billingStore: StoreResolverGuard,
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BillingRoutingModule {
}
