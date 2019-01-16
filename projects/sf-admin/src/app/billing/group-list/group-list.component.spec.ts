import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListComponent } from './group-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BillingGroupService } from './billing-group.service';
import { MatTableModule } from '@angular/material';
import { of } from 'rxjs';

describe('GroupListComponent', () => {
    let component: GroupListComponent;
    let fixture: ComponentFixture<GroupListComponent>;

    let billingGroupService: jasmine.SpyObj<BillingGroupService>;

    beforeEach(async(() => {
        billingGroupService = jasmine.createSpyObj('BillingGroupService spy', ['fetchGroupCollection']);
        TestBed.configureTestingModule({
            imports: [MatTableModule],
            declarations: [GroupListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: BillingGroupService, useValue: billingGroupService },
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupListComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch and show billing groups on init', () => {
        billingGroupService.fetchGroupCollection.and.returnValue(of({_embedded: {group: []}}));
        fixture.detectChanges();
        expect(billingGroupService.fetchGroupCollection).toHaveBeenCalledWith({limit: 15, page: 1, search: ''});
        expect(component.dataSource).toEqual([]);
    });

});
