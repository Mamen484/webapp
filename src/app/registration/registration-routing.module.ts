import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopifyGuard } from '../core/guards/shopify.guard';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ShopSpecifiedGuard } from '../core/guards/shop-specified.guard';
import { RegistrationCacheGuard } from '../core/guards/registration-cache.guard';

const routes: Routes = [
    {
        path: 'shopify/authentify', canActivate: [ShopifyGuard], component: CreatePasswordComponent
    },
    {path: 'register', component: CreatePasswordComponent, canActivate: [ShopSpecifiedGuard, RegistrationCacheGuard]},
    {path: 'register/create-account', component: CreateAccountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
