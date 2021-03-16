import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeedService } from '../../../core/services/feed.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CategoryMappingService } from '../../shared/category-mapping.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ListOperations } from '../../shared/list-operations';
import { Product } from '../entities/product';

const CONFLICT_ERROR_CODE = 409;

@Component({
    selector: 'sf-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent extends ListOperations<Product> implements OnInit, OnDestroy {

    displayedColumns = ['image', 'reference', 'name', 'brand', 'status', 'icon'];

    protected categoryMappingSubscription;

    constructor(protected feedService: FeedService,
                protected matDialog: MatDialog,
                protected route: ActivatedRoute,
                protected categoryMappingService: CategoryMappingService) {
        super();
    }


    chooseListItem(product: Product) {
        this.chosenListItem = product;
        this.categoryMappingService.setCurrentMapping({
            catalogCategoryId: product.id,
            feedId: product.feedId,
            channelCategory: product.productMappedChannelCategory
        });
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
        return this.feedService.fetchProductCollection(this.feedId, {
            page: page.toString(),
            limit: limit.toString(),
            name: search,
            state: this.configurationStateFilter,
        }).pipe(
            map(products => ({total: products.total, dataList: products._embedded.product}),
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
