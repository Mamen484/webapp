import { NgModule } from '@angular/core';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationLegacyModule } from '../registration-legacy/registration-legacy.module';
import { SflMenuModule } from 'sfl-shared/menu';

@NgModule({
    imports: [
        SharedModule,
        RegistrationRoutingModule,
        RegistrationLegacyModule,
        SflMenuModule,
    ],
    exports: [
        RouterModule,
    ],
    declarations: [
        CreatePasswordComponent,
    ]
})
export class RegistrationModule {
}
