import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  // latestDonations array
  latestDonations: any;

  // sotre ngoFamilyImgs array
  ngoFamilyImgs: any;

  // variable id for ngo profile
  id: number;
  ngoName: string = 'Loading...';
  youtubeVideoName: string = 'Loading...';
  ngoImg: string = 'assets/imgs/background.png';
  ngoCampaigns: number = 0;
  ngoCommunity: number = 0;
  ngoContributors: number = 0;
  ngoTeam: number = 0;
  ngoCofounder: string = 'Loading...';
  ngoCofounderImg: string = 'assets/imgs/background.png';  
  ngoUser: string = 'Loading...';
  ngoDesc: string = 'Loading...';
  youtubeUrl: string = 'https://www.youtube.com/embed/';
  ngoYoutubeId: string = 'iJr16_Wwcqg';
  matched: string = 'matched';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public photoViewer: PhotoViewer, private dom: DomSanitizer, private facebook: Facebook) {
    this.id = this.navParams.get('id');  
    
  }

  ionViewDidLoad() {
    // call function showNgoProfile
    this.showNgoProfile(this.id);

    // call iframeUrl
    this.iframeUrl();

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
      this.ngoCommunity = data.community;
      this.ngoContributors = data.contributors;
      this.ngoTeam = data.team;
      this.ngoCofounder = data.ngo_founder;
      this.ngoCofounderImg = data.ngo_founder_img;
      this.ngoUser = data.ngo_user;
      this.ngoDesc = data.ngo_desc;
      this.ngoYoutubeId = data.youtube_id;
      this.youtubeVideoName = data.youtube_video_name;
      this.ngoFamilyImgs = data.ngo_family_img;
      console.log('length: '+data.youtube_video_name.split(" ").length);
      // console.log(data);
    }, err => {
      console.log('Oops!');
    });
  }

  // getNgoId
  getNgoId(id: number) {
    console.log('ngo id: '+id);
    this.matched = '';
  }


  // iframeUrl
  iframeUrl() {    
    return this.dom.bypassSecurityTrustResourceUrl(this.youtubeUrl + this.ngoYoutubeId);
  }

  // getYoutubeVideoImgUrl
  getYoutubeVideoImgUrl() {
    let url = 'https://img.youtube.com/vi/'+ this.ngoYoutubeId +'/hqdefault.jpg';
    return url;
  }

  // showFullImage
  showFullImage(imgUrl: string) {
    this.photoViewer.show(imgUrl);
  }

  // showFullVideo
  showFullVideo() {
  }

  // getWords
  getWords() {
    // return only 5 words
    // return this.youtubeVideoName.split(/\s+/).slice(0,5).join(" ");

    // return only 30 character
    return this.youtubeVideoName.slice(0,25);
  }


  // loginWithFB
  loginWithFB() {
    this.facebook.login(['email','public_profile']).then((res: FacebookLoginResponse) => console.log('Logged into Facebook', res)).catch(e => console.log('Error logging into Facebook', e));
  }
}
