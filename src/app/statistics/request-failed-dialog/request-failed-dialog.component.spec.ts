import { RequestFailedDialogComponent } from './request-failed-dialog.component';

describe('RequestFailedDialogComponent', () => {
    let component: RequestFailedDialogComponent;
    let dialogMock;

    beforeEach(() => {
        dialogMock = jasmine.createSpyObj('MdDialog', ['close']);
        component = new RequestFailedDialogComponent(dialogMock);
    });

    it('close should call close on MdDialog', () => {
        component.close();
        expect(dialogMock.close).toHaveBeenCalled();
    });
});
