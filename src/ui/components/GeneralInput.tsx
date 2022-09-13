import { css, domStyled, FC, jsx } from 'alumina';
import { reflectValue } from '~/funcs';
import { uiTheme } from '../base';

type Props = {
  value: string;
  onChange?: (value: string) => void;
  onChangeComplete?: (value: string) => void;
  placeholder?: string;
  width?: number;
  disabled?: boolean;
};

export const GeneralInput: FC<Props> = ({
  value,
  onChange,
  placeholder,
  onChangeComplete,
  width,
  disabled,
}) => {
  return domStyled(
    <input
      type="text"
      value={value}
      onInput={onChange && reflectValue(onChange)}
      onChange={onChangeComplete && reflectValue(onChangeComplete)}
      placeholder={placeholder}
      style={(width && { width: `${width}px` }) || undefined}
      disabled={disabled}
    />,
    css`
      height: ${uiTheme.unitHeight}px;
      padding-left: 4px;
    `
  );
};
