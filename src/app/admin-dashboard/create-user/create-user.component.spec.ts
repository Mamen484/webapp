import { ComponentFixture } from '@angular/core/testing';
import { CreateUserComponent } from './create-user.component';
import { StoreService } from '../../core/services/store.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { UserCreatedDialogComponent } from '../user-created-dialog/user-created-dialog.component';
import { FeedSource } from '../../core/entities/feed-source';

describe('CreateUserComponent', () => {
    describe('isolated spec', () => {
        let storeService: jasmine.SpyObj<StoreService>;
        let matDialog: jasmine.SpyObj<MatDialog>;
        let fixture: ComponentFixture<CreateUserComponent>;
        let component: CreateUserComponent;

        beforeEach(() => {
            storeService = jasmine.createSpyObj('StoreService', ['createStore']);
            matDialog = jasmine.createSpyObj('MatDialog', ['open']);
            component = new CreateUserComponent(storeService, matDialog);
        });


        it('should assign not empty images to the images array on assignImages() call', () => {
            component.images = ['', 'image1', '', '', 'image2', ''];
            component.assignImages();
            expect((<string[]>component.store.feed.mapping.images).join(',')).toEqual('image1,image2');
        });

        it('should NOT create an images mapping property when there is no images in the images list on assignImages() call', () => {
            component.images = ['', '', '', '', '', ''];
            component.assignImages();
            expect(component.store.feed.mapping.images).not.toBeDefined();
        });

        it('should remove images property from mapping when all images were deleted', () => {
            component.store.feed.mapping.images = ['image1', 'image2'];
            component.images = [];
            component.assignImages();
            expect(component.store.feed.mapping.images).not.toBeDefined();
        });

        it('should not send the store creating request when the form is invalid', () => {
            component.save(false);
            expect(storeService.createStore).not.toHaveBeenCalled();
        });

        it('should NOT send the store creating request when the form is invalid', () => {
            component.save(false);
            expect(storeService.createStore).not.toHaveBeenCalled();
        });

        it('should send the store creating request when the form is invalid', () => {
            storeService.createStore.and.returnValue(Observable.of({owner: {token: ''}}));
            component.save(true);
            expect(storeService.createStore).toHaveBeenCalled();
        });

        it('should clear an error when click save', () => {
            component.error = 'error';
            storeService.createStore.and.returnValue(Observable.of({owner: {token: ''}}));
            component.save(true);
            expect(component.error).toEqual('');
        });

        it('should open a dialog with creating results and pass to it login, token and password', () => {
            component.store.owner.login = 'login1';
            component.store.owner.password = 'password1';
            storeService.createStore.and.returnValue(Observable.of({owner: {token: 'token1'}}));
            component.save(true);
            expect(matDialog.open.calls.count()).toEqual(1);
            expect(matDialog.open.calls.first().args[0]).toEqual(UserCreatedDialogComponent);
            expect(matDialog.open.calls.first().args[1].data.login).toEqual('login1');
            expect(matDialog.open.calls.first().args[1].data.password).toEqual('password1');
            expect(matDialog.open.calls.first().args[1].data.token).toEqual('token1');
        });

        it('should write and error detail when a server error returned', () => {
            storeService.createStore.and.returnValue(Observable.throw({error: {detail: 'error message'}}));
            component.save(true);
            expect(component.error).toEqual('error message');
        });

        it('should write an exception message when a server error detail contains nothing', () => {
            storeService.createStore.and.returnValue(Observable.throw({error: {exception: {message: 'exception message'}}}));
            component.save(true);
            expect(component.error).toEqual('exception message');
        });

        it('should add an empty string to images array on addImage() call', () => {
            expect(component.images.length).toEqual(1);
            component.addImage();
            expect(component.images.length).toEqual(2);
            expect(component.images[1]).toEqual('');
        });

        it('should remove an image with index 1 on removeImage() call', () => {
            component.images = ['image1', 'image2', 'image3'];
            component.removeImage(1);
            expect(component.images.join(',')).toEqual('image1,image3');
        });

        it('should show a mappings form when the feed source is csv', () => {
            component.store.feed.source = 'csv';
            expect(component.showMappingsForm()).toEqual(true);
        });

        it('should show a mappings form when the feed source is txt', () => {
            component.store.feed.source = 'txt';
            expect(component.showMappingsForm()).toEqual(true);
        });

        it('should show a mappings form when the feed source is xml', () => {
            component.store.feed.source = 'xml';
            expect(component.showMappingsForm()).toEqual(true);
        });

        (<FeedSource[]>['prestashop', 'webetsolutions', 'bigcommerce', 'thelia',
            'shopify', 'Shopify', 'cmonsite', 'ws', 'wizishop', 'magento',
            'google', 'powerboutique', 'shopapplication', 'sa'])
            .forEach(source => {
                it('should NOT show a mappings form when the feed source is ' + source, () => {
                    component.store.feed.source = source;
                    expect(component.showMappingsForm()).toEqual(false);
                });
            });

        it('should create a validation errors object', () => {
            storeService.createStore.and.returnValue(Observable.throw({
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

            component.save(true);
            expect(component.validationErrors.country[0]).toEqual('au is not allowed country code');
            expect(component.validationErrors.owner.login[0]).toEqual('The element already exists');
        });

        it('should set processing to true after submitting the form', () => {
            storeService.createStore.and.returnValue(Observable.empty());
            component.save(true);
            expect(component.processing).toEqual(true);
        });

        it('should set processing to false after successful creating a user', () => {
            storeService.createStore.and.returnValue(Observable.of({owner: {token: 'token1'}}));
            component.save(true);
            expect(component.processing).toEqual(false);
        });

        it('should set processing to false after failure while creating a user', () => {
            storeService.createStore.and.returnValue(Observable.throw({error: {}}));
            component.save(true);
            expect(component.processing).toEqual(false);
        });

    });


});
