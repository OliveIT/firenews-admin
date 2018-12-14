/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This file represents a component of login,
 * File path - ./pages/login/login.component'
 */

import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersService } from '../../services/users/users.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * Show all Error/Success Messages
   */
  message: any;

  /**
   * Status of Password Show/Hide
   */
  hide: any;

  ngForm: any;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private userService: UsersService,
    private ngZone: NgZone,
    private formBuilder: FormBuilder) {


    this.hide = true; // Hide Password

    // Continuously Check Auth State
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  /** Do any initialization */
  ngOnInit() {
    this.formValidation();
  }

  /***
   * --------------------------------------------------------------
   * Form Validation
   * --------------------------------------------------------------
   * @method    formValidation    This function build a Login form with validation
   * 
   */
  formValidation() {
    this.ngForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  /**
   * --------------------------------------------------------------
   * Login
   * --------------------------------------------------------------
   */
  adminLogin() {
    this.userService.adminLogin(this.ngForm.email, this.ngForm.password).subscribe((res) => {
      console.log('Success');
    }, err => {
      this.message = err.message
    });
  }
}
