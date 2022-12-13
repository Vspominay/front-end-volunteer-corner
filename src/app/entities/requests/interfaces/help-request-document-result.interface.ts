import { IBaseCreatedEntity } from "./base-created-entity.interface";

export interface IHelpRequestDocumentResult extends IBaseCreatedEntity {
  helpRequestId: string | null,
  filePath: string | null
}