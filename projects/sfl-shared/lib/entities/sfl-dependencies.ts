import { InjectionToken } from '@angular/core';

export const SFL_BASE_HREF = new InjectionToken<string>('base.href');
export const SFL_LANGUAGE_OPTIONS = new InjectionToken<{[localization: string]: string}>('available.language.options');
export const SFL_DEFAULT_LANGUAGE = new InjectionToken<{[localization: string]: string}>('default.language');
export const SFL_API = new InjectionToken<string>('api.link');
export const SFL_APP_TOKEN = new InjectionToken<string>('app.authorization.token');
export const SFL_LEGACY_LINK = new InjectionToken<string>('link.to.legacy.app');
export const SFL_COUNTRIES_LIST_LINK = new InjectionToken<string>('link.to.countries.list.with.localized.names.and.images');
