import { Component, Input, OnInit } from '@angular/core';
import { ChannelLanguage } from '../core/entities/channel-language.enum';
import { environment } from '../../environments/environment';
import { LocaleIdService } from '../core/services/locale-id.service';
import { toPairs } from 'lodash';


@Component({
    selector: 'sf-unauthenticated-menu',
    templateUrl: './unauthenticated-menu.component.html',
    styleUrls: ['./unauthenticated-menu.component.scss']
})
export class UnauthenticatedMenuComponent implements OnInit {

    @Input() displayFlags;

    localeId: keyof typeof ChannelLanguage;
    localizations = [];
    appUrl = environment.APP_URL;
    baseHref = environment.BASE_HREF;

    constructor(protected localeIdService: LocaleIdService) {
        this.localeId = this.localeIdService.localeId;
        this.localizations = toPairs(ChannelLanguage).filter(locale => locale[0] !== this.localeId);

    }

    ngOnInit() {
    }

}
