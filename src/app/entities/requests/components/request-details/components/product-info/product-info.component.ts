import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductInfoComponent {

  @Input() title!: string;
  @Input() image: string = 'assets/images/empty-product-photo.png';

  constructor() { }
}
