import { Component } from '@angular/core';
import { Device, DeviceInfo } from '@capacitor/device';

// LV REVIEW: We could provide an ON_ERROR DeviceInfo constant
// LV REVIEW: as a hint that the error must be handled (or explicitly ask for)
// LV REVIEW: and this value must be used as a fallback
const ON_ERROR: DeviceInfo = {
  model: 'unknown',
  platform: 'web',
  operatingSystem: 'unknown',
  osVersion: 'unknown',
  manufacturer: 'unknown',
  isVirtual: true,
  webViewVersion: 'unknown',
};

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public deviceInfo: DeviceInfo;
  public get deviceInfoKeys(): string[] {
    return this.deviceInfo ? Object.keys(this.deviceInfo) : [];
  }

  // TODO: Get device info when the user entered the page
  async ionViewWillEnter() {}
  async ionViewDidEnter() {
    try {
      this.deviceInfo = await Device.getInfo();
    } catch {
      // LV REVIEW: Candidate has no clue to assign an empty object on error as verification test was requiring
      // LV REVIEW: 1) ion-list is already being rendered conditionally
      // LV REVIEW: 2) to assign an empty object we have to opt out types using 'as any'
      this.deviceInfo = {} as any;
      // LV REVIEW: We could provide an ON_ERROR DeviceInfo constant
      // LV REVIEW: as a hint that the error must be handled (or explicitly ask for)
      // LV REVIEW: and this value must be used as a fallback
      this.deviceInfo = ON_ERROR;
    }
  }
  async ionViewWillLeave() {}
  async ionViewDidLeave() {}
}
