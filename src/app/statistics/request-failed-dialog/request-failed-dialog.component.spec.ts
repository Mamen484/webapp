import { RequestFailedDialogComponent } from './request-failed-dialog.component';
import { environment } from '../../../environments/environment';

describe('RequestFailedDialogComponent', () => {
    let component: RequestFailedDialogComponent;
    let dialogMock;

    beforeEach(() => {
        dialogMock = jasmine.createSpyObj('MdDialog', ['close']);
    });

    it('close should call close on MdDialog', () => {
        component = new RequestFailedDialogComponent(dialogMock, <any>{localeId: 'en'});
        component.close();
        expect(dialogMock.close).toHaveBeenCalled();
    });

    it('should assign an appropriate contact email when the french locale is used', () => {
        component = new RequestFailedDialogComponent(dialogMock, <any>{localeId: 'fr'});
        expect(component.contactEmail).toBe(environment.contactEmail.fr);
    });

    it('should assign an appropriate contact email when the portuguese locale is used', () => {
        component = new RequestFailedDialogComponent(dialogMock, <any>{localeId: 'pt'});
        expect(component.contactEmail).toBe(environment.contactEmail.pt);
    });

    it('should assign an appropriate contact email when the german locale is used', () => {
        component = new RequestFailedDialogComponent(dialogMock, <any>{localeId: 'de'});
        expect(component.contactEmail).toBe(environment.contactEmail.de);
    });

    it('should assign an appropriate contact email when the english locale is used', () => {
        component = new RequestFailedDialogComponent(dialogMock, <any>{localeId: 'en'});
        expect(component.contactEmail).toBe(environment.contactEmail.en);
    });

    it('should assign an appropriate contact email when the italian locale is used', () => {
        component = new RequestFailedDialogComponent(dialogMock, <any>{localeId: 'it'});
        expect(component.contactEmail).toBe(environment.contactEmail.it);
    });

    it('should assign an appropriate contact email when the spanish locale is used', () => {
        component = new RequestFailedDialogComponent(dialogMock, <any>{localeId: 'es'});
        expect(component.contactEmail).toBe(environment.contactEmail.es);
    });


});
