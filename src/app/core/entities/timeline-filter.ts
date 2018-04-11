import { DateFilter } from './date-filter.enum';
import { TimelineTypeFilter as TypeFilter } from './timeline-type-filter.enum';
import { TimelineUpdateAction as updateAction } from './timeline-update-action.enum';
import { TimelineUpdateName as updateName } from './timeline-update-name.enum';
import { TimelineEventName as eventName } from './timeline-event-name.enum';
import { TimelineFilterData } from './timeline-filter-data';
import { TimelineEventAction as eventAction } from './timeline-event-action.enum';

// @TODO: refactor this with OrdersFilter when merge to orders branch
const DAY = 1000 * 60 * 60 * 24;

export class TimelineFilter {
    since?: Date;
    until?: Date;
    name = [
        updateName.import,
        updateName.export,
        eventName.orderLifecycle,
        eventName.ruleTransformation,
        eventName.ruleSegmentation
    ];
    action = [
        eventAction.create,
        eventAction.push,
        eventAction.delete,
        eventAction.ship,
        eventAction.update,
        updateAction.error,
    ];

    static createFrom({dateFilter: date, typeFilter: type, dateSince, dateUntil}: TimelineFilterData) {
        let filter = new TimelineFilter();
        switch (date) {
            case DateFilter.today:
                filter.since = TimelineFilter.aDayBefore();
                break;
            case DateFilter.yesterday:
                filter.since = TimelineFilter.twoDaysBefore();
                filter.until = TimelineFilter.aDayBefore();
                break;
            case DateFilter.lastWeek:
                filter.since = TimelineFilter.aWeekBefore();
                break;
            case DateFilter.lastMonth:
                filter.since = TimelineFilter.aMonthBefore();
                break;
            case DateFilter.custom:
                filter.since = dateSince;
                filter.until = dateUntil;
        }
        switch (type) {
            case TypeFilter.import:
                filter.name = [updateName.import];
                break;
            case TypeFilter.export:
                filter.name = [updateName.export];
                break;
            case TypeFilter.rules:
                filter.name = [eventName.ruleTransformation];
                break;
            case TypeFilter.orders:
                filter.name = [eventName.orderLifecycle];
                break;
            case TypeFilter.autoRemove:
                filter.name = [eventName.ruleSegmentation];
                break;
        }

        return filter;
    }

    static aDayBefore() {
        let date = new Date().toDateString();
        return new Date(date);
    }

    static twoDaysBefore() {
        let date = new Date((new Date().getTime() - DAY)).toDateString();
        return new Date(date);
    }

    static aWeekBefore() {
        let date = new Date().getTime() - 7 * DAY;
        return new Date(date);
    }

    static aMonthBefore() {
        let date = new Date().getTime() - 30 * DAY;
        return new Date(date);
    }

}
