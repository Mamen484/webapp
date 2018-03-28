import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TimelineFilter } from '../../core/entities/timeline-filter';
import { TimelineFilterData } from '../../core/entities/timeline-filter-data';
import { TimelineFilterDialogComponent } from '../timeline-filter-dialog/timeline-filter-dialog.component';
import { MatDialog } from '@angular/material';
import { TimelineTypeFilter } from '../../core/entities/timeline-type-filter.enum';
import { DateFilter } from '../../core/entities/date-filter.enum';

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
