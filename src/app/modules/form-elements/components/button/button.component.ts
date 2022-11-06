import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EButtonShape } from "./enums/button-shape.enum";
import { EButtonStyle } from "./enums/button-style.enum";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {

  @Input() content!: string;
  @Input() isDisabledButton!: boolean;
  @Input() buttonShape: EButtonShape = EButtonShape.Square;
  @Input() buttonStyle: EButtonStyle = EButtonStyle.Outline;
  @Input() iconPosition: 'start' | 'end' = 'end';
  @Input() icon?: string;
  @Input() type!: 'submit' | 'text';
  @Output() onClickButton: EventEmitter<void> = new EventEmitter<void>();

  public onClickBtn(): void {
    if (!this.isDisabledButton) {
      this.onClickButton.emit();
    }
  }

}
