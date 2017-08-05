import { StoreChannel } from './store-channel';
import { PagedResponse } from './paged-response';

export interface StoreChannelResponse extends PagedResponse<{storeChannel: StoreChannel[]}> {}
