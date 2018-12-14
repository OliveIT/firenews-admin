/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a component of aboutus,
 * File path - ./pages/aboutus/aboutus.component'
 */

import { Component, OnInit } from '@angular/core';
import { Aboutus } from '../../models/aboutus';
import { AboutusService } from '../../services/aboutus/aboutus.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  aboutus: Aboutus = new Aboutus();

  constructor(private aboutusService: AboutusService) { }

  /** Do any initialization */
  ngOnInit() {
    // Get About Us Information
    this.aboutusService.getAboutUs().valueChanges().subscribe((data: any) => {
      if (data) {
        this.aboutus = data;
      }
    })
  }

  /**
   * --------------------------------------------------------
   * Save Information of About Us
   * --------------------------------------------------------
   */
  save() {
    this.aboutusService.save(this.aboutus);
    this.aboutus = new Aboutus();
    this.aboutus.details = '';
  }
}
