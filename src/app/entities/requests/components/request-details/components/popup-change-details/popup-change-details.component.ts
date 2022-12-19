import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EButtonShape } from '../../../../../../modules/form-elements/components/button/enums/button-shape.enum';
import { EButtonStyle } from '../../../../../../modules/form-elements/components/button/enums/button-style.enum';

@Component({
  selector: 'app-popup-change-details',
  templateUrl: './popup-change-details.component.html',
  styleUrls: ['./popup-change-details.component.scss']
})
export class PopupChangeDetailsComponent implements OnInit {

  public editForm!: FormGroup;
  public buttonShape: EButtonShape = EButtonShape.Round;
  public buttonStyle: EButtonStyle = EButtonStyle.Outline;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, location: string, description: string },
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<PopupChangeDetailsComponent>
  ) {
    _dialogRef.addPanelClass('default-modal-container');
  }

  public ngOnInit(): void {
    this._initForm();
  }

  public close(isSuccess: boolean = false): void {
    if (isSuccess) {
      this._dialogRef.close(this.editForm.value);
    } else {
      this._dialogRef.close();
    }
  }

  public onSubmit(): void {
    if (this.editForm.invalid) {
      this.close();
      return;
    }

    this.close(true);
  }

  private _initForm(): void {
    this.editForm = this._fb.group({
      title: this._fb.control<string>(this.data.title || '', [Validators.required]),
      location: this._fb.control<string>(this.data.location || '', [Validators.required]),
      description: this._fb.control<string>(this.data.description || '', [Validators.required]),
    });
  }

}
