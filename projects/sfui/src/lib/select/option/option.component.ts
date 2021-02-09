import { AfterContentInit, Component, ElementRef, Inject, InjectionToken, Input, Optional } from '@angular/core';
import { SfuiSelectComponent } from '../select.component';
import { SfuiSelectRegister } from '../select-register.service';

export const SFUI_OPTION_PARENT = new InjectionToken('the parent element of sfui-option');

@Component({
    selector: 'sfui-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.scss'],
    providers: [],
})
export class SfuiOptionComponent implements AfterContentInit {

    @Input() value = '';
    private autoselected = false;

    constructor(@Optional() @Inject(SFUI_OPTION_PARENT) public parent: SfuiSelectComponent,
                private elementRef: ElementRef<HTMLElement>,
                private selectRegister: SfuiSelectRegister,
    ) {
    }

    @Input() set selected(value: any) {
        this.autoselected = true;
    }

    ngAfterContentInit() {
        if (!this.parent) {
            const id = this.elementRef.nativeElement.parentElement.parentElement.getAttribute('sfui-id');
            if (id) {
                this.parent = this.selectRegister.selects.get(id);
            }
        }
        if (this.parent.value && this.parent.value === this.value || this.autoselected && !this.parent.value) {
            this.optionSelected();
        }
    }

    optionSelected() {
        if (this.parent) {
            this.parent.selectedOption = {
                value: this.value,
                displayedValue: this.elementRef.nativeElement.textContent,
            };
            this.parent.opened = false;
        }
    }

}
