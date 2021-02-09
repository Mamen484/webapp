import { AfterContentInit, Component, ElementRef, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
    BlueCircledIcon,
    BlueIcon,
    DarkGreyIcon,
    FlagIcon,
    GreenIcon,
    Icon,
    LightBlueIcon,
    LightGreyIcon,
    NewIcon,
    StatusIcon
} from './icon';

@Component({
    selector: 'sfui-icon',
    template: `
        <ng-content></ng-content>`,
    styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit, AfterContentInit, OnChanges {

    @Input() type: 'basic' | 'circled' | 'status' | 'flag' = 'basic';
    @Input() color?: 'dark-grey' | 'light-grey' | 'green' | 'blue' | 'light-blue';
    @Input() name: keyof Icon | keyof NewIcon;

    constructor(private elementRef: ElementRef) {
    }

    @HostBinding(`class.sfui-icon-basic`) get basicType() {
        return this.type === 'basic';
    };

    @HostBinding(`class.sfui-icon-circled`) get circledType() {
        return this.type === 'circled';
    };

    @HostBinding(`class.sfui-icon-status`) get statusType() {
        return this.type === 'status';
    };

    @HostBinding(`class.sfui-icon-flag`) get flagType() {
        return this.type === 'flag';
    };

    private get iconSet() {
        if (this.type === 'status') {
            return StatusIcon;
        }
        if (this.type === 'flag') {
            return FlagIcon;
        }
        if (this.type === 'circled'){
            switch (this.color){
                default:
                    return BlueCircledIcon;
            }
        }
        switch (this.color) {
            case 'dark-grey':
                return DarkGreyIcon;

            case 'light-grey':
                return LightGreyIcon;

            case 'green':
                return GreenIcon;

            case 'blue':
                return BlueIcon;

            case 'light-blue':
                return LightBlueIcon;

            default:
                return Icon;
        }
    }

    ngOnInit(): void {
    }

    ngAfterContentInit() {
        this.elementRef.nativeElement.innerHTML = this.iconSet[this.name];
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.color) {
            this.ngAfterContentInit();
        }
    }

}
