import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-information-field',
  templateUrl: './information-field.component.html',
  styleUrls: ['./information-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InformationFieldComponent {

  @Input() data!: {
    title: string,
    subtitle: string | null
  };

  constructor() { }

}
