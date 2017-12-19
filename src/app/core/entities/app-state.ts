import { AggregatedUserInfo } from './aggregated-user-info';
import { Store } from './store';
import { Statistics } from './statistics';
import { StoreChannelDetails } from './store-channel-details';

export interface AppState {
    userInfo: AggregatedUserInfo;
    currentStore: Store;
    currentRoute: 'channels' | 'orders';
    storeStatistics: Statistics;
    installedChannels: StoreChannelDetails[];
}
