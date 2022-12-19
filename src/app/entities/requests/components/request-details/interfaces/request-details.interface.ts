import { IBaseCreatedEntity } from '../../../interfaces/base-created-entity.interface';
import { IRequestResponse } from '../../../interfaces/request-response.interface';

export interface IRequestDetail extends IBaseCreatedEntity {
  volunteerData: IPersonInformation,
  recipientData: IPersonInformation,
  title: string,
  responses?: IRequestResponse[],
  description: string,
}

export interface IPersonInformation {
  name?: string,
  phone?: string | null,
  email?: string | null,
  location?: string,
  createdDate?: string,
  lastModifiedDate?: string | null
}
