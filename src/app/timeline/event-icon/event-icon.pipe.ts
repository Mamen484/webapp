import { Pipe, PipeTransform } from '@angular/core';
import { TimelineEventName } from '../../core/entities/timeline-event-name.enum';

@Pipe({
    name: 'sfEventIcon'
})
export class EventIconPipe implements PipeTransform {

    transform(eventName: TimelineEventName | 'error'): any {
        switch (eventName) {
            case TimelineEventName.orderLifecycle:
                return 'shopping_basket';

            case TimelineEventName.ruleSegmentation:
            case TimelineEventName.ruleTransformation:
                return 'build';

            case TimelineEventName.import:
                return 'vertical_align_bottom';

            case TimelineEventName.export:
                return 'vertical_align_top';

            case 'error':
                return 'error_outline';

        }
    }

}
