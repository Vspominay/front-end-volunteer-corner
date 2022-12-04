import { ERequestStatus } from '../../../../../enums/request-status.enum';
import { IStatusChange } from '../interfaces/status-change-item.interface';

export const STATUS_CHANGE_SHEET: IStatusChange[] = [
  {
    status: ERequestStatus.Active,
    description: 'statusChanges.active'
  }, {
    status: ERequestStatus.Closed,
    description: 'statusChanges.closed'
  }, {
    status: ERequestStatus.Canceled,
    description: 'statusChanges.canceled'
  },
];
