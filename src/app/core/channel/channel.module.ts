import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelLogoService } from "./channel_logo.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
      ChannelLogoService
  ],
})
export class ChannelModule { }
