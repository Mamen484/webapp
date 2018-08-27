import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFromNumber'
})
export class ArrayFromNumberPipe implements PipeTransform {

  transform(value: number): number[] {
    return Array(value).fill(0).map((val, index) => index + 1);
  }

}
