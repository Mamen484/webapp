import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderDetailsResolveGuard } from '../core/guards/order-details-resolve.guard';
import { OrdersRouteGuard } from '../core/guards/orders-route.guard';

const routes: Routes = [
    {
        path: '',
        canActivate: [OrdersRouteGuard],
        children: [
            {path: '', component: OrdersListComponent},
            {
                path: 'detail/:id',
                component: OrderDetailsComponent,
                resolve: {
                    order: OrderDetailsResolveGuard
                },
                data: {showBackButton: ['/orders']}
            },
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule {
}
