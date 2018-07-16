import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderDetailsResolveGuard } from '../core/guards/order-details-resolve.guard';
import { TagsManagementComponent } from './tags-management/tags-management.component';

const routes: Routes = [
    {path: '', component: OrdersListComponent},
    {
        path: 'detail/:id',
        component: OrderDetailsComponent,
        resolve: {
            order: OrderDetailsResolveGuard
        },
        data: {showBackButton: ['/orders']}
    },
    {path: 'tags-management', component: TagsManagementComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule {
}