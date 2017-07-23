import { AggregatedUserInfo } from './aggregated-user-info';
import { Store } from './store';

export interface AppState {
    userInfo: AggregatedUserInfo;
    currentStore: Store;
}
