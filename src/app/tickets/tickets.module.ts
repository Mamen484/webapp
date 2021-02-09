import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { SharedModule } from '../shared/shared.module';
import { FilterTicketsDialogComponent } from './tickets-list/filter-tickets-dialog/filter-tickets-dialog.component';
import { TicketDetailsDialogComponent } from './tickets-list/ticket-details-dialog/ticket-details-dialog.component';
import { StateLabelComponent } from './tickets-list/state-label/state-label.component';
import { TypeLabelComponent } from './tickets-list/type-label/type-label.component';
import { MenuTabsModule } from 'sfl-tools/src/lib/menu-tabs';

@NgModule({
    declarations: [
        TicketsListComponent,
        FilterTicketsDialogComponent,
        TicketDetailsDialogComponent,
        StateLabelComponent,
        TypeLabelComponent,
    ],
    imports: [
        CommonModule,
        TicketsRoutingModule,
        SharedModule,
        MenuTabsModule,
    ],
    entryComponents: [FilterTicketsDialogComponent, TicketDetailsDialogComponent],
})
export class TicketsModule {
}
