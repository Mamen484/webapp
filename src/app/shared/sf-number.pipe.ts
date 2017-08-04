import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'sfNumber'
})
export class SfNumberPipe extends DecimalPipe implements PipeTransform {

  transform(value: any, digits?: string): any {
    return super.transform(value, digits).replace(/,/g, ' ');
  }

}
