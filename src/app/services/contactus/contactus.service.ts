/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a provider of ContactUs,
 * File path - '../../services/contactus/contactus.service'
 */

import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Contact } from '../../models/contact';

@Injectable()
export class ContactusService {

  constructor(private afs: AngularFirestore) { }

  /**
   * --------------------------------------------------------
   * Save ContactUs Information
   * --------------------------------------------------------
   * @param contact
   */
  save(contact: Contact) {
    this.afs.collection('contactus').doc('contactus').set({
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  /**
   * --------------------------------------------------------
   * Get ContactUs Information
   * --------------------------------------------------------
   */
  getContact() {
    return this.afs.collection('contactus').doc('contactus');
  }
}
