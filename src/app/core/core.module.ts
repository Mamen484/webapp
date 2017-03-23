import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarModule } from "./progressbar/progressbar.module";
import { MenuModule } from "./menu/menu.module";
import { ChannelModule } from "./channel/channel.module";

@NgModule({
  imports: [
    CommonModule,
    ProgressbarModule,
    MenuModule,
    ChannelModule,
  ],
  exports: [
    ProgressbarModule,
    MenuModule,
    ChannelModule,
  ],
  declarations: [],
})
export class CoreModule { }
