import { IBaseCreatedEntity } from "./base-created-entity.interface";

export interface IHelpSeeker extends IBaseCreatedEntity {
  firstName: string | null,
  lastName: string | null,
  email: string | null,
  phone: string | null
}