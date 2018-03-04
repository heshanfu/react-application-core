# React Application Core

A react-based application core for the business applications.

# Description

The library is designed to quickly start developing business applications are based on React, Redux, Material-UI.

# Demo

* [react-redux-typescript-webpack-seed](https://github.com/apoterenko/react-redux-typescript-webpack-seed)
* [Live demo](https://apoterenko.github.io/react-redux-typescript-webpack-seed)

# Dependencies

* [react](https://github.com/facebook/react)
* [redux](https://github.com/reactjs/redux)
* [react-redux](https://github.com/reactjs/react-redux)
* [react-router-dom](https://github.com/ReactTraining/react-router)
* [material-components-web](https://github.com/material-components/material-components-web)
* [ramda](https://github.com/ramda/ramda)
* [InversifyJS](https://github.com/inversify/InversifyJS)
* [@dagrejs/graphlib](https://github.com/dagrejs/graphlib)
* [moment](https://github.com/moment/moment)
* [axios](https://github.com/axios/axios)
* [store](https://github.com/marcuswestin/store.js)
* [socket.io-client](https://github.com/socketio/socket.io-client)
* [react-text-mask](https://github.com/text-mask/text-mask)

# Usage

#### Containers

###### Roles container

```typescript
import * as React from 'react';

import {
  listWrapperMapper,
  filterWrapperMapper,
  defaultMappers,
  BaseContainer,
  DefaultLayoutContainer,
  SearchToolbarContainer,
  ListContainer,
  ContainerVisibilityTypeEnum,
  IBaseContainerInternalProps,
  disabledActionsListWrapperMapper,
  connector,
} from 'react-application-core';

import { ROUTER_PATHS } from '../../app.routes';
import { IRolesContainerInternalProps, ROLES_SECTION } from './roles.interface';
import { IAppState } from '../../app.interface';
import { AccessConfigT, IRoleEntity } from '../permission.interface';
import { AppPermissions } from '../../app.permissions';

@connector<IAppState, AccessConfigT>({
  routeConfig: {
    type: ContainerVisibilityTypeEnum.PRIVATE,
    path: ROUTER_PATHS.ROLES,
  },
  accessConfig: [AppPermissions.ROLES_VIEW],
  mappers: [
    ...defaultMappers,
    (state) => filterWrapperMapper(state.roles),
    (state) => listWrapperMapper(state.roles)
  ],
})
class RolesContainer extends BaseContainer<IRolesContainerInternalProps, {}> {

  public static defaultProps: IBaseContainerInternalProps = {
    sectionName: ROLES_SECTION,
  };

  public render(): JSX.Element {
    const props = this.props;
    const header = <SearchToolbarContainer filterOptions={disabledActionsListWrapperMapper(props)}
                                           {...props}/>;
    return (
      <DefaultLayoutContainer headerOptions={{ items: header }}
                              {...props}>
        <ListContainer listOptions={{
                        itemOptions: { tpl: this.tpl },
                        addAction: this.permissionService.isAccessible(AppPermissions.ROLE_ADD),
                       }}
                       {...props}/>
      </DefaultLayoutContainer>
    );
  }

  private tpl = (item: IRoleEntity): JSX.Element => (
    <span>
       {item.name} {this.nc.id(item.id)}
    </span>
  )
}
```

###### Role container

```typescript
import * as React from 'react';

import {
  BaseContainer,
  FormContainer,
  FormDialog,
  TextField,
  toSelectOptions,
  FORM_DIALOG_REF,
  listWrapperSelectedEntityMapper,
  formMapper,
  DefaultLayoutContainer,
  defaultMappers,
  ChipsField,
  ContainerVisibilityTypeEnum,
  IBaseContainerInternalProps,
  connector,
  LayoutBuilder,
  LayoutEnum,
  uuid,
} from 'react-application-core';

import { IRoleContainerInternalProps, ROLE_SECTION } from './role.interface';
import { IAppState } from '../../../app.interface';
import { RIGHTS_DICTIONARY } from '../../../dictionary';
import { ROUTER_PATHS } from '../../../app.routes';
import { AccessConfigT } from '../../permission.interface';
import { AppPermissions } from '../../../app.permissions';

@connector<IAppState, AccessConfigT>({
  routeConfig: {
    type: ContainerVisibilityTypeEnum.PRIVATE,
    path: ROUTER_PATHS.ROLE,
  },
  accessConfig: [AppPermissions.ROLE_VIEW],
  mappers: [
    ...defaultMappers,
    (state) => formMapper(state.roles.role),
    (state) => listWrapperSelectedEntityMapper(state.roles, state.roles.role)
  ],
})
class RoleContainer extends BaseContainer<IRoleContainerInternalProps, {}> {

  public static defaultProps: IBaseContainerInternalProps = {
    sectionName: ROLE_SECTION,
  };

  private layoutBuilder = new LayoutBuilder(uuid());

  public render(): JSX.Element {
    const props = this.props;
    const dictionaries = props.dictionaries;
    const rights = dictionaries.rights && dictionaries.rights.data;
    const title = props.isNewEntity
      ? 'New role'
      : `Role ${this.nc.id(props.entityId)}`;

    return (
      <DefaultLayoutContainer headerOptions={{
                                navigationActionType: 'arrow_back',
                                navigationActionHandler: this.activateFormDialog,
                              }}
                              title={title}
                              {...props}>
        <FormContainer {...props}>
          {
            this.layoutBuilder.build({
              layout: LayoutEnum.VERTICAL,
              children: [
                <TextField name='name'
                           label='Name'
                           autoFocus={true}
                           required={true}/>,
                <ChipsField name='rights'
                            label='Rights'
                            options={toSelectOptions(rights)}
                            bindToDictionary={RIGHTS_DICTIONARY}
                            menuOptions={{ useFilter: true, renderToCenterOfBody: true }}
                            displayMessage='%d right(s)'/>
              ],
            })
          }
        </FormContainer>
        <FormDialog ref={FORM_DIALOG_REF}
                    onAccept={this.navigateToBack}
                    {...props}/>
      </DefaultLayoutContainer>
    );
  }
}
```

#### Effects

###### Roles effects

```typescript
import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import {
  buildEntityRoute,
  provideInSingleton,
  ListActionBuilder,
  BaseEffects,
  effectsBy,
  makeFilteredListEffectsProxy,
  makeUntouchedListEffectsProxy,
  makeFailedListEffectsProxy,
  makeEditedListEffectsProxy,
} from 'react-application-core';

import { IApi } from '../../api/api.interface';
import { ROUTER_PATHS } from '../../app.routes';
import { ROLES_SECTION } from './roles.interface';
import { IRoleEntity } from '../permission.interface';
import { IAppState } from '../../app.interface';
import { ROLE_SECTION } from './role';

@provideInSingleton(RolesEffects)
@effectsBy(
  makeUntouchedListEffectsProxy<IAppState>({
    section: ROLES_SECTION,
    listWrapperStateResolver: (state) => state.roles,
  }),
  makeEditedListEffectsProxy<IRoleEntity, IAppState>({
    listSection: ROLES_SECTION,
    formSection: ROLE_SECTION,
    pathResolver: (role) => buildEntityRoute<IRoleEntity>(ROUTER_PATHS.ROLE, role),
  }),
  makeFilteredListEffectsProxy({ section: ROLES_SECTION }),
  makeFailedListEffectsProxy(ROLES_SECTION)
)
export class RolesEffects extends BaseEffects<IApi> {

  @EffectsService.effects(ListActionBuilder.buildLoadActionType(ROLES_SECTION))
  public $onRolesSearch(_: IEffectsAction, state: IAppState): Promise<IRoleEntity[]> {
    return this.api.searchRoles(state.roles.filter.query);
  }
}
```

###### Role effects

```typescript
import { IEffectsAction, EffectsService } from 'redux-effects-promise';

import {
  provideInSingleton,
  FormActionBuilder,
  IApiEntity,
  BaseEffects,
  makeSucceedFormEffectsProxy,
  makeFailedFormEffectsProxy,
  effectsBy,
} from 'react-application-core';

import { ROLES_SECTION } from '../roles.interface';
import { ROLE_SECTION } from './role.interface';
import { IApi } from '../../../api/api.interface';
import { IRoleEntity } from '../../permission.interface';

@provideInSingleton(RoleEffects)
@effectsBy(
    makeFailedFormEffectsProxy(ROLE_SECTION),
    makeSucceedFormEffectsProxy({
      listSection: ROLES_SECTION,
      formSection: ROLE_SECTION,
    })
)
export class RoleEffects extends BaseEffects<IApi> {

  @EffectsService.effects(FormActionBuilder.buildSubmitActionType(ROLE_SECTION))
  public onSaveRole(action: IEffectsAction): Promise<IRoleEntity> {
    return this.api.saveRole(action.data as IApiEntity<IRoleEntity>);
  }
}
```

# Contributors

[<img alt="apoterenko" src="https://avatars0.githubusercontent.com/u/12325691?v=4&s=460" width="117">](https://github.com/apoterenko)[<img alt="chge" src="https://avatars3.githubusercontent.com/u/400840?v=4&s=460" width="117">](https://github.com/chge)

## License

Licensed under MIT.