import { TableOperations } from 'sfl-tools/table-operations';
import { EventEmitter, OnInit, Output, ViewChild, Directive } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/overlay';
import { ConfigurationState } from '../configuration-state';
import { PageEvent } from '@angular/material/paginator';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

interface ListItem {
    id: number;
}

@Directive()
export abstract class ListOperations<T extends ListItem> extends TableOperations<T> implements OnInit {

    @ViewChild(CdkScrollable, {static: true}) listContainer: CdkScrollable;
    @Output() updated = new EventEmitter();
    configurationState = ConfigurationState;
    /** matched categories */
    chosenListItem: T;
    /** applied filter */
    configurationOptions = ConfigurationState;
    configurationStateFilter: ConfigurationState;
    feedId: number;
    protected abstract matDialog: MatDialog;
    protected abstract route: ActivatedRoute;

    cancelFilter() {
        this.configurationStateFilter = ConfigurationState.NotSpecified;
        this.fetchData();
    }

    abstract chooseListItem(item: T);

    chooseNextListItem() {
        const index = this.dataSource.data.indexOf(this.chosenListItem);
        if (index < this.dataSource.data.length - 1) {
            this.chooseListItem(this.dataSource.data[index + 1]);
            return;
        }
        if (this.currentPage < (this.resultsLength / Number(this.pageSize) - 1)) {
            this.pageChanged({
                pageIndex: this.currentPage + 1,
                previousPageIndex: this.currentPage,
                pageSize: Number(this.pageSize),
                length: this.resultsLength
            });
        }
    }

    abstract listenCategoryMappingChanged();

    ngOnInit() {
        this.route.data.subscribe(({data}) => {
            this.feedId = data.feed.id;
            super.ngOnInit();
            this.listenCategoryMappingChanged();
        });

    }

    openFilterDialog() {
        this.matDialog.open(FilterDialogComponent, {data: this.configurationStateFilter}).afterClosed().subscribe(state => {
            if (typeof state !== 'undefined') {
                this.configurationStateFilter = state;
                this.fetchData();
            }
        });
    }

    pageChanged(event: PageEvent) {
        super.pageChanged(event);
        this.listContainer.scrollTo({top: 0});
    }

    updateData() {
        this.fetchData();
    }

    protected afterApplyingData() {
        super.afterApplyingData();
        this.updated.emit();

        if (!this.dataSource.data?.length) {
            return;
        }

        const listItem = this.chosenListItem
            && this.dataSource.data.find(cat => this.chosenListItem.id === cat.id)
            || this.dataSource.data[0];
        if (listItem) {
            this.chooseListItem(listItem);
        }
    }
}
