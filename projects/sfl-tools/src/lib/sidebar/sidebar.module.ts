import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SftSidebarComponent, SftSidebarWebComponent } from './sidebar.component';
import { MatListModule } from '@angular/material/list';
import { FlexModule } from '@angular/flex-layout';
import { SfuiExpandableModule, SfuiIconModule, SfuiOverlayModule } from 'sfui';
import { SflSidebarModule } from 'sfl-shared/sidebar';
import { LogoModule } from 'sfl-tools/src/lib/logo';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SflSharedModule } from 'sfl-shared';
import { MatMenuModule } from '@angular/material/menu';
import { StoreLinkPipe, StoreLinkWebPipe } from './store-link.pipe';

const imports = [
    SflSidebarModule,
    CommonModule,
    MatListModule,
    FlexModule,
    LogoModule,
    MatButtonModule,
    SflSharedModule,
    MatMenuModule,
    SfuiOverlayModule,
];

@NgModule({
    imports: [...imports, SfuiExpandableModule, SfuiIconModule],
    declarations: [SftSidebarComponent, StoreLinkPipe],
    exports: [SftSidebarComponent],
})
export class SftSidebarModule {
}

@NgModule({
    imports,
    declarations: [SftSidebarWebComponent, StoreLinkWebPipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [SftSidebarWebComponent],
})
export class SftSidebarWebModule {
}
