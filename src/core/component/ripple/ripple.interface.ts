import { INativeMaterialComponent } from '../../component/material';
import { IBaseComponentInternalProps } from '../../component/base';
import { IActiveable, IRippleable } from '../../definition.interface';

export interface INativeMaterialRippleComponent extends INativeMaterialComponent {
  activate(): void;
}

export interface IRippleInternalProps extends IBaseComponentInternalProps,
                                              IActiveable,
                                              IRippleable {
}
