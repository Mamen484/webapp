import { HttpParams } from '@angular/common/http';
import { OrderStatus } from './order-status.enum';
import { OrderErrorType } from './order-error-type.enum';
import { OrderAcknowledgment } from './order-acknowledgment.enum';

const DAY = 1000 * 60 * 60 * 24;

export class OrdersFilter {
    until?;
    since: Date = OrdersFilter.aMonthBefore();
    channel = 'all';
    tag = 'all';
    limit = '10';
    page = '1';
    search = '';
    status?: OrderStatus;
    error?: OrderErrorType;
    acknowledgment?: OrderAcknowledgment;

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

        if (this.search) {
            params = params.set('search', this.search);
        }
        if (this.tag && this.tag !== 'all') {
            params = params.set('tag', this.tag);
        }

        if (this.status) {
            params = params.set('status', this.status);
        }

        if (this.error) {
            params = params.set('error', this.error);
        }

        if (this.acknowledgment) {
            params = params.set('acknowledgment', this.acknowledgment);
        }

        if (this.page) {
            params = params.set('page', this.page);
        }

        return params;
    }


}
