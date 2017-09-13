import { Pipe, PipeTransform } from '@angular/core';
import * as cf from 'currency-formatter';

@Pipe({
    name: 'sfCurrency'
})
export class SfCurrencyPipe implements PipeTransform {


    transform(value: number, currency): string {
        return cf.format(value, {code: currency});
    }

}
