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
import { IsLoggedInGuard } from './core/guards/is-logged-in.guard';
import { BlankComponent } from './shared/blank.component';
import { ShopifyGuard } from './registration/guards/shopify.guard';
import { InitializeStoreGuard } from './core/guards/initialize-store.guard';
import { AddStoreParamGuard } from './core/guards/add-store-param.guard';
import { SflLoginByTokenGuard } from 'sfl-shared/auth';

const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        resolve: {
            userInfo: AggregatedUserInfoResolveGuard
        },
        canActivate: [
            // see src/diagrams/authentication to understand what those guards do
            SflLoginByTokenGuard,
            IsAuthorizedGuard,
            CheckProperLocaleGuard,
            InitializeStoreGuard,
        ],
        canActivateChild: [AddStoreParamGuard],
        children: [
            {path: '', loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule)},
            {path: 'timeline', loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)},
            {path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)},
            {path: 'feed', loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule)},
            {path: 'api', loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule)},
        ]
    },
    {path: 'logout', component: BlankComponent, canActivate: [LogoutGuard]},
    {path: 'login', component: LoginComponent, canActivate: [IsLoggedInGuard]},
    {path: 'reset-password', component: SendRecoveryEmailComponent, data: {showBackButton: ['/login']}},
    {path: 'reset-password/:token', component: ResetPasswordComponent},
    {path: 'shopify/authentify', canActivate: [ShopifyGuard], component: BlankComponent},
    {path: 'squarespace', loadChildren: () => import('./squarespace/squarespace.module').then(m => m.SquarespaceModule)},
    {path: 'register', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
