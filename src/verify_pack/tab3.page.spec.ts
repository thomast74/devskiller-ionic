import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { IonicModule } from '@ionic/angular';

import { Tab3Page } from '../app/tab3/tab3.page';

describe('Image Picker Tab Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;
  let imagePickerSpy: jasmine.SpyObj<ImagePicker>;

  beforeEach(waitForAsync(() => {
    imagePickerSpy = jasmine.createSpyObj<ImagePicker>([
      'hasReadPermission',
      'requestReadPermission',
      'getPictures',
    ]);

    TestBed.configureTestingModule({
      declarations: [Tab3Page],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: ImagePicker, useValue: imagePickerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check for storage read permission', async () => {
    await component.ionViewDidEnter();

    expect(imagePickerSpy.hasReadPermission).toHaveBeenCalled();
  });

  it('should request permission if no read permission provided', async () => {
    imagePickerSpy.hasReadPermission.and.resolveTo(false);

    await component.ionViewDidEnter();

    expect(imagePickerSpy.requestReadPermission).toHaveBeenCalled();
  });

  it('should get picture if read permission provided', async () => {
    imagePickerSpy.hasReadPermission.and.resolveTo(true);

    await component.ionViewDidEnter();

    expect(imagePickerSpy.getPictures).toHaveBeenCalledWith({
      maximumImagesCount: 5,
    });
  });

  it('should not get pictures autmatically after permision request', async () => {
    imagePickerSpy.hasReadPermission.and.resolveTo(false);
    imagePickerSpy.requestReadPermission.and.resolveTo(true);

    await component.ionViewDidEnter();

    expect(imagePickerSpy.getPictures).not.toHaveBeenCalled();
  });

  it('should not fail if hasReadPermission fails', async () => {
    imagePickerSpy.hasReadPermission.and.rejectWith(false);

    await expectAsync(component.ionViewDidEnter()).not.toBeRejected();
  });

  it('should not fail if requestReadPermission fails', async () => {
    imagePickerSpy.hasReadPermission.and.resolveTo(false);
    imagePickerSpy.requestReadPermission.and.rejectWith(false);

    await expectAsync(component.ionViewDidEnter()).not.toBeRejected();
  });

  it('should not fail if getPictures fails via ionViewDidEnter', async () => {
    imagePickerSpy.hasReadPermission.and.resolveTo(true);
    imagePickerSpy.getPictures.and.rejectWith('Funny Error');

    await expectAsync(component.ionViewDidEnter()).not.toBeRejected();
  });

  it('should not fail if getPictures fails', async () => {
    imagePickerSpy.getPictures.and.rejectWith('Funny Error');

    await expectAsync(component.getPictures()).not.toBeRejected();
  });
});
