import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../../../../../src/app/core/entities/country';

@Component({
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

    formGroup = new FormGroup({
        login: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        channelName: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        exportType: new FormControl('', Validators.required),

        // exportType = XML
        xmlHead: new FormControl(),
        xmlProductTag: new FormControl(),

        // exportType = CSV
        csvSeparator: new FormControl(),
        csvRoundTrip: new FormControl(),
        headerInFirstRaw: new FormControl(),
    });

    countriesList;

    constructor() {
    }

    ngOnInit() {
    }

    displayFn(country: Country) {
        return country.name;
    }

    save() {
        console.log(this.formGroup);
    }
}
