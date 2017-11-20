import * as React from 'react';

import { IOperation } from './operation';

export type AnyT = any;
export type EntityIdT = number | string;
export const EMPTY_ID = -1;
export const FIRST_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_TIME_FROM = '00:00:00';
export const DEFAULT_TIME_TO = '23:59:59';
export const NEW_OPTION = 'new';

export interface IKeyValue {
  [index: string]: AnyT;
}

export interface IIdentifiedEntity {
  id?: EntityIdT;
}

export interface INamedEntity extends IIdentifiedEntity {
  name?: string;
}

export interface IEntity extends IIdentifiedEntity, IKeyValue {
}

export interface IRenderable {
  renderer?(item: IEntity): JSX.Element;
}

export interface IFilterable {
  useFilter?: boolean;
  filterPlaceholder?: string;
}

export interface IValueable<TValue> {
  value?: TValue;
}

export interface IPasswordable {
  password?: string;
}

export interface ILoginable {
  login?: string;
}

export interface IStylizable {
  className?: string;
}

export interface IProgressable {
  progress?: boolean;
}

export interface ITouchable {
  touched?: boolean;
}

export interface ISaveable {
  saveable?: boolean;
}

export interface IErrorable<Type> {
  error?: Type;
}

export interface IOperationable {
  operation?: IOperation;
}

export interface IDirtyable {
  dirty?: boolean;
}

export interface ITypeable<Type> {
  type?: Type;
}

export interface ITitleable {
  title?: string;
}

export interface IDisableable {
  disabled?: boolean;
}

export interface IActiveable {
  active?: boolean;
}

export interface ILockable {
  locked?: boolean;
}

export interface IChangeable<TChanges extends IKeyValue> {
  changes: TChanges;
}

export interface IEntityable<TEntity extends IEntity> {
  entity?: TEntity;
}

export interface IDateTimeRangeable {
  fromDate?: string;
  toDate?: string;
}

export type ReactElementT = React.SFCElement<{ children: React.ReactChild[] }>;
export type BasicEventT = React.SyntheticEvent<{}>;
export type FocusEventT = React.FocusEvent<{}>;
export type KeyboardEventT = React.KeyboardEvent<{}>;
export type ChangeEventT = React.ChangeEvent<{ value: AnyT, name?: string }>;

export const INITIAL_DIRTY_STATE: IDirtyable = {
  dirty: true,
};
