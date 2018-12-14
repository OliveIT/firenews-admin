/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a provider of Article,
 * File path - '../../services/article/article.service'
 */
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase';
import { Article } from '../../models/article';


@Injectable()
export class ArticleService {

  // Collection of Article
  articleCollection: AngularFirestoreCollection<any>;

  // Article Document Object
  articleDoc: AngularFirestoreDocument<Article>;

  // Article Observable List
  articles: Observable<Article[]>;

  // Limit Count For Each Time Populated Data From Firestore
  offset: any = 20;

  // Last Item from Video List
  lastVisible: any;

  // Keep record of Firestore Collection
  private _done = new BehaviorSubject(false);
  done: Observable<boolean> = this._done.asObservable();

  constructor(private afs: AngularFirestore) { }

  /**
   * --------------------------------------------------------------
   *  Create a Brand New Article
   * --------------------------------------------------------------
   * @method    createVideoArticle
   * @param     video     Object of Data
   */
  createArticle(article: Article) {
    article.active = true;
    this.articleCollection.add({
      category: article.category,
      title: article.title,
      lowerCaseTitle: article.title.toLowerCase(),
      details: article.details,
      image: article.image,
      active: article.active,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  /**
   * --------------------------------------------------------------
   *  Get List of Article
   * --------------------------------------------------------------
   * @method    getArticleList
   */
  getArticleList() {
    this.articleCollection = this.afs.collection('article', ref => {
      return ref
        .orderBy('timestamp', 'desc')
        .limit(this.offset)
    });

    this.getCursor();

    return this.articleCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Article;
        data.$key = a.payload.doc.id;
        return data;
      });
    });
  }

  /**
   * --------------------------------------------------------------
   *  Get More Articles
   * --------------------------------------------------------------
   * @method    getMoreArticle
   */
  getMoreArticle() {
    this.articleCollection = this.afs.collection('article', ref => {
      return ref
        .orderBy('timestamp', 'desc')
        .startAfter(this.lastVisible)
        .limit(this.offset)
    });

    this.getCursor();

    return this.articleCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Article;
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
    this.articleCollection.snapshotChanges().subscribe(details => {
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
    this.articleCollection = this.afs.collection('article', ref => {
      return ref
        .orderBy('lowerCaseTitle')
        .startAt(start.toLowerCase()).endAt(end.toLowerCase())
    });

    return this.articleCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Article;
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
  deleteArticle(article: Article) {
    this.articleCollection.doc(article.$key).delete();
  }

  /**
   * --------------------------------------------------------------
   *  Get Article By Key
   * --------------------------------------------------------------
   * @method    getArticleByKey
   */
  getArticleByKey(key) {
    return this.articleCollection.doc(key).ref.get().then((doc) => {
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
  updateArticle(article: Article): void {
    this.articleCollection.doc(article.$key).update({ title: article.title, image: article.image, details: article.details, category: article.category });
  }

  /**
   * --------------------------------------------------------------
   *  Get Article By Category
   * --------------------------------------------------------------
   * @method    getArticleByCategory
   */
  getArticleByCategory(category) {
    this.articleCollection = this.afs.collection('article', ref => {
      return ref
        .orderBy('timestamp', 'desc')
        .where('category', '==', category)
    });

    return this.articleCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Article;
        data.$key = a.payload.doc.id;
        return data;
      });
    });
  }
}
