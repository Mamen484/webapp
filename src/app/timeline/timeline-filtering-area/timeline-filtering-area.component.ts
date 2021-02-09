import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TimelineFilter } from '../../../../projects/sfl-shared/lib/entities/timeline-filter';
import { TimelineFilterData } from '../../../../projects/sfl-shared/lib/entities/timeline-filter-data';
import { TimelineFilterDialogComponent } from '../timeline-filter-dialog/timeline-filter-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TimelineTypeFilter } from '../../../../projects/sfl-shared/lib/entities/timeline-type-filter.enum';
import { DateFilter } from 'sfl-shared/entities';

@Component({
    selector: 'sf-timeline-filtering-area',
    templateUrl: './timeline-filtering-area.component.html',
    styleUrls: ['./timeline-filtering-area.component.scss']
})
export class TimelineFilteringAreaComponent implements OnInit {

    @Output() public filterChanged = new EventEmitter();

    activeFilter = new TimelineFilterData();
    dateFilterOptions = DateFilter;
    typeOptions = TimelineTypeFilter;

    constructor(protected dialog: MatDialog) {
    }

    ngOnInit() {
    }

    notifyChanges() {
        this.filterChanged.emit({filter: TimelineFilter.createFrom(this.activeFilter), isActive: this.activeFilter.isActive});
    }

    public openFilterDialog() {
        this.dialog.open(TimelineFilterDialogComponent)
            .afterClosed()
            .subscribe((data: TimelineFilterData) => {
                if (this.dialogCanceled(data)) {
                    return;
                }
                this.activeFilter.applyValue(data);
                this.notifyChanges();
            });
    }

    protected dialogCanceled(data) {
        return data === null;
    }

}
