import { HttpParams } from '@angular/common/http';
import { ElementRef } from '@angular/core';

export abstract class SflWebappLinkService {
    abstract setLink(elementRef: ElementRef, path: string, params: HttpParams, hash: string);
}
