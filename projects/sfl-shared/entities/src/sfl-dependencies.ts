import { InjectionToken } from '@angular/core';

export const SFL_BASE_HREF = new InjectionToken<string>('base.href');
export const SFL_LANGUAGE_OPTIONS = new InjectionToken<{[localization: string]: string}>('available.language.options');
export const SFL_API = new InjectionToken<string>('api.link');
export const SFL_APP_TOKEN = new InjectionToken<string>('app.authorization.token');
