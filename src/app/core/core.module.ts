import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarModule } from './progressbar/progressbar.module';
import { MenuModule } from './menu/menu.module';
import { ChannelModule } from './channel/channel.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { UserService } from './services/user.service';

@NgModule({
    imports: [
        CommonModule,
        ProgressbarModule,
        MenuModule,
        ChannelModule,
        SidebarModule,
    ],
    exports: [
        ProgressbarModule,
        MenuModule,
        SidebarModule,
        ChannelModule,
    ],
    providers: [
        UserService,
    ],
    declarations: [],
})
export class CoreModule {
}
