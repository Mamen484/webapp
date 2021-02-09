import { Optional, Pipe, PipeTransform } from '@angular/core';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { filter, map, mergeMap, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Pipe({
    name: 'storeLink'
})
export class StoreLinkPipe implements PipeTransform {

    constructor(private windowRef: SflWindowRefService, private userService: SflUserService, @Optional() private router: Router) {
    }

    transform(storeId: number): Observable<string> {
        const location = this.windowRef.nativeWindow.location;
        const params = new URLSearchParams(location.search);
        const events = this.router?.events ? this.router.events.pipe(filter(event => event instanceof NavigationEnd)) : of({});
        return events.pipe(
            startWith({}),
            mergeMap(() => this.userService.fetchAggregatedInfo()),
            map((userInfo => {
                params.set('store', storeId.toString());
                params.set('token', userInfo.token);
                return location.origin + location.pathname + '?' + params.toString() + location.hash;
            }))
        );
    }

}

@Pipe({
    name: 'storeLink'
})
export class StoreLinkWebPipe extends StoreLinkPipe implements PipeTransform {}
