import { Component, Inject, Input, OnInit } from '@angular/core';
import { SFL_BASE_HREF, SFL_LANGUAGE_OPTIONS } from 'sfl-shared/src/lib/entities';
import { toPairs } from 'lodash';
import { SflLocaleIdService } from 'sfl-shared/src/lib/services';


@Component({
    selector: 'sfl-unauthenticated-menu',
    templateUrl: './unauthenticated-menu.component.html',
    styleUrls: ['./unauthenticated-menu.component.scss']
})
export class UnauthenticatedMenuComponent implements OnInit {

    @Input() displayFlags;

    localeId;
    localizations = [];

    constructor(protected localeIdService: SflLocaleIdService,
                @Inject(SFL_BASE_HREF) public baseHref,
                @Inject(SFL_LANGUAGE_OPTIONS) protected languageOptions) {
        this.localeId = this.localeIdService.localeId;
        this.localizations = toPairs(this.languageOptions).filter(locale => locale[0] !== this.localeId);
    }

    ngOnInit() {
    }

}
