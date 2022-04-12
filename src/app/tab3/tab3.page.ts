import { Component } from '@angular/core';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  public error: any;
  public images: string[];

  constructor(private imagePicker: ImagePicker) {}

  // TODO: check permission when user is seeing the page
  // TODO: if user has permission request automatically picturs
  // TODO: if user has not the permission request permission, do not get pictures automatically
  // TODO: Request maximum 5 pictures

  async ionViewWillEnter() {}

  async ionViewDidEnter() {
    this.error = undefined;

    const hasReadPermission = await this.imagePicker.hasReadPermission();
  }

  async ionViewWillLeave() {}
  async ionViewDidLeave() {}

  public async getPictures() {}
}
