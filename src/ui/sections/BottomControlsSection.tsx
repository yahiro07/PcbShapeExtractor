import { css, domStyled, FC, jsx } from 'alumina';
import { appStore } from '~/store';
import { GeneralButton } from '../components';

export const BottomControlsSection: FC = () => {
  const { loadKicadPcbFile } = appStore.actions;
  return domStyled(
    <div>
      <GeneralButton
        onClick={loadKicadPcbFile}
        text="ファイルを読み込む(.kicad_pcb)"
      />
      <GeneralButton text="SVG出力" />
      <GeneralButton text="JSON出力" />
    </div>,
    css`
      display: flex;
      gap: 15px;
    `
  );
};
