import {
  IEntitySorterWrapper,
  INonInteractiveWrapper,
  ISimpleWrapper,
  IStringEmptyMessageWrapper,
  IUseAvatarWrapper,
  IUseTwoLineWrapper,
  IUseAddActionWrapper,
  IEntityRendererWrapper,
  IEntityToClassNameWrapper,
  IEntityTplWrapper,
  IStringIconWrapper,
  IActionIconWrapper,
  IActionTextWrapper,
  IAlwaysDirtyWrapper,
  IClassNameWrapper,
  IDisabledWrapper,
  INotUseActionsWrapper,
  INotUseClassNameWrapper,
  IReadOnlyWrapper,
  IResetTextWrapper,
  IUseResetButtonWrapper,
  ISubmittableWrapper,
  IRippableWrapper,
  IWidthWrapper,
  IStringTitleWrapper,
  IUseGroupingWrapper,
  IUseSortingWrapper,
  IAlignWrapper,
  IUseLocalFilteringWrapper,
  INameWrapper,
  INumberValueWrapper,
  IItemsWrapper,
  IBooleanActiveWrapper,
  IStringTypeWrapper,
  IBasenameWrapper,
  IAutoFocusWrapper,
  IPreventValueBindingWrapper,
  IPlaceholderWrapper,
  IStringPatternWrapper,
  IDisplayNameWrapper,
  IDisplayMessageWrapper,
  ILabelWrapper,
  IPrefixLabelWrapper,
} from './definitions.interface';

/* @stable - 05.04.2018 */
export interface IItemConfigurationWrapper<TItemConfiguration> {
  itemConfiguration?: TItemConfiguration;
}

/* @stable - 05.04.2018 */
export interface IColumnsConfigurationWrapper<TColumns> {
  columnsConfiguration?: TColumns;
}

/* @stable - 31.03.2018 */
export interface IListConfigurationWrapper {
  listConfiguration?: IListConfiguration;
}

/* @stable - 03.04.2018 */
export interface IGridConfigurationWrapper {
  gridConfiguration?: IGridConfiguration;
}

/* @stable - 31.03.2018 */
export interface IFormConfigurationWrapper {
  formConfiguration?: IFormConfiguration;
}

/* @stable - 31.03.2018 */
export interface IListItemConfiguration extends IEntityRendererWrapper,
                                                IEntityTplWrapper,
                                                IEntityToClassNameWrapper,
                                                IRippableWrapper,
                                                IStringIconWrapper {
}

/* @stable - 04.04.2018 */
export interface IBaseListConfiguration extends IUseAddActionWrapper,
                                                IEntitySorterWrapper,
                                                IStringEmptyMessageWrapper {
}

/* @stable - 04.04.2018 */
export interface IListConfiguration extends IBaseListConfiguration,
                                            ISimpleWrapper,
                                            IUseTwoLineWrapper,
                                            IUseAvatarWrapper,
                                            INonInteractiveWrapper,
                                            IItemConfigurationWrapper<IListItemConfiguration> {
}

/* @stable - 31.03.2018 */
export interface IFormConfiguration extends INotUseClassNameWrapper,
                                            INotUseActionsWrapper,
                                            IUseResetButtonWrapper,
                                            IClassNameWrapper,
                                            ISubmittableWrapper,
                                            IAlwaysDirtyWrapper,
                                            IDisabledWrapper,
                                            IReadOnlyWrapper,
                                            IActionTextWrapper,
                                            IResetTextWrapper,
                                            IActionIconWrapper {
}

/* @stable - 04.04.2018 */
export interface IGridColumnConfiguration extends IStringTitleWrapper,
                                                  IUseGroupingWrapper,
                                                  IUseLocalFilteringWrapper,
                                                  IUseSortingWrapper,
                                                  IAlignWrapper,
                                                  IEntityTplWrapper,
                                                  IEntityRendererWrapper,
                                                  IWidthWrapper {
}

/* @stable - 04.04.2018 */
export interface IGridConfiguration extends IBaseListConfiguration,
                                            IColumnsConfigurationWrapper<IGridColumnConfiguration[]> {
}

/* @stable - 03.04.2018 */
export interface IGridHeaderColumnConfiguration extends IGridColumnConfiguration {
}

/* @stable - 06.04.2018 */
export interface ITabConfiguration extends INumberValueWrapper,
                                           IBooleanActiveWrapper,
                                           INameWrapper,
                                           IStringIconWrapper {
}

/* @stable - 06.04.2018 */
export interface ITabPanelConfiguration extends IItemsWrapper<ITabConfiguration[]> {
}

/* @stable - 07.04.2018 */
export interface IButtonConfiguration extends ISimpleWrapper,
                                              IStringTypeWrapper,
                                              IDisabledWrapper {
}

/* @stable - 11.04.2018 */
export interface IApplicationConfiguration extends IBasenameWrapper {
}

/* @stable - 11.04.2018 */
export interface IFieldConfiguration extends IReadOnlyWrapper,
                                             ILabelWrapper,
                                             IPrefixLabelWrapper,
                                             IDisplayNameWrapper,
                                             IDisplayMessageWrapper,
                                             IStringTypeWrapper,
                                             IPlaceholderWrapper,
                                             IPreventValueBindingWrapper,
                                             IAutoFocusWrapper,
                                             IStringPatternWrapper,
                                             IDisabledWrapper {
}
