import {
  INamedEntity,
  ILoginWrapper,
  IEmailWrapper,
  IPasswordWrapper,
} from '../definitions.interface';

export interface IUser extends INamedEntity,
                               IPasswordWrapper,
                               ILoginWrapper,
                               IEmailWrapper {
}

export interface IApplicationUserState extends IUser {
}

export const USER_UPDATE_ACTION_TYPE = 'user.update';
export const USER_DESTROY_ACTION_TYPE = 'user.destroy';
