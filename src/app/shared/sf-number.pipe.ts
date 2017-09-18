import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
    name: 'sfNumber'
})
export class SfNumberPipe implements PipeTransform {

    constructor(protected _decimalPipe: DecimalPipe) {

    }

    transform(value: any, digits?: string): any {
        return this._decimalPipe.transform(value, digits).replace(/,/g, ' ');
    }

}
