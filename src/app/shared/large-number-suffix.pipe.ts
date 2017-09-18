import { Pipe, PipeTransform } from '@angular/core';
import { LargeNumberFormat } from '../core/entities/large-number-format';

const fractionDigits = 2;

@Pipe({
    name: 'largeNumberSuffix'
})
export class LargeNumberSuffixPipe implements PipeTransform {

    transform(value: number, returnObject = false): string | LargeNumberFormat {

        let number = this.formatNumber(value);

        if (returnObject) {
            return number;
        }

        return number.number + number.suffix;

    }

    protected formatNumber(value) {
        let number: LargeNumberFormat = {
            number: '0',
            suffix: ''
        };

        if (value < 1e3) {
            number.number = this.toFixed(value);
        } else if (value < 1e6) {
            number.number = this.toFixed(value / 1e3);
            number.suffix = 'K';
        } else {
            number.number = this.toFixed(value / 1e6);
            number.suffix = 'M';
        }

        return number;
    }

    /**
     * Convert the number to fixed value with precision not more then fractionDigits const value
     *
     * @param number
     */
    protected toFixed(number: number): string {
        return (+number.toFixed(fractionDigits)).toString();
    }

}
