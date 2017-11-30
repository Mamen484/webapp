import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuModule } from '../menu/menu.module';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { SearchStoreComponent } from './search-store/search-store.component';
import { SidebarModule } from '../sidebar/sidebar.module';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserCreatedDialogComponent } from './user-created-dialog/user-created-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        AdminDashboardRoutingModule,
        SharedModule,
        MenuModule,
        SidebarModule,
    ],
    declarations: [
        DashboardComponent,
        AdminMenuComponent,
        SearchStoreComponent,
        AdminBaseComponent,
        CreateUserComponent,
        UserCreatedDialogComponent
    ],
    entryComponents: [UserCreatedDialogComponent]
})
export class AdminDashboardModule {
}
