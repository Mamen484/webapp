import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomepageRouteGuard } from '../core/guards/homepage-route.guard';

const routes: Routes = [
    {path: '', component: DashboardComponent, canActivate: [HomepageRouteGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
