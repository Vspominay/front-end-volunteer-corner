import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from "@ngxs/store";
import { Observable } from 'rxjs';

import { AuthState } from "../entities/authentication/state/auth.state";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.store.selectSnapshot(AuthState.token)) {
      return true;
    } else {
      return this.router.createUrlTree(['auth'])
    }
  }

}
