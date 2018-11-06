import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SflMenuModule, SflAuthModule } from 'sfl-shared';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SflMenuModule,
        SflAuthModule,
        LoginRoutingModule,
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}
