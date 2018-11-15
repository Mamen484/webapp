import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { SendRecoveryEmailComponent } from './send-recovery-email/send-recovery-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SflMenuModule } from 'sfl-shared/menu';
import { SflAuthModule } from 'sfl-shared/auth';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SflMenuModule,
        SflAuthModule,
    ],
    declarations: [LoginComponent, SendRecoveryEmailComponent, ResetPasswordComponent]
})
export class LoginModule {
}
