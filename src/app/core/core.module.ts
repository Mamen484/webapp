import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProgressbarButtonModule} from "./progressbar-button/progressbar-button.module";

@NgModule({
  imports: [
    CommonModule,
    ProgressbarButtonModule,
  ],
  exports: [
    ProgressbarButtonModule
  ]
})
export class CoreModule { }
