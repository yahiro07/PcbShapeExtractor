import { css, domStyled, FC, jsx } from 'alumina';
import { appStore } from '~/store';
import { GeneralButton } from '../components';

export const BottomControlsSection: FC = () => {
  const { loadKicadPcbFile, exportSvg, exportJson, loadTestData } =
    appStore.actions;
  return domStyled(
    <div>
      <div class="row">
        <GeneralButton
          onClick={loadKicadPcbFile}
          text="ファイルを読み込む(.kicad_pcb)"
        />
        <GeneralButton text="SVG出力" onClick={exportSvg} />
        <GeneralButton text="JSON出力" onClick={exportJson} />
      </div>
      <div class="row second-row">
        <div class="sample-loader-link" onClick={loadTestData}>
          サンプルをロード
        </div>
      </div>
    </div>,
    css`
      display: flex;
      flex-direction: column;
      gap: 10px;
      > .row {
        display: flex;
        gap: 15px;
      }

      > .second-row {
        > .sample-loader-link {
          font-size: 14px;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    `
  );
};
