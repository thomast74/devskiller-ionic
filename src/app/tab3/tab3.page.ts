import {Component} from '@angular/core';
// LV REVIEW: QUESTION? Is the applicant supposed to fix import?
import {ImagePicker} from '@awesome-cordova-plugins/image-picker/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  public error: any;
  public images: string[];
  // LV REVIEW: We could expose this for user feedback so applicant can focus on the main goals
  public hasReadPermission = false;

  constructor(private imagePicker: ImagePicker) {
  }

  // TODO: check permission when user is seeing the page
  // TODO: if user has permission request automatically pictures
  // TODO: if user has not the permission request permission, do not get pictures automatically
  // TODO: Request maximum 5 pictures

  async ionViewWillEnter() {
  }

  async ionViewDidEnter() {
    this.error = undefined;
    try {

      this.hasReadPermission = await this.imagePicker.hasReadPermission();
      if (this.hasReadPermission) {
        await this.getPictures();
      } else {
        await this.imagePicker.requestReadPermission();
      }
    } catch (e) {
      this.error = e;
    }
  }

  async ionViewWillLeave() {
  }

  async ionViewDidLeave() {
  }

  public async getPictures() {
    try {
      this.images = await this.imagePicker.getPictures({maximumImagesCount: 5});
    } catch (e) {
      this.error = e;
    }
  }
}
