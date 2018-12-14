/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a component of dashboard,
 * File path - ./pages/dashboard/dashboard.component'
 */


import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalCategory: any;
  totalArticle: any;
  totalVideo: any;

  constructor(private globalService: GlobalService) { }

  /** Do any initialization */
  ngOnInit() {

    // Get Total Category
    this.globalService.getTotalCategory().then(totalCategory => {
      this.totalCategory = totalCategory;
    });

    // Get Total Article
    this.globalService.getTotalArticle().then(totalArticle => {
      this.totalArticle = totalArticle;
    })

    // Get Total Video Article
    this.globalService.getTotalVideoArticle().then(totalVideo => {
      this.totalVideo = totalVideo;
    })
  }
}


