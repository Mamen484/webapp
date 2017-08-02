import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { StoreModule } from '@ngrx/store';
import 'rxjs/add/Observable/of';

import { UserService } from './services/user.service';
import { currentStoreReducer } from './reducers/current-store';
import { userInfoReducer } from './reducers/user-info-reducer';
import { aggregatedUserInfoMock } from '../../mocks/agregated-user-info-mock';
import { StoreService } from './services/store.service';
import { storeChannelMock } from '../../mocks/store-channel.mock';
import { channelsReducer } from './reducers/channels-reducer';
import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { AggregatedUserInfoResolveGuard } from './guards/aggregated-user-info-resolve.guard';
import { statisticsReducer } from './reducers/statistics-reducer';
import { statisticsMock } from '../../mocks/statistics-mock';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot({
            userInfo: userInfoReducer,
            currentStore: currentStoreReducer,
            channels: channelsReducer,
            storeStatistics: statisticsReducer,
        }),

    ],
    providers: [
        AggregatedUserInfoResolveGuard,
        // UserService,
        {provide: UserService, useValue: {fetchAggregatedInfo: fetchAggregatedInfo}},
        {
            provide: StoreService,
            useValue: {getAllConfiguredChannels: getAllConfiguredChannels, getStatistics: getStatistics}
        }
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
