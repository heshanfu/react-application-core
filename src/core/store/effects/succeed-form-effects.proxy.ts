import { EffectsService, IEffectsAction } from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';

import { DI_TYPES, provideInSingleton, lazyInject } from '../../di';
import { FormActionBuilder } from '../../component/form';
import { ListActionBuilder } from '../../component/list';
import { IApplicationModifyEntityPayloadFactory } from '../../api';
import { IRoutes, RouterActionBuilder, toRouteOptions } from '../../router';
import { APPLICATION_SECTIONS } from '../../component/application';
import { IDefaultApiEntity } from '../../entities-definitions.interface';

const logger = LoggerFactory.makeLogger('succeed-form-effects.proxy');

export function makeSucceedFormEffectsProxy(config: {
  listSection: string;
  formSection: string;
  listRoute?: string;
}): () => void {
  const {listSection, formSection, listRoute} = config;

  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @lazyInject(DI_TYPES.Routes) private routes: IRoutes;
      @lazyInject(DI_TYPES.ModifyEntityPayloadFactory) private payloadFactory: IApplicationModifyEntityPayloadFactory;

      @EffectsService.effects(FormActionBuilder.buildSubmitDoneActionType(formSection))
      public $onFormSubmitDone(action: IEffectsAction): IEffectsAction[] {
        const apiEntity = action.initialData as IDefaultApiEntity;

        const connectorConfig = APPLICATION_SECTIONS.get(listSection);
        const listRoute0 = listRoute
            || (connectorConfig ? toRouteOptions(connectorConfig.routeConfig, this.routes).path : null);

        if (!listRoute0) {
          logger.warn(
              `[$makeSucceedFormEffectsProxy][$onFormSubmitDone] The list route is empty for the section ${listSection}`
          );
        }
        const payloadWrapper = this.payloadFactory.makeInstance(action);

        return [
          apiEntity.isNew
              ? ListActionBuilder.buildInsertAction(listSection, payloadWrapper)
              : ListActionBuilder.buildUpdateAction(listSection, payloadWrapper),
          RouterActionBuilder.buildNavigateAction(listRoute0)
        ];
      }
    }
  };
}
