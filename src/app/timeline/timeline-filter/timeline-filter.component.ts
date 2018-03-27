import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DateFilter } from '../../core/entities/date-filter.enum';
import { TimelineTypeFilter } from '../../core/entities/timeline-type-filter.enum';
import { TimelineFilterData } from '../../core/entities/timeline-filter-data';

@Component({
    selector: 'sf-timeline-filter',
    templateUrl: './timeline-filter.component.html',
    styleUrls: ['./timeline-filter.component.scss']
})
export class TimelineFilterComponent implements OnInit {

    public dateFilter: DateFilter;
    public typeFilter: TimelineTypeFilter;
    public dateSince: Date;
    public dateUntil: Date;
    public dateFilterOptions = DateFilter;
    public typeFilterOptions = TimelineTypeFilter;


    constructor(protected dialogRef: MatDialogRef<TimelineFilterComponent>) {
    }

    ngOnInit() {
    }

    cancel() {
        this.dialogRef.close(null);
    }

    accept() {
        this.dialogRef.close(<TimelineFilterData>{
            dateFilter: this.dateFilter,
            typeFilter: this.typeFilter,
            dateSince: this.dateSince,
            dateUntil: this.dateUntil,
        });
    }

    setSince(date) {
        this.dateSince = new Date(date);
    }

    setUntil(date) {
        this.dateUntil = new Date(date);
    }

}
