import { AggregatedUserInfo } from 'sfl-shared/src/lib/core/entities';
import { StoreChannelDetails, Store } from 'sfl-shared/src/lib/core/entities';
import { Tag } from './tag';

export interface AppState {
    userInfo: AggregatedUserInfo;
    currentStore: Store;
    currentRoute: 'channels' | 'orders';
    installedChannels: StoreChannelDetails[];
    tags: Tag[];
}
