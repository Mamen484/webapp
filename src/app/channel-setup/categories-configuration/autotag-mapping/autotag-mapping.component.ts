import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FeedService } from '../../../core/services/feed.service';
import { Autotag } from '../../autotag';
import { Subscription, zip } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { SettingsSavedSnackbarComponent } from '../settings-saved-snackbar/settings-saved-snackbar.component';
import { SuccessSnackbarConfig } from '../../../core/entities/success-snackbar-config';
import { NgForm } from '@angular/forms';
import { CategoryMappingService } from '../category-mapping/category-mapping.service';
import { MappingCacheService } from '../mapping-cache.service';
import { Category } from '../../../core/entities/category';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'sf-autotag-mapping',
    templateUrl: './autotag-mapping.component.html',
    styleUrls: ['./autotag-mapping.component.scss']
})
export class AutotagMappingComponent implements OnInit, OnChanges, OnDestroy {

    @ViewChild(NgForm, {static: false}) form: NgForm;

    @Input() feedId: number;
    @Input() catalogCategoryId: number;
    @Input() channelCategoryId: number;

    @Output() autotagUpdated = new EventEmitter();
    @Output() autotagsLoaded = new EventEmitter();
    @Output() nextClicked = new EventEmitter();

    autotagList: Autotag[];
    hasCachedMapping = false;
    loadedFields = 0;
    loadingPreviousMapping = false;
    subscription: Subscription;

    constructor(protected feedService: FeedService,
                protected snackbar: MatSnackBar,
                protected categoryMappingService: CategoryMappingService,
                protected mappingCacheService: MappingCacheService) {
    }

    ngOnInit() {
        this.fetchAutotags();
        this.categoryMappingService.getState().pipe(filter(category => category.id !== this.channelCategoryId))
            .subscribe((category: Category) => {
                this.channelCategoryId = category.id;
                this.ngOnChanges({})
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.autotagList = [];
        this.loadedFields = 0;
        this.loadingPreviousMapping = false;
        this.hasCachedMapping = this.mappingCacheService.hasAutotagMapping(this.channelCategoryId);
        this.fetchAutotags();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    saveMatching() {
        // force fields validation
        for (let i in this.form.controls) {
            if (this.form.controls.hasOwnProperty(i)) {
                this.form.controls[i].updateValueAndValidity();
            }
        }
        zip(...this.autotagList.map(autotag => this.feedService.matchAutotagByCategory(
            this.feedId,
            this.catalogCategoryId,
            autotag.channelAttributeId,
            autotag.value
        )))
            .subscribe(() => {
                this.mappingCacheService.addAutotagMapping(this.channelCategoryId, this.catalogCategoryId, this.feedId);
                this.autotagUpdated.emit();
                this.snackbar.openFromComponent(SettingsSavedSnackbarComponent, new SuccessSnackbarConfig());
            });
    }

    markLoadingProgress() {
        this.loadedFields += 1;
        if (this.loadedFields === this.autotagList.length) {
            this.loadingPreviousMapping = false;
            this.autotagsLoaded.emit();
        }
    }

    usePreviousMapping() {
        this.loadingPreviousMapping = true;
        this.loadedFields = 0;
        this.mappingCacheService.getAutotagMapping(this.channelCategoryId)
            .subscribe(autotag => this.autotagList = this.filterMandatory(autotag));
    }

    protected fetchAutotags() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = this.feedService.fetchAutotagByCategory(this.feedId, this.catalogCategoryId).subscribe(response => {
            this.autotagList = this.filterMandatory(response._embedded.autotag);
            if (!this.autotagList.length) {
                // no autotag to emit a (loaded) event, so notify that all autotags are loaded
                this.autotagsLoaded.emit();
            }
        });
    }

    protected filterMandatory(autotag: Autotag[]) {
        return autotag.filter(({_embedded}) => _embedded.attribute.isRequired && !_embedded.attribute.defaultMapping);
    }

}
