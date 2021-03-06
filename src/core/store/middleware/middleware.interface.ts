import {
  IResolverWrapper,
  ISectionWrapper,
  IListSectionWrapper,
  IFormFilterSectionWrapper,
  IListRoutePathWrapper,
} from '../../definitions.interface';
import { IDefaultApplicationState } from '../store.interface';
import { ListWrapperEntityResolverT } from '../../component/list';

/* @stable - 01.04.2018 */
export interface IUntouchedListMiddlewareConfig<TApplicationState extends IDefaultApplicationState>
  extends IResolverWrapper<ListWrapperEntityResolverT<TApplicationState>>,
          ISectionWrapper {
}

/* @stable - 01.04.2018 */
export interface IFormFilterMiddlewareConfig extends IListRoutePathWrapper,
                                                     IListSectionWrapper,
                                                     IFormFilterSectionWrapper {
}
