import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { HasTicketsGuard } from './tickets-list/has-tickets.guard';

const routes: Routes = [
    {
        path: '',
        component: TicketsListComponent,
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
