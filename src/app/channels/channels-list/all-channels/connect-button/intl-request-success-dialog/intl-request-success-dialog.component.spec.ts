import { IntlRequestSuccessDialogComponent } from './intl-request-success-dialog.component';

describe('IntlRequestSuccessDialogComponent', () => {
    let component: IntlRequestSuccessDialogComponent;
    let dialogMock;

    beforeEach(() => {
        dialogMock = jasmine.createSpyObj('MdDialog', ['close']);
        component = new IntlRequestSuccessDialogComponent(dialogMock);
    });

    it('close should call close on MdDialog', () => {
        component.close();
        expect(dialogMock.close).toHaveBeenCalled();
    });
});
