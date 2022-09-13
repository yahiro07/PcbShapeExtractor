import { AluminaChildren, css, domStyled, FC, jsx } from 'alumina';

type Props = {
  children?: AluminaChildren;
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  width?: number;
};

export const GeneralButton: FC<Props> = ({
  children,
  text,
  onClick,
  disabled,
  width,
}) => {
  const style = {
    width: width ? `${width}px` : 'auto',
  };
  return domStyled(
    <button onClick={onClick} disabled={disabled} style={style}>
      {text}
      {children}
    </button>,
    css`
      padding: 7px 10px;
      cursor: pointer;
      font-size: 15px;
    `
  );
};
