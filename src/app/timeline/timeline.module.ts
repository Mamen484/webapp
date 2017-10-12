import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { SharedModule } from '../shared/shared.module';
import { TimelineRoutingModule } from './timeline-routing.module';
import { EventLinkComponent } from './event-link/event-link.component';
import { UpdateRowComponent } from './update-row/update-row.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TimelineRoutingModule,
    ],
    declarations: [TimelineComponent, EventLinkComponent, UpdateRowComponent]
})
export class TimelineModule {
}
