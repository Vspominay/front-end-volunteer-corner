import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from "@ngxs/store";
import { Collection } from 'ngx-pagination';
import { debounceTime, distinctUntilChanged, map, Observable, Subject, switchMap, takeUntil } from "rxjs";

import { EButtonStyle } from '../../modules/form-elements/components/button/enums/button-style.enum';
import { IMenuItem } from '../../shared/components/menu/menu-item.interface';
import { REQUEST_COLUMNS } from './constants/request-columns.constant';
import { IHelpRequest } from './interfaces/help-request.interface';
import { RequestsActionControlService } from './services/requests-action-control.service';
import { FetchRequests } from './state/requests/requests.actions';
import { RequestsState } from './state/requests/requests.state';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ height: 0, transform: 'translateY(-60vh)' }),
        animate(300, style({ height: '230px', transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate(300, style({ height: 0, transform: 'translateY(-60vh)' })),
      ]),
    ])
  ],
})
export class RequestsComponent implements OnInit {

  public readonly columns = REQUEST_COLUMNS;
  public viewModel$: Observable<{
    requests: IHelpRequest[],
    requestMenu: { [key: string]: IMenuItem[] }
  }> = this._store.select(RequestsState.requests)
           .pipe(
             map(requests => ({
               requests: requests || [],
               requestMenu: this._generateActions(requests) || {}
             }))
           );

  public buttonStyle = EButtonStyle;
  public isShowCreateForm: boolean = false;
  public searchInput: FormControl = new FormControl<string>('');

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _store: Store,
    private _router: Router,
    private _actionControlService: RequestsActionControlService
  ) { }

  public ngOnInit(): void {
    this._initSearchInput();
  }

  private _generateActions(collection: Collection<IHelpRequest>): { [key: string]: IMenuItem[] } {
    let result: { [key: string]: IMenuItem[] } = {};

    for (const item of collection) {
      result[item.id] = [];
      result[item.id].push(...this._actionControlService.getActions(item));
    }

    return result;
  }

  private _initSearchInput(): void {
    this.searchInput.valueChanges
        .pipe(
          takeUntil(this._destroy$),
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((search) => this._store.dispatch(new FetchRequests({ search: search }))),
        ).subscribe();
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
