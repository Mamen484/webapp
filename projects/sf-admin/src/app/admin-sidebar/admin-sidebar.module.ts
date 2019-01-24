import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './admin-sidebar.component';
import { SearchStoreComponent } from './search-store/search-store.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfaSharedModule } from '../shared/shared.module';
import { SflSidebarModule } from 'sfl-shared/sidebar';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AdminSidebarComponent,
        SearchStoreComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SfaSharedModule,
        SflSidebarModule,
    ],
    exports: [
        AdminSidebarComponent,
    ]
})
export class AdminSidebarModule {
}
