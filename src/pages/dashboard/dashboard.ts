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
  ngoName: string = 'Loading...';
  ngoTagline: string = 'Loading...';
  ngoImg: string = 'assets/imgs/background.png';
  ngoCampaigns: number = 0;
  ngoHelpedPeople: number = 0;
  ngoContributors: number = 0;
  ngoTeam: number = 0;
  ngoCofounder: string = 'Loading...';
  ngoCofounderImg: string = 'assets/imgs/background.png';
  ngoUser: string = 'Loading...';
  ngoDesc: string = 'Loading...';

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
      this.ngoCampaigns = data.campaigns;
      this.ngoHelpedPeople = data.helped_people;
      this.ngoContributors = data.contributors;
      this.ngoTeam = data.team;
      this.ngoCofounder = data.ngo_founder;
      this.ngoUser = data.ngo_user;
      this.ngoDesc = data.ngo_desc;
      this.ngoTagline = data.ngo_tagline;
      this.ngoCofounderImg = data.ngo_founder_img;
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
