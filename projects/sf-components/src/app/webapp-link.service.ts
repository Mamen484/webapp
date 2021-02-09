import { ElementRef, Injectable } from '@angular/core';
import { SflWebappLinkService } from 'sfl-shared/services';
import { HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class WebappLinkService extends SflWebappLinkService {
    setLink(elementRef: ElementRef, path: string, params: HttpParams, hash: string): any {

        let link = environment.webAppLink + path;
        if (params.keys()) {
            link = link + '?' + params.toString();
        }
        if (hash) {
            link = link + '#' + hash;
        }
        elementRef.nativeElement.href = link;
    }
}
