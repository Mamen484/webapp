import { Component } from '@angular/core';
import { BillingGroupService } from './billing-group.service';
import { BillingGroup } from './billing-group';
import { map } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Group, GroupDialogComponent } from './group-dialog/group-dialog.component';
import { Observable } from 'rxjs';
import { get } from 'lodash';
import { TableOperations } from 'sfl-shared/utils/table-operations';

const SNACKBAR_MESSAGE_DURATION = 5000;

@Component({
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent extends TableOperations<BillingGroup> {

    displayedColumns: string[] = ['id', 'name', 'edit'];

    constructor(protected billingGroupService: BillingGroupService,
                protected matDialog: MatDialog,
                protected snackBar: MatSnackBar) {
        super();
    }

    openCreateGroupDialog() {
        this.openGroupDialog(
            group => this.billingGroupService.create(group),
            {name: '', stores: []}
        );
    }

    openEditGroupDialog(group) {
        this.openGroupDialog(
            editedGroup => this.billingGroupService.update(editedGroup),
            {id: group.id, name: group.name, stores: get(group, '_embedded.store', [])}
        );
    }


    openGroupDialog(onSave: (group: Group) => Observable<any>, group: Group) {
        this.matDialog.open(GroupDialogComponent,
            {
                data: {
                    group,
                    onSave
                }
            }
        ).afterClosed().subscribe(saved => {
            if (saved) {
                this.isLoadingResults = true;
                this.snackBar.open('The group has been saved successfully', '', {
                    duration: SNACKBAR_MESSAGE_DURATION,
                });
                this.fetchData();
            }
        });
    }

    protected fetchCollection(params) {
        return this.billingGroupService.fetchGroupCollection(params)
            .pipe(map(response => ({total: response.total, dataList: response._embedded.group})));
    }


}
