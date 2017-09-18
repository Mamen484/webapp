import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './base/base.component';
import { AggregatedUserInfoResolveGuard } from './core/guards/aggregated-user-info-resolve.guard';
import { StatisticsComponent } from './statistics/statistics.component';
import { CheckProperLocaleGuard } from './core/guards/check-proper-locale.guard';
import { LoginComponent } from './login/login.component';
import { SendRecoveryEmailComponent } from './login/send-recovery-email/send-recovery-email.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { IsAuthorizedGuard } from './core/guards/is-authorized.guard';
import { LogoutGuard } from './core/guards/logout.guard';
import { LoginByTokenGuard } from './core/guards/login-by-token.guard';
import { IsLoggedInGuard } from './core/guards/is-logged-in.guard';

const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        resolve: {
            userInfo: AggregatedUserInfoResolveGuard
        },
        canActivate: [
            LoginByTokenGuard,
            IsAuthorizedGuard,
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
        path: 'logout',
        component: LoginComponent,
        canActivate: [
            LogoutGuard
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [
            IsLoggedInGuard
        ]
    },
    {
        path: 'reset-password',
        component: SendRecoveryEmailComponent
    },
    {
        path: 'reset-password/:token',
        component: ResetPasswordComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
