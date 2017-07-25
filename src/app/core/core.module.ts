import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarModule } from './progressbar/progressbar.module';
import { MenuModule } from './menu/menu.module';
import { ChannelModule } from './channel/channel.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { UserService } from './services/user.service';
import { StoreModule } from '@ngrx/store';
import { FlexLayoutModule } from '@angular/flex-layout';
import { currentStoreReducer } from './reducers/current-store';
import { userInfoReducer } from './reducers/user-info-reducer';
import { aggregatedUserInfoMock } from '../../mocks/AggregatedUserInfoMock';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

@NgModule({
    imports: [
        CommonModule,
        ProgressbarModule,
        MenuModule,
        ChannelModule,
        SidebarModule,
        StoreModule.forRoot({userInfo: userInfoReducer, currentStore: currentStoreReducer}),
        FlexLayoutModule
    ],
    exports: [
        ProgressbarModule,
        MenuModule,
        SidebarModule,
        ChannelModule,
        FlexLayoutModule
    ],
    providers: [
        UserService,
        // {provide: UserService, useValue: {fetchAggregatedInfo: () => Observable.of(aggregatedUserInfoMock)}},
    ],
    declarations: []
})
export class CoreModule {
}
