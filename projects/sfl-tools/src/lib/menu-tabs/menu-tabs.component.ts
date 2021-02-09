import { AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SflAuthService } from 'sfl-shared/services';
import { Store } from '@ngrx/store';
import { SET_ROUTE } from 'sfl-shared/reducers';
import { MatTabNav } from '@angular/material/tabs';
import { filter } from 'rxjs/operators';
import { SftMenuTab } from './tool-tabs.enum';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'sft-menu-tabs',
    templateUrl: './menu-tabs.component.html',
    styleUrls: ['./menu-tabs.component.scss'],
})
export class MenuTabsComponent implements OnInit, AfterViewInit {

    @ViewChild(MatTabNav) tabNav: MatTabNav;

    @Input() bar: 'catalog' | 'rules' | 'analytics' | 'settings' | 'channels';
    @Input() activeTab: SftMenuTab;
    @Input() apiLinkRef: TemplateRef<any>;
    showTabs = false;
    tabs = SftMenuTab;
    storeId: number;
    baseHref;
    _dispatchRouteName = true;

    constructor(private authService: SflAuthService,
                private appStore: Store<any>,
                private elementRef: ElementRef) {
    }



    @Input() set dispatchRouteName(value) {
        this._dispatchRouteName = coerceBooleanProperty(value);
    };

    ngOnInit(): void {
        if (!this.bar) {
            throw Error('Specify the tabs bar to be displayed');
        }

        if (this._dispatchRouteName) {
            this.appStore.dispatch({type: SET_ROUTE, routeName: this.bar});
        }

        this.appStore.select('currentStore')
            .pipe(filter(store => Boolean(store)))
            .subscribe(store => this.storeId = store.id);
    }

    ngAfterViewInit() {
        const activeElement: HTMLLinkElement = this.elementRef.nativeElement.querySelector('.mat-tab-label-active');
        const nextPageButton: HTMLElement = this.elementRef.nativeElement.querySelector('.mat-tab-header-pagination-after');
        if (!activeElement || !nextPageButton) {
            return;
        }
        if (activeElement.getClientRects().item(0)?.right > nextPageButton.getClientRects().item(0)?.left) {
            nextPageButton.click();
        }
    }

    logout() {
        this.authService.logout();
    }

}
