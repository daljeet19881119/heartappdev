import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  // slideData array
  slideData: any = [
    {id: 2, currency: '2,560.00 USD'},
    {id: 3, currency: '1,817.59 GBP'},
    {id: 4, currency: '1,6076.03 CNY'},
    {id: 5, currency: '15,7127.42 RUB'},
    {id: 6, currency: '2079.18 EUR'}
  ];

  constructor(public navCtrl: NavController) {

  }

}
