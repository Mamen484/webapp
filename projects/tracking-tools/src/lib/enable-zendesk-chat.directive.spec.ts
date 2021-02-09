import { EnableZendeskChatDirective } from './enable-zendesk-chat.directive';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../src/app/core/entities/app-state';
import { ngxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';
import { Renderer2 } from '@angular/core';

describe('EnableZendeskChatDirective', () => {
    let store: jasmine.SpyObj<Store<AppState>>;
    let zendeskService: jasmine.SpyObj<ngxZendeskWebwidgetService>;
    let directive: EnableZendeskChatDirective;
    let renderer: jasmine.SpyObj<Renderer2>;

    beforeEach(() => {
        zendeskService = jasmine.createSpyObj('ngxZendeskWebwidgetService spy', ['setLocale', 'setSettings', 'show']);
        store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
        renderer = jasmine.createSpyObj(['addClass']);
        directive = new EnableZendeskChatDirective(store, zendeskService, renderer);
        directive.localeId = 'en';
    });
    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should show zendesk chat if a store has a chat permission', () => {
        store.select.and.returnValue(of({id: 'some_id', permission: {chat: '*'}}));
        directive.ngOnInit();
        expect(zendeskService.setLocale).toHaveBeenCalledWith('en');
        expect(zendeskService.setSettings).toHaveBeenCalled();
        expect(zendeskService.show).toHaveBeenCalled();
    });

    it('should NOT show zendesk chat if a store does NOT have a chat permission', () => {
        store.select.and.returnValue(of({id: 'some_id', permission: {}}));
        directive.ngOnInit();
        expect(zendeskService.setLocale).not.toHaveBeenCalled();
        expect(zendeskService.setSettings).not.toHaveBeenCalled();
        expect(zendeskService.show).not.toHaveBeenCalled();
    });

    it('should add sf-chat-enabled class to document body when the chat is enabled', () => {
        store.select.and.returnValue(of({id: 'some_id', permission: {chat: '*'}}));
        directive.ngOnInit();
        expect(renderer.addClass).toHaveBeenCalledWith(document.body, 'sf-chat-enabled');
    });

    it('should NOT add sf-chat-enabled class to document body when the chat is NOT enabled', () => {
        store.select.and.returnValue(of({id: 'some_id', permission: {}}));
        directive.ngOnInit();
        expect(renderer.addClass).not.toHaveBeenCalled();
    });
});
