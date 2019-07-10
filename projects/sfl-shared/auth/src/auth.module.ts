import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SflLoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SflImageModule } from 'sfl-shared/utils/image';

/**
 * Visual authentication components
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SflImageModule,

        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
    ],
    declarations: [SflLoginFormComponent],
    exports: [SflLoginFormComponent],
})
export class SflAuthModule {
}
