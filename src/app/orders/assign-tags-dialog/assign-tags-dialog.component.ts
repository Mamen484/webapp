import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { Tag } from '../../core/entities/tag';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { flatten, uniq } from 'lodash';
import { TagsService } from '../../core/services/tags.service';
import { flatMap } from 'rxjs/operators';
import { of, zip } from 'rxjs';
import { OrdersTableItem } from '../../core/entities/orders/orders-table-item';

@Component({
    selector: 'sf-assign-tags-dialog',
    templateUrl: './assign-tags-dialog.component.html',
    styleUrls: ['./assign-tags-dialog.component.scss']
})
export class AssignTagsDialogComponent implements OnInit {

    assignedTags = [];
    tags: Tag[];
    protected tagsToAdd: Tag[] = [];
    protected tagsToRemove: Tag[] = [];

    constructor(protected appStore: Store<AppState>,
                @Inject(MAT_DIALOG_DATA) public data: { orders: OrdersTableItem[] },
                protected tagsService: TagsService,
                protected matDialogRef: MatDialogRef<AssignTagsDialogComponent>,
                protected snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.appStore.select('tags').subscribe(tags => this.tags = tags);
        this.findAssignedTags();
    }

    /**
     * Display the selected tag among assigned tags list.
     * Schedule to assign the tag to selected orders on click on 'Save' button.
     * Check if we stated previously that we want to unassign this tag from all selected orders:
     * if so, then remove from the list of tags to unassign.
     *
     * @param {Tag} tag
     */
    assignTag(tag: Tag) {
        if (this.assignedTags.indexOf(tag) === -1) {
            this.assignedTags.push(tag);
        }
        this.tagsToAdd.push(tag);
        const indexToRemove = this.tagsToRemove.indexOf(tag);
        if (indexToRemove !== -1) {
            this.tagsToRemove.splice(indexToRemove, 1);
        }
    }

    close() {
        this.matDialogRef.close();
    }

    /**
     * Send both requests for assign/anussign simultaneously
     */
    save() {
        this.appStore.select('currentStore')
            .pipe(flatMap(store => zip(
                this.prepareAssignRequest(store.id),
                this.prepareUnassignRequest(store.id)
            )))
            .subscribe(() => this.matDialogRef.close(
                this.tagsToAdd.length > 0 || this.tagsToRemove.length > 0
                ),
                error => this.snackBar.open(error.message, '', {
                    panelClass: 'sf-snackbar-error',
                    duration: 5000,
                }));
    }

    /**
     * Remove the selected tag from assigned tags list.
     * Schedule to unassign the tag from selected orders on click on 'Save' button.
     * Check if we stated previously that we want to assign this tag to all selected orders:
     * if so, then remove from the list of tags to assign.
     *
     * @param {Tag} tag
     */
    unassignTag(tag: Tag) {
        this.assignedTags.splice(this.assignedTags.indexOf(tag), 1);
        this.tagsToRemove.push(tag);
        const indexToAdd = this.tagsToAdd.indexOf(tag);
        if (indexToAdd !== -1) {
            this.tagsToAdd.splice(indexToAdd, 1);
        }
    }

    /**
     * Walk the orders and find all the tags that are currently assigned.
     */
    protected findAssignedTags() {
        let tagIds = uniq(flatten(this.data.orders
            .filter(order => order.tags)
            .map(order => order.tags.map(tag => tag.id))
        ));
        this.assignedTags = this.tags.filter(tag => tagIds.indexOf(tag.id) !== -1);
    }

    /**
     * Ensure that we want send the assign request if we don't have tags to assign.
     *
     * @param storeId
     * @returns {Observable<Object> | Observable<{}>}
     */
    protected prepareAssignRequest(storeId) {
        return this.tagsToAdd.length
            ? this.tagsService.assignTags(storeId, this.tagsToAdd, this.data.orders.map(({id}) => id))
            : of({});
    }

    /**
     * Ensure that we want send the assign request if we don't have tags to unassign.
     *
     * @param storeId
     * @returns {Observable<Object> | Observable<{}>}
     */
    protected prepareUnassignRequest(storeId) {
        return this.tagsToRemove.length
            ? this.tagsService.unassignTags(storeId, this.tagsToRemove, this.data.orders.map(({id}) => id))
            : of({});
    }

}
