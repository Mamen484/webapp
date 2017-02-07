import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProgressbarButtonComponent} from "./progressbar-button.component";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ProgressbarButtonComponent],
  declarations: [ProgressbarButtonComponent]
})
export class ProgressbarButtonModule { }
