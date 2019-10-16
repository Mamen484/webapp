import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SflUserService } from 'sfl-shared/services';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ChannelOperatorsAppLinkService {

    constructor(protected userService: SflUserService) {
    }

    getLink(path, params = new URLSearchParams()) {
        return this.userService.fetchAggregatedInfo()
            .pipe(
                map(userInfo => {
                    params.set('token', userInfo.token);
                    return `${environment.channelOperatorLink}${path}?${params.toString()}`
                })
            );
    }
}
