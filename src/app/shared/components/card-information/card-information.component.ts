import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-information',
  templateUrl: './card-information.component.html',
  styleUrls: ['./card-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardInformationComponent {

  @Input() title!: string;
  @Input() fields!: { title: string, subtitle?: string | null }[];

  constructor() { }
}
