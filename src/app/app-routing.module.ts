import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseComponent } from './base/base.component';
import { AggregatedUserInfoResolveGuard } from './core/guards/aggregated-user-info-resolve.guard';
import { CheckProperLocaleGuard } from './core/guards/check-proper-locale.guard';
import { LoginComponent } from './login/login.component';
import { SendRecoveryEmailComponent } from './login/send-recovery-email/send-recovery-email.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { IsAuthorizedGuard } from './core/guards/is-authorized.guard';
import { LogoutGuard } from './core/guards/logout.guard';
import { LoginByTokenGuard } from './core/guards/login-by-token.guard';
import { IsLoggedInGuard } from './core/guards/is-logged-in.guard';
import { BlankComponent } from './shared/blank.component';
import { ShopifyGuard } from './core/guards/shopify.guard';
import { InitializeStoreGuard } from './core/guards/initialize-store.guard';

const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        resolve: {
            userInfo: AggregatedUserInfoResolveGuard
        },
        canActivate: [
            // see src/diagrams/authentication to understand what those guards do
            LoginByTokenGuard,
            IsAuthorizedGuard,
            CheckProperLocaleGuard,
            InitializeStoreGuard,
        ],
        children: [
            {path: '', loadChildren: './statistics/statistics.module#StatisticsModule'},
            {path: 'timeline', loadChildren: './timeline/timeline.module#TimelineModule'},
            {path: 'orders', loadChildren: './orders/orders.module#OrdersModule'},
            {path: 'tickets', loadChildren: './tickets/tickets.module#TicketsModule'},
        ]
    },
    {path: 'logout', component: BlankComponent, canActivate: [LogoutGuard]},
    {path: 'login', component: LoginComponent, canActivate: [IsLoggedInGuard]},
    {path: 'reset-password', component: SendRecoveryEmailComponent, data: {showBackButton: ['/login']}},
    {path: 'reset-password/:token', component: ResetPasswordComponent},
    {path: 'shopify/authentify', canActivate: [ShopifyGuard], component: BlankComponent},
    {path: 'register', loadChildren: './registration/registration.module#RegistrationModule'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
