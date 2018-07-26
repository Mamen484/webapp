import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from '../../../core/entities/orders/address';
import { ValidationErrorsSnackbarComponent } from '../../../shared/validation-errors-snackbar/validation-errors-snackbar.component';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'sf-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

    @Input() address: Address;
    @Output() onSave = new EventEmitter();
    @Output() reset = new EventEmitter();

    constructor(protected snackBar: MatSnackBar) {
    }

    ngOnInit() {
    }

    save(valid) {
        if (!valid) {
            this.snackBar.openFromComponent(ValidationErrorsSnackbarComponent, {
                duration: 5000,
                panelClass: 'sf-snackbar-error',
            });
            return;
        }
        this.onSave.emit();
    }

}
