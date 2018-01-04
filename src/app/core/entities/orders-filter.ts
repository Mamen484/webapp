import { HttpParams } from '@angular/common/http';

const DAY = 1000 * 60 * 60 * 24;

export class OrdersFilter {
    until?;
    since?: Date;
    channel? = 'all';
    tab? = 'all';
    limit = '25';
    search = '';

    static aDayBefore() {
        let date = new Date().toDateString();
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

    toHttpParams() {
        let params = new HttpParams().set('limit', this.limit);
        if (this.since) {
            params = params.set('since', this.since.toJSON());
        }
        if (this.until) {
            params = params.set('until', this.until.toJSON());
        }
        if (this.channel && this.channel !== 'all') {
            params = params.set('channel', this.channel);
        }

        if (this.search && this.search !== '') {
            params = params.set('search', this.search);
        }

        return params;
    }
}
