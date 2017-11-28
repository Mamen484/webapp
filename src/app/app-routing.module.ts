import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

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
import { DefaultPageGuard } from './core/guards/default-page.guard';
import { CanLoadAdminGuard } from './core/guards/can-load-admin.guard';
import { ChannelsRouteGuard } from './core/guards/channels-route.guard';
import { OrdersRouteGuard } from './core/guards/orders-route.guard';

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
            CheckProperLocaleGuard,
            InitializeStoreGuard,
        ],
        children: [
            {path: '', component: BlankComponent, canActivate: [DefaultPageGuard]},
            //@TODO: check if we still need ChannelsRouteGuard
            {path: 'home', loadChildren: 'app/statistics/statistics.module#StatisticsModule', canLoad: [ChannelsRouteGuard]},
            {path: 'timeline', loadChildren: 'app/timeline/timeline.module#TimelineModule', canLoad: [ChannelsRouteGuard]},
            {path: 'orders', loadChildren: 'app/orders/orders.module#OrdersModule', canLoad: [OrdersRouteGuard]},
        ]
    },
    {
        path: 'admin',
        loadChildren: 'app/admin-dashboard/admin-dashboard.module#AdminDashboardModule',
        canLoad: [CanLoadAdminGuard]
    },


    {path: 'logout', component: BlankComponent, canActivate: [LogoutGuard]},
    {path: 'login', component: LoginComponent, canActivate: [IsLoggedInGuard]},
    {path: 'reset-password', component: SendRecoveryEmailComponent},
    {path: 'reset-password/:token', component: ResetPasswordComponent},
    {path: 'shopify/authentify', canActivate: [ShopifyGuard], component: BlankComponent},
    {path: 'register', loadChildren: 'app/registration/registration.module#RegistrationModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
