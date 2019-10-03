import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { currentStoreReducer } from './reducers/current-store-reducer';
import { userInfoReducer } from './reducers/user-info-reducer';
import { AggregatedUserInfoResolveGuard } from './guards/aggregated-user-info-resolve.guard';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CheckProperLocaleGuard } from './guards/check-proper-locale.guard';
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
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { TimelineService } from './services/timeline.service';
import { InitializeStoreGuard } from './guards/initialize-store.guard';
import { CanLoadAdminGuard } from './guards/can-load-admin.guard';
import { currentRouteReducer } from './reducers/current-route-reducer';
import { ChannelsRouteGuard } from './guards/channels-route.guard';
import { OrdersRouteGuard } from './guards/orders-route.guard';
import { OrdersService } from './services/orders.service';
import { HttpClientService } from './services/http-client.service';
import { installedChannelsReducer } from './reducers/installed-channels-reducer';
import { OrderDetailsResolveGuard } from './guards/order-details-resolve.guard';
import { tagsReducer } from './reducers/tags-reducer';
import { OrdersFilterService } from './services/orders-filter.service';
import { SupportLinkService } from './services/support-link.service';
import { TagsService } from './services/tags.service';
import { ChannelStorageService } from './services/channel-storage.service';
import { SflLegacyLinkService } from 'sfl-shared/services';
import { LegacyLinkService } from './services/legacy-link.service';
import { TimelineRouteGuard } from './guards/timeline-route.guard';

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
        InitializeStoreGuard,
        IsAuthorizedGuard,
        IsLoggedInGuard,
        LogoutGuard,
        OrderDetailsResolveGuard,
        OrdersRouteGuard,
        ShopifyGuard,
        ShopSpecifiedGuard,
        TimelineRouteGuard,

        InternationalAccountService,
        ChannelLogoService,
        ChannelStorageService,
        ShopifyAuthentifyService,
        RegistrationCacheGuard,
        CreatePasswordService,
        SupportService,
        PasswordRecoveryService,
        TimelineService,
        OrdersFilterService,
        OrdersService,
        SupportLinkService,
        TagsService,
        {provide: SflLegacyLinkService, useClass: LegacyLinkService},
        {provide: HttpClient, useClass: HttpClientService},
        {provide: HTTP_INTERCEPTORS, useClass: SupportAuthInterceptor, multi: true},
    ],
    declarations: []
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
        }
    }
}
