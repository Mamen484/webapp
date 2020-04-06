import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTicketsDialogComponent } from './filter-tickets-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TicketType } from '../../entities/ticket-type.enum';
import { TicketState } from '../../entities/ticket-state.enum';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FilterTicketsDialogComponent', () => {
    let component: FilterTicketsDialogComponent;
    let fixture: ComponentFixture<FilterTicketsDialogComponent>;
    let matDialogRef: jasmine.SpyObj<MatDialogRef<FilterTicketsDialogComponent>>;

    beforeEach(async(() => {
        matDialogRef = jasmine.createSpyObj('MatDialogRef spy', ['close']);
        TestBed.configureTestingModule({
            declarations: [FilterTicketsDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {type: TicketType.acceptOrder, state: TicketState.running}},
                {provide: MatDialogRef, useValue: matDialogRef},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterTicketsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should close dialog, passing out type and state', () => {
        component.apply();
        expect(matDialogRef.close).toHaveBeenCalledWith({type: TicketType.acceptOrder, state: TicketState.running});
    });
});
