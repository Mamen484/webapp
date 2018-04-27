import { Pipe, PipeTransform } from '@angular/core';
import { TimelineEvent } from '../../core/entities/timeline-event';
import { TimelineEventName } from '../../core/entities/timeline-event-name.enum';

@Pipe({
    name: 'sfEventLink'
})
export class EventLinkPipe implements PipeTransform {

    transform(event: TimelineEvent, args?: any): any {
        switch (event.name) {
            case TimelineEventName.export:
                let {type, name} = event._embedded.channel;
                return type === 'marketplace' ? `/${name}` : `/${type}/manage/${name}`;

            case TimelineEventName.import:
                return '/tools/infos';

            case TimelineEventName.orderLifecycle:
                return `/marketplaces/orders/${event.data.reference}`;

            case TimelineEventName.ruleSegmentation:
                return `/tools/segmentations#${event.data.reference}`;

            case TimelineEventName.ruleTransformation:
                return `/tools/rules#${event.data.reference}`;
        }
    }

}
