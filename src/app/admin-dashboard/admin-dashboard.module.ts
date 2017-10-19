import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuModule } from '../menu/menu.module';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { SearchStoreComponent } from './search-store/search-store.component';
import { SidebarModule } from '../sidebar/sidebar.module';

@NgModule({
    imports: [
        CommonModule,
        AdminDashboardRoutingModule,
        SharedModule,
        MenuModule,
    ],
    declarations: [DashboardComponent, AdminMenuComponent, SearchStoreComponent]
})
export class AdminDashboardModule {
}
