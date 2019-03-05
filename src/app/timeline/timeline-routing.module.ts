import { TimelineComponent } from './timeline.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimelineRouteGuard } from '../core/guards/timeline-route.guard';

const routes = [
    {
        path: '',
        component: TimelineComponent,
        canActivate: [TimelineRouteGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TimelineRoutingModule {
}
