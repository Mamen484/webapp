import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MenuModule } from '../menu/menu.module';
import { SharedModule } from '../shared/shared.module';
import { SendRecoveryEmailComponent } from './send-recovery-email/send-recovery-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
    imports: [
        CommonModule,
        MenuModule,
        SharedModule
    ],
    declarations: [LoginComponent, SendRecoveryEmailComponent, ResetPasswordComponent]
})
export class LoginModule {
}
