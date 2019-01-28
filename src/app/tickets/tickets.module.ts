import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [TicketsListComponent],
    imports: [
        CommonModule,
        TicketsRoutingModule,
        SharedModule,
    ]
})
export class TicketsModule {
}
