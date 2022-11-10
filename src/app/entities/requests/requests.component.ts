import { Component, OnInit } from '@angular/core';
import { Store } from "@ngxs/store";
import { Subject, takeUntil } from "rxjs";
import { REQUEST_COLUMNS } from "./constants/request-columns.constant";
import { IHelpRequest } from "./interfaces/help-request.interface";

import { FetchRequests } from "./state/requests.actions";
import { RequestsState } from "./state/requests.state";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  public readonly columns = REQUEST_COLUMNS;
  public requests!: IHelpRequest[];

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store) { }

  public ngOnInit(): void {
    this.store.dispatch(new FetchRequests({}));

    this.store.select(RequestsState.requests)
        .pipe(takeUntil(this._destroy$))
        .subscribe(requests => {
          this.requests = requests;
        });
  }


  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
