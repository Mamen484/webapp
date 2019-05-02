import { ngxZendeskWebwidgetConfig, ngxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';
import { environment } from '../../../environments/environment';

export class ZendeskConfig extends ngxZendeskWebwidgetConfig {
    accountUrl = environment.zeAccountLink;

    beforePageLoad(zE: ngxZendeskWebwidgetService): any {
        zE.hide();
    }

}
