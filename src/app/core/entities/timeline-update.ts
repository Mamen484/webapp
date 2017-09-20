import { Channel } from './channel';
import { TimelineUpdateType } from './timeline-update-type.enum';
import { TimelineUpdateOperation } from './timeline-update-operation.enum';

export interface TimelineUpdate {
    type: TimelineUpdateType;
    operation: TimelineUpdateOperation;
    occurredAt: string;
    _embedded?: {
        channel: Channel[]
    };
}
