import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

import { UpdateUserProfile } from '../../state/profile.actions';
import { ProfileState } from '../../state/profile.state';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  private _destroy$: Subject<void> = new Subject<void>();

  public profileData$: Observable<{ firstName: string, lastName: string, phoneNumber: string, email: string }> =
    this._store.select(ProfileState.profileData)
        .pipe(tap((profileData) => {
          this.profileForm.patchValue(profileData);
        }));

  public profileForm!: FormGroup;

  constructor(
    private _store: Store,
    private _fb: FormBuilder,
    private _router: Router
  ) { }

  public onSubmit(): void {
    console.log(this.profileForm);
    if (this.profileForm.dirty && this.profileForm.valid) {
      this._store.dispatch(new UpdateUserProfile(this.profileForm.value))
          .pipe(takeUntil(this._destroy$))
          .subscribe(() => {
            this._navigateToViewProfile()
          });
      return;
    }

    this._navigateToViewProfile();
  }

  public ngOnInit(): void {
    this._initForm();
  }

  private _navigateToViewProfile(): void {
    this._router.navigate(['profile', 'view']);
  }

  private _initForm(): void {
    this.profileForm = this._fb.group({
      firstName: this._fb.control('', [Validators.required]),
      lastName: this._fb.control('', [Validators.required]),
      phoneNumber: this._fb.control('', [Validators.required]),
      email: this._fb.control('', [Validators.email])
    });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
