import { HttpParams } from '@angular/common/http';
import { OrderStatus } from './order-status.enum';
import { OrderErrorType } from './order-error-type.enum';
import { OrderAcknowledgment } from './order-acknowledgment.enum';
import { OrdersView } from './orders-view.enum';
import { ViewToPatchMap } from './view-to-patch-map';

export const DAY = 1000 * 60 * 60 * 24;

export class OrdersFilter {
    until?;
    since: Date;
    channel: number | string = 'all';
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

    static subtractFromTheDate(date: Date, milliseconds: number) {
        return new Date(date.getTime() - milliseconds);
    }

    static aWeekBefore() {
        let date = new Date().getTime() - 7 * DAY;
        return new Date(date);
    }

    static currentMonth() {
        const date = new Date();
        return new Date(date.getFullYear(), date.getMonth());
    }

    static aMonthBefore() {
        let date = new Date().getTime() - 30 * DAY;
        return new Date(date);
    }

    static getRecentByView(view: OrdersView) {
        return Object.assign(new OrdersFilter({limit: 1, since: OrdersFilter.aMonthBefore()}), ViewToPatchMap[view]);
    }

    constructor(filter = {}) {
        for (let field in filter) {
            if (filter.hasOwnProperty(field)) {
                this[field] = filter[field];
            }
        }
    }

    /**
     * Check if any of specified filters have been applied
     *
     * @param propNames
     */
    isActive(propNames: string[]): boolean {
        return propNames.some(propName => {
            switch (propName) {
                case 'channel':
                case 'tag':
                    return Boolean(this[propName] && this[propName] !== 'all');

                default:
                    return Boolean(this[propName]);
            }
        });
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
            params = params.set('channelId', String(this.channel));
        }

        if (this.search) {
            params = params.set('search', this.search);
        }
        if (this.tag && this.tag !== 'all') {
            params = params.set('tagName', this.tag);
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
