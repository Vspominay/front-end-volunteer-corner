import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EButtonStyle } from '../../../../modules/form-elements/components/button/enums/button-style.enum';
import { FormElementsModule } from '../../../../modules/form-elements/form-elements.module';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [CommonModule, FormElementsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFormComponent {

  @Input() createForm!: FormGroup<{
    name: FormControl<string>,
    location: FormControl<string>,
    description: FormControl<string>
  }>;
  @Output() onSubmitForm: EventEmitter<void> = new EventEmitter<void>();

  public buttonStyle: EButtonStyle = EButtonStyle.Pale;

  public onSubmit(): void {
    if (this.createForm.invalid) return;
    this.onSubmitForm.emit();
  }
}
