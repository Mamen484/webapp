import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelListComponent } from './channel-list.component';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material';
import { ChannelService, SflWindowRefService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';
import { runTableOperationSpecs } from '../../../../../sfl-shared/utils/table-operations/src/table-operations.spec';
import { ChannelState } from '../../../../../sfl-shared/entities/src/channel-state';
import { EMPTY, of, throwError } from 'rxjs';

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
        channelService = jasmine.createSpyObj('ChannelService spy', ['listChannels', 'activate', 'deactivate']);
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

    describe('channel state', () => {
        it('should call channelService.activate() if channel.state = inactive', () => {
            channelService.activate.and.returnValue(EMPTY);
            component.changeState({id: 48, state: ChannelState.inactive}, {
                stopPropagation: () => {
                }
            });
            expect(channelService.activate).toHaveBeenCalledWith(48);
        });

        it('should call channelService.deactivate() if channel.state = active', () => {
            channelService.deactivate.and.returnValue(EMPTY);
            component.changeState({id: 48, state: ChannelState.active}, {
                stopPropagation: () => {
                }
            });
            expect(channelService.deactivate).toHaveBeenCalledWith(48);
        });

        it('should change to active on successful activation', () => {
            channelService.activate.and.returnValue(of({}));
            component.dataSource = new MatTableDataSource<any>([{id: 48, state: ChannelState.inactive}]);
            component.changeState(component.dataSource.data[0], {
                stopPropagation: () => {
                }
            });
            expect(component.dataSource.data[0].state).toBe(ChannelState.active)
        });

        it('should change to inactive on successful deactivation', () => {
            channelService.deactivate.and.returnValue(of({}));
            component.dataSource = new MatTableDataSource<any>([{id: 48, state: ChannelState.active}]);
            component.changeState(component.dataSource.data[0], {
                stopPropagation: () => {
                }
            });
            expect(component.dataSource.data[0].state).toBe(ChannelState.inactive)
        });

        it('should change back to inactive on activation error', () => {
            channelService.activate.and.returnValue(throwError({}));
            component.dataSource = new MatTableDataSource<any>([{id: 48, state: ChannelState.inactive}]);
            component.changeState(component.dataSource.data[0], {
                stopPropagation: () => {
                }
            });
            expect(component.dataSource.data[0].state).toBe(ChannelState.inactive);
        });

        it('should change back to active on deactivation error', () => {
            channelService.deactivate.and.returnValue(throwError({}));
            component.dataSource = new MatTableDataSource<any>([{id: 48, state: ChannelState.active}]);
            component.changeState(component.dataSource.data[0], {
                stopPropagation: () => {
                }
            });
            expect(component.dataSource.data[0].state).toBe(ChannelState.active);
        });
    });

    runTableOperationSpecs(() => ({
        fetchCollectionSpy: channelService.listChannels,
        fixture,
        collectionResponse: {_embedded: {channel: []}}
    }));
});
