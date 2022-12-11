import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter, map, Observable, take, tap } from 'rxjs';

import { IHelpRequest } from '../../interfaces/help-request.interface';
import { UpdateRequestInformation } from '../../state/requests.actions';
import { RequestsState } from '../../state/requests.state';
import { PopupChangeDetailsComponent } from './components/popup-change-details/popup-change-details.component';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
  providers: [DatePipe]
})
export class RequestDetailsComponent {
  private _changeDetailsData!: { title: string | null, location: string, description: string | null };

  public vm$: Observable<{ request: IHelpRequest, volunteer: { title: string, fields: { title: string, subtitle: string | null }[] }, recipient: { title: string, fields: { title: string, subtitle: string | null }[] } }> =
    this._store.select(RequestsState.requests)
        .pipe(
          map((requests) => requests.find(request => request.id === this._route.snapshot.paramMap.get('id')) as IHelpRequest),
          map(request => {
            this._changeDetailsData = {
              location: request.location,
              description: request.description,
              title: request.name
            }

            return {
              request,
              volunteer: this._getVolunteerInfoFields(request),
              recipient: this._getRecipientInfoFields(request)
            }
          })
        );

  constructor(
    private _route: ActivatedRoute,
    private _datePipe: DatePipe,
    private _matDialog: MatDialog,
    private _store: Store
  ) {
  }

  public openEditPopup(): void {
    this._matDialog.open(PopupChangeDetailsComponent, {
      data: {
        title: this._changeDetailsData.title,
        description: this._changeDetailsData.description,
        location: this._changeDetailsData.location
      },
      panelClass: 'change-details-container'
    }).afterClosed()
        .pipe(
          filter(value => value && value.title && value.location && value.description),
          take(1),
          tap(console.log),
        )
        .subscribe(({ location, description, title }) => {
          this._store.dispatch(new UpdateRequestInformation({
            name: title,
            description,
            location,
            id: this._route.snapshot.paramMap.get('id')!
          }));
        });
  }

  private _getVolunteerInfoFields(request: IHelpRequest) {
    return {
      title: 'detailsPage.volunteer',
      fields: [
        {
          title: 'placeholders.name',
          subtitle: `${request.owner.firstName} ${request.owner.lastName}`
        },
        {
          title: 'placeholders.contactNumber',
          subtitle: request.owner.phone
        },
        {
          title: 'placeholders.email',
          subtitle: request.owner.email
        },
        {
          title: 'placeholders.pickUpLocation',
          subtitle: request.location
        },
        {
          title: 'detailsPage.created',
          subtitle: this._datePipe.transform(request.createdDate)
        },
        {
          title: 'detailsPage.lastModified',
          subtitle: this._datePipe.transform(request.lastModifiedDate)
        },
      ]
    };
  }

  private _getRecipientInfoFields(request: IHelpRequest) {
    return {
      title: 'detailsPage.recipient',
      fields: [
        {
          title: 'placeholders.name',
          subtitle: ''
        },
        {
          title: 'placeholders.contactNumber',
          subtitle: ''
        },
        {
          title: 'placeholders.email',
          subtitle: ''
        },
        {
          title: 'placeholders.dropOffAddress',
          subtitle: ''
        }
      ]
    };
  }

}
