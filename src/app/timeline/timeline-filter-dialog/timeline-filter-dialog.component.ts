import { Component, OnInit } from '@angular/core';
import { TimelineTypeFilter } from '../../core/entities/timeline-type-filter.enum';
import { TimelineFilterData } from '../../core/entities/timeline-filter-data';
import { DateFilter } from '../../core/entities/date-filter.enum';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'sf-timeline-filter-dialog',
  templateUrl: './timeline-filter-dialog.component.html',
  styleUrls: ['./timeline-filter-dialog.component.scss']
})
export class TimelineFilterDialogComponent implements OnInit {

    public dateFilter: DateFilter;
    public typeFilter: TimelineTypeFilter;
    public dateSince: Date;
    public dateUntil: Date;
    public dateFilterOptions = DateFilter;
    public typeFilterOptions = TimelineTypeFilter;


    constructor(protected dialogRef: MatDialogRef<TimelineFilterDialogComponent>) {
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
