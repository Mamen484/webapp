import { Component, Input, OnInit } from '@angular/core';
import { ChannelService } from '../../../../core/services/channel.service';
import { Autotag } from '../../../autotag';

@Component({
    selector: 'sf-autotag-dropdown',
    templateUrl: './autotag-dropdown.component.html',
    styleUrls: ['./autotag-dropdown.component.scss']
})
export class AutotagDropdownComponent implements OnInit {

    @Input() autotag: Autotag;
    options: string[];

    constructor(protected channelService: ChannelService) {
    }

    ngOnInit() {
        const attribute = this.autotag._embedded.attribute;
        this.channelService.fetchChannelConstraintCollection(attribute.taxonomyId, attribute.constraintGroupId)
            .subscribe(response => {
                this.options = response._embedded.constraint.map(constraint => constraint.label);
            })
    }

}
