import { NgModule } from '@angular/core';
import { FeedNotExistComponent } from './feed-not-exist/feed-not-exist.component';
import { ChannelNotExistComponent } from './channel-not-exist/channel-not-exist.component';
import { RouterModule } from '@angular/router';

const routes = [
    {path: 'feed-not-found', component: FeedNotExistComponent},
    {path: 'channel-not-found', component: ChannelNotExistComponent},
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ErrorPagesRoutingModule {
}
