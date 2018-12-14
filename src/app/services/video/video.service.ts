/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a provider of Video,
 * File path - '../../services/video/video.service'
 */

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase';
import { Video } from '../../models/video';


@Injectable()
export class VideoService {

  // Collection of video
  videoCollection: AngularFirestoreCollection<any>;

  // Video document object
  videoDoc: AngularFirestoreDocument<Video>;

  // Video Observable List
  videos: Observable<Video[]>;

  // Limit Count for Each Time Populated data from Firestore
  offset: any = 20;

  // Last Item from Video List
  lastVisible: any;

  // Keep record of Firestore Collection
  private _done = new BehaviorSubject(false);
  done: Observable<boolean> = this._done.asObservable();

  constructor(private afs: AngularFirestore) { }

  /**
   * --------------------------------------------------------------
   *  Create a Brand New Video Article
   * --------------------------------------------------------------
   * @method    createVideoArticle
   * @param     video     Object of Data
   */
  createVideoArticle(video: Video) {
    video.active = true;
    this.videoCollection.add({
      category: video.category,
      youtubeLink: video.youtubeLink,
      title: video.title,
      lowerCaseTitle: video.title.toLowerCase(),
      details: video.details,
      image: video.image,
      active: video.active,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  /**
   * --------------------------------------------------------------
   *  Get List of Video Article
   * --------------------------------------------------------------
   * @method    getArticleList
   */
  getArticleList() {
    this.videoCollection = this.afs.collection('video', ref => {
      return ref
        .orderBy('timestamp', 'desc')
        .limit(this.offset)
    });

    this.getCursor();

    return this.videoCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Video;
        data.$key = a.payload.doc.id;
        return data;
      });
    });
  }

  /**
   * --------------------------------------------------------------
   *  Get More Video Articles
   * --------------------------------------------------------------
   * @method    getMoreVideo
   */
  getMoreVideo() {
    this.videoCollection = this.afs.collection('video', ref => {
      return ref
        .orderBy('timestamp', 'desc')
        .startAfter(this.lastVisible)
        .limit(this.offset)
    });

    this.getCursor();

    return this.videoCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Video;
        data.$key = a.payload.doc.id;
        return data;
      });
    });
  }

  /**
   * --------------------------------------------------------------
   *  Determines the doc snapshot to paginate query
   * --------------------------------------------------------------
   * @method    getCursor
   */
  getCursor() {
    this.videoCollection.snapshotChanges().subscribe(details => {
      var data = details[details.length - 1];
      if (data && data.payload && data.payload.doc) {
        this._done.next(false);
        this.lastVisible = data.payload.doc;
      } else {
        this._done.next(true);
      }
    });
  }

  /**
   * --------------------------------------------------------------
   *  Search Result
   * --------------------------------------------------------------
   * @method    searchResult
   */
  searchResult(start, end) {
    this.videoCollection = this.afs.collection('video', ref => {
      return ref
        .orderBy('lowerCaseTitle')
        .startAt(start.toLowerCase()).endAt(end.toLowerCase())
    });

    return this.videoCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Video;
        data.$key = a.payload.doc.id;
        return data;
      });
    });
  }

  /**
   * --------------------------------------------------------------
   *  Delete Article
   * --------------------------------------------------------------
   * @method    deleteArticle
   */
  deleteArticle(video: Video) {
    this.videoCollection.doc(video.$key).delete();
  }

  /**
   * --------------------------------------------------------------
   *  Get Video Article By Key
   * --------------------------------------------------------------
   * @method    getArticle
   */
  getArticleByKey(key) {
    return this.videoCollection.doc(key).ref.get().then((doc) => {
      return doc.data();
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }

  /**
   * --------------------------------------------------------------
   *  Update an exisiting article
   * --------------------------------------------------------------
   * @method    updateArticle
   */
  updateArticle(video: Video): void {
    this.videoCollection.doc(video.$key).update({ title: video.title, image: video.image, details: video.details, category: video.category });
  }

  /**
   * --------------------------------------------------------------
   *  Get Video Article By Category
   * --------------------------------------------------------------
   * @method    getArticleByCategory
   */
  getArticleByCategory(category) {
    this.videoCollection = this.afs.collection('video', ref => {
      return ref
        .orderBy('timestamp', 'desc')
        .where('category', '==', category)
    });

    return this.videoCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Video;
        data.$key = a.payload.doc.id;
        return data;
      });
    });
  }
}
