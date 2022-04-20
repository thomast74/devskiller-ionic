import { NgZone } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PermissionState } from '@capacitor/core';
import {
  Geolocation,
  Position,
  WatchPositionCallback,
} from '@capacitor/geolocation';
import { IonicModule } from '@ionic/angular';
import { createPluginSpyObj, PluginSpyObj } from 'test/test-helpers';

import { Tab2Page } from '../app/tab2/tab2.page';

describe('Location Tab Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;
  let geolocationSpy: PluginSpyObj<typeof Geolocation>;
  let geolocationWatchCallback: WatchPositionCallback;

  beforeAll(() => {
    geolocationSpy = createPluginSpyObj(Geolocation, [
      'requestPermissions',
      'watchPosition',
      'clearWatch',
    ]);

    geolocationSpy.watchPosition.and.callFake(
      (_options: PositionOptions, callback: WatchPositionCallback) => {
        geolocationWatchCallback = callback;
        return Promise.resolve('001');
      }
    );
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab2Page],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();

    geolocationSpy.resetCalls();
  }));

  it('should request precise location permission', async () => {
    await component.ionViewWillEnter();

    expect(geolocationSpy.requestPermissions).toHaveBeenCalledWith({
      permissions: ['location'],
    });
  });

  it('should not request location permission on other lifecycle methods', async () => {
    await component.ionViewDidEnter();
    await component.ionViewWillLeave();
    await component.ionViewDidLeave();

    expect(geolocationSpy.requestPermissions).not.toHaveBeenCalled();
  });

  it('should position error if request permission fails', async () => {
    geolocationSpy.requestPermissions.and.rejectWith(
      new Error('Permssion missing')
    );

    await component.ionViewWillEnter();

    expect(component.positionError).toBeDefined();
  });

  ['denied', 'prompt', 'prompt-with-rationale'].forEach(async (permission) => {
    it(`should show error if precise location permission denied for ${permission}`, async () => {
      component.showPermissionError = false;
      geolocationSpy.requestPermissions.and.resolveTo({
        location: permission as PermissionState,
        coarseLocation: permission as PermissionState,
      });

      await component.ionViewWillEnter();

      expect(component.showPermissionError).toBeTruthy();
      expect(geolocationSpy.watchPosition).not.toHaveBeenCalled();
    });
  });

  it('should start watching if precise location permission is granted', async () => {
    geolocationSpy.requestPermissions.and.resolveTo({
      location: 'granted' as PermissionState,
      coarseLocation: 'granted' as PermissionState,
    });

    await component.ionViewWillEnter();

    expect(component.positionError).toBeUndefined();
    expect(component.showPermissionError).toBeFalsy();
    expect(geolocationSpy.watchPosition).toHaveBeenCalled();
  });

  it('should start watching for high accuracy location', async () => {
    geolocationSpy.requestPermissions.and.resolveTo({
      location: 'granted' as PermissionState,
      coarseLocation: 'granted' as PermissionState,
    });

    await component.ionViewWillEnter();

    expect(geolocationSpy.watchPosition).toHaveBeenCalledWith(
      {
        enableHighAccuracy: true,
      },
      jasmine.any(Function)
    );
  });

  it('should call the result inside of NgZone as per Ionic recommendation', async () => {
    const zone = TestBed.inject(NgZone);
    spyOn(zone, 'run');
    geolocationSpy.requestPermissions.and.resolveTo({
      location: 'granted' as PermissionState,
      coarseLocation: 'granted' as PermissionState,
    });

    await component.ionViewWillEnter();
    geolocationWatchCallback(null, new Error('Location Services turned off'));

    expect(zone.run).toHaveBeenCalled();
  });

  it('should show position error', async () => {
    geolocationSpy.requestPermissions.and.resolveTo({
      location: 'granted' as PermissionState,
      coarseLocation: 'granted' as PermissionState,
    });
    const error = new Error('Location Services turned off');

    await component.ionViewWillEnter();
    geolocationWatchCallback(undefined, error);

    expect(component.positionError).toEqual(error);
  });

  it('should show position', async () => {
    geolocationSpy.requestPermissions.and.resolveTo({
      location: 'granted' as PermissionState,
      coarseLocation: 'granted' as PermissionState,
    });
    const expectedLocation = {
      coords: { latitude: 11.11, longitude: 22.22, altitude: 5 },
    } as Position;

    await component.ionViewWillEnter();
    geolocationWatchCallback(expectedLocation, undefined);

    expect(component.position).toEqual(expectedLocation);
    expect(component.positionError).toBeUndefined();
  });

  it('should show position error', async () => {
    geolocationSpy.requestPermissions.and.resolveTo({
      location: 'granted' as PermissionState,
      coarseLocation: 'granted' as PermissionState,
    });
    const expectedLocation = null;
    const expectedError = new Error('Some Position error');

    await component.ionViewWillEnter();
    geolocationWatchCallback(expectedLocation, expectedError);

    expect(component.position).toEqual(expectedLocation);
    expect(component.positionError?.toString() ).toContain(expectedError.message);
  });

  it('should clearWatch after leving page', async () => {
    geolocationSpy.requestPermissions.and.resolveTo({
      location: 'granted' as PermissionState,
      coarseLocation: 'granted' as PermissionState,
    });
    const expectedLocation = {
      coords: { latitude: 11.11, longitude: 22.22, altitude: 5 },
    } as Position;

    await component.ionViewWillEnter();
    geolocationWatchCallback(expectedLocation, undefined);
    await component.ionViewDidLeave();

    expect(geolocationSpy.clearWatch).toHaveBeenCalledWith({
      id: '001',
    });
  });
});
