import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  constructor(private router: Router,
    private afAuth: AngularFireAuth) { }


  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }
}
