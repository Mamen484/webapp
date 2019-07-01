import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, flatMap, switchMap } from 'rxjs/operators';
import { Category } from '../../../core/entities/category';
import { ChannelService } from '../../../core/services/channel.service';
import { FeedService } from '../../../core/services/feed.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';

const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;

@Component({
    selector: 'sf-category-mapping',
    templateUrl: './category-mapping.component.html',
    styleUrls: ['./category-mapping.component.scss']
})
export class CategoryMappingComponent implements OnInit {

    @Input() searchChannelCategoryValue = '';
    @Input() catalogCategoryId;
    @Input() feedId;
    @Input() channelId;
    @Output() categoryMappingChanged = new EventEmitter();

    searchChannelCategoryControl = new FormControl();
    chosenChannelCategory: Category;
    channelCategoryOptions: Category[] = [];


    constructor(protected channelService: ChannelService,
                protected feedService: FeedService,
                protected appStore: Store<AppState>) {
    }

    displayFn(category: Category) {
        return category ? category.name : undefined;
    }

    ngOnInit() {
        this.listenChannelCategorySearch();
    }

    resetMatching() {
        this.searchChannelCategoryControl.reset();
        this.chosenChannelCategory = undefined;
    }

    saveMatching() {
        if (!this.chosenChannelCategory) {
            return;
        }
        this.feedService.mapFeedCategory(this.feedId, this.catalogCategoryId, this.chosenChannelCategory.id)
            .subscribe(() => {
                this.resetMatching();
                this.categoryMappingChanged.emit();
            });

    }

    protected listenChannelCategorySearch() {
        this.searchChannelCategoryControl.valueChanges.pipe(
            debounceTime(SEARCH_DEBOUNCE),
            filter(searchQuery => searchQuery && searchQuery.length >= MIN_QUERY_LENGTH),
            switchMap(name =>
                this.appStore.select('currentStore').pipe(
                    flatMap(store => this.channelService.getChannelCategories(this.channelId, {name, country: store.country})))
            ),
        )
            .subscribe(response => this.channelCategoryOptions = response._embedded.category);
    }

}
