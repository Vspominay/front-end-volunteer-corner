export interface IBaseCreatedEntity {
  id: string,
  createdBy: string | null,
  createdDate: string,
  lastModifiedBy: string | null,
  lastModifiedDate: string | null,
}