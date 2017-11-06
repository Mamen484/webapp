import { TimelineUpdateName } from './timeline-update-name.enum';
import { TimelineUpdateAction } from './timeline-update-action.enum';
import { Channel } from './channel';
import { TimelineErrorSubject } from './timeline-error-subject';

export interface TimelineUpdate {
    name: TimelineUpdateName;
    action: TimelineUpdateAction;
    storeId: number;
    occurredAt: string;
    id: string;
    _embedded: {channel: Channel}
    data?: {subject?: TimelineErrorSubject};
}
