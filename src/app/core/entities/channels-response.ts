import { PagedResponse } from 'sfl-shared/src/lib/core/entities';
import { Channel } from 'sfl-shared/src/lib/core/entities';
import { StoreChannel } from 'sfl-shared/src/lib/core/entities';

export interface ChannelsResponse extends PagedResponse<{channel: (Channel | StoreChannel)[]}> {
}
