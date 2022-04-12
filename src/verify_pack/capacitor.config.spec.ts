/* eslint-disable no-eval */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('capacitor general configuration', () => {
  let httpClient: HttpClient;

  beforeAll(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
  }));

  it('should change app id', async () => {
    let config: any;

    try {
      const result = await httpClient
        .get('/base/capacitor.config.ts', {
          responseType: 'text',
        })
        .toPromise();
      eval(retrieveConfigObject(result));

      expect(config.appId).toEqual('com.oink.ionicapp');
    } catch (err) {
      fail(err);
    }
  });

  it('should change app name', async () => {
    let config: any;

    try {
      const result = await httpClient
        .get('/base/capacitor.config.ts', {
          responseType: 'text',
        })
        .toPromise();
      eval(retrieveConfigObject(result));

      expect(config.appName).toEqual('Oink Ionic App');
    } catch (err) {
      fail(err);
    }
  });

  it('should log in production', async () => {
    let config: any;

    try {
      const result = await httpClient
        .get('/base/capacitor.config.ts', {
          responseType: 'text',
        })
        .toPromise();
      eval(retrieveConfigObject(result));

      expect(config.loggingBehavior).toEqual('production');
    } catch (err) {
      fail(err);
    }
  });

  it('should change android background color', async () => {
    let config: any;

    try {
      const result = await httpClient
        .get('/base/capacitor.config.ts', {
          responseType: 'text',
        })
        .toPromise();
      eval(retrieveConfigObject(result));

      expect(config.android.backgroundColor).toEqual('#ffffff');
    } catch (err) {
      fail(err);
    }
  });

  it('should change ios app schema name', async () => {
    let config: any;

    try {
      const result = await httpClient
        .get('/base/capacitor.config.ts', {
          responseType: 'text',
        })
        .toPromise();
      eval(retrieveConfigObject(result));

      expect(config.ios.schema).toEqual('oink');
    } catch (err) {
      fail(err);
    }
  });

  it('should change ios background color', async () => {
    let config: any;

    try {
      const result = await httpClient
        .get('/base/capacitor.config.ts', {
          responseType: 'text',
        })
        .toPromise();
      eval(retrieveConfigObject(result));

      expect(config.ios.backgroundColor).toEqual('#000000');
    } catch (err) {
      fail(err);
    }
  });

  it('should allow clear text traffic', async () => {
    let config: any;

    try {
      const result = await httpClient
        .get('/base/capacitor.config.ts', {
          responseType: 'text',
        })
        .toPromise();
      eval(retrieveConfigObject(result));

      expect(config.server.cleartext).toEqual(true);
    } catch (err) {
      fail(err);
    }
  });

  const retrieveConfigObject = (plainConfig: string) =>
    'config = ' +
    plainConfig.substring(
      plainConfig.indexOf('=') + 1,
      plainConfig.indexOf('export')
    );
});
