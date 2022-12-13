import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';

import { EButtonStyle } from '../../../../modules/form-elements/components/button/enums/button-style.enum';
import { NAME_PATTERN } from '../../../../utils/name-pattern.constant';
import { CreateHelpRequest } from '../../state/requests/requests.actions';

@Component({
  selector: 'app-create-request-form',
  templateUrl: './create-request-form.component.html',
  styleUrls: ['./create-request-form.component.scss']
})
export class CreateRequestFormComponent implements OnInit {

  private _destroy$: Subject<void> = new Subject<void>();

  public createRequestForm!: FormGroup;
  public buttonStyle: EButtonStyle = EButtonStyle.Pale;

  constructor(
    private _fb: FormBuilder,
    private _store: Store
  ) { }

  public ngOnInit(): void {
    this._initForm();
  }

  public onSubmit(): void {
    if (this.createRequestForm.invalid) return;

    this._store.dispatch(new CreateHelpRequest(this.createRequestForm.value))
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          this.createRequestForm.reset();
        });
  }

  private _initForm(): void {
    this.createRequestForm = this._fb.group({
      name: this._fb.nonNullable.control<string>('', [Validators.required, NAME_PATTERN]),
      location: this._fb.nonNullable.control<string>('', [Validators.required, Validators.minLength(3)]),
      description: this._fb.nonNullable.control<string>('', [Validators.required, Validators.minLength(10)])
    });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
