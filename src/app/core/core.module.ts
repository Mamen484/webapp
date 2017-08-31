import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { StoreModule } from '@ngrx/store';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/count';

import { UserService } from './services/user.service';
import { currentStoreReducer } from './reducers/current-store-reducer';
import { userInfoReducer } from './reducers/user-info-reducer';
import { aggregatedUserInfoMock } from '../../mocks/agregated-user-info-mock';
import { StoreService } from './services/store.service';
import { storeChannelMock } from '../../mocks/store-channel.mock';
import { channelsReducer } from './reducers/channels-reducer';
import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { AggregatedUserInfoResolveGuard } from './guards/aggregated-user-info-resolve.guard';
import { statisticsReducer } from './reducers/statistics-reducer';
import { statisticsMock } from '../../mocks/statistics-mock';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ChannelService } from './services/channel.service';
import { channelsStaticMock } from '../../mocks/channels-mock';
import { ChannelsRequestParams } from './entities/channels-request-params';
import { LocaleIdService } from './services/locale-id.service';
import { environment } from '../../environments/environment';
import { CheckProperLocaleGuard } from './guards/check-proper-locale.guard';
import { WindowRefService } from './services/window-ref.service';
import { InternationalAccountService } from './services/international-account.service';
import { PasswordRecoveryService } from './services/password-recovery.service';

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
        LocaleIdService,
        InternationalAccountService,
        WindowRefService,
        PasswordRecoveryService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        // UserService,
        // StoreService,
        {provide: UserService, useValue: {fetchAggregatedInfo, login}},
        {provide: StoreService, useValue: {getAllConfiguredChannels, getStatistics}},
        {provide: ChannelService, useValue: {getChannels}},
        {provide: LOCALE_ID, useValue: environment.LOCALE_ID},
    ],
    declarations: []
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}

// TODO: remove mocking function when API is ready
export function fetchAggregatedInfo() {
    return Observable.of(aggregatedUserInfoMock);
}

// TODO: remove mocking function when API is ready
export function getAllConfiguredChannels() {
    return Observable.of(storeChannelMock);
}

// TODO: remove mocking function when API is ready
export function getStatistics() {
    return Observable.of(statisticsMock);
}

// TODO: remove mocking function when API is ready
export function getChannels(params: ChannelsRequestParams) {
    return Observable.of(channelsStaticMock(params)).delay(Math.round(Math.random() * 700));
}

export function login(username, password) {
    if (username === 'goverla' && password === '2061') {
        return Observable.of({
            'access_token': '470d9f3c6b0371ff2a88d0c554cbee9cad495e8d',
            'token_type': 'Bearer'
        });
    } else {
        return Observable.throw({
            'type': 'http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html',
            'title': 'Not Authorized',
            'detail': 'Invalid username or password',
            'status': 401
        });
    }
}
