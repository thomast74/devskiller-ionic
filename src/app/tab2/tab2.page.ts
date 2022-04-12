import { Component, NgZone } from '@angular/core';
import { CallbackID, Geolocation } from '@capacitor/geolocation';
import { Position } from 'src/__mocks__/@capacitor/geolocation';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  public showPermissionError = false;
  public positionError: any;
  public position: Position;

  private callbackId: CallbackID;

  constructor(private ngZone: NgZone) {}

  // TODO: request high precision permission when is is entering the page
  // TODO: Show permission error or start watching location depending on permission
  // TODO: Watch position with high accuracy
  // TODO: present either the position or the error
  // TODO: clear watch when user left the page

  async ionViewWillEnter() {
    this.showPermissionError = false;
    this.positionError = undefined;

    const permissionStatus = await Geolocation.requestPermissions({
      permissions: ['location'],
    });
  }

  async ionViewDidEnter() {}

  async ionViewWillLeave() {}

  async ionViewDidLeave() {
    if (this.callbackId) {
      Geolocation.clearWatch({
        id: this.callbackId,
      });
      this.callbackId = undefined;
    }
  }

  private async startWatchingLocation(): Promise<void> {
    this.callbackId = await Geolocation.watchPosition(
      {
        enableHighAccuracy: true,
      },
      (position, error) => {}
    );
  }
}
