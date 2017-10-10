import { TimelineEventName } from './timeline-event-name.enum';
import { TimelineEventAction } from './timeline-event-action.enum';
import { TimelineEvent } from './timeline-event';

export class TimelineEventFormatted {
    icon: string;
    type: TimelineEventName;
    time: Date;
    operation: TimelineEventAction;
    reference: string;
    ruleName: string;

    constructor(event: TimelineEvent) {
        this.icon = this.getIconName(event.name);
        this.type = event.name;
        this.time = new Date(event.occurredAt);
        this.operation = event.action;
        this.reference =
            event.name === TimelineEventName.orderLifecycle
                ? event.data.reference
                : '';
        this.ruleName =
            event.name === TimelineEventName.ruleTransformation || event.name === TimelineEventName.ruleSegmentation
                ? event.data.name
                : ''
    }

    protected getIconName(eventType) {
        switch (eventType) {
            case TimelineEventName.orderLifecycle:
                return 'shopping_basket';

            case TimelineEventName.ruleSegmentation:
            case TimelineEventName.ruleTransformation:
                return 'build';

        }
    }
}
