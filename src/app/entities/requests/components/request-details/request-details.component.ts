import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { BehaviorSubject, filter, map, Observable, take } from 'rxjs';
import { ProfileState } from '../../../profile/state/profile.state';

import { UpdateRequestInformation } from '../../state/requests/requests.actions';
import { PopupChangeDetailsComponent } from './components/popup-change-details/popup-change-details.component';
import { IPersonInformation, IRequestDetail } from './interfaces/request-details.interface';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
  providers: [DatePipe]
})
export class RequestDetailsComponent implements OnInit {
  private _changeDetailsData!: { title: string | null, location: string, description: string | null };

  public vm$!: Observable<{ entityDetail: IRequestDetail, volunteer: { title: string, fields: { title: string, subtitle?: string | null }[] }, recipient: { title: string, fields: { title: string, subtitle?: string | null }[] } }>;
  public isOwner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private _route: ActivatedRoute,
    private _datePipe: DatePipe,
    private _matDialog: MatDialog,
    private _store: Store
  ) {
  }

  public ngOnInit(): void {
    this.vm$ = this._route.data.pipe(
      map(({ entityDetail }) => entityDetail as IRequestDetail),
      map(entity => {
        this._changeDetailsData = {
          title: entity.title,
          description: entity.description,
          location: entity.recipientData.location || entity.volunteerData.location || '--'
        }

        this.isOwner$.next(entity.ownerId === this._store.selectSnapshot(ProfileState.userId));

        return {
          entityDetail: entity,
          volunteer: this._getVolunteerInfoFields(entity.volunteerData),
          recipient: this._getRecipientInfoFields(entity.recipientData)
        }
      })
    );
  }

  public openEditPopup(): void {
    this._matDialog.open(PopupChangeDetailsComponent, {
      data: {
        title: this._changeDetailsData.title,
        description: this._changeDetailsData.description,
        location: this._changeDetailsData.location
      }
    }).afterClosed()
        .pipe(
          filter(value => value && value.title && value.location && value.description),
          take(1)
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

  private _getVolunteerInfoFields(personInformation: IPersonInformation) {
    const { name, phone, email, lastModifiedDate, createdDate, location } = personInformation;

    return {
      title: 'detailsPage.volunteer',
      fields: [
        {
          title: 'placeholders.name',
          subtitle: name
        },
        {
          title: 'placeholders.contactNumber',
          subtitle: phone
        },
        {
          title: 'placeholders.email',
          subtitle: email
        },
        {
          title: 'placeholders.pickUpLocation',
          subtitle: location
        },
        {
          title: 'detailsPage.created',
          subtitle: this._datePipe.transform(createdDate)
        },
        {
          title: 'detailsPage.lastModified',
          subtitle: this._datePipe.transform(lastModifiedDate)
        },
      ]
    };
  }

  private _getRecipientInfoFields(personInformation: IPersonInformation) {
    const { name, phone, email, lastModifiedDate, createdDate, location } = personInformation;

    return {
      title: 'detailsPage.recipient',
      fields: [
        {
          title: 'placeholders.name',
          subtitle: name,
        },
        {
          title: 'placeholders.contactNumber',
          subtitle: phone
        },
        {
          title: 'placeholders.email',
          subtitle: email
        },
        {
          title: 'placeholders.dropOffAddress',
          subtitle: location
        },
        {
          title: 'detailsPage.created',
          subtitle: this._datePipe.transform(createdDate)
        },
        {
          title: 'detailsPage.lastModified',
          subtitle: this._datePipe.transform(lastModifiedDate)
        },
      ]
    };
  }

}
