import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailsDialogComponent } from './ticket-details-dialog.component';

describe('TicketDetailsDialogComponent', () => {
    let component: TicketDetailsDialogComponent;
    let fixture: ComponentFixture<TicketDetailsDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TicketDetailsDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TicketDetailsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
