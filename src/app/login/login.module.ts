import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MenuModule } from '../menu/menu.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        MenuModule,
        SharedModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}
