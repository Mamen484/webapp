import { Directive, Input, OnInit, Renderer2 } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Store as UserStore } from 'sfl-shared/entities';
import { ngxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

@Directive({
    selector: '[sfcEnableZendeskChat]'
})
export class EnableZendeskChatDirective implements OnInit {

    @Input() localeId: string;


    constructor(
        private appStore: Store<{ currentStore: UserStore }>,
                private zendeskService: ngxZendeskWebwidgetService,
                private renderer: Renderer2
    ) {}

    ngOnInit() {
        this.appStore.select('currentStore').pipe(
            filter(store => Boolean(store)),
            take(1)
        ).subscribe(store => {
            if (store.permission.chat) {
                this.zendeskService.setLocale(this.localeId);
                this.zendeskService.setSettings({
                    webWidget: {
                        chat: {
                            title: {
                                '*': 'Chat Shopping Feed',
                            },
                            concierge: {
                                name: 'Team Shopping Feed',
                                title: {
                                    '*': 'I can answer all your questions!',
                                    'fr': 'Posez-nous toutes vos questions',
                                }
                            },
                        },
                        contactForm: {
                            suppress: true
                        }
                    }
                });
                this.zendeskService.show();
                this.renderer.addClass(document.body, 'sf-chat-enabled');
            }
        });
    }

}
