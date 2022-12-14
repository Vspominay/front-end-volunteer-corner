import { animate, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from "@ngxs/store";
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Collection } from 'ngx-pagination';
import { debounceTime, distinctUntilChanged, map, Observable, Subject, switchMap, takeUntil } from "rxjs";

import { EButtonStyle } from '../../modules/form-elements/components/button/enums/button-style.enum';
import { IMenuItem } from '../../shared/components/menu/menu-item.interface';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { StatusComponent } from '../../shared/components/status/status.component';
import { TableFieldComponent } from '../../shared/components/table-field/table-field.component';
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
  providers: [DatePipe]
})
export class RequestsComponent implements OnInit {

  public rowData: any = [];
  public colDefs: ColDef[] = [
    {
      field: 'status',
      cellRendererSelector: (params: ICellRendererParams) => this._retrieveTableFieldParams(StatusComponent, {
        status: params.data.status
      })
    },
    {
      field: 'item',
      cellRendererSelector: (params: ICellRendererParams) => this._retrieveTableFieldParams(TableFieldComponent, {
        title: params.data.name,
        subTitle: params.data.description
      })
    },
    {
      field: 'donor',
      cellRendererSelector: (params: ICellRendererParams) => this._retrieveTableFieldParams(TableFieldComponent, {
        title: params.data.owner.firstName,
        subTitle: params.data.owner.lastName
      })
    },
    {
      field: 'location',
      cellRendererSelector: (params: ICellRendererParams) => this._retrieveTableFieldParams(TableFieldComponent, {
        title: params.data.location
      })
    },

    {
      field: 'date',
      cellRendererSelector: (params: ICellRendererParams) => this._retrieveTableFieldParams(TableFieldComponent, {
        title: this._datePipe.transform(params.data.createdDate) || ''
      })
    },
    {
      field: 'actions',
      cellRendererSelector: (params: ICellRendererParams) => this._retrieveTableFieldParams(MenuComponent, {
        items: this._actionControlService.getActions(params.data)
      })
    }
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true
  };

  private _retrieveTableFieldParams(component: typeof TableFieldComponent | typeof StatusComponent | typeof MenuComponent, params: { [key: string]: string | IMenuItem[] }): { component: typeof TableFieldComponent | typeof StatusComponent | typeof MenuComponent, params: { [key: string]: string | IMenuItem[] } } {
    return {
      component,
      params
    }
  }

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
    private _datePipe: DatePipe,
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
