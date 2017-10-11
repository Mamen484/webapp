import { TimelineUpdateName } from './timeline-update-name.enum';
import { TimelineUpdateAction } from './timeline-update-action.enum';

export interface TimelineUpdate {
    name: TimelineUpdateName;
    action: TimelineUpdateAction;
    storeId: number;
    occurredAt: string;
    id: string;
    _embedded: {channel: {name: string}}
}
