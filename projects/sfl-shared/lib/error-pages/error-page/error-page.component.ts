import {Component, Input} from '@angular/core';

@Component({
    selector: 'sfl-error-page',
    styleUrls: ['./error-page.component.scss'],
    templateUrl: 'error-page.component.html',
})
export class SflErrorPageComponent {
    @Input() showLink = true;
}
