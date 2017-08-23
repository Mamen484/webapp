import { Link } from './link';
import { TimelineEvent } from './timeline-event';

export interface Timeline {
    '_links': {
        'self': Link,
        'next': Link
    };
    '_embedded': {
        'events': TimelineEvent[]
    }
}
