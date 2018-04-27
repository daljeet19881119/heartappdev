import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  // latestDonations array
  latestDonations: any;

  // variable id for ngo profile
  id: any;
  ngoName: string = '';
  ngoImg: string = 'assets/imgs/background.png';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.id = this.navParams.get('id');  
    
  }

  ionViewDidLoad() {
    // call function showNgoProfile
    this.showNgoProfile(this.id);

    // request data from server
    this.http.get("http://ionic.dsl.house/heartAppApi/latest-donations.php").map(res => res.json()).subscribe(data => {
      this.latestDonations = data;
      // console.log(this.latestDonations);
    },
    err => {
      console.log('Oops!');
    });

    console.log('ionViewDidLoad DashboardPage');
  }

  showNgoProfile(id: number) {
    // make server request
    this.http.get("http://ionic.dsl.house/heartAppApi/ngo-profile.php?id="+id).map(res => res.json()).subscribe(data => {
      this.ngoName = data.ngo_name;
      this.ngoImg = data.img_name;
      // console.log(data);
    }, err => {
      console.log('Oops!');
    });
  }

  // getNgoId
  getNgoId(id: number) {
    console.log('ngo id: '+id);
  }
}
