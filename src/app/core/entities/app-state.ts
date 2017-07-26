import { AggregatedUserInfo } from './aggregated-user-info';
import { Store } from './store';
import { StoreChannelResponse } from './store-channel-response';

export interface AppState {
    userInfo: AggregatedUserInfo;
    currentStore: Store;
    channels: StoreChannelResponse
}
