import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageComponent } from './image.component';
import { LOCALE_ID } from '@angular/core';
import { SFL_BASE_HREF } from 'sfl-shared/entities';
import { SflLocaleIdService } from 'sfl-shared/services';

describe('ImageComponent', () => {
    let component: ImageComponent;
    let fixture: ComponentFixture<ImageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ImageComponent],
            providers: [
                {provide: SflLocaleIdService, useValue: {localeId: 'en'}},
                {provide: SFL_BASE_HREF, useValue: '/v3'}
                ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.baseHref).toBe('/v3/en/')
    });
});
