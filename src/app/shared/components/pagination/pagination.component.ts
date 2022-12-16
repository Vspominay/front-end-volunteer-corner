import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';

@Component({
  standalone: true,
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  imports: [CommonModule, MatIconModule, NgxPaginationModule],
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Output() onPageChange = new EventEmitter<number>();
  @Input() config!: PaginationInstance;
}
