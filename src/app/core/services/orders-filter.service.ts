import { Injectable } from '@angular/core';
import { OrdersFilter } from '../entities/orders/orders-filter';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { cloneDeep } from 'lodash';
import { OrdersFilterPatch } from '../entities/orders/orders-filter-patch';

@Injectable()
export class OrdersFilterService {

    protected filter = new BehaviorSubject(new OrdersFilter());

    getFilter() {
        return this.filter.asObservable().pipe(map(filter => cloneDeep(filter)));
    }

    setFilter(value: OrdersFilter) {
        this.filter.next(value);
    }

    patchFilter(field: string | OrdersFilterPatch, value?) {
        if (typeof field === 'string') {
            this.filter.next(Object.assign(new OrdersFilter(), this.filter.getValue(), {[field]: value}));
        } else {
            this.filter.next(Object.assign(new OrdersFilter(), this.filter.getValue(), field));
        }

    }

}
