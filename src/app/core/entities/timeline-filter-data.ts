import { DateFilter } from './date-filter.enum';
import { TimelineTypeFilter } from './timeline-type-filter.enum';

export class TimelineFilterData {

    public isActive = false;

    private _dateFilter: DateFilter;
    private _typeFilter: TimelineTypeFilter;
    private _dateSince: Date;
    private _dateUntil: Date;

    get dateFilter(): DateFilter {
        return this._dateFilter;
    }

    set dateFilter(value: DateFilter) {
        this._dateFilter = value;
        this.setIsActive();
    }

    get typeFilter(): TimelineTypeFilter {
        return this._typeFilter;
    }

    set typeFilter(value: TimelineTypeFilter) {
        this._typeFilter = value;
        this.setIsActive();
    }

    get dateSince(): Date {
        return this._dateSince;
    }

    set dateSince(value: Date) {
        this._dateSince = this.getCustomDate(value);
        this.setIsActive();
    }

    get dateUntil(): Date {
        return this._dateUntil;
    }

    set dateUntil(value: Date) {
        this._dateUntil = this.getCustomDate(value);
        this.setIsActive();
    }

    public applyValue({dateFilter, typeFilter, dateSince, dateUntil}: TimelineFilterData) {
        this._dateFilter = dateFilter;
        this._typeFilter = typeFilter;
        this._dateSince = this.getCustomDate(dateSince);
        this._dateUntil = this.getCustomDate(dateUntil);

        this.setIsActive();
    }

    protected getCustomDate(value) {
        return this._dateFilter === DateFilter.custom ? value : undefined;
    }

    protected setIsActive() {
        this.isActive = Boolean(this.typeFilter ||
            (this.dateFilter && this.dateFilter !== DateFilter.custom) ||
            (this.dateFilter === DateFilter.custom && (this.dateSince || this.dateUntil)));
    }
}
