import { PagedResponse } from 'sfl-shared/entities';
import { Channel } from 'sfl-shared/entities';
import { StoreChannel } from 'sfl-shared/entities';

export interface ChannelsResponse extends PagedResponse<{channel: (Channel | StoreChannel)[]}> {
}
