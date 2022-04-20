import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Device } from '@capacitor/device';
import { IonicModule } from '@ionic/angular';
import { createPluginSpyObj, PluginSpyObj } from 'test/test-helpers';

import { Tab1Page } from '../app/tab1/tab1.page';

describe('DeviceInfo Tab Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;
  let deviceSpy: PluginSpyObj<typeof Device>;

  beforeAll(() => {
    deviceSpy = createPluginSpyObj(Device, ['getInfo']);
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab1Page],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(()=>{
    deviceSpy.resetCalls();
  });

  it('should get device info after page did view', async () => {
    await component.ionViewDidEnter();

    expect(deviceSpy.getInfo).toHaveBeenCalled();
  });

  it('should not get device info on other lifecycle methods', async () => {
    await component.ionViewWillEnter();
    await component.ionViewWillLeave();
    await component.ionViewDidLeave();
    expect(deviceSpy.getInfo).not.toHaveBeenCalled();
  });

  it('should make sure that promise error is caught', async () => {
    deviceSpy.getInfo.and.rejectWith(new Error('Plugin not initialised'));

    await component.ionViewDidEnter();

    expect(deviceSpy.getInfo).toHaveBeenCalled();

    // LV REVIEW: Candidate has no clue to assign an empty object to deviceInvo on error
    // LV REVIEW: What if we provide an ON_ERROR fallback value instead ?
    expect(component.deviceInfo).toEqual({
      model: 'unknown',
      platform: 'web',
      operatingSystem: 'unknown',
      osVersion: 'unknown',
      manufacturer: 'unknown',
      isVirtual: true,
      webViewVersion: 'unknown',
    });
  });

});
