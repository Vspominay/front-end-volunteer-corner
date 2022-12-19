import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter, take } from 'rxjs';

import { IMenuItem } from '../../../shared/components/menu/menu-item.interface';
import { PopupConfirmationComponent } from '../../../shared/components/popup-confirmation/popup-confirmation.component';
import { STATUS_CHANGE_SHEET } from '../../requests/components/request-details/components/status-change-sheet/constants/status-change-default.constant';
import { StatusChangeSheetComponent } from '../../requests/components/request-details/components/status-change-sheet/status-change-sheet.component';
import { ERequestStatus } from '../../requests/enums/request-status.enum';
import { IProposal } from '../interfaces/proposal.interface';
import { ChangeProposalStatus } from '../state/proposals/proposals.actions';

@Injectable()
export class ProposalsActionControlService {

  constructor(
    private _router: Router,
    private _matDialog: MatDialog,
    private _store: Store,
    private _bottomSheet: MatBottomSheet
  ) { }

  public getActions(request: IProposal): IMenuItem[] {
    const resultAction: IMenuItem[] = [];

    resultAction.push(this._viewDetails(request.id));
    if (request.status !== ERequestStatus.Closed) resultAction.push(this._changeStatus(request));
    resultAction.push(this._deleteRequest(request));

    return resultAction;
  }

  private _changeStatus(request: IProposal): IMenuItem {
    return {
      text: 'requests.changeStatus',
      icon: 'ic-change',
      handler: () => {
        this._bottomSheet.open(StatusChangeSheetComponent, {
          data: {
            sheetItems: [...STATUS_CHANGE_SHEET].filter(changeStatus => changeStatus.status !== request.status)
          }
        })
            .afterDismissed()
            .pipe(
              take(1),
              filter(value => !!value)
            )
            .subscribe((status: ERequestStatus) => {
              this._store.dispatch(new ChangeProposalStatus({ id: request.id, status }))
            });
      }
    }
  }

  private _viewDetails(requestId: string): IMenuItem {
    return {
      text: 'requests.viewDetails',
      icon: 'ic-eye',
      handler: () => {
        this._router.navigate(['proposals', 'info', requestId]);
      }
    }
  }

  private _deleteRequest(proposal: IProposal): IMenuItem {
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
            .afterClosed()
            .pipe(
              take(1),
              filter(value => value === 'confirmed')
            ).subscribe(() => {

        });
      }
    }
  }

}
