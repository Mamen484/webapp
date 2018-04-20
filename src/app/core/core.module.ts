import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import '../../rxjs-imports';

import { UserService } from './services/user.service';
import { currentStoreReducer } from './reducers/current-store-reducer';
import { userInfoReducer } from './reducers/user-info-reducer';
import { StoreService } from './services/store.service';
import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { AggregatedUserInfoResolveGuard } from './guards/aggregated-user-info-resolve.guard';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { LocaleIdService } from './services/locale-id.service';
import { CheckProperLocaleGuard } from './guards/check-proper-locale.guard';
import { WindowRefService } from './services/window-ref.service';
import { InternationalAccountService } from './services/international-account.service';
import { SupportService } from './services/support.service';
import { SupportAuthInterceptor } from './interceptors/support-auth-interceptor';
import { PasswordRecoveryService } from './services/password-recovery.service';
import { ChannelLogoService } from './services/channel_logo.service';
import { ShopifyAuthentifyService } from './services/shopify-authentify.service';
import { ShopifyGuard } from './guards/shopify.guard';
import { ShopSpecifiedGuard } from './guards/shop-specified.guard';
import { RegistrationCacheGuard } from './guards/registration-cache.guard';
import { CreatePasswordService } from './services/create-password.service';
import { IsAuthorizedGuard } from './guards/is-authorized.guard';
import { LogoutGuard } from './guards/logout.guard';
import { LoginByTokenGuard } from './guards/login-by-token.guard';
import { LegacyLinkService } from './services/legacy-link.service';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { TimelineService } from './services/timeline.service';
import { LocalStorageService } from './services/local-storage.service';
import { InitializeStoreGuard } from './guards/initialize-store.guard';
import { DefaultPageGuard } from './guards/default-page.guard';
import { CanLoadAdminGuard } from './guards/can-load-admin.guard';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { currentRouteReducer } from './reducers/current-route-reducer';
import { ChannelsRouteGuard } from './guards/channels-route.guard';
import { OrdersRouteGuard } from './guards/orders-route.guard';
import { OrdersService } from './services/orders.service';
import { HttpClientService } from './services/http-client.service';
import { installedChannelsReducer } from './reducers/installed-channels-reducer';
import { OrderDetailsResolveGuard } from './guards/order-details-resolve.guard';
import { tagsReducer } from './reducers/tags-reducer';
import { OrdersFilterService } from './services/orders-filter.service';
import { LoadingFlagService } from './services/loading-flag.service';
import { SupportLinkService } from './services/support-link.service';
import { ToggleSidebarService } from './services/toggle-sidebar.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot({
            userInfo: userInfoReducer,
            currentStore: currentStoreReducer,
            currentRoute: currentRouteReducer,
            installedChannels: installedChannelsReducer,
            tags: tagsReducer,
        })
    ],
    providers: [
        AggregatedUserInfoResolveGuard,
        ChannelsRouteGuard,
        CanLoadAdminGuard,
        CheckProperLocaleGuard,
        DefaultPageGuard,
        InitializeStoreGuard,
        IsAuthorizedGuard,
        IsLoggedInGuard,
        LoadingFlagService,
        LogoutGuard,
        LoginByTokenGuard,
        OrderDetailsResolveGuard,
        OrdersFilterService,
        OrdersRouteGuard,
        ShopifyGuard,
        ShopSpecifiedGuard,

        LocaleIdService,
        InternationalAccountService,
        ChannelLogoService,
        ShopifyAuthentifyService,
        RegistrationCacheGuard,
        CreatePasswordService,
        SupportService,
        WindowRefService,
        PasswordRecoveryService,
        UserService,
        StoreService,
        LegacyLinkService,
        LocalStorageService,
        TimelineService,
        OrdersService,
        SupportLinkService,
        ToggleSidebarService,

        {provide: HttpClient, useClass: HttpClientService},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: SupportAuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        ],
    declarations: []
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}