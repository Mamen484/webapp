import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelListComponent } from './channel-list.component';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { ChannelService, SflWindowRefService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';
import { runTableOperationSpecs } from '../../../../../sfl-shared/utils/table-operations/src/table-operations.spec';

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
    let channelService: jasmine.SpyObj<ChannelService>;
    let nativeWindow: jasmine.SpyObj<Window>;

    beforeEach(async(() => {
        channelService = jasmine.createSpyObj('ChannelService spy', ['listChannels']);
        nativeWindow = jasmine.createSpyObj('window spy', ['open']);
        TestBed.configureTestingModule({
            declarations: [ChannelListComponent, AccountListPipe],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatTableModule],
            providers: [
                {provide: ChannelService, useValue: channelService},
                {provide: SflWindowRefService, useValue: {nativeWindow}},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChannelListComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should redirect to correct url on a channel click', () => {
        component.goToChannel(441);
        expect(nativeWindow.open).toHaveBeenCalledWith(`${environment.channelOperatorLink}/?channelId=441`);
    });

    runTableOperationSpecs(() => ({
        fetchCollectionSpy: channelService.listChannels,
        fixture,
        collectionResponse: {_embedded: {channel: []}}
    }));
});
