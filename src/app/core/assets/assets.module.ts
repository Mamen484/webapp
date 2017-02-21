import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetPipe } from "./asset.pipe";
import {ConfigModule} from "../config/config.module";

@NgModule({
  imports: [
    CommonModule,
    ConfigModule,
  ],
  exports: [AssetPipe],
  declarations: [AssetPipe]
})
export class AssetsModule { }
