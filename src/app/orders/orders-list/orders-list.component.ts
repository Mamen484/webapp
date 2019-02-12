import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
    selector: 'sf-orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent implements OnInit {

    isMobile: boolean;
    constructor(protected media: MediaObserver) {
    }

    ngOnInit() {

        this.isMobile = this.media.isActive('xs');
        this.media.media$.subscribe(() => {
            this.isMobile = this.media.isActive('xs');
        });
    }
}
