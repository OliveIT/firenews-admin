/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a provider of User,
 * File path - '../../services/users/users.service'
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable()
export class UsersService {

  // user object
  user: Observable<User | null>;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // Verifies User Availability
    this.user = this.afAuth.authState
      .switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  /**
   * --------------------------------------------------------------
   * Admin Login
   * --------------------------------------------------------------
   * @method    adminLogin
   * @param     email
   * @param     password
   * @returns   { Observable }
   */
  adminLogin = (email: string, password: string) => {
    return Observable.create(observer => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((data: any) => {
          this.updateUserData(data);
          observer.next('success');
        })
        .catch((err: any) => {
          observer.error(err);
        });
    });
  }

  /**
   * --------------------------------------------------------------
   * Sets user data to firestore after succesful login
   * --------------------------------------------------------------
   * @param user 
   */
  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'Admin'
    };

    return userRef.set(data);
  }

  /**
   * --------------------------------------------------------------
   * Update Password
   * --------------------------------------------------------------
   * @method updatePassword  This function re-authenticate with user credentials
   * and then update user password.
   * @param oldPassword      User Current Password
   * @param newPassword      User New Password
   */
  updatePassword(oldPassword, newPassword) {
    return Observable.create(observer => {

      // Get Current UserId
      let user = this.afAuth.auth.currentUser;

      // Get Credentials of Current User
      const credentials = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);

      // Prompt the User to Re-provide their Sign-in Credentials
      user.reauthenticateWithCredential(credentials).then((res) => {

        // Update user password
        user.updatePassword(newPassword).then((updateRes) => {
          observer.next('success');
        }).catch((err: any) => {
          observer.error(err);
        });
      }).catch((err: any) => {
        observer.error(err);
      })
    });
  };

  /**
   * --------------------------------------------------------------
   * Signout
   * --------------------------------------------------------------
   */
  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
