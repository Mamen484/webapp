import { TimelineEventName } from './timeline-event-name.enum';
import { TimelineEventAction } from './timeline-event-action.enum';
import { TimelineEvent } from './timeline-event';
import { TimelineUpdateName } from './timeline-update-name.enum';
import { TimelineUpdateAction } from './timeline-update-action.enum';
import { TimelineErrorSubject } from './timeline-error-subject';
import { TimelineUpdate } from './timeline-update';
import { Channel } from './channel';

export class TimelineEventFormatted {
    icon: string;
    type: TimelineEventName | TimelineUpdateName;
    time: Date;
    operation: TimelineEventAction | TimelineUpdateAction;
    reference: string;
    ruleName: string;
    subject: TimelineErrorSubject;
    channel?: Channel;

    constructor(event: TimelineEvent | TimelineUpdate) {
        this.icon = this.getIconName(event.name);
        this.type = event.name;
        this.time = new Date(event.occurredAt);
        this.operation = event.action;
        this.reference = event.data && (<TimelineEvent>event).data.reference || '';
        this.ruleName =
            event.name === TimelineEventName.ruleTransformation || event.name === TimelineEventName.ruleSegmentation
                ? event.data.name
                : '';
        this.subject = event.action === TimelineUpdateAction.error && event.data && event.data.subject || '';
        this.channel = (<TimelineUpdate>event)._embedded && (<TimelineUpdate>event)._embedded.channel;
    }

    protected getIconName(eventType) {
        switch (eventType) {
            case TimelineEventName.orderLifecycle:
                return 'shopping_basket';

            case TimelineEventName.ruleSegmentation:
            case TimelineEventName.ruleTransformation:
                return 'build';

            // only updates with action error are displayed within events
            case TimelineUpdateName.import:
            case TimelineUpdateName.export:
                return 'error_outline';

        }
    }
}
