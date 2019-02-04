import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { SharedModule } from '../shared/shared.module';
import { FilterTicketsDialogComponent } from './tickets-list/filter-tickets-dialog/filter-tickets-dialog.component';

@NgModule({
    declarations: [TicketsListComponent, FilterTicketsDialogComponent],
    imports: [
        CommonModule,
        TicketsRoutingModule,
        SharedModule,
    ],
    entryComponents: [FilterTicketsDialogComponent],
})
export class TicketsModule {
}
