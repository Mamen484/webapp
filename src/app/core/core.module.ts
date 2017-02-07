import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarModule } from "./progressbar/progressbar.module";

@NgModule({
  imports: [
    CommonModule,
    ProgressbarModule,
  ],
  exports: [
    ProgressbarModule
  ]
})
export class CoreModule { }
