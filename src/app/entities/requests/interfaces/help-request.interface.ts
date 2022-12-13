import { ERequestStatus } from "../enums/request-status.enum";
import { IBaseCreatedEntity } from "./base-created-entity.interface";
import { IHelpSeeker } from "./help-seeker.interface";

export interface IHelpRequest extends IBaseCreatedEntity {
  owner: IHelpSeeker,
  name: string | null,
  description: string | null,
  location: string,
  additionalDocuments: string[],
  status: ERequestStatus,
}
