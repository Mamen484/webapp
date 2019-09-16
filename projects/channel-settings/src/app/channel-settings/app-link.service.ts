import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SflUserService } from 'sfl-shared/services';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AppLinkService {

    constructor(protected userService: SflUserService) {
    }

    getLink(path) {
        return this.userService.fetchAggregatedInfo()
            .pipe(
                map(userInfo => `${environment.webappLink}${path}?token=${userInfo.token}`)
            );
    }
}
