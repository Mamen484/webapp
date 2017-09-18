import { PagedResponse } from './paged-response';
import { Channel } from './channel';
import { StoreChannel } from './store-channel';

export interface ChannelsResponse extends PagedResponse<{channel: (Channel | StoreChannel)[]}> {
}
