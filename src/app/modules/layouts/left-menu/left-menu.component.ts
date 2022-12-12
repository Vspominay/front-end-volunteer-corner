import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { Subject, takeUntil } from "rxjs";

import { Logout } from "../../../entities/authentication/state/auth.actions";
import { AuthState } from "../../../entities/authentication/state/auth.state";
import { HIDE_MENU_ROUTES } from "./constants/hide-menu-routes.constants";
import { NAV_MENU_ITEMS } from "./constants/nav-menu-items.constants";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  public menuItems = NAV_MENU_ITEMS;
  public isHideMenu: boolean = true;
  public isAuthenticated!: boolean;

  private _destroy$: Subject<void> = new Subject<void>();

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  constructor(private store: Store, private router: Router) { }

  public ngOnInit(): void {
    this._defineIsShowMenu();

    this.store.select(AuthState.token)
        .pipe(takeUntil(this._destroy$))
        .subscribe(token => {
          this.isAuthenticated = !!token;
        });
  }

  public logout(): void {
    this.store.dispatch(new Logout());
    this.router.navigateByUrl('/auth');
  }

  private _defineIsShowMenu(): void {
    this.isHideMenu = HIDE_MENU_ROUTES.includes(this.router.url.split('/')[1]);
  }

}
