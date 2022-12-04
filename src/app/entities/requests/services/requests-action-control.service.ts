import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { IMenuItem } from '../../../shared/components/menu/menu-item.interface';
import { IHelpRequest } from '../interfaces/help-request.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestsActionControlService {

  constructor(
    private _router: Router
  ) { }

  public getActions(request: IHelpRequest): IMenuItem[] {
    const resultAction: IMenuItem[] = [];

    resultAction.push(this._viewDetails(request.id));
    resultAction.push(this._changeStatus());
    resultAction.push(this._deleteRequest());

    return resultAction;
  }

  private _changeStatus(): IMenuItem {
    return {
      text: 'requests.changeStatus',
      icon: 'ic-change',
      handler: () => {

      }
    }
  }

  private _viewDetails(requestId: string): IMenuItem {
    return {
      text: 'requests.viewDetails',
      icon: 'ic-eye',
      handler: () => {
        this._router.navigate(['requests', 'info', requestId]);
      }
    }
  }

  private _deleteRequest(): IMenuItem {
    return {
      text: 'requests.delete',
      icon: 'ic-delete',
      handler: () => {

      }
    }
  }


}
