/* eslint-disable no-eval */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('ionic configuration', () => {
  let httpClient: HttpClient;

  beforeAll(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
  }));

  it('should change app name', async () => {
    try {
      const config = (await httpClient
        .get('/base/ionic.config.json')
        .toPromise()) as any;

      expect(config.name).toEqual('Oink Ionic App');
    } catch (err) {
      fail(err);
    }
  });

  it('should turn off telemetry', async () => {
    try {
      const config = (await httpClient
        .get('/base/ionic.config.json')
        .toPromise()) as any;

      expect(config.telemetry).toEqual(false);
    } catch (err) {
      fail(err);
    }
  });
});
