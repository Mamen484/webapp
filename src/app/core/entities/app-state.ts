import { AggregatedUserInfo } from './aggregated-user-info';
import { Store } from './store';
import { StoreChannelResponse } from './store-channel-response';
import { Statistics } from './statistics';

export interface AppState {
    userInfo: AggregatedUserInfo;
    currentStore: Store;
    channels: StoreChannelResponse
    storeStatistics: Statistics
}
