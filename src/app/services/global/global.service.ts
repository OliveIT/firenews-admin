/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a provider of Global Service,
 * File path - '../../services/global/global.service'
 */

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class GlobalService {

  // Collection of category
  categoryCollection: AngularFirestoreCollection<any>;

  // Collection of article
  articleCollection: AngularFirestoreCollection<any>;

  // Collection of video article
  videoCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.categoryCollection = this.afs.collection('category');
    this.articleCollection = this.afs.collection('article');
    this.videoCollection = this.afs.collection('video');
  }

  /**
   * --------------------------------------------------------
   * Get Total Category
   * --------------------------------------------------------
   */
  getTotalCategory() {
    return this.categoryCollection.ref.get().then((categorySnapshot) => {
      return categorySnapshot.size ? categorySnapshot.size : 0;
    })
  }

  /**
   * --------------------------------------------------------
   * Get Total Articles
   * --------------------------------------------------------
   */
  getTotalArticle() {
    return this.articleCollection.ref.get().then((articleSnapshot) => {
      return articleSnapshot.size ? articleSnapshot.size : 0;
    })
  }

  /**
   * --------------------------------------------------------
   * Get Total Video Articles
   * --------------------------------------------------------
   */
  getTotalVideoArticle() {
    return this.videoCollection.ref.get().then((videoSnapshot) => {
      return videoSnapshot.size ? videoSnapshot.size : 0;
    })
  }
}
