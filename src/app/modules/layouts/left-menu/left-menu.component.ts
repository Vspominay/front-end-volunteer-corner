import { Component, OnInit } from '@angular/core';

import { NAV_MENU_ITEMS } from "./constants/nav-menu-items.constants";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  public menuItems = NAV_MENU_ITEMS;

  constructor() { }

  ngOnInit(): void {
  }

}
