import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ShopSpecifiedGuard } from './guards/shop-specified.guard';
import { RegistrationCacheGuard } from './guards/registration-cache.guard';

const routes: Routes = [
    {path: '', component: CreatePasswordComponent, canActivate: [ShopSpecifiedGuard, RegistrationCacheGuard]},
    {path: 'create-account', component: CreateAccountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
