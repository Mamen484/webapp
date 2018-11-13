import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SflAuthService } from './auth.service';
import { SflLoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { ModuleImportGuard } from 'sfl-shared/entities';

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
    static forRoot() {
        return <ModuleWithProviders>{
            ngModule: SflAuthModule,
            providers: [
                SflAuthService,
            ]
        }
    }

    constructor(@Optional() @SkipSelf() parentModule?: SflAuthModule) {
        ModuleImportGuard.throwIfAlreadyLoaded(parentModule, 'SflAuthModule');
    }
}
