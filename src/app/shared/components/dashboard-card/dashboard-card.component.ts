import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { EDashboardCardStyle } from "./enums/dashboard-card-style.enum";

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() style!: EDashboardCardStyle;
  @Input() icon!: string;
}
