import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import '../../rxjs-imports';

import { UserService } from './services/user.service';
import { currentStoreReducer } from './reducers/current-store-reducer';
import { userInfoReducer } from './reducers/user-info-reducer';
import { StoreService } from './services/store.service';
import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { AggregatedUserInfoResolveGuard } from './guards/aggregated-user-info-resolve.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { LocaleIdService } from './services/locale-id.service';
import { environment } from '../../environments/environment';
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
import { events, events2 } from '../../mocks/events-mock';
import { EventsResolveGuard } from './guards/events-resolve.guard';
import { EventUpdatesGuard } from './guards/event-updates.guard';
import { updates } from '../../mocks/updates-mock';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from './services/local-storage.service';
import { currentRouteReducer } from './reducers/current-route-reducer';
import { ChannelsRouteGuard } from './guards/channels-route.guard';
import { OrdersRouteGuard } from './guards/orders-route.guard';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot({
            userInfo: userInfoReducer,
            currentStore: currentStoreReducer,
            currentRoute: currentRouteReducer
        })
    ],
    providers: [
        AggregatedUserInfoResolveGuard,
        ChannelsRouteGuard,
        CheckProperLocaleGuard,
        EventUpdatesGuard,
        IsAuthorizedGuard,
        IsLoggedInGuard,
        LogoutGuard,
        LoginByTokenGuard,
        OrdersRouteGuard,
        ShopifyGuard,
        ShopSpecifiedGuard,

        EventsResolveGuard,
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

        {provide: TimelineService, useValue: {getEvents, getEventUpdates}},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: SupportAuthInterceptor, multi: true},
        {provide: LOCALE_ID, useValue: environment.LOCALE_ID},
    ],
    declarations: []
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}

export function getEvents(link) {
    return Observable.of(!link ? events : events2);
}


export function getEventUpdates() {
    return Observable.of(updates);
}