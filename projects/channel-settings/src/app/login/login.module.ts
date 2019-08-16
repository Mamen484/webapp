import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SflMenuModule } from 'sfl-shared/menu';
import { SflAuthModule } from 'sfl-shared/auth';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SflMenuModule,
    SflAuthModule,
  ],
})
export class LoginModule { }
