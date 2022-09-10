import { css, domStyled, FC, jsx } from 'alumina';

type Props = {};

const ComponentTemplate: FC<Props> = ({}) => {
  return domStyled(<div></div>, css``);
};

const ComponentTemplateNoProp: FC = () => {
  return domStyled(<div></div>, css``);
};
