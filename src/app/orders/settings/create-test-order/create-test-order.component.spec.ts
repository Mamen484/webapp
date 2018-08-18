import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestOrderComponent } from './create-test-order.component';

describe('CreateTestOrderComponent', () => {
    let component: CreateTestOrderComponent;
    let fixture: ComponentFixture<CreateTestOrderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateTestOrderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateTestOrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
