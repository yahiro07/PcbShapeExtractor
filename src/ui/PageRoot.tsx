import { css, domStyled, FC, jsx } from 'alumina';
import { colors } from './base';
import {
  BottomControlsSection,
  HeaderBar,
  PcbShapeView,
  TopControlsSection,
} from './sections';

export const PageRoot: FC = () => {
  return domStyled(
    <div>
      <HeaderBar />
      <div class="inner">
        <div class="row">
          <TopControlsSection />
        </div>

        <div class="row">
          <PcbShapeView />
        </div>
        <div class="row">
          <BottomControlsSection />
        </div>
      </div>
    </div>,
    css`
      height: 100%;
      padding: 10px;
      font-size: 15px;
      color: #333;

      > .inner {
        display: flex;
        flex-direction: column;
        overflow-x: hidden;

        > .row {
          border: solid 1px ${colors.panelEdge};
          padding: 15px 20px;
        }
      }
    `
  );
};
