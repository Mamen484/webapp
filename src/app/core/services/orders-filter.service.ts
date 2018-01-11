import { Injectable } from '@angular/core';
import { OrdersFilter } from '../entities/orders-filter';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { cloneDeep } from 'lodash';

@Injectable()
export class OrdersFilterService {

    protected filter = new BehaviorSubject(new OrdersFilter());

    getFilter() {
        return this.filter.asObservable().map(filter => cloneDeep(filter));
    }

    setFilter(value: OrdersFilter) {
        this.filter.next(value);
    }

    patchFilter(field: string | {[field: string]: string}, value?) {
        if (typeof field === 'string') {
            this.filter.next(Object.assign(new OrdersFilter(), this.filter.getValue(), {[field]: value}));
        } else {
            this.filter.next(Object.assign(new OrdersFilter(), this.filter.getValue(), field));
        }

    }

}
