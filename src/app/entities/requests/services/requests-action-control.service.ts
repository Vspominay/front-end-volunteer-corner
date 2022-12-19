import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter, take } from 'rxjs';

import { IMenuItem } from '../../../shared/components/menu/menu-item.interface';
import { PopupConfirmationComponent } from '../../../shared/components/popup-confirmation/popup-confirmation.component';
import { PopupCreateResponseComponent } from '../../../shared/components/popup-create-response/popup-create-response.component';
import { STATUS_CHANGE_SHEET } from '../components/request-details/components/status-change-sheet/constants/status-change-default.constant';
import { StatusChangeSheetComponent } from '../components/request-details/components/status-change-sheet/status-change-sheet.component';
import { ERequestStatus } from '../enums/request-status.enum';
import { IHelpRequest } from '../interfaces/help-request.interface';
import { ChangeRequestStatus, CreateResponse, DeleteRequestInformation, UploadRequestDocument } from '../state/requests/requests.actions';

@Injectable()
export class RequestsActionControlService {

  constructor(
    private _router: Router,
    private _matDialog: MatDialog,
    private _store: Store,
    private _bottomSheet: MatBottomSheet
  ) { }

  public getActions(request: IHelpRequest): IMenuItem[] {
    const resultAction: IMenuItem[] = [];

    resultAction.push(this._viewDetails(request.id));
    if (request.status !== ERequestStatus.Closed) resultAction.push(this._changeStatus(request));
    if (request.status === ERequestStatus.Active) resultAction.push(this._createResponse(request));
    resultAction.push(this._deleteRequest(request));
    resultAction.push(this._uploadFile(request));

    return resultAction;
  }

  private _changeStatus(request: IHelpRequest): IMenuItem {
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
              this._store.dispatch(new ChangeRequestStatus({ id: request.id, status }));
            });
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

  private _deleteRequest(request: IHelpRequest): IMenuItem {
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
          this._store.dispatch(new DeleteRequestInformation(request.id))
        });
      }
    }
  }

  private _createResponse(request: IHelpRequest): IMenuItem {
    return {
      text: 'createResponse.respond',
      icon: 'ic-message',
      handler: () => {
        this._matDialog.open(PopupCreateResponseComponent)
            .afterClosed()
            .pipe(
              take(1),
              filter(value => !!value)
            ).subscribe(({ comment }) => {
          this._store.dispatch(new CreateResponse({ id: request.id, comment }));
        });
      }
    }
  }

  private _uploadFile(request: IHelpRequest): IMenuItem {
    return {
      text: 'requests.uploadDocument',
      icon: 'ic-document',
      handler: () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf';
        fileInput.click();
        fileInput.addEventListener('change', (ev: any) => {
          const file = ev.target.files[0];

          if (!file) return;

          this._store.dispatch(new UploadRequestDocument({ id: request.id, file }));
        });
      }
    }
  }


}
