import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarModule } from "./progressbar/progressbar.module";
import { MenuModule } from "./menu/menu.module";
import { AssetsModule } from "./assets/assets.module";
import { ChannelModule } from "./channel/channel.module";
import {ConfigModule} from "./config/config.module";

@NgModule({
  imports: [
    CommonModule,
    ProgressbarModule,
    MenuModule,
    AssetsModule,
    ChannelModule,
    ConfigModule
  ],
  exports: [
    ProgressbarModule,
    MenuModule,
    AssetsModule,
    ChannelModule,
    ConfigModule
  ],
  declarations: [],
})
export class CoreModule { }
