import { StatisticsComponent } from './statistics.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChannelsRouteGuard } from '../core/guards/channels-route.guard';

const routes = [
    {path: '', component: StatisticsComponent, canActivate: [ChannelsRouteGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatisticsRoutingModule {
}
