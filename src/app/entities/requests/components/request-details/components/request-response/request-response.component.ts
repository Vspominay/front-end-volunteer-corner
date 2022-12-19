import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-request-response',
  templateUrl: './request-response.component.html',
  styleUrls: ['./request-response.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestResponseComponent {
  @Input() user!: {
    id: string,
    fullName: string,
    photo?: string
  }
  @Input() title?: string;
  @Input() description!: string;
}
