import { css, domStyled, FC, jsx } from 'alumina';
import { cssCommonTransitionSpec } from '../base';
import { IconFontIcon } from './IconFontIcon';

type Props = {
  iconSpec: string;
  size: number;
  onClick?(): void;
  disabled?: boolean;
};

export const IconButton: FC<Props> = ({
  iconSpec,
  size,
  onClick,
  disabled,
}) => {
  return domStyled(
    <div class={disabled && '--disabled'} onClick={onClick}>
      <IconFontIcon spec={iconSpec} size={size} />
    </div>,
    css`
      cursor: pointer;
      ${cssCommonTransitionSpec}

      &:hover {
        opacity: 0.7;
      }

      &.--disabled {
        opacity: 0.5;
      }
    `
  );
};
