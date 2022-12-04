import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IMenuItem } from './menu-item.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

  @Input() icon: string = 'ic-more';
  @Input() items!: IMenuItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
