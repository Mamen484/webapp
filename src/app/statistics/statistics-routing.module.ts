import { StatisticsComponent } from './statistics.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomepageRouteGuard } from '../core/guards/homepage-route.guard';

const routes = [
    {path: '', component: StatisticsComponent, canActivate: [HomepageRouteGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatisticsRoutingModule {
}
