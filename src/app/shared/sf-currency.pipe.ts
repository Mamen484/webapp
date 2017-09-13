import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sfCurrency'
})
export class SfCurrencyPipe implements PipeTransform {

    transform(value: number, currency): string {
        switch (currency) {
            case 'USD':
                return '$' + value;

            case 'EUR':
                return value + ' €';

            default:
                return value + ' ' + currency;
        }
    }

}
