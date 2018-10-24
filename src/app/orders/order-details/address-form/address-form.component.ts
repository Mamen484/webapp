import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Address } from '../../../core/entities/orders/address';
import { ValidationErrorsSnackbarComponent } from '../../../shared/validation-errors-snackbar/validation-errors-snackbar.component';
import { MatSnackBar } from '@angular/material';
import { ServerValidationError } from '../../../core/entities/server-validation-error';
import { NgForm } from '@angular/forms';
import { ErrorSnackbarConfig } from '../../../core/entities/error-snackbar-config';

@Component({
    selector: 'sf-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

    @ViewChild(NgForm) form: NgForm;

    @Input() address: Address;

    @Input() set validationError(error) {
        this.validationMessages = new ServerValidationError(error);
        this.changeDetectorRef.detectChanges();
        for (let prop in this.validationMessages) {
            if (this.validationMessages.hasOwnProperty(prop)) {
                this.form.controls[prop].updateValueAndValidity();
            }
        }
    }

    @Output() onSave = new EventEmitter();
    @Output() reset = new EventEmitter();

    validationMessages;

    constructor(protected snackBar: MatSnackBar, protected changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    save(valid) {
        if (!valid) {
            this.snackBar.openFromComponent(ValidationErrorsSnackbarComponent, new ErrorSnackbarConfig());
            return;
        }
        this.onSave.emit();
    }

    unsetError(prop) {
        if (this.validationMessages && this.validationMessages[prop]) {
            delete this.validationMessages[prop];
        }
        this.changeDetectorRef.detectChanges();
        this.form.controls[prop].updateValueAndValidity();
    }
}
