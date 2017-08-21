import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
    selector: 'sf-menu-container',
    templateUrl: './menu-container.component.html',
    styleUrls: ['./menu-container.component.scss']
})
export class MenuContainerComponent implements OnInit {

    appUrl = environment.APP_URL;

    ngOnInit() {
    }

}
