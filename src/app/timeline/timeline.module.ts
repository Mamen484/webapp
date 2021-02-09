import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { SharedModule } from '../shared/shared.module';
import { TimelineRoutingModule } from './timeline-routing.module';
import { EventLinkComponent } from './event-link/event-link.component';
import { UpdateRowComponent } from './update-row/update-row.component';
import { TimelineFilteringAreaComponent } from './timeline-filtering-area/timeline-filtering-area.component';
import { TimelineFilterDialogComponent } from './timeline-filter-dialog/timeline-filter-dialog.component';
import { EventIconPipe } from './event-icon/event-icon.pipe';
import { EventLinkPipe } from './event-link/event-link.pipe';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TimelineRoutingModule,
    ],
    declarations: [TimelineComponent, EventLinkComponent, UpdateRowComponent, TimelineFilteringAreaComponent, TimelineFilterDialogComponent, EventIconPipe, EventLinkPipe],
    entryComponents: [TimelineFilterDialogComponent]
})
export class TimelineModule {
}
