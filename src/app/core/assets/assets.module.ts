import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AssetPipe} from "./asset.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [AssetPipe],
  declarations: [AssetPipe]
})
export class AssetsModule { }
