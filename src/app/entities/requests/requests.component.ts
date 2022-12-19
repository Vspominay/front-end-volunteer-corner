import { animate, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from "@ngxs/store";
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { Collection, PaginationInstance } from 'ngx-pagination';
import { debounceTime, distinctUntilChanged, map, Observable, Subject, switchMap, takeUntil } from "rxjs";

import { ICreateEntity } from '../../interfaces/create-entity.interface';
import { EButtonStyle } from '../../modules/form-elements/components/button/enums/button-style.enum';
import { DatepickerComponent } from '../../shared/components/datepicker/datepicker.component';
import { IMenuItem } from '../../shared/components/menu/menu-item.interface';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { StatusFilterComponent } from '../../shared/components/status-filter/status-filter.component';
import { StatusComponent } from '../../shared/components/status/status.component';
import { TableFieldComponent } from '../../shared/components/table-field/table-field.component';
import { NAME_PATTERN } from '../../utils/name-pattern.constant';
import { REQUEST_COLUMNS } from './constants/request-columns.constant';
import { IHelpRequest } from './interfaces/help-request.interface';
import { RequestsActionControlService } from './services/requests-action-control.service';
import { GetOwnHelpRequests } from './state/help-seeker/help-seekers.actions';
import { HelpSeekersState } from './state/help-seeker/help-seekers.state';
import { CreateHelpRequest, FetchRequests } from './state/requests/requests.actions';
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

  public allRequestGridApi!: GridApi;
  public myRequestGridApi!: GridApi;

  public colDefs: ColDef[] = [
    {
      field: 'Status',
      headerValueGetter: this._localizeHeader.bind(this),
      cellRendererSelector: (params: ICellRendererParams) => this._retrieveTableFieldParams(StatusComponent, {
        status: params.data.status
      }),
      sortable: true,
      comparator: (valueA, valueB, nodeA, nodeB) => nodeA.data.status - nodeB.data.status,
      filter: StatusFilterComponent,
    },
    {
      field: 'Item',
      headerValueGetter: this._localizeHeader.bind(this),
      cellRendererSelector: (params: ICellRendererParams) => this._retrieveTableFieldParams(TableFieldComponent, {
        title: params.data.name,
        subTitle: params.data.description
      })
    },
    {
      field: 'Donor',
      headerValueGetter: this._localizeHeader.bind(this),
      cellRendererSelector: (params: ICellRendererParams) => this._retrieveTableFieldParams(TableFieldComponent, {
        title: params.data.owner.firstName,
        subTitle: params.data.owner.lastName
      })
    },
    {
      field: 'Location',
      headerValueGetter: this._localizeHeader.bind(this),
      cellRendererSelector: (params: ICellRendererParams) => this._retrieveTableFieldParams(TableFieldComponent, {
        title: params.data.location
      })
    },

    {
      field: 'Date',
      headerValueGetter: this._localizeHeader.bind(this),
      cellRendererSelector: (params: ICellRendererParams) => this._retrieveTableFieldParams(TableFieldComponent, {
        title: this._datePipe.transform(params.data.createdDate) || ''
      }),
      sortable: true,
      filter: DatepickerComponent,
      filterParams: {
        isShowHint: false
      },
      comparator: (valueA, valueB, nodeA, nodeB) => new Date(nodeA.data.createdDate).getTime() - new Date(nodeB.data.createdDate).getTime(),
    },
    {
      field: 'Actions',
      headerValueGetter: this._localizeHeader.bind(this),
      cellRendererSelector: (params: ICellRendererParams) => this._retrieveTableFieldParams(MenuComponent, {
        items: this._actionControlService.getActions(params.data)
      }),
    }
  ];
  public readonly columns = REQUEST_COLUMNS;

  public ownHelpRequests$ = this._store.select(HelpSeekersState.requests)
                                .pipe(
                                  map(ownHelpRequests => {
                                    return {
                                      requests: ownHelpRequests || [],
                                      requestMenu: this._generateActions(ownHelpRequests) || {}
                                    }
                                  })
                                );


  public viewModel$: Observable<{
    requests: IHelpRequest[],
    requestMenu: { [key: string]: IMenuItem[] }
  }> = this._store.select(RequestsState.requests)
           .pipe(
             map(requests => {
               return {
                 requests: requests || [],
                 requestMenu: this._generateActions(requests) || {}
               }
             })
           );

  public buttonStyle = EButtonStyle;
  public isShowCreateForm: boolean = false;
  public searchInput: FormControl = new FormControl<string>('');
  public createRequestForm!: FormGroup<{
    name: FormControl<string>,
    description: FormControl<string>,
    location: FormControl<string>
  }>;
  public allRequestsPaginationConfig: PaginationInstance = {
    id: 'requests',
    itemsPerPage: 5,
    currentPage: 0
  };

  public myRequestsPaginationConfig: PaginationInstance = {
    id: 'myRequests',
    itemsPerPage: 5,
    currentPage: 0
  }

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _store: Store,
    private _router: Router,
    private _datePipe: DatePipe,
    private _translateService: TranslateService,
    private _actionControlService: RequestsActionControlService,
    private _fb: FormBuilder
  ) { }

  public ngOnInit(): void {
    this._initSearchInput();
    this._initCreateRequestForm();
    this._fetchOwnHelpRequests();
  }

  public onGridReady(params: GridReadyEvent): void {
    if (this.allRequestGridApi) {
      this.myRequestGridApi = params.api;
      this.myRequestGridApi.refreshHeader();
      return;
    }

    this.allRequestGridApi = params.api;
    this.allRequestGridApi.refreshHeader();
  }

  public setPage(page: number, paginationConfig: PaginationInstance) {
    this.allRequestGridApi.paginationGoToPage(page);
    paginationConfig.currentPage = page;
  }

  public createRequest(): void {
    this._store.dispatch(new CreateHelpRequest(this.createRequestForm.value as ICreateEntity))
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          this.createRequestForm.reset();
        });
  }

  public changeTab(): void {
    this._redrawGrid(this.allRequestGridApi);
    this._redrawGrid(this.myRequestGridApi);
  }

  private _redrawGrid(grid: GridApi): void {
    if (grid) {
      grid.redrawRows();
    }
  }


  private _localizeHeader(parameters: any): string {
    const headerIdentifier = `table.${parameters.colDef!.field}`.toLowerCase();
    return this._translateService.instant(headerIdentifier);
  }

  private _retrieveTableFieldParams(component: typeof TableFieldComponent | typeof StatusComponent | typeof MenuComponent, params: { [key: string]: string | IMenuItem[] }): { component: typeof TableFieldComponent | typeof StatusComponent | typeof MenuComponent, params: { [key: string]: string | IMenuItem[] } } {
    return {
      component,
      params
    }
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

  private _initCreateRequestForm(): void {
    this.createRequestForm = this._fb.group({
      name: this._fb.nonNullable.control('', [Validators.required, NAME_PATTERN]),
      description: this._fb.nonNullable.control('', [Validators.required, Validators.minLength(10)]),
      location: this._fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
    });
  }

  private _fetchOwnHelpRequests(): void {
    this._store.dispatch(new GetOwnHelpRequests());
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
