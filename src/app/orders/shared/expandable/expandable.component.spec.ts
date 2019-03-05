import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableComponent } from './expandable.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ExpandableComponent', () => {
    let component: ExpandableComponent;
    let fixture: ComponentFixture<ExpandableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExpandableComponent],
            imports: [NoopAnimationsModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExpandableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
