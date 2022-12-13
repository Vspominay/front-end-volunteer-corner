import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";

import { Logout } from "../../../entities/authentication/state/auth.actions";
import { NAV_MENU_ITEMS } from "./constants/nav-menu-items.constants";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent {

  public readonly menuItems = NAV_MENU_ITEMS;

  constructor(private _store: Store, private _router: Router) { }

  public logout(): void {
    this._store.dispatch(new Logout());
    this._router.navigateByUrl('/auth');
  }
}
