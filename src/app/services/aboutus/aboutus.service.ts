/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a provider of AboutUs,
 * File path - '../../services/aboutus/aboutus.service'
 */

import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Aboutus } from '../../models/aboutus';

@Injectable()
export class AboutusService {

  constructor(private afs: AngularFirestore) { }

  /**
   * --------------------------------------------------------
   * Save AboutUs Information
   * --------------------------------------------------------
   * @param aboutus
   */
  save(aboutus: Aboutus) {
    this.afs.collection('aboutus').doc('aboutus').set({
      title: aboutus.title,
      details: aboutus.details,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  /**
   * --------------------------------------------------------
   * Get AboutUs Information
   * --------------------------------------------------------
   */
  getAboutUs() {
    return this.afs.collection('aboutus').doc('aboutus');
  }
}
