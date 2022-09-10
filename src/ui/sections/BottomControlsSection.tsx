import { css, domStyled, FC, jsx } from 'alumina';
import { appStore } from '~/store';
import { colors } from '../base';

export const BottomControlsSection: FC = () => {
  const { loadKicadPcbFile } = appStore.actions;
  return domStyled(
    <div>
      <button onClick={loadKicadPcbFile}>ファイルを読み込む(.kicad_pcb)</button>
    </div>,
    css`
      border: solid 1px ${colors.panelEdge};
      padding: 10px;
    `
  );
};
