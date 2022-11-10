import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-field',
  templateUrl: './table-field.component.html',
  styleUrls: ['./table-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFieldComponent {
  @Input() title!: string | null;
  @Input() subTitle?: string;
}
