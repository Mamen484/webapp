import { Channel } from './channel';
import { TimelineUpdateType } from './timeline-update-type.enum';
import { TimelineUpdateOperation } from './timeline-update-operation.enum';

export interface TimelineUpdate {
    name: TimelineUpdateType;
    action: TimelineUpdateOperation;
    occurredAt: string;
    _embedded?: {
        channel: Channel
    };
}
