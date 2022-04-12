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

  it('should get device info after page did view', async () => {
    await component.ionViewDidEnter();

    expect(deviceSpy.getInfo).toHaveBeenCalled();
  });

  it('should make sure that promise error is catched', async () => {
    deviceSpy.getInfo.and.rejectWith(new Error('Plugin not initialised'));

    await component.ionViewDidEnter();

    expect(deviceSpy.getInfo).toHaveBeenCalled();
    expect(component.deviceInfo).toEqual({} as any);
  });
});
