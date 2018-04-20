import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  // slideData array
  slideData: any = [
    {id: 1, currency: '10.24 K'},
    {id: 2, currency: '250 USD'},
    {id: 3, currency: '177.93 GBP'},
    {id: 4, currency: '1,571.55 CNY'},
    {id: 5, currency: '15,270.95 RUB'},
    {id: 6, currency: '202.60 EUR'}
  ];

  constructor(public navCtrl: NavController) {

  }

}
