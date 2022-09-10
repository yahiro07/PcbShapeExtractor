import { css, domStyled, FC, jsx } from 'alumina';
import { appStore } from '~/store';
import { PcbShapeView } from './PcbShapeView';

export const PageRoot: FC = () => {
  return domStyled(
    <div>
      <PcbShapeView />
      <div>
        <button onClick={appStore.actions.loadKicadPcbFile}>load</button>
      </div>
    </div>,
    css``
  );
};
