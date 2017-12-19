import { Component, Input } from '@angular/core';

@Component({
    selector: 'sf-menu-container',
    templateUrl: './menu-container.component.html',
    styleUrls: ['./menu-container.component.scss']
})
export class MenuContainerComponent {
    @Input() logo = 'assets/images/SF_white.svg';
    @Input() logoWidth = 23;
}
