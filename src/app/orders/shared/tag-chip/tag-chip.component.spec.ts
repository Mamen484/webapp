import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagChipComponent } from './tag-chip.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TagColor } from '../../../core/entities/orders/tag-color';

describe('TagChipComponent', () => {
    let component: TagChipComponent;
    let fixture: ComponentFixture<TagChipComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TagChipComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TagChipComponent);
        component = fixture.componentInstance;
        component.tag = {name: 'some tag', color: 'green'};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set appropriate class to the chip according to the tag color', () => {
        (<TagColor[]>['green', 'blue', 'grey', 'indigo', 'red', 'yellow', 'orange', 'brown'])
            .forEach(color => {
                component.tag.color = color;
                fixture.detectChanges();
                expect(fixture.debugElement.nativeElement.querySelector('mat-chip').className)
                    .toContain(`tag-color-${color}`);
            });
    });

});
