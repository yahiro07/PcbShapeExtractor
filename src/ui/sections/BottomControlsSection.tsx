import { css, domStyled, FC, jsx } from 'alumina';
import { appStore } from '~/store';
import { GeneralButton } from '../components';

export const BottomControlsSection: FC = () => {
  const { loadKicadPcbFile, exportSvg, exportJson } = appStore.actions;
  return domStyled(
    <div>
      <GeneralButton
        onClick={loadKicadPcbFile}
        text="ファイルを読み込む(.kicad_pcb)"
      />
      <GeneralButton text="SVG出力" onClick={exportSvg} />
      <GeneralButton text="JSON出力" onClick={exportJson} />
    </div>,
    css`
      display: flex;
      gap: 15px;
    `
  );
};
