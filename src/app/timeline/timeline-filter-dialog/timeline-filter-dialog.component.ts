import { Component, OnInit } from '@angular/core';
import { TimelineTypeFilter } from '../../../../projects/sfl-shared/lib/entities/timeline-type-filter.enum';
import { TimelineFilterData } from '../../../../projects/sfl-shared/lib/entities/timeline-filter-data';
import { MatDialogRef } from '@angular/material/dialog';
import { DateFilter } from 'sfl-shared/entities';

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
