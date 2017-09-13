import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { StoreModule } from '@ngrx/store';
import '../../rxjs-imports';

import { UserService } from './services/user.service';
import { currentStoreReducer } from './reducers/current-store-reducer';
import { userInfoReducer } from './reducers/user-info-reducer';
import { StoreService } from './services/store.service';
import { channelsReducer } from './reducers/channels-reducer';
import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { AggregatedUserInfoResolveGuard } from './guards/aggregated-user-info-resolve.guard';
import { statisticsReducer } from './reducers/statistics-reducer';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { LocaleIdService } from './services/locale-id.service';
import { environment } from '../../environments/environment';
import { CheckProperLocaleGuard } from './guards/check-proper-locale.guard';
import { WindowRefService } from './services/window-ref.service';
import { InternationalAccountService } from './services/international-account.service';
import { SupportService } from './services/support.service';
import { SupportAuthInterceptor } from './interceptors/support-auth-interceptor';
import { supportSearchMock } from '../../mocks/support-search-mock';
import { PasswordRecoveryService } from './services/password-recovery.service';
import { ChannelLogoService } from './services/channel_logo.service';
import { ShopifyAuthentifyService } from './services/shopify-authentify.service';
import { ShopifyGuard } from './guards/shopify.guard';
import { ShopSpecifiedGuard } from './guards/shop-specified.guard';
import { RegistrationCacheGuard } from './guards/registration-cache.guard';
import { CreatePasswordService } from '../registration/create-password/create-password.service';
import { IsAuthorizedGuard } from './guards/is-authorized.guard';
import { LogoutGuard } from './logout.guard';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot({
            userInfo: userInfoReducer,
            currentStore: currentStoreReducer,
            channels: channelsReducer,
            storeStatistics: statisticsReducer,
        }),

    ],
    providers: [
        AggregatedUserInfoResolveGuard,
        CheckProperLocaleGuard,
        IsAuthorizedGuard,
        LogoutGuard,
        LocaleIdService,
        InternationalAccountService,
        ChannelLogoService,
        ShopifyAuthentifyService,
        RegistrationCacheGuard,
        CreatePasswordService,
        {provide: SupportService, useValue: {searchArticles}},
        WindowRefService,
        PasswordRecoveryService,
        ShopifyGuard,
        ShopSpecifiedGuard,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: SupportAuthInterceptor, multi: true},
        UserService,
        StoreService,
        {provide: LOCALE_ID, useValue: environment.LOCALE_ID},
    ],
    declarations: []
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}

export function searchArticles(query) {
    return query === 'empty'
        ? Observable.of({_embedded: {entries: []}}).delay(Math.round(Math.random() * 1200))
        : Observable.of(supportSearchMock).delay(Math.round(Math.random() * 1200));

}
