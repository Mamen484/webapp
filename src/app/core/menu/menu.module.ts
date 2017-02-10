import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu.component";
import { CommonModule } from "@angular/common";
import { AssetsModule } from "../assets/assets.module";

@NgModule({
    imports: [
        CommonModule,
        AssetsModule
    ],
    exports: [MenuComponent],
    declarations: [MenuComponent]
})
export class MenuModule { }