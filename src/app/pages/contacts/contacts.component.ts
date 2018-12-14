/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a component of contact,
 * File path - ./pages/contacts/contacts.component'
 */

import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactusService } from '../../services/contactus/contactus.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactForm: Contact = new Contact();

  constructor(private contactusService: ContactusService) { }

  /** Do any initialization */
  ngOnInit() {
    // Get Contact Us Information From Firestore
    this.contactusService.getContact().valueChanges().subscribe((data: any) => {
      if (data) {
        this.contactForm = data;
      }
    })
  }

  /**
   * --------------------------------------------------------
   * Save Information of Contact
   * --------------------------------------------------------
   */
  save() {
    this.contactusService.save(this.contactForm);
    this.contactForm = new Contact();
  }
}
