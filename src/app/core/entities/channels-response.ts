import { PagedResponse } from './paged-response';
import { Channel } from './channel';

export interface ChannelsResponse extends PagedResponse<{channel: Channel[]}> {
}
