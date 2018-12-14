/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a provider of Category,
 * File path - '../../services/category/category.service'
 */

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Category } from '../../models/category';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoryService {

  // Collection of Category
  categoryCollection: AngularFirestoreCollection<Category>;

  // Category document object
  categoryDoc: AngularFirestoreDocument<Category>;

  // Category Observable List
  categories: Observable<Category[]>;

  constructor(private afs: AngularFirestore) {
    this.categoryCollection = this.afs.collection('category');
  }

  /**
   * --------------------------------------------------------------
   *  Return an observable list of Categories
   * --------------------------------------------------------------
   * @method    getCategoriesList
   */
  getCategoriesList() {
    return this.categories = this.categoryCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Category;
        data.$key = a.payload.doc.id;
        return data;
      });
    });
  }

  // 
  /**
   * --------------------------------------------------------------
   *  Create a Brand New Video Category
   * --------------------------------------------------------------
   * @method    createCategory
   * @param     category     Object of Data
   */
  createCategory(category: Category) {
    category.active = true;
    this.categoryCollection.add({
      $key: "",
      name: category.name,
      image: category.image,
      active: category.active,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  /**
   * --------------------------------------------------------------
   *  Update an exisiting Category
   * --------------------------------------------------------------
   * @method    updateCategory
   */
  updateCategory(category: Category): void {
    this.categoryCollection.doc(category.$key).update({ name: category.name, image: category.image });
  }

  /**
   * --------------------------------------------------------------
   *  Delete Category
   * --------------------------------------------------------------
   * @method    deleteCategory
   */
  deleteCategory(category: Category): void {
    this.categoryCollection.doc(category.$key).delete();
  }

  /**
   * --------------------------------------------------------------
   *  Get Category By Key
   * --------------------------------------------------------------
   * @method    getCategory
   */
  getCategoryByKey(key) {
    return this.categoryCollection.doc(key).ref.get().then((doc) => {
      return doc.data();
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }
}
