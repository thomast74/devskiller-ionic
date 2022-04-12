import { Component } from '@angular/core';
import { DeviceInfo } from '@capacitor/device';

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
  async ionViewDidEnter() {}
  async ionViewWillLeave() {}
  async ionViewDidLeave() {}
}
