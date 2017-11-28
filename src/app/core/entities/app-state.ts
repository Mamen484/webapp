import { AggregatedUserInfo } from './aggregated-user-info';
import { Store } from './store';
import { Statistics } from './statistics';

export interface AppState {
    userInfo: AggregatedUserInfo;
    currentStore: Store;
    currentRoute: 'channels' | 'orders';
    storeStatistics: Statistics;
}
