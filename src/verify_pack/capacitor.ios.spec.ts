/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-eval */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('capacitor ios configuration', () => {
  let httpClient: HttpClient;

  beforeAll(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
  }));

  it('should have created iOS capacitor project', async () => {
    try {
      const result = await httpClient
        .get('/base/ios/App/App.xcodeproj/project.pbxproj', {
          responseType: 'text',
        })
        .toPromise();

      expect(result).toBeDefined();
    } catch (err) {
      fail(err);
    }
  });

  it('should change project minimum ios version', async () => {
    try {
      const result = await httpClient
        .get('/base/ios/App/App.xcodeproj/project.pbxproj', {
          responseType: 'text',
        })
        .toPromise();

      const hasMinimumVersion = result.includes(
        'IPHONEOS_DEPLOYMENT_TARGET = 13.0'
      );

      expect(hasMinimumVersion).toBeTruthy();
    } catch (err) {
      fail(err);
    }
  });

  it('should change pod minimum ios version', async () => {
    try {
      const result = await httpClient
        .get('/base/ios/App/Podfile', {
          responseType: 'text',
        })
        .toPromise();

      const hasMinimumVersion = result.includes(`platform :ios, '13.0'`);

      expect(hasMinimumVersion).toBeTruthy();
    } catch (err) {
      fail(err);
    }
  });

  it('should change app id and app name', async () => {
    try {
      const result = await httpClient
        .get('/base/ios/App/App.xcodeproj/project.pbxproj', {
          responseType: 'text',
        })
        .toPromise();

      const hasCorrectAppId = result.includes(
        'PRODUCT_BUNDLE_IDENTIFIER = com.oink.ionicapp;'
      );
      const hasCorrectAppName = result.includes(
        'PRODUCT_BUNDLE_IDENTIFIER = com.oink.ionicapp;'
      );

      expect(hasCorrectAppId).toBeTruthy();
      expect(hasCorrectAppName).toBeTruthy();
    } catch (err) {
      fail(err);
    }
  });

  it('should change schema', async () => {
    try {
      const result = await httpClient
        .get('/base/ios/App/App.xcodeproj/project.pbxproj', {
          responseType: 'text',
        })
        .toPromise();

      const hasSchema = result.includes('name = oink;');

      expect(hasSchema).toBeTruthy();
    } catch (err) {
      fail(err);
    }
  });

  it('should have run cap sync before final commit', async () => {
    try {
      const capacitorConfig = (await httpClient
        .get('/base/ios/App/App/capacitor.config.json')
        .toPromise()) as any;

      expect(capacitorConfig.appId).toEqual('com.oink.ionicapp');
      expect(capacitorConfig.appName).toEqual('Oink Ionic App');
    } catch (err) {
      fail(err);
    }
  });

  it('should have configured the two capacitor plugins', async () => {
    try {
      const result = await httpClient
        .get('/base/ios/App/Podfile', {
          responseType: 'text',
        })
        .toPromise();

      const hasGeoLocationPlugin = result.includes(
        "pod 'CapacitorGeolocation', :path => '../../node_modules/@capacitor/geolocation'"
      );
      const hasDevicePlugin = result.includes(
        "pod 'CapacitorDevice', :path => '../../node_modules/@capacitor/device'"
      );

      expect(hasGeoLocationPlugin).toBeTruthy();
      expect(hasDevicePlugin).toBeTruthy();
    } catch (err) {
      fail(err);
    }
  });

  it('should configure location permission in Info.plist', async () => {
    try {
      const result = await httpClient
        .get('/base/ios/App/App/Info.plist', {
          responseType: 'text',
        })
        .toPromise();

      const hasLocationWhenInUseDescription = result.includes(
        '<key>NSLocationWhenInUseUsageDescription</key>'
      );
      const hasLocationAlwaysDescription = result.includes(
        '<key>NSLocationAlwaysUsageDescription</key>'
      );

      expect(hasLocationWhenInUseDescription).toBeTruthy();
      expect(hasLocationAlwaysDescription).toBeTruthy();
    } catch (err) {
      fail(err);
    }
  });

  it('should configure photo library permission in Info.plist', async () => {
    try {
      const result = await httpClient
        .get('/base/ios/App/App/Info.plist', {
          responseType: 'text',
        })
        .toPromise();

      const hasPhtotLibraryUseDescription = result.includes(
        '<key>NSPhotoLibraryUsageDescription</key>'
      );

      expect(hasPhtotLibraryUseDescription).toBeTruthy();
    } catch (err) {
      fail(err);
    }
  });

  it('should contain cordova plugin in config.xml', async () => {
    try {
      const result = await httpClient
        .get('/base/ios/App/App/config.xml', {
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
