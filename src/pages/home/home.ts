import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DashboardPage } from '../dashboard/dashboard';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;

  // variable for goto dashboard page
  dashboard: any = DashboardPage;

  // store fb user data
  userData: any;

  // slideData array
  slideData: any = [
    {id: 2, currency: '2,560.00 USD'},
    {id: 3, currency: '1,817.59 GBP'},
    {id: 4, currency: '1,6076.03 CNY'},
    {id: 5, currency: '15,7127.42 RUB'},
    {id: 6, currency: '2079.18 EUR'}
  ];
  
  // latestPayments array
  latestPayments: any;

  // latestDonations array
  latestDonations: any;

  // fb variables
  fbLogin: boolean = false;
  fbName: string;
  fbImage: string;

  constructor(public navCtrl: NavController, public http: Http, private facebook: Facebook) {
    
    // request data from server
    this.http.get("http://ionic.dsl.house/heartAppApi/latest-payments.php").map(res => res.json()).subscribe(data => {
      this.latestPayments = data;
      // console.log(this.latestPayments);
    },
    err => {
      console.log('Oops!');
    });

    // request data from server
    this.http.get("http://ionic.dsl.house/heartAppApi/latest-donations.php").map(res => res.json()).subscribe(data => {
      this.latestDonations = data;
      // console.log(this.latestDonations);
    },
    err => {
      console.log('Oops!');
    });
  }
  
  // getImgId
  getNgoId(id: number) {
    console.log('id: ',id);
    this.navCtrl.push(this.dashboard, {
      id: id,
      fbLogin: this.fbLogin,
      fbName: this.fbName,
      fbImage: this.fbImage
    });
  }

  ionViewWillLeave() {
    this.slides.stopAutoplay();
  }

  ionViewDidEnter() {
    this.slides.startAutoplay();
  }

  // loginWithFB
  loginWithFB() {
    this.facebook.login(['email','public_profile']).then((res: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {email: profile['email'], username: profile['name'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url']};
        this.fbLogin = true;
        this.fbName = profile['first_name'];
        this.fbImage = profile['picture_large']['data']['url'];
      });
    }).catch(e => {
      console.log('Error logging into Facebook', e);
    });
  }
}
