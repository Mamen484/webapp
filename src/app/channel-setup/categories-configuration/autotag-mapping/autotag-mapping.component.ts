import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FeedService } from '../../../core/services/feed.service';
import { Autotag } from '../../autotag';
import { zip } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { SettingsSavedSnackbarComponent } from '../settings-saved-snackbar/settings-saved-snackbar.component';
import { SuccessSnackbarConfig } from '../../../core/entities/success-snackbar-config';
import { NgForm } from '@angular/forms';
import { CategoryMappingService } from '../category-mapping/category-mapping.service';
import { MappingCacheService } from '../mapping-cache.service';

@Component({
    selector: 'sf-autotag-mapping',
    templateUrl: './autotag-mapping.component.html',
    styleUrls: ['./autotag-mapping.component.scss']
})
export class AutotagMappingComponent implements OnInit, OnChanges {

    @ViewChild(NgForm, {static: false}) form: NgForm;

    @Input() feedId: number;
    @Input() catalogCategoryId: number;
    @Input() channelCategoryId: number;

    @Output() autotagUpdated = new EventEmitter();
    @Output() autotagsLoaded = new EventEmitter();

    autotagList: Autotag[];
    hasCachedMapping = false;

    constructor(protected feedService: FeedService,
                protected snackbar: MatSnackBar,
                protected categoryMappingService: CategoryMappingService,
                protected mappingCacheService: MappingCacheService) {
    }

    ngOnInit() {
        this.fetchAutotags();
        this.categoryMappingService.getState().subscribe(() => this.ngOnChanges({}));
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.autotagList = [];
        this.fetchAutotags();
        this.hasCachedMapping = this.mappingCacheService.hasAutotagMapping(this.channelCategoryId);
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

    usePreviousMapping() {
        this.mappingCacheService.getAutotagMapping(this.channelCategoryId)
            .subscribe(autotag => this.autotagList = autotag);
    }

    protected fetchAutotags() {
        this.feedService.fetchAutotagByCategory(this.feedId, this.catalogCategoryId).subscribe(response => {
            this.autotagList = response._embedded.autotag.filter(autotag => autotag._embedded.attribute.isRequired);
            this.autotagsLoaded.emit();
        });
    }

}
