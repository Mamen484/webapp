import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelListComponent } from './channel-list.component';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { MatTableModule } from '@angular/material';

@Pipe({
    name: 'accountList',
})
class AccountListPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
    }
}

describe('ChannelListComponent', () => {
    let component: ChannelListComponent;
    let fixture: ComponentFixture<ChannelListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChannelListComponent, AccountListPipe],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatTableModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChannelListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
