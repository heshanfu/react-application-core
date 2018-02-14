import {
  IIdentifiedEntity,
  IChangesWrapper,
  IEntity,
  EntityIdT,
  IEntityWrapper,
  IOperationable,
  IMergerWrapper,
} from '../definition.interface';

export interface IApiEntity<TEntity extends IEntity> extends IIdentifiedEntity,
                                                             IChangesWrapper<TEntity>,
                                                             IEntityWrapper<TEntity>,
                                                             IMergerWrapper<TEntity>,
                                                             IOperationable {
  isNew: boolean;
}

export function makeUpdatedApiStubEntity<TEntity extends IEntity>(id: EntityIdT): IApiEntity<TEntity> {
  return {id, isNew: false, changes: {} as TEntity, merger: {} as TEntity};
}

export interface IApiEntityWrapper<TEntity extends IEntity> {
  apiEntity: IApiEntity<TEntity>;
}

export interface IApiEntityRequest<TEntity extends IEntity> extends IApiEntityWrapper<TEntity> {
  editApi?: string;
  addApi?: string;
  extraParams?: IEntity;
}

export type ApiEntityT = IApiEntity<IEntity>;
