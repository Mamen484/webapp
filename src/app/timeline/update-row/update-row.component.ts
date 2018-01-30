import { Component, Input } from '@angular/core';
import { TimelineUpdate } from '../../core/entities/timeline-update';
import { TimelineUpdateAction } from '../../core/entities/timeline-update-action.enum';
import { TimelineUpdateName } from '../../core/entities/timeline-update-name.enum';

@Component({
    selector: 'sf-update-row',
    templateUrl: './update-row.component.html',
    styleUrls: ['./update-row.component.scss']
})
export class UpdateRowComponent {

    @Input() update: TimelineUpdate;

    updateTypes = TimelineUpdateName;
    updateActions = TimelineUpdateAction;

    constructor() {
    }
}
