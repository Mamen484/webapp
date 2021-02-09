import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { SendRecoveryEmailComponent } from './send-recovery-email/send-recovery-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SflMenuModule } from 'sfl-shared/menu';
import { SflAuthModule } from 'sfl-shared/auth';
import { IconModule } from 'sfl-tools/src/lib/icon';
import { SfuiBannerModule, SfuiFormFieldModule, SfuiIconModule, SfuiLabelModule } from 'sfui';
import { DetectAutofillComponent } from './detect-autofill.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SflMenuModule,
        SflAuthModule,
        IconModule,
        SfuiBannerModule,
        SfuiFormFieldModule,
        SfuiLabelModule,
        SfuiIconModule,
    ],
    declarations: [LoginComponent, SendRecoveryEmailComponent, ResetPasswordComponent, DetectAutofillComponent]
})
export class LoginModule {
}
