import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ChannelService } from '../../../../core/services/channel.service';
import {
    AbstractControl,
    ControlValueAccessor,
    FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AutotagInputComponent } from '../autotag-input/autotag-input.component';
import { ChannelAttribute } from '../../../channel-attribute';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { PagedResponse } from 'sfl-shared/entities';
import { ChannelConstraint } from '../../../../core/entities/channel-constraint';
import { OverlayActiveService } from '../../overlay-active.service';

const SEARCH_DEBOUNCE = 200;

@Component({
    selector: 'sf-autotag-dropdown',
    templateUrl: './autotag-dropdown.component.html',
    styleUrls: ['./autotag-dropdown.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AutotagDropdownComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => AutotagDropdownComponent),
            multi: true,
        },
    ],
})
export class AutotagDropdownComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

    @ViewChild(AutotagInputComponent) input: AutotagInputComponent;

    @Input() value: string;
    @Input() attribute: ChannelAttribute;
    @Input() required: true;
    @Input() autofocus = false;

    @Output() changed = new EventEmitter<string>();
    onChange: (value: string) => any;
    subscription: Subscription;

    options: string[];
    control = new FormControl();

    // pagination
    currentPage = 1;
    hasNextPage = false;
    loadingNextPage = false;

    constructor(protected channelService: ChannelService, public overlayActiveService: OverlayActiveService) {
    }

    ngOnInit() {
        this.subscription = this.control.valueChanges.pipe(
            debounceTime(SEARCH_DEBOUNCE),
            startWith(''),
            switchMap(name =>
                this.channelService.fetchChannelConstraintCollection(this.attribute.taxonomyId, this.attribute.constraintGroupId, name)
            ),
        )
            .subscribe((response: PagedResponse<{ constraint: ChannelConstraint[] }>) => {
                this.options = response._embedded.constraint.map(constraint => constraint.label);
                this.updatePaginator(response.page, response.pages);
            });
    }

    loadNextPage(event) {
        event.stopPropagation();
        this.loadingNextPage = true;
        this.channelService.fetchChannelConstraintCollection(
            this.attribute.taxonomyId
            , this.attribute.constraintGroupId,
            this.control.value,
            {page: String(this.currentPage + 1)})
            .subscribe((response: PagedResponse<{ constraint: ChannelConstraint[] }>) => {
                this.options.push( ... response._embedded.constraint.map(constraint => constraint.label));
                this.updatePaginator(response.page, response.pages);
            });
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(): void {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.control.errors;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    protected updatePaginator(currentPage, pagesTotal) {
        this.currentPage = +currentPage;
        this.hasNextPage = +pagesTotal > this.currentPage;
        this.loadingNextPage = false;
    }

}
