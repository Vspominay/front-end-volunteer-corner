import { ERequestStatus } from '../../../../../enums/request-status.enum';

export interface IStatusChange {
  status: ERequestStatus,
  description: string
}
