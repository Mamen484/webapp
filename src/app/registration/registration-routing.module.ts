import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { ShopSpecifiedGuard } from './guards/shop-specified.guard';
import { RegistrationCacheGuard } from './guards/registration-cache.guard';
import { LoginContainerComponent } from '../shared/login-container/login-container.component';

const routes: Routes = [
    {
        path: '', component: LoginContainerComponent, children: [
            {
                path: '', component: CreatePasswordComponent,
                canActivate: [ShopSpecifiedGuard, RegistrationCacheGuard]
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegistrationRoutingModule {
}
