import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-ytvideo',
  templateUrl: 'ytvideo.html',
})
export class YtvideoPage {

  // videoUrl
  videoUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private dom: DomSanitizer) {
    
    // get videoUrl
    this.videoUrl = this.navParams.get('videoUrl');
    console.log('ytvideo page url is: '+ this.videoUrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YtvideoPage');
  }

  // closeModal
  closeModal() {
    this.viewCtrl.dismiss(DashboardPage);
  }

  // getVideoUrl
  getVideoUrl() {
    return this.dom.bypassSecurityTrustResourceUrl(this.videoUrl);
  }
}
