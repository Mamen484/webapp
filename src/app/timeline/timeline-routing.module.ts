import { TimelineComponent } from './timeline.component';
import { EventsResolveGuard } from '../core/guards/events-resolve.guard';
import { EventUpdatesGuard } from '../core/guards/event-updates.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routes = [
    {
        path: '',
        component: TimelineComponent,
        resolve: {
            timeline: EventsResolveGuard,
            updates: EventUpdatesGuard
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TimelineRoutingModule{}
