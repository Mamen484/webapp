import { Link } from './link';
import { TimelineUpdate } from './timeline-update';

export interface TimelineUpdates {
    '_links': {
        'self': Link
    };
    '_embedded': {
        timeline: TimelineUpdate[]
    }
}
