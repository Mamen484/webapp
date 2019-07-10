import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FeedService } from '../../../core/services/feed.service';
import { Autotag } from '../../autotag';
import { zip } from 'rxjs';

@Component({
    selector: 'sf-autotag-mapping',
    templateUrl: './autotag-mapping.component.html',
    styleUrls: ['./autotag-mapping.component.scss']
})
export class AutotagMappingComponent implements OnInit, OnChanges {

    @Input() feedId: number;
    @Input() catalogCategoryId: number;

    @Output() autotagUpdated = new EventEmitter();
    @Output() autotagsLoaded = new EventEmitter();

    autotagList: Autotag[];

    constructor(protected feedService: FeedService) {
    }

    ngOnInit() {
        this.fetchAutotags();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.fetchAutotags();
    }

    fetchAutotags() {
        this.feedService.fetchAutotagByCategory(this.feedId, this.catalogCategoryId).subscribe(response => {
            this.autotagList = response._embedded.autotag.filter(autotag => autotag._embedded.attribute.isRequired);
            this.autotagsLoaded.emit();
        });
    }

    resetMatching() {

    }

    saveMatching() {
        zip(...this.autotagList.map(autotag => this.feedService.matchAutotagByCategory(
            this.feedId,
            this.catalogCategoryId,
            autotag.channelAttributeId,
            autotag.value
        )))
            .subscribe(() => this.autotagUpdated.emit());
    }

}
