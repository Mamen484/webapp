import { Component, Inject, Input, LOCALE_ID, OnInit, Optional } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'sf-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

    @Input() source: string;
    @Input() alt = '';
    @Input() width = 'auto';
    @Input() verticalAlign = 'middle';

    baseHref = '';

    constructor(@Inject(LOCALE_ID) protected localeId) {
        if (environment.production !== 'false') {
            this.baseHref = `${environment.BASE_HREF}/${localeId}/`;
        }
    }

    ngOnInit() {
    }

}
