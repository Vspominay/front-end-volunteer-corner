import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from "@ngxs/store";
import { Collection } from 'ngx-pagination';
import { Subject, takeUntil } from "rxjs";
import { EButtonStyle } from '../../modules/form-elements/components/button/enums/button-style.enum';
import { IMenuItem } from '../../shared/components/menu/menu-item.interface';
import { REQUEST_COLUMNS } from "./constants/request-columns.constant";
import { IHelpRequest } from "./interfaces/help-request.interface";
import { RequestsActionControlService } from './services/requests-action-control.service';
import { RequestsState } from "./state/requests.state";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  public readonly columns = REQUEST_COLUMNS;
  public requests!: IHelpRequest[];
  public buttonStyle: EButtonStyle = EButtonStyle.Pale;
  public requestMenu!: { [key: string]: IMenuItem[] };

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _store: Store,
    private _router: Router,
    private _actionControlService: RequestsActionControlService
  ) { }

  public ngOnInit(): void {
    this._store.select(RequestsState.requests)
        .pipe(takeUntil(this._destroy$))
        .subscribe(requests => {
          this.requests = requests;
          this.requestMenu = this._generateActions(requests);
        });
  }

  private _generateActions(collection: Collection<IHelpRequest>): { [key: string]: IMenuItem[] } {
    let result: { [key: string]: IMenuItem[] } = {};

    for (const item of collection) {
      result[item.id] = [];
      result[item.id].push(...this._actionControlService.getActions(item));
    }

    return result;
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
