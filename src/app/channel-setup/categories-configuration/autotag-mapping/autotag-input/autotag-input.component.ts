import { Component, Input, OnInit } from '@angular/core';
import { Autotag } from '../../../autotag';
import { FeedService } from '../../../../core/services/feed.service';
import { MappingCollection } from '../../../mapping-collection';

@Component({
    selector: 'sf-autotag-input',
    templateUrl: './autotag-input.component.html',
    styleUrls: ['./autotag-input.component.scss']
})
export class AutotagInputComponent implements OnInit {

    @Input() autotag: Autotag;
    value = '';
    mappingCollection: MappingCollection;
    suggestions: string[];

    constructor(protected feedService: FeedService) {
    }

    ngOnInit() {
        this.value = this.autotag.value;
        this.feedService.fetchMappingCollection()
            .subscribe(mappingCollection => this.mappingCollection = mappingCollection);
    }

    createSuggestions() {
        this.suggestions = this.mappingCollection._embedded.mapping
            .filter(m => m.catalogField.toLowerCase().includes(this.value.toLowerCase()))
            .map(m => `{${m.catalogField}}`);
        this.suggestions.push(`[${this.value}]`);
    }

    setAutotagValue(value: string) {
        console.log(value);
        this.autotag.value = value[0] === '{' ? value.substring(1, value.length - 1) : value;
    }

}
