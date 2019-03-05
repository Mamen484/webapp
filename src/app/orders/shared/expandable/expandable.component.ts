import { Component, Input, OnInit } from '@angular/core';
import { matExpansionAnimations, MatExpansionPanelState } from '@angular/material';
import { CdkAccordionItem } from '@angular/cdk/accordion';

@Component({
    selector: 'sf-expandable',
    templateUrl: './expandable.component.html',
    styleUrls: ['./expandable.component.scss'],
    animations: [matExpansionAnimations.bodyExpansion],
})
export class ExpandableComponent extends CdkAccordionItem implements OnInit {

    @Input() expanded: MatExpansionPanelState = 'collapsed';

    getExpandedState(): MatExpansionPanelState {
        return this.expanded ? 'expanded' : 'collapsed';
    }

    ngOnInit() {
    }

}
