import { ConnectIntlChannelDialogComponent } from './connect-intl-channel-dialog.component';

describe('ConnectIntlChannelDialogComponent', () => {
    let component: ConnectIntlChannelDialogComponent;
    let dialogMock;

    beforeEach(() => {
        dialogMock = jasmine.createSpyObj('MdDialog', ['close']);
        component = new ConnectIntlChannelDialogComponent(dialogMock);
    });

    it('should close dialog and true into when a user clicks agree button', () => {
        component.agree();
        expect(dialogMock.close).toHaveBeenCalledWith(true);
    });

    it('should close dialog and false into when a user clicks disagree button', () => {
        component.disagree();
        expect(dialogMock.close).toHaveBeenCalledWith(false);
    });
});
