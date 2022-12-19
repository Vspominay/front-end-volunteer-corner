import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';

import { EAccountType } from '../../../../enums/account-type.enum';
import { NAME_PATTERN } from '../../../../utils/name-pattern.constant';
import { SignUp } from '../../state/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  public signUpForm!: FormGroup;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _store: Store
  ) { }

  public ngOnInit(): void {
    this._initForm()
  }

  public onSubmit(): void {
    if (this.signUpForm.invalid) return;

    this._store.dispatch(new SignUp(this.signUpForm.value))
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          this._router.navigateByUrl('/dashboard');
        });

  }

  private _initForm(): void {
    this.signUpForm = this._fb.group({
      firstName: this._fb.nonNullable.control<string>('', [Validators.required, NAME_PATTERN]),
      lastName: this._fb.nonNullable.control<string>('', [Validators.required, NAME_PATTERN]),
      userName: this._fb.nonNullable.control<string>('', [Validators.required, NAME_PATTERN]),
      email: this._fb.nonNullable.control<string>('', [Validators.required, Validators.email]),
      password: this._fb.nonNullable.control<string>('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: this._fb.nonNullable.control<string>('', [Validators.required, Validators.minLength(8)]),
      accountType: this._fb.nonNullable.control<EAccountType>(EAccountType.HelpSeeker, [Validators.required])
    });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
