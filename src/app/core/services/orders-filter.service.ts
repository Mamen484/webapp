import { Injectable } from '@angular/core';
import { OrdersFilter } from '../entities/orders-filter';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class OrdersFilterService {

    protected filter = new BehaviorSubject(new OrdersFilter());

    constructor() {
    }

    getFilter() {
        return this.filter.asObservable();
    }

    setFilter(value: OrdersFilter) {
        this.filter.next(value);
    }

    patchFilter(field, value) {
        this.filter.next(Object.assign(new OrdersFilter(), this.filter.getValue(), {[field]: value}));
    }

}
