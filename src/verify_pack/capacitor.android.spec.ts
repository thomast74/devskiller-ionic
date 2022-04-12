/* eslint-disable no-eval */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('capacitor Android configuration', () => {
  let httpClient: HttpClient;

  beforeAll(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
  }));

  it('should have created Android capacitor project', async () => {
    try {
      const result = await httpClient
        .get('/base/android/app/src/main/AndroidManifest.xml', {
          responseType: 'text',
        })
        .toPromise();

      expect(result).toBeDefined();
    } catch (err) {
      fail(err);
    }
  });

  it('should have changed app id in AndroidManifest.xml', async () => {
    try {
      const result = await httpClient
        .get('/base/android/app/src/main/AndroidManifest.xml', {
          responseType: 'text',
        })
        .toPromise();

      const hasCorrectPackageName = result.includes(
        'package="com.oink.ionicapp"'
      );

      expect(hasCorrectPackageName).toBeTruthy();
    } catch (err) {
      fail(err);
    }
  });

  it('should have changed string resources', async () => {
    try {
      const result = await httpClient
        .get('/base/android/app/src/main/res/values/strings.xml', {
          responseType: 'text',
        })
        .toPromise();

      const hasCorrectAppName = result.includes(
        '<string name="app_name">Oink Ionic App</string>'
      );
      const hasCorrectTitle = result.includes(
        '<string name="title_activity_main">Oink Ionic App</string>'
      );
      const hasPackageName = result.includes(
        '<string name="package_name">com.oink.ionicapp</string>'
      );

      expect(hasCorrectAppName).toBeTruthy();
      expect(hasCorrectTitle).toBeTruthy();
      expect(hasPackageName).toBeTruthy();
    } catch (err) {
      fail(err);
    }
  });

  it('should have changed app id and app name before adding project', async () => {
    try {
      const result = await httpClient
        .get(
          '/base/android/app/src/main/java/com/oink/ionicapp/MainActivity.java',
          {
            responseType: 'text',
          }
        )
        .toPromise();

      expect(result).toBeDefined();
    } catch (err) {
      fail(err);
    }
  });

  it('should have configured the two capacitor plugins', async () => {
    try {
      const result = await httpClient
        .get('/base/android/app/src/main/assets/capacitor.plugins.json')
        .toPromise();

      expect(result).toContain(
        jasmine.objectContaining({
          pkg: '@capacitor/device',
          classpath: 'com.capacitorjs.plugins.device.DevicePlugin',
        })
      );
      expect(result).toContain(
        jasmine.objectContaining({
          pkg: '@capacitor/geolocation',
          classpath: 'com.capacitorjs.plugins.geolocation.GeolocationPlugin',
        })
      );
    } catch (err) {
      fail(err);
    }
  });

  it('should have location permission', async () => {
    try {
      const result = await httpClient
        .get('/base/android/app/src/main/AndroidManifest.xml', {
          responseType: 'text',
        })
        .toPromise();

      const hasLocationCoarsePermission = result.includes(
        '<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />'
      );
      const hasLocationFinePermission = result.includes(
        '<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />'
      );
      const hasFeatureLocationGps = result.includes(
        '<uses-feature android:name="android.hardware.location.gps" />'
      );

      expect(hasLocationCoarsePermission).toBeTruthy();
      expect(hasLocationFinePermission).toBeTruthy();
      expect(hasFeatureLocationGps).toBeTruthy();
    } catch (err) {
      fail(err);
    }
  });

  it('should contain cordova plugin in config.xml', async () => {
    try {
      const result = await httpClient
        .get('/base/android/app/src/main/res/xml/config.xml', {
          responseType: 'text',
        })
        .toPromise();

      const hasCordovaPluginConfigured = result.includes(
        '<feature name="ImagePicker">'
      );

      expect(hasCordovaPluginConfigured).toBeTruthy();
    } catch (err) {
      fail(err);
    }
  });
});
