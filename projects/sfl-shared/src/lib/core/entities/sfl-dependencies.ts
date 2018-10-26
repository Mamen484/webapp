import { InjectionToken } from '@angular/core';

export const SFL_BASE_HREF = new InjectionToken<string>('base.href');
export const SFL_LANGUAGE_OPTIONS = new InjectionToken<{[localization: string]: string}>('available.language.options');
