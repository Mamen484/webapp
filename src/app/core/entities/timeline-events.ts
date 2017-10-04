import { Link } from './link';
import { TimelineEvent } from './timeline-event';

export interface TimelineEvents {
    '_links': {
        'self': Link,
        'next': Link
    };
    '_embedded': {
        timeline: TimelineEvent[]
    }
}
