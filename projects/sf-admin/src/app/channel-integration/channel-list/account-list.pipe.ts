import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'accountList'
})
export class AccountListPipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        return value
            ? value.map(({account}) => account.name).join(', ')
            : '';
    }

}
