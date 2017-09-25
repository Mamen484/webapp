import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { SharedModule } from '../shared/shared.module';
import { OrderEventComponent } from './order-event/order-event.component';
import { RuleEventComponent } from './rule-event/rule-event.component';
import { TimelineRoutingModule } from './timeline-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TimelineRoutingModule,
    ],
    declarations: [TimelineComponent, OrderEventComponent, RuleEventComponent]
})
export class TimelineModule {
}
