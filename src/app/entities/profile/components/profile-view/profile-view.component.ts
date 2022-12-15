import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ProfileState } from '../../state/profile.state';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  public profileData$: Observable<{ firstName: string, lastName: string, phoneNumber: string, email: string }> =
    this._store.select(ProfileState.profileData)

  constructor(private _store: Store) { }

  ngOnInit(): void {
  }

}
