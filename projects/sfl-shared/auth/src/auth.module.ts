import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SflLoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressBarModule } from '@angular/material';

/**
 * Visual authentication components
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

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
