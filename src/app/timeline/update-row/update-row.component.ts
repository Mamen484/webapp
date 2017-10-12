import { Component, Input, OnInit } from '@angular/core';
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

    // TOFIX: refactor duplicated logic from suggested-channel
    getChannelLink() {
        return this.update._embedded.channel.type === 'marketplace'
            ? `/${this.update._embedded.channel.name}`
            : `/${this.update._embedded.channel.type}/manage/${this.update._embedded.channel.name}`;
    }

}
