import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { IMenuItem } from '../../../shared/components/menu/menu-item.interface';
import { PopupConfirmationComponent } from '../../../shared/components/popup-confirmation/popup-confirmation.component';
import { StatusChangeSheetComponent } from '../components/request-details/components/status-change-sheet/status-change-sheet.component';
import { IHelpRequest } from '../interfaces/help-request.interface';

@Injectable()
export class RequestsActionControlService {

  constructor(
    private _router: Router,
    private _matDialog: MatDialog,
    private _bottomSheet: MatBottomSheet
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
        this._bottomSheet.open(StatusChangeSheetComponent);
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
        this._matDialog.open(PopupConfirmationComponent, {
          data: {
            title: 'requests.deleteRequest',
            confirmBtnText: 'appButtons.confirm',
            cancelBtnText: 'appButtons.cancel'
          }
        })
      }
    }
  }


}
