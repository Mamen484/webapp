import { Component, Inject, Input, OnInit } from '@angular/core';
import { SFL_BASE_HREF } from 'sfl-shared/entities';
import { SflLocaleIdService } from 'sfl-shared/services';

@Component({
    selector: 'sfl-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

    @Input() source: string;
    @Input() alt = '';
    @Input() width = 'auto';
    @Input() verticalAlign = 'middle';

    baseHref = '';

    constructor(protected localeIdService: SflLocaleIdService, @Inject(SFL_BASE_HREF) baseHref) {
        this.baseHref = `${baseHref}/${localeIdService.localeId}/`;
    }

    ngOnInit() {
    }

}
