import { History } from 'history';

import { isFn } from '../util';
import { IDefaultBaseContainer } from '../component/base';
import { IContainerWrapperCtor } from '../component/application';
import { IDefaultApplicationState } from '../store';
import { IConnectorConfig, ConnectorConfigT } from '../component/connector';
import { IApplicationAccessConfig } from '../permissions';
import { IPathWrapper, ITypeWrapper } from '../definitions.interface';

export interface IRoutes {
  profile: string;
  home: string;
  signIn: string;
  signUp: string;
  restoreAuth: string;
  logout: string;
  accessDenied: string;
}

export interface IRouter extends History {
  basename?: string;
}

export interface IRouterComputedMatch {
  params: any;
  path: string;
  url: string;
  isExact: boolean;
}

export enum ContainerVisibilityTypeEnum {
  PUBLIC,
  PRIVATE,
}

export interface IRouteOptions extends IPathWrapper,
                                       ITypeWrapper<ContainerVisibilityTypeEnum> {
  exact?: boolean;
  computedMatch?: IRouterComputedMatch;
  beforeEnter?: () => void;
  afterEnter?: () => void;
}
export type RouteOptionsT = IRouteOptions|((routes: IRoutes) => IRouteOptions);

export const toRouteOptions = (routeComponentConfig: RouteOptionsT,
                               routes: IRoutes): IRouteOptions => {
  return isFn(routeComponentConfig)
      ? (routeComponentConfig as (routes: IRoutes) => IRouteOptions)(routes)
      : routeComponentConfig as IRouteOptions;
};

export type RouteContainerT = IDefaultBaseContainer | IContainerWrapperCtor;
export const DYNAMIC_ROUTES = new Map<RouteContainerT, ConnectorConfigT>();

export const ROUTER_NAVIGATE_ACTION_TYPE = 'router.navigate';
export const ROUTER_REPLACE_ACTION_TYPE = 'router.replace';
export const ROUTER_BACK_ACTION_TYPE = `${ROUTER_NAVIGATE_ACTION_TYPE}.back`;
