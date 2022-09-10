import { AluminaNode, css, domStyled, jsx } from 'alumina';
import { reflectValue } from '~/funcs';
import { uiTheme } from '../base';

interface Props<T extends string> {
  options: (string | { value: T; label: string })[];
  value: T;
  onChange(value: T): void;
  width?: number;
  disabled?: boolean;
}

export const GeneralSelector = <T extends string>({
  options,
  value,
  onChange,
  width,
  disabled,
}: Props<T>): AluminaNode => {
  return domStyled(
    <select
      value={options.length > 0 ? value : ''}
      onChange={reflectValue(onChange)}
      disabled={disabled}
      style={(width && { width: `${width}px` }) || undefined}
    >
      {options.map((it, idx) => {
        const value = typeof it === 'string' ? it : it.value;
        const label = typeof it === 'string' ? it : it.label;
        return (
          <option value={value} key={idx}>
            {label}
          </option>
        );
      })}
    </select>,
    css`
      /* -webkit-appearance: none; */

      height: ${uiTheme.unitHeight}px;
      cursor: pointer;
    `
  );
};
