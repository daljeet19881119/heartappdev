import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;

  // variable for goto dashboard page
  dashboard: any = DashboardPage;

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

  constructor(public navCtrl: NavController, public http: Http) {
    
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
      id: id
    });
  }

  ionViewWillLeave() {
    this.slides.stopAutoplay();
  }

  ionViewDidEnter() {
    this.slides.startAutoplay();
  }

}
