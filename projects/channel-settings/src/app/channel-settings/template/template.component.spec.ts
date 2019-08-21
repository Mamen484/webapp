import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateComponent } from './template.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChannelService } from 'sfl-shared/services';

describe('TemplateComponent', () => {
    let component: TemplateComponent;
    let fixture: ComponentFixture<TemplateComponent>;
    let channelService: jasmine.SpyObj<ChannelService>;

    beforeEach(async(() => {
        channelService = jasmine.createSpyObj('ChannelService spy', ['modifyChannel']);

        TestBed.configureTestingModule({
            declarations: [TemplateComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ChannelService, useValue: channelService}
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
