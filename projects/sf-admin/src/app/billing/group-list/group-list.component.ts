import { Component } from '@angular/core';
import { BillingGroupService } from './billing-group.service';
import { BillingGroup } from './billing-group';
import { BillingTableOperations } from '../billing-table-operations/billing-table-operations';
import { map } from 'rxjs/operators';

const SNACKBAR_MESSAGE_DURATION = 5000;

@Component({
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent extends BillingTableOperations {

    dataSource: BillingGroup[];
    displayedColumns: string[] = ['id', 'name', 'edit'];

    constructor(protected billingGroupService: BillingGroupService) {
        super();
    }

    protected fetchCollection(params) {
        return this.billingGroupService.fetchGroupCollection(params)
            .pipe(map(response => ({total: response.total, dataList: response._embedded.group})));
    }

    openCreateGroupDialog() {

    }

    openEditStoreDialog() {

    }


}
