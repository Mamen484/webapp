import { SflWebappLinkService } from 'sfl-shared/services';
import { HttpParams } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class WebappLinkService extends SflWebappLinkService {

    constructor(private router: Router) {
        super();
    }

    setLink(elementRef: ElementRef, path: string, params: HttpParams, hash: string): any {
        elementRef.nativeElement.onclick = () => {
            this.router.navigate([path]);
        }
    }
}
