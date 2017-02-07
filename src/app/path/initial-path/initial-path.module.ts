import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePasswordComponent } from "./create-password/create-password.component";
import { RouterModule } from "@angular/router";
import { PlateformComponent } from './plateform/plateform.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CreatePasswordService } from "./create-password/create-password.service";
import { CreatePasswordServiceMock } from "./create-password/create-password.service.mock";
import {FormsModule} from "@angular/forms";
import {CoreModule} from "../../core/core.module";

const initialPathRoutes = [
  {path: 'path/initial', component: CreatePasswordComponent},
  {path: 'path/initial/create-account', component: CreateAccountComponent},
  {path: 'path/initial/welcome', component: WelcomeComponent},
  {path: 'path/initial/plateform', component: PlateformComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(initialPathRoutes),
    FormsModule,
    CoreModule
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    {provide: CreatePasswordService, useClass: CreatePasswordServiceMock}
  ],
  declarations: [CreatePasswordComponent, PlateformComponent, WelcomeComponent, CreateAccountComponent]
})
export class InitialPathModule { }
