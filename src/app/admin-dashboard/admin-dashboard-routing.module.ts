import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AggregatedUserInfoResolveGuard } from '../core/guards/aggregated-user-info-resolve.guard';
import { LoginByTokenGuard } from '../core/guards/login-by-token.guard';
import { IsAuthorizedGuard } from '../core/guards/is-authorized.guard';
import { CheckProperLocaleGuard } from '../core/guards/check-proper-locale.guard';
import { InitializeStoreGuard } from '../core/guards/initialize-store.guard';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        resolve: {
            userInfo: AggregatedUserInfoResolveGuard
        },
        canActivate: [
            LoginByTokenGuard,
            IsAuthorizedGuard,
            CheckProperLocaleGuard,
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminDashboardRoutingModule {
}
