import { Component, Inject, Input } from '@angular/core';
import { SFL_BASE_HREF, SFL_LANGUAGE_OPTIONS } from 'sfl-shared/entities';
import { toPairs } from 'lodash';
import { SflLocaleIdService } from 'sfl-shared/services';


@Component({
    selector: 'sfl-unauthenticated-menu',
    templateUrl: './unauthenticated-menu.component.html',
    styleUrls: ['./unauthenticated-menu.component.scss']
})
export class UnauthenticatedMenuComponent {

    @Input() displayFlags;

    localeId;
    localizations = [];

    constructor(protected localeIdService: SflLocaleIdService,
                @Inject(SFL_BASE_HREF) public baseHref,
                @Inject(SFL_LANGUAGE_OPTIONS) protected languageOptions) {
        this.localeId = this.localeIdService.localeId;
        this.localizations = toPairs(this.languageOptions).filter(locale => locale[0] !== this.localeId);
    }

}
