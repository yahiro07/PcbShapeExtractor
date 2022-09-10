import { css, domStyled, FC, jsx } from 'alumina';
import { appStore } from '~/store';
import { PcbShapeView } from './PcbShapeView';

export const PageRoot: FC = () => {
  const { pcbShapeData } = appStore.state;
  return domStyled(
    <div>
      <PcbShapeView pcbShapeData={pcbShapeData} />
      <div>
        <button onClick={appStore.actions.loadKicadPcbFile}>load</button>
      </div>
    </div>,
    css``
  );
};
