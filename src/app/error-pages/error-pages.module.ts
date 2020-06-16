import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedNotExistComponent } from './feed-not-exist/feed-not-exist.component';
import { ChannelNotExistComponent } from './channel-not-exist/channel-not-exist.component';
import { SflErrorPagesModule } from 'sfl-shared/error-pages';
import { ErrorPagesRoutingModule } from './error-pages-routing.module';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

@NgModule({
    declarations: [FeedNotExistComponent, ChannelNotExistComponent, AccessDeniedComponent],
    imports: [
        CommonModule,
        ErrorPagesRoutingModule,
        SflErrorPagesModule,
    ],
})
export class ErrorPagesModule {
}
