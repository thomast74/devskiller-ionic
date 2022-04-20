import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tab3Page } from './tab3.page';
// LV REVIEW: Is the applicant supposed to properly create a spy object for ImagePicker? Suppose so, right?!
import {ImagePicker} from '@awesome-cordova-plugins/image-picker/ngx';

describe('Tab3Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;
  // LV REVIEW: Is the applicant supposed to properly create a spy object for ImagePicker? Suppose so, right?!
  let imagePickerSpy: jasmine.SpyObj<ImagePicker>;

  beforeEach(waitForAsync(() => {
    // LV REVIEW: Is the applicant supposed to properly create a spy object for ImagePicker? Suppose so, right?!
    imagePickerSpy = jasmine.createSpyObj<ImagePicker>([
      'hasReadPermission',
      'requestReadPermission',
      'getPictures',
    ]);
    TestBed.configureTestingModule({
      declarations: [Tab3Page],
      imports: [IonicModule.forRoot()],
      // LV REVIEW: Is the applicant supposed to properly create a spy object for ImagePicker? Suppose so, right?!
      providers: [{provide: ImagePicker, useValue: imagePickerSpy}]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
