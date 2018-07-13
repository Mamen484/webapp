import { AggregatedUserInfo } from './aggregated-user-info';
import { Store } from './store';
import { StoreChannelDetails } from './store-channel-details';
import { Tag } from './tag';

export interface AppState {
    userInfo: AggregatedUserInfo;
    currentStore: Store;
    currentRoute: 'channels' | 'orders';
    installedChannels: StoreChannelDetails[];
    tags: Tag[];
}
