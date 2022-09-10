import { css, domStyled, FC, jsx } from 'alumina';
import { colors } from './base';
import {
  BottomControlsSection,
  PcbShapeView,
  TopControlsSection,
} from './sections';

export const PageRoot: FC = () => {
  return domStyled(
    <div>
      <h1>PCB Shape Extractor</h1>
      <TopControlsSection />
      <div class="main-row">
        <PcbShapeView />
      </div>

      <BottomControlsSection />
    </div>,
    css`
      height: 100%;
      display: flex;
      flex-direction: column;

      > h1 {
        font-size: 40px;
        background: #6c8;
        color: #fff;
        padding-left: 10px;
      }

      > .main-row {
        border: solid 1px ${colors.panelEdge};
        padding: 10px;
      }
    `
  );
};
