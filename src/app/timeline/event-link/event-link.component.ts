import { Component, Input, OnInit } from '@angular/core';
import { TimelineEventName } from '../../../../projects/sfl-shared/lib/entities/timeline-event-name.enum';
import { TimelineEventAction } from '../../../../projects/sfl-shared/lib/entities/timeline-event-action.enum';
import { TimelineErrorReason } from '../../../../projects/sfl-shared/lib/entities/timeline-error-reason';
import { TimelineEvent } from '../../../../projects/sfl-shared/lib/entities/timeline-event';

@Component({
    selector: 'sf-event-link',
    templateUrl: './event-link.component.html',
    styleUrls: ['./event-link.component.scss']
})
export class EventLinkComponent implements OnInit {


    @Input() event: TimelineEvent;
    actions = TimelineEventAction;
    names = TimelineEventName;
    ruleName: string;
    unknownReason = false;

    constructor() {
    }

    ngOnInit() {
        this.ruleName = this.event.name === TimelineEventName.ruleTransformation || this.event.name === TimelineEventName.ruleSegmentation
            ? this.event.data.name
            : '';

        this.unknownReason = this.checkReason();
    }

    checkReason() {
        return !this.event.data || !this.event.data.reason ||
            (<TimelineErrorReason[]>['open', 'categories', 'products', 'check', 'references', 'mapping', 'settings'])
                .indexOf(this.event.data.reason) === -1;
    }

}
