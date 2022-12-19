import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentComponent {
  @Input() file!: {
    fileName: string,
    filePath: string
  }
}
