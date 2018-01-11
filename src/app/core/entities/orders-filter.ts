import { HttpParams } from '@angular/common/http';
import { OrderStatus } from './orders/order-status.enum';
import { OrderErrorType } from './orders/order-error-type.enum';

const DAY = 1000 * 60 * 60 * 24;

export class OrdersFilter {
    until?;
    since?: Date;
    channel? = 'all';
    tag? = 'all';
    limit = '25';
    search = '';
    status?: OrderStatus;
    errorType: OrderErrorType;

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
        if (this.tag && this.tag !== 'all') {
            params = params.set('tag', this.tag);
        }

        if (this.status) {
            params = params.set('status', this.status);
        }

        if (this.errorType) {
            params = params.set('errorType', this.errorType);
        }

        return params;
    }
}
