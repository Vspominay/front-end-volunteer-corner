import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { Collection, PaginationInstance } from 'ngx-pagination';
import { debounceTime, distinctUntilChanged, map, Observable, Subject, switchMap, takeUntil } from 'rxjs';

import { EButtonStyle } from '../../modules/form-elements/components/button/enums/button-style.enum';
import { DatepickerComponent } from '../../shared/components/datepicker/datepicker.component';
import { IMenuItem } from '../../shared/components/menu/menu-item.interface';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { StatusFilterComponent } from '../../shared/components/status-filter/status-filter.component';
import { StatusComponent } from '../../shared/components/status/status.component';
import { TableFieldComponent } from '../../shared/components/table-field/table-field.component';
import { REQUEST_COLUMNS } from '../requests/constants/request-columns.constant';
import { RequestsActionControlService } from '../requests/services/requests-action-control.service';
import { IProposal } from './interfaces/proposal.interface';
import { FetchProposals } from './state/proposals/proposals.actions';
import { ProposalsState } from './state/proposals/proposals.state';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss']
})
export class ProposalsComponent implements OnInit, OnDestroy {

  public gridApi!: GridApi;
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

  private _retrieveTableFieldParams(component: typeof TableFieldComponent | typeof StatusComponent | typeof MenuComponent, params: { [key: string]: string | IMenuItem[] }): { component: typeof TableFieldComponent | typeof StatusComponent | typeof MenuComponent, params: { [key: string]: string | IMenuItem[] } } {
    return {
      component,
      params
    }
  }

  public readonly columns = REQUEST_COLUMNS;
  public viewModel$: Observable<{
    proposals: IProposal[],
    proposalMenu: { [key: string]: IMenuItem[] }
  }> = this._store.select(ProposalsState.proposals)
           .pipe(
             map(proposals => ({
               proposals: proposals || [],
               proposalMenu: this._generateActions(proposals) || {}
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
    private _translateService: TranslateService,
    private _actionControlService: RequestsActionControlService
  ) { }

  public ngOnInit(): void {
    this._initSearchInput();
  }

  public paginationConfig: PaginationInstance = {
    id: 'list',
    itemsPerPage: 5,
    currentPage: 0
  };

  public onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.refreshHeader();
  }

  public setPage(page: number) {
    this.gridApi.paginationGoToPage(page);
    this.paginationConfig.currentPage = page;
  }

  private _localizeHeader(parameters: any): string {
    const headerIdentifier = `table.${parameters.colDef!.field}`.toLowerCase();
    return this._translateService.instant(headerIdentifier);
  }

  private _generateActions(collection: Collection<IProposal>): { [key: string]: IMenuItem[] } {
    let result: { [key: string]: IMenuItem[] } = {};

    for (const item of collection) {
      result[item.id] = [];
      // result[item.id].push(...this._actionControlService.getActions(item));
    }

    return result;
  }

  private _initSearchInput(): void {
    this.searchInput.valueChanges
        .pipe(
          takeUntil(this._destroy$),
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((search) => this._store.dispatch(new FetchProposals())),
        ).subscribe();
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
