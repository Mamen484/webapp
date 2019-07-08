import { EMPTY, of, throwError } from 'rxjs';
import { ComponentFixture } from '@angular/core/testing';
import { CreateUserComponent } from './create-user.component';
import { StoreService } from 'sfl-shared/services';
import { MatDialog } from '@angular/material/dialog';
import { UserCreatedDialogComponent } from './user-created-dialog/user-created-dialog.component';
import { FeedSource } from 'sfl-shared/entities';
import { FormArray, FormControl } from '@angular/forms';

describe('CreateUserComponent', () => {
    describe('isolated test', () => {
        let storeService: jasmine.SpyObj<StoreService>;
        let matDialog: jasmine.SpyObj<MatDialog>;
        let fixture: ComponentFixture<CreateUserComponent>;
        let component: CreateUserComponent;

        beforeEach(() => {
            storeService = jasmine.createSpyObj('StoreService', ['createStore']);
            matDialog = jasmine.createSpyObj('MatDialog', ['open']);
            component = new CreateUserComponent(<any>storeService, <any>matDialog);
        });


        it('should write only not empty values to the images mapping ', () => {
            storeService.createStore.and.returnValue(EMPTY);
            (<FormArray>component.mappingsForm.controls.images).push(new FormControl('some image'));
            (<FormArray>component.mappingsForm.controls.images).push(new FormControl(''));
            component.store.feed.source = 'csv';
            component.form.setValue(createFormMock());
            component.save();
            expect(component.form.valid).toEqual(true);
            expect((<string[]>component.store.feed.mapping.images).join(',')).toEqual('some image');
        });


        it('should remove images property from mapping when all images were deleted', () => {
            storeService.createStore.and.returnValue(EMPTY);
            component.store.feed.mapping.images = ['image1', 'image2'];
            component.store.feed.source = 'csv';
            component.form.setValue(createFormMock());
            component.save();
            expect(component.store.feed.mapping.images.length).toEqual(0);
        });

        it('should NOT send the store creating request when the form is invalid', () => {
            component.form.setValue(createFormMock({url: 'invalid'}));
            expect(component.form.valid).toEqual(false);
            component.save();
            expect(storeService.createStore).not.toHaveBeenCalled();
        });

        it('should send the store creating request when the form is valid', () => {
            storeService.createStore.and.returnValue(of({owner: {token: ''}}));
            component.form.setValue(createFormMock());
            expect(component.form.valid).toEqual(true);
            component.save();
            expect(storeService.createStore).toHaveBeenCalled();
        });

        it('should clear an error when click save', () => {
            component.error = 'error';
            storeService.createStore.and.returnValue(of({owner: {token: ''}}));
            component.save();
            expect(component.error).toEqual('');
        });

        it('should open a dialog with creating results and pass to it login, token and password', () => {
            component.form.setValue(createFormMock({login: 'login1', password: 'password1'}));
            expect(component.form.valid).toEqual(true);
            storeService.createStore.and.returnValue(of({owner: {token: 'token1'}}));
            component.save();
            expect(matDialog.open.calls.count()).toEqual(1);
            expect(matDialog.open.calls.first().args[0]).toEqual(UserCreatedDialogComponent);
            expect((<any>matDialog.open.calls.first().args[1]).data.login).toEqual('login1');
            expect((<any>matDialog.open.calls.first().args[1].data).password).toEqual('password1');
            expect((<any>matDialog.open.calls.first().args[1].data).token).toEqual('token1');
        });

        it('should write an error detail when a server error returned', () => {
            storeService.createStore.and.returnValue(throwError({error: {detail: 'error message'}}));
            component.form.setValue(createFormMock());
            expect(component.form.valid).toEqual(true);
            component.save();
            expect(component.error).toEqual('error message');
        });

        it('should write an exception message when a server error detail contains nothing', () => {
            storeService.createStore.and.returnValue(throwError({error: {exception: {message: 'exception message'}}}));
            component.form.setValue(createFormMock());
            expect(component.form.valid).toEqual(true);
            component.save();
            expect(component.error).toEqual('exception message');
        });

        it('should add an empty control to images formArray on addImage() call', () => {
            expect((<FormArray>component.mappingsForm.controls.images).length).toEqual(1);
            component.addImage();
            expect((<FormArray>component.mappingsForm.controls.images).length).toEqual(2);
            expect((<FormArray>component.mappingsForm.controls.images).at(1).value).toEqual('');
        });

        it('should remove an image with index 1 on removeImage() call', () => {
            (<FormArray>component.mappingsForm.controls.images).setValue(['image1']);
            (<FormArray>component.mappingsForm.controls.images).push(new FormControl('image2'));
            (<FormArray>component.mappingsForm.controls.images).push(new FormControl('image3'));
            component.removeImage(1);
            expect((<FormArray>component.mappingsForm.controls.images).value.join(',')).toEqual('image1,image3');
        });

        it('should show a mappings form when the feed source is csv', () => {
            component.setShowMappings(<any>{value: 'csv'});
            expect(component.showMappings).toEqual(true);
        });

        it('should show a mappings form when the feed source is txt', () => {
            component.setShowMappings(<any>{value: 'txt'});
            expect(component.showMappings).toEqual(true);
        });

        it('should show a mappings form when the feed source is xml', () => {
            component.setShowMappings(<any>{value: 'xml'});
            expect(component.showMappings).toEqual(true);
        });

        (<FeedSource[]>['prestashop', 'webetsolutions', 'bigcommerce', 'thelia',
            'shopify', 'Shopify', 'cmonsite', 'ws', 'wizishop', 'magento',
            'google', 'powerboutique', 'shopapplication', 'sa'])
            .forEach(source => {
                it('should NOT show a mappings form when the feed source is ' + source, () => {
                    component.setShowMappings(<any>{value: source});
                    expect(component.showMappings).toEqual(false);
                });
            });

        it('should create a validation errors object', () => {
            storeService.createStore.and.returnValue(throwError({
                error: {
                    validationMessages: {
                        country: {
                            notInArray: 'au is not allowed country code',
                        },
                        owner: {
                            login: {
                                alreadyExists: 'The element already exists'
                            }
                        }
                    }
                }
            }));
            component.form.setValue(createFormMock());
            expect(component.form.valid).toEqual(true);
            component.save();
            expect(component.validationErrors.country).toEqual('au is not allowed country code');
            expect(component.validationErrors.owner.login).toEqual('The element already exists');
        });

        it('should set processing to true after submitting the form', () => {
            component.form.setValue(createFormMock());
            expect(component.form.valid).toEqual(true);
            storeService.createStore.and.returnValue(EMPTY);
            component.save();
            expect(component.processing).toEqual(true);
        });

        it('should set processing to false after successful creating a user', () => {
            component.form.setValue(createFormMock());
            expect(component.form.valid).toEqual(true);
            storeService.createStore.and.returnValue(of({owner: {token: 'token1'}}));
            component.save();
            expect(component.processing).toEqual(false);
        });

        it('should set processing to false after failure while creating a user', () => {
            component.form.setValue(createFormMock());
            expect(component.form.valid).toEqual(true);
            storeService.createStore.and.returnValue(throwError({error: {}}));
            component.save();
            expect(component.processing).toEqual(false);
        });
    });
});

function createFormMock({
                            login = 'test',
                            password = '1234567',
                            email = 'maksym.zavorotynskyi@shopping-feed.com',
                            country = 'fr',
                            source = 'csv',
                            separator = '',
                            productNode = '',
                            url = 'http://a'
                        } = {}) {
    return {login, password, email, country, source, separator, productNode, url};
}
