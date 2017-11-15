import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import {enableDebugTools} from '@angular/platform-browser';

if (environment.production === 'true') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
