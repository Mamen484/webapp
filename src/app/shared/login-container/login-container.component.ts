import { Component, OnInit } from '@angular/core';
import { SflLocaleIdService } from 'sfl-shared/services';

@Component({
  selector: 'sf-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  baseHref;

  constructor(private localeIdService: SflLocaleIdService) {
  }

  ngOnInit(): void {
    this.baseHref = '/v3/' + this.localeIdService.localeId;
  }

}
