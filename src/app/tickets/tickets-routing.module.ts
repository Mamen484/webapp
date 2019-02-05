import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketsRouteGuard } from '../core/guards/tickets-route.guard';

const routes: Routes = [
    {path: '', component: TicketsListComponent, canActivate: [TicketsRouteGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TicketsRoutingModule {
}
