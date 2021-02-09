import { Component, Input, OnInit } from '@angular/core';
import { matExpansionAnimations, MatExpansionPanelState } from '@angular/material/expansion';
import { CdkAccordionItem } from '@angular/cdk/accordion';

@Component({
    selector: 'sf-expandable',
    templateUrl: './expandable.component.html',
    styleUrls: ['./expandable.component.scss'],
    animations: [matExpansionAnimations.bodyExpansion],
})
export class ExpandableComponent extends CdkAccordionItem implements OnInit {

    @Input()
    private _isExpanded: MatExpansionPanelState = 'collapsed';
    public get expanded(): MatExpansionPanelState {
        return this._isExpanded;
    }
    public set expanded(value: MatExpansionPanelState) {
        this._isExpanded = value;
    }

    getExpandedState(): MatExpansionPanelState {
        return this.expanded ? 'expanded' : 'collapsed';
    }

    ngOnInit() {
    }

}
