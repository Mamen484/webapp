import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu.component";
import { CommonModule } from "@angular/common";
import {MdIconModule, MdInputModule, MdMenuModule, MdSidenavModule, MdToolbarModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MdIconModule,
        MdToolbarModule,
        MdIconModule,
        MdInputModule,
        MdMenuModule,
        MdSidenavModule,
    ],
    exports: [MenuComponent],
    declarations: [MenuComponent]
})
export class MenuModule { }
