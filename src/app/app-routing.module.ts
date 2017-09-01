import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './base/base.component';
import { AggregatedUserInfoResolveGuard } from './core/guards/aggregated-user-info-resolve.guard';
import { StatisticsComponent } from './statistics/statistics.component';
import { CheckProperLocaleGuard } from './core/guards/check-proper-locale.guard';
import { LoginComponent } from './login/login.component';
import { SendRecoveryEmailComponent } from './login/send-recovery-email/send-recovery-email.component';

const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        resolve: {
            userInfo: AggregatedUserInfoResolveGuard
        },
        canActivate: [
            CheckProperLocaleGuard
        ],
        children: [
            {
                path: '',
                component: StatisticsComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'reset-password',
        component: SendRecoveryEmailComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
