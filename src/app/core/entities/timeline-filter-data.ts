import { DateFilter } from './date-filter.enum';
import { TimelineTypeFilter } from './timeline-type-filter.enum';

export interface TimelineFilterData {
    dateFilter: DateFilter;
    typeFilter: TimelineTypeFilter;
    dateSince: Date;
    dateUntil: Date;
}
