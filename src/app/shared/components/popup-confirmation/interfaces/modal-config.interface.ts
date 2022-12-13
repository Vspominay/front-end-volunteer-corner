import { EButtonStyle } from '../../../../modules/form-elements/components/button/enums/button-style.enum';

export interface IModalConfig {
  title: string,
  confirmBtnText?: string,
  cancelBtnText?: string,
  confirmBtnStyle?: EButtonStyle,
  cancelBtnStyle?: EButtonStyle
}
