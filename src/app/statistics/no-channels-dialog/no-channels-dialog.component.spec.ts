import { NoChannelsDialogComponent } from './no-channels-dialog.component';

describe('NoChannelsDialogComponent', () => {
    let component: NoChannelsDialogComponent;
    let dialogMock;

    beforeEach(() => {
        dialogMock = jasmine.createSpyObj('MdDialog', ['close']);
        component = new NoChannelsDialogComponent(dialogMock);
    });

    it('showChannels should close dialog and pass SHOW_CHANNELS action code into', () => {
        component.showChannels();
        expect(dialogMock.close).toHaveBeenCalledWith(1);
    });
    it('showChannels should close dialog and pass SCHEDULE_A_CALL action code into', () => {
        component.scheduleACall();
        expect(dialogMock.close).toHaveBeenCalledWith(2);
    });
});
