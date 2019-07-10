import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BillingStore } from '../../store-list/billing-store';

export interface Group {
    id?: number;
    name: string;
    stores: BillingStore[];
}

@Component({
    selector: 'sfa-group-dialog',
    templateUrl: './group-dialog.component.html',
    styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {

    @ViewChild(NgForm, {static: true}) form: NgForm;

    searchControl = new FormControl();
    storeSearchResults;
    onSave: (group: Group) => Observable<any>;
    processing = false;
    serverError: string;
    group: Group;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { group: Group, onSave: (group: Group) => Observable<any> }, protected matDialogRef: MatDialogRef<GroupDialogComponent>) {
        this.group = data.group;
        this.onSave = data.onSave;
    }

    ngOnInit() {
    }

    addStore(store: BillingStore) {
        if (this.group.stores.find(s => s.id === store.id)) {
            return;
        }
        this.group.stores.push(store);
    }

    remove(index) {
        this.group.stores.splice(index, 1);
    }

    save() {
        if (this.processing) {
            return;
        }
        this.serverError = undefined;
        if (!this.group.name) {

            return;
        }
        this.processing = true;
        this.onSave(this.group).subscribe(() => {
            this.processing = false;
            this.matDialogRef.close(true);
        }, error => {
            this.serverError = error;
            this.processing = false;
        });

    }

}
