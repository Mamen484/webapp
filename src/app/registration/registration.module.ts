import { NgModule } from '@angular/core';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { RouterModule } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SharedModule } from '../shared/shared.module';
import { MenuModule } from '../menu/menu.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationLegacyModule } from '../registration-legacy/registration-legacy.module';

@NgModule({
    imports: [
        SharedModule,
        RegistrationRoutingModule,
        MenuModule,
        RegistrationLegacyModule,
    ],
    exports: [
        RouterModule,
    ],
    declarations: [
        CreatePasswordComponent,
        CreateAccountComponent,
    ]
})
export class RegistrationModule {
}
