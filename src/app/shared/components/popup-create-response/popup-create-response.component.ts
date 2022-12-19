import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { PopupChangeDetailsComponent } from '../../../entities/requests/components/request-details/components/popup-change-details/popup-change-details.component';
import { EButtonShape } from '../../../modules/form-elements/components/button/enums/button-shape.enum';
import { EButtonStyle } from '../../../modules/form-elements/components/button/enums/button-style.enum';
import { FormElementsModule } from '../../../modules/form-elements/form-elements.module';

@Component({
  selector: 'app-popup-create-response',
  standalone: true,
  imports: [CommonModule, FormElementsModule, MatIconModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './popup-create-response.component.html',
  styleUrls: ['./popup-create-response.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupCreateResponseComponent {

  public responseForm!: FormGroup;
  public buttonShape: EButtonShape = EButtonShape.Round;
  public buttonStyle: EButtonStyle = EButtonStyle.Outline;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, location: string, description: string },
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<PopupChangeDetailsComponent>
  ) {
    _dialogRef.addPanelClass('default-modal-container');
  }

  public close(isSuccess: boolean = false): void {
    if (isSuccess) {
      this._dialogRef.close(this.responseForm.value);
    } else {
      this._dialogRef.close();
    }
  }

  public onSubmit(): void {
    if (this.responseForm.invalid) {
      this.close();
      return;
    }

    this.close(true);
  }

  public ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.responseForm = this._fb.group({
      comment: this._fb.control<string>('', [Validators.required]),
    });
  }
}
