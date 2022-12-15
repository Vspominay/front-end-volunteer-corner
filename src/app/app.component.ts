import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { filter, map, Observable, startWith, Subject, takeUntil } from 'rxjs';

import { Logout } from './entities/authentication/state/auth.actions';
import { AuthState } from './entities/authentication/state/auth.state';
import { ResetProfile } from './entities/profile/state/profile.actions';
import { IWindowCypress } from './interfaces/window-cypress.interface';
import { HIDE_MENU_ROUTES } from './modules/layouts/left-menu/constants/hide-menu-routes.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private _destroy$: Subject<void> = new Subject<void>();

  public isHideMenu$: Observable<boolean> =
    this._router.events
        .pipe(
          startWith(true),
          filter(event => event instanceof NavigationEnd),
          map(event => (event as NavigationEnd).url),
          map(url => HIDE_MENU_ROUTES.includes(url.split('/')[1]))
        );
  public isAuthenticated$: Observable<boolean> =
    this._store.select(AuthState.token)
        .pipe(map(token => !!token));

  constructor(
    private _router: Router,
    private _store: Store,
    private _actions: Actions
  ) {}

  public ngOnInit(): void {
    const windowWithStore: IWindowCypress = window as unknown as IWindowCypress;

    if (windowWithStore.Cypress) {
      windowWithStore.store = this._store;
    }

    this._actions.pipe(
      ofActionDispatched(Logout),
      takeUntil(this._destroy$)
    ).subscribe(() => {
      this._store.dispatch([ResetProfile]);
      this._router.navigateByUrl('/auth');
    });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
