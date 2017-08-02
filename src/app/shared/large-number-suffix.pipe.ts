import { Pipe, PipeTransform } from '@angular/core';

const fractionDigits = 2;

@Pipe({
    name: 'largeNumberSuffix'
})
export class LargeNumberSuffixPipe implements PipeTransform {

    transform(value: number, args?: any): string {

        if (value < 1e3) {
            return this.toFixed(value);
        }

        if (value < 1e6) {
            return this.toFixed(value / 1e3) + 'K';
        }
        return this.toFixed(value / 1e6) + 'M';
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
