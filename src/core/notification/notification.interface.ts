import { IInfoable } from '../definitions.interface';
import { IErrorEntity } from '../entities-definitions.interface';

export interface IApplicationNotificationState extends IErrorEntity<string>,
                                                       IInfoable<string> {
}

export interface IApplicationNotificationWrapperState {
  notification: IApplicationNotificationState;
}

export const INITIAL_APPLICATION_NOTIFICATION_STATE: IApplicationNotificationState = {
  error: null,
  info: null,
};

export const NOTIFICATION_INFO_ACTION_TYPE = 'notification.info';
export const NOTIFICATION_ERROR_ACTION_TYPE = 'notification.error';
export const NOTIFICATION_CLEAR_ACTION_TYPE = 'notification.clear';
