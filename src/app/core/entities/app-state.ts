import { AggregatedUserInfo, StoreChannel } from 'sfl-shared/entities';
import { StoreChannelDetails, Store } from 'sfl-shared/entities';
import { Tag } from './tag';

export interface AppState {
    userInfo: AggregatedUserInfo;
    currentStore: Store;
    currentRoute: 'channels' | 'orders';
    installedChannels: StoreChannel[];
    tags: Tag[];
}
