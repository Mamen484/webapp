import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { StoreModule } from '@ngrx/store';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/distinct';

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
import { ChannelDynamicMock } from '../../mocks/channels-response-mock';
import { PagedResponseFactory } from '../../mocks/paged-response-factory';

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
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        // UserService,
        // StoreService,
        {provide: UserService, useValue: {fetchAggregatedInfo}},
        {provide: StoreService, useValue: {getAllConfiguredChannels, getStatistics}},
        {provide: ChannelService, useValue: {getChannels}}
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
export function getChannels({page = 1, limit = 6}) {
    return Observable.of(new PagedResponseFactory(page, limit, ChannelDynamicMock, 'channel')).delay(Math.round(Math.random() * 700));
}
