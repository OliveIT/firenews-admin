/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a component of settings,
 * File path - ./pages/settings/settings.component'
 */

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  ngForm: any;

  /**
   * Show all Error/Success Messages
   */
  message: any;

  /**
   * Status of Password Show/Hide
   */
  hide: any;

  constructor(private userService: UsersService, private formBuilder: FormBuilder) {
    this.hide = true; // Hide Password
  }

  /** Do any initialization */
  ngOnInit() {
    this.formValidation();
  }

  /***
   * --------------------------------------------------------------
   * Form Validation
   * --------------------------------------------------------------
   * @method    formValidation    This function build a form with validation
   * 
   */
  formValidation() {
    this.ngForm = this.formBuilder.group({
      currentPassword: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required])]
    });
  }

  /**
   * --------------------------------------------------------------
   * Update Password
   * --------------------------------------------------------------
   */
  updatePassword() {
    this.message = '';
    const currentPassword: string = this.ngForm.currentPassword;
    const newPassword: string = this.ngForm.newPassword;
    this.userService.updatePassword(currentPassword, newPassword).subscribe((res) => {
      this.message = 'Your password has been changed successfully! Thank you.';
    }, err => {
      this.message = err.message;
    });
  }
}
