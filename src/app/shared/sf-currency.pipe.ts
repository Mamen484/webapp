import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sfCurrency'
})
export class SfCurrencyPipe implements PipeTransform {

    transform(value: number, symbol): string {
        switch (symbol) {
            case '$':
                return '$' + value;

            default:
                return value + ' ' + symbol
        }
    }

}
