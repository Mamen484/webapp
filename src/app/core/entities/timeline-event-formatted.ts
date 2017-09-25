import { TimelineEventType } from './timeline-event-type.enum';
import { TimelineEventOperation } from './timeline-event-operation.enum';

export interface TimelineEventFormatted {
    icon: string;
    type: TimelineEventType;
    time: Date;
    operation: TimelineEventOperation;
    reference: string;
    ruleName: string;
}
