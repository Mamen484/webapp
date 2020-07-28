import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeedCategory } from '../../../core/entities/feed-category';
import { Observable, of } from 'rxjs';
import { FeedService } from '../../../core/services/feed.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CategoryMappingService } from '../../shared/category-mapping.service';
import { catchError, map } from 'rxjs/operators';
import { ListOperations } from '../../shared/list-operations';

const CONFLICT_ERROR_CODE = 409;

@Component({
    selector: 'sf-feed-categories-list',
    templateUrl: './feed-categories-list.component.html',
    styleUrls: ['./feed-categories-list.component.scss']
})
export class FeedCategoriesListComponent extends ListOperations<FeedCategory> implements OnInit, OnDestroy {
    displayedColumns = ['name', 'status', 'icon'];

    protected categoryMappingSubscription;

    constructor(protected feedService: FeedService,
                protected matDialog: MatDialog,
                protected route: ActivatedRoute,
                protected categoryMappingService: CategoryMappingService) {
        super();
    }


    chooseListItem(category: FeedCategory) {
        this.chosenListItem = category;
        this.categoryMappingService.setCurrentMapping({catalogCategoryId: category.id, feedId: category.feedId, channelCategory: category.channelCategory});
    }


    listenCategoryMappingChanged() {
        if (this.categoryMappingSubscription) {
            this.categoryMappingSubscription.unsubscribe();
        }
        this.categoryMappingSubscription = this.categoryMappingService.getChanges()
            .subscribe(channelCategory => this.fetchData());
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        if (this.categoryMappingSubscription) {
            this.categoryMappingSubscription.unsubscribe();
        }
    }

    protected fetchCollection({limit, page, search}: { limit: number; page: number; search: string }): Observable<{ total: number; dataList: any[] }> {
        return this.feedService.fetchCategoryCollection(this.feedId, {
            page: page.toString(),
            limit: limit.toString(),
            name,
            state: this.configurationStateFilter,
        }).pipe(
            map(categories => ({total: categories.total, dataList: categories._embedded.category}),
                catchError(error => {
                    if (error.status === CONFLICT_ERROR_CODE) {
                        this.currentPage = page - 1;
                        this.fetchData();
                    }
                    return of({total: 0, dataList: []});
                })
            )
        );
    }
}
