import { Component, Input } from '@angular/core';
import { StoreChannel } from '../../core/entities/store-channel';
import { WindowRefService } from '../../core/services/window-ref.service';
import { LegacyLinkService } from '../../core/services/legacy-link.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';

@Component({
    selector: 'sf-configured-channel',
    templateUrl: './configured-channel.component.html',
    styleUrls: ['./configured-channel.component.scss']
})
export class ConfiguredChannelComponent {

    @Input() channel: StoreChannel;

    constructor(protected windowRef: WindowRefService,
                protected legacyLinkService: LegacyLinkService,
                protected appStore: Store<AppState>) {
    }

    goToLegacy(path) {
        this.appStore.select('currentStore').take(1).subscribe(currentStore =>
            this.windowRef.nativeWindow.location.href = this.legacyLinkService.getLegacyLink(path)
        );
    }

}
