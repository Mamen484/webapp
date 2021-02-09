import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';

export const scrollAuditTime = 500; // ms
export const scrollOffset = 500; // px

@Directive({
    selector: '[sfScrollHandler]'
})
export class ScrollHandlerDirective implements OnInit {

    @Output() scrolledToBottom = new EventEmitter();

    constructor(private scrollDispatcher: ScrollDispatcher) {
    }

    ngOnInit() {
        this.scrollDispatcher.scrolled(scrollAuditTime).subscribe((scrollable: CdkScrollable) => {
            const element = scrollable.getElementRef().nativeElement;
            if (element.scrollHeight - element.scrollTop - element.clientHeight < scrollOffset) {
                this.scrolledToBottom.emit();
            }
        });
    }

}
