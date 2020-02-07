import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelListComponent } from './channel-list.component';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material';
import { ChannelService, SflWindowRefService } from 'sfl-shared/services';
import { ChannelState } from 'sfl-shared/entities';
import { EMPTY, of, throwError } from 'rxjs';
import { ChannelOperatorsAppLinkService } from '../channel-operators-app-link.service';
import { MatDialog } from '@angular/material/dialog';
import { ChannelsPermission } from './filters-dialog/channels-permission.enum';
import { Filter } from './filters-dialog/filter';
import { runTableOperationSpecs } from '../../../../../sfl-tools/lib/table-operations/table-operations.spec';

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
    let channelSettingsLink: jasmine.SpyObj<ChannelOperatorsAppLinkService>;
    let matDialog: jasmine.SpyObj<MatDialog>;

    beforeEach(async(() => {
        channelService = jasmine.createSpyObj('ChannelService spy', ['listChannels', 'activate', 'deactivate']);
        nativeWindow = jasmine.createSpyObj('window spy', ['open']);
        channelSettingsLink = jasmine.createSpyObj('ChannelOperatorsAppLinkService spy', ['getLink']);
        matDialog = jasmine.createSpyObj('MatDialog', ['open']);
        TestBed.configureTestingModule({
            declarations: [ChannelListComponent, AccountListPipe],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatTableModule],
            providers: [
                {provide: ChannelService, useValue: channelService},
                {provide: SflWindowRefService, useValue: {nativeWindow}},
                {provide: ChannelOperatorsAppLinkService, useValue: channelSettingsLink},
                {provide: MatDialog, useValue: matDialog},
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
        channelSettingsLink.getLink.and.returnValue(of('someLink'));
        component.goToChannel(441);
        expect(channelSettingsLink.getLink).toHaveBeenCalledWith('/', new URLSearchParams({channelId: '441'}));
        expect(nativeWindow.open).toHaveBeenCalledWith(`someLink`);
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

        it('should open a dialog on openFilters() call', () => {
            matDialog.open.and.returnValue(<any>{afterClosed: () => EMPTY});
            component.openFilters();
            expect(matDialog.open).toHaveBeenCalled();
        });

        it('should cancel a permission filter and update data on a cancelFilter() call', () => {
            component.filter.permission = ChannelsPermission.notEmpty;
            channelService.listChannels.and.returnValue(EMPTY);
            component.cancelFilter();
            expect(component.filter.permission).toBe(ChannelsPermission.all);
            expect(component.isLoadingResults).toBe(true);
            expect(channelService.listChannels).toHaveBeenCalled();
        });

        it('should reload data on openFilters() call', () => {
            matDialog.open.and.returnValue(<any>{afterClosed: () => of(new Filter())});
            channelService.listChannels.and.returnValue(EMPTY);
            component.openFilters();
            expect(component.isLoadingResults).toBe(true);
            expect(channelService.listChannels).toHaveBeenCalled();
        });
    });

    runTableOperationSpecs(() => ({
        fetchCollectionSpy: channelService.listChannels,
        fixture,
        collectionResponse: {_embedded: {channel: []}}
    }));
});
