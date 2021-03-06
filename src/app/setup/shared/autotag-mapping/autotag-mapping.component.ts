import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Autotag } from '../../autotag';
import { Subscription, throwError, zip } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsSavedSnackbarComponent } from '../settings-saved-snackbar/settings-saved-snackbar.component';
import { SuccessSnackbarConfig } from '../../../core/entities/success-snackbar-config';
import { NgForm } from '@angular/forms';
import { CategoryMappingService } from '../category-mapping.service';
import { catchError } from 'rxjs/operators';
import { AutotagFormStateService } from './autotag-form-state.service';
import { AutotagFormState } from './autotag-form-state.enum';
import { AttributesUpdateErrorSnackbarComponent } from './attributes-update-error-snackbar/attributes-update-error-snackbar.component';
import { ErrorSnackbarConfig } from '../../../core/entities/error-snackbar-config';
import { AutotagService } from './autotag-service';

@Component({
    selector: 'sf-autotag-mapping',
    templateUrl: './autotag-mapping.component.html',
    styleUrls: ['./autotag-mapping.component.scss']
})
export class AutotagMappingComponent implements OnInit, OnDestroy {

    @ViewChild(NgForm) form: NgForm;

    feedId: number;
    catalogCategoryId: number;
    channelCategoryId: number;

    @Output() autotagUpdated = new EventEmitter();
    @Output() autotagsLoaded = new EventEmitter();

    autotagList: Autotag[];
    optionalAutotagsList: Autotag[];
    subscription: Subscription;
    categoryMappingSubscription: Subscription;
    saveInProgress = false;
    fetchInProgress = false;

    constructor(protected snackbar: MatSnackBar,
                protected categoryMappingService: CategoryMappingService,
                protected stateService: AutotagFormStateService,
                private autotagService: AutotagService) {
    }

    ngOnInit() {
        this.categoryMappingSubscription = this.categoryMappingService.getCurrentMapping()
            .subscribe(({mapping}) => {
                if (this.channelCategoryId && this.channelCategoryId === mapping.channelCategory?.id
                    && this.catalogCategoryId === mapping.catalogCategoryId) {
                    return;
                }
                this.channelCategoryId = mapping.channelCategory?.id;
                this.catalogCategoryId = mapping.catalogCategoryId;
                this.feedId = mapping.feedId;
                this.autotagList = [];
                this.optionalAutotagsList = [];
                this.fetchAutotags();
                this.stateService.changeState(AutotagFormState.pristine);
            });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.categoryMappingSubscription) {
            this.categoryMappingSubscription.unsubscribe();
        }
    }

    saveMatching() {
        if (!this.autotagList.find(autotag => autotag.modified)
            && !this.optionalAutotagsList.find(autotag => autotag.modified)) {
            return;
        }
        this.saveInProgress = true;
        zip(...this.autotagList.concat(this.optionalAutotagsList).filter(autotag => autotag.modified)
            .map(autotag => this.autotagService.matchAutotag(
                this.feedId,
                this.catalogCategoryId,
                autotag.channelAttributeId,
                autotag.value
            ))).pipe(catchError(error => {
            this.snackbar.openFromComponent(AttributesUpdateErrorSnackbarComponent, new ErrorSnackbarConfig());
            return throwError(error);
        }))
            .subscribe(() => {
                this.saveInProgress = false;
                this.autotagUpdated.emit();
                this.snackbar.openFromComponent(SettingsSavedSnackbarComponent, new SuccessSnackbarConfig());
                this.stateService.changeState(AutotagFormState.pristine);
            }, () => this.saveInProgress = false);
    }

    setAutotagValue(autotag, value) {
        autotag.value = value;
        autotag.modified = true;
    }

    protected fetchAutotags() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.fetchInProgress = true;
        this.subscription = zip(
            this.autotagService.fetchAutotagList(this.feedId, this.catalogCategoryId, {requirement: 'required'}),
            this.autotagService.fetchAutotagList(this.feedId, this.catalogCategoryId, {requirement: 'optional'}),
        )
            .subscribe(([requiredResponse, optionalResponse]) => {
                this.fetchInProgress = false;
                this.autotagList = requiredResponse._embedded.autotag.filter(autotag => !autotag._embedded.attribute.defaultMapping);
                this.optionalAutotagsList = optionalResponse._embedded.autotag.filter(autotag => !autotag._embedded.attribute.defaultMapping);
                this.autotagsLoaded.emit();
            });
    }
}
