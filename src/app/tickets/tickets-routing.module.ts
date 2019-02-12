import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketsRouteGuard } from '../core/guards/tickets-route.guard';
import { HasTicketsGuard } from './tickets-list/has-tickets.guard';

const routes: Routes = [
    {
        path: '',
        component: TicketsListComponent,
        canActivate: [TicketsRouteGuard],
        resolve: {
            hasTickets: HasTicketsGuard,
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TicketsRoutingModule {
}
