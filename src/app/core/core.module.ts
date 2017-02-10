import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarModule } from "./progressbar/progressbar.module";
import { MenuModule } from "./menu/menu.module";
import { AssetsModule } from "./assets/assets.module";

@NgModule({
  imports: [
    CommonModule,
    ProgressbarModule,
    MenuModule,
    AssetsModule
  ],
  exports: [
    ProgressbarModule,
    MenuModule,
    AssetsModule
  ],
})
export class CoreModule { }
