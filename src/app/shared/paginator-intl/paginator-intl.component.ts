import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
    selector: 'sf-paginator',
    template: `
        <span #container nextPageLabel="Next page" i18n-nextPageLabel
              previousPageLabel="Previous page" i18n-previousPageLabel
              itemsPerPageLabel="Items per page:" i18n-itemsPerPageLabel
              firstPageLabel="First page" i18n-firstPageLabel
              lastPageLabel="Last page" i18n-lastPageLabel
              rangeLabelCustom="of" i18n-rangeLabelCustom
        ></span>
        <mat-paginator [pageSize]="pageSize" [length]="length" [pageSizeOptions]="pageSizeOptions"
                       (page)="page.emit($event)" [pageIndex]="pageIndex"></mat-paginator>
    `
})
export class PaginatorIntlComponent extends MatPaginator implements OnInit {

    @ViewChild('container', {static: true}) container: ElementRef<HTMLSpanElement>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(protected matPaginatorIntl: MatPaginatorIntl, protected cdr: ChangeDetectorRef) {
        super(matPaginatorIntl, cdr);
    }


    ngOnInit() {
        this.matPaginatorIntl.itemsPerPageLabel = this.container.nativeElement.getAttribute('itemsPerPageLabel');
        this.matPaginatorIntl.nextPageLabel = this.container.nativeElement.getAttribute('nextPageLabel');
        this.matPaginatorIntl.previousPageLabel = this.container.nativeElement.getAttribute('previousPageLabel');
        this.matPaginatorIntl.firstPageLabel = this.container.nativeElement.getAttribute('firstPageLabel');
        this.matPaginatorIntl.lastPageLabel = this.container.nativeElement.getAttribute('lastPageLabel');
        this.matPaginatorIntl.getRangeLabel = this.getRangeLabel;
        this.matPaginatorIntl.changes.next();
    }

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        console.log(this);
        if (length == 0 || pageSize == 0) {
            return `0 ${this.container.nativeElement.getAttribute('rangeLabelCustom')} ${length}`;
        }

        length = Math.max(length, 0);

        const startIndex = page * pageSize;

        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;

        return `${startIndex + 1} – ${endIndex} ${this.container.nativeElement.getAttribute('rangeLabelCustom')} ${length}`;
    }
}
