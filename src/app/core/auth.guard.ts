import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { UsersService } from '../services/users/users.service';

import { Observable } from 'rxjs/Observable';
import { map, take, tap } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: UsersService,
        private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {

        return this.auth.user.pipe(
            take(1),
            map((user) => !!user),
            tap((loggedIn) => {
                if (!loggedIn) {
                    console.log('access denied');
                    this.router.navigate(['/login']);
                }
            }),
        );
    }
}