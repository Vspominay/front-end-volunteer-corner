import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Subject, takeUntil } from "rxjs";

import { Login } from "../../state/auth.actions";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();

  public sighInFormGroup!: FormGroup;
  public wrongCredentialsError!: string;

  constructor(private fb: FormBuilder, private store: Store) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public onSubmit(): void {
    if (this.sighInFormGroup.valid) {
      this.store.dispatch(new Login(this.sighInFormGroup.value))
          .pipe(takeUntil(this._destroy$))
          .subscribe({
            next: () => {}, error: (error) => {
              if (error.message) {
                this.wrongCredentialsError = error.message;
                this.sighInFormGroup.controls['password'].setErrors({ wrongCred: true });
              }
            }
          });
    }
  }

  private initForm(): void {
    this.sighInFormGroup = this.fb.group({
      userName: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
