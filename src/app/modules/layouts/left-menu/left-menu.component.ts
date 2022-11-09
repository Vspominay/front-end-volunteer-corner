import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { Login } from "../../../entities/authentication/state/auth.actions";
import { HIDE_MENU_ROUTES } from "./constants/hide-menu-routes.constants";

import { NAV_MENU_ITEMS } from "./constants/nav-menu-items.constants";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  public menuItems = NAV_MENU_ITEMS;
  public isShowMenu: boolean = true;

  constructor(private store: Store, private router: Router) { }

  public ngOnInit(): void {
    this._defineIsShowMenu();
  }

  public auth(): void {
    this.store.dispatch(new Login({ userName: 'root', password: '_QGrXyvcmTD4aVQJ_' }));
  }

  private _defineIsShowMenu(): void {
    this.isShowMenu = HIDE_MENU_ROUTES.includes(this.router.url.split('/')[1]);
  }

}
