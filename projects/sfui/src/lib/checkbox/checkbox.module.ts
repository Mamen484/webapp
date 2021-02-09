import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfuiCheckboxComponent } from './checkbox.component';



@NgModule({
  declarations: [SfuiCheckboxComponent],
  imports: [
    CommonModule
  ],
  exports: [SfuiCheckboxComponent],
})
export class SfuiCheckboxModule { }
