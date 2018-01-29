import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderline'
})
export class RemoveUnderlinePipe implements PipeTransform {

  transform(value: string, args?: any): any {
      return value.replace(/_/g, ' ');
  }

}
