import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarModule } from "./progressbar/progressbar.module";
import { MenuModule } from "./menu/menu.module";
import { AssetsModule } from "./assets/assets.module";
import { ChannelModule } from "./channel/channel.module";

@NgModule({
  imports: [
    CommonModule,
    ProgressbarModule,
    MenuModule,
    AssetsModule,
    ChannelModule,
  ],
  exports: [
    ProgressbarModule,
    MenuModule,
    AssetsModule,
    ChannelModule,
  ],
  declarations: [],
})
export class CoreModule { }
